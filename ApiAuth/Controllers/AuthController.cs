using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ApiAuth.Entities.DTOs;
using ApiAuth.Entities.Models;
using ApiAuth.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ApiAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private  readonly TokenUtility _utility;


        public AuthController(MyDbContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManage, TokenUtility utility)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManage;
            _utility = utility;

        }
        [HttpPost, Route("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDTO user)
        {
            if (user == null)
            {
                return BadRequest("Invalide client request");
            }
            var userToVerify = await _userManager.FindByEmailAsync(user.Email);
            if (userToVerify == null) return Unauthorized("invalid email");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var roles = await _userManager.GetRolesAsync(userToVerify);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userToVerify.UserName),
            };
            claims.Add(new Claim("Id", userToVerify.Id));

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:5000",
                claims: claims,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString, msg = $"Welcome {userToVerify.UserName}", id = userToVerify.Id });
        }
        [HttpPost, Route("Inscription")]
        public async Task<IActionResult> Inscription([FromBody] InscriptionDTO user)
        {
            try
            {
                if (user == null)
                {
                    return BadRequest("user object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                ApplicationUser userExist = await _userManager.FindByEmailAsync(user.Email);
                if (userExist != null)
                {
                    return StatusCode(409, "Email already exist");
                }
                var userEntity = new ApplicationUser()
                {
                    UserName = user.Username,
                    Email = user.Email,
                };
                var result = await _userManager.CreateAsync(userEntity, user.Password);
                if (result.Succeeded) return Ok();
                else return StatusCode(500, $"Internal server error{result.Errors.FirstOrDefault().Description}");


            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

      [Authorize]
        [HttpPut("updateUserProfil/{id}")]
        public async Task<IActionResult> UpdateUserProfilAsync(string id, [FromBody] UserProfilDTO user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
              

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                var userId = _utility.GetUserIdFromToken(authHeader);
                if (userId != id)
                {
                    return Unauthorized();
                }

                ApplicationUser userExist = await _userManager.FindByIdAsync(id);
                if (userExist == null)
                {
                    return StatusCode(404, "user not exist");
                }
                userExist.FirstName = user.FirstName;
                userExist.LastName = user.LastName;
                userExist.BirthDate = user.BirthDate;

                /* userExist.Email = user.Email;*/

                var result = await _userManager.UpdateAsync(userExist);
                if (result.Succeeded) return Ok();
                else return StatusCode(500, $"Internal server error{result.Errors.FirstOrDefault().Description}");


            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfile(string id)
        {
            if (id == null)
            {
                return BadRequest("Invalide client request");
            }

            ApplicationUser userExist = await _userManager.FindByIdAsync(id);
            if (userExist == null)
            {
                return StatusCode(404, "user not exist");
            }
            var user = new UserProfilDTO
            {
                Email = userExist.Email,
                Username = userExist.UserName,
                FirstName = userExist.FirstName,
                LastName = userExist.LastName,
                BirthDate = userExist.BirthDate

            };
            return Ok(new { user = user });

        }
    }
}