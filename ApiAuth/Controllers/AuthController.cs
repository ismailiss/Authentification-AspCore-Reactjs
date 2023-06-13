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
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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
        private readonly IConfiguration _configuration;


        public AuthController(MyDbContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManage, TokenUtility utility, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManage;
            _utility = utility;
            _configuration = configuration;


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

            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes (_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim("userId", userToVerify.Id),
                new Claim(JwtRegisteredClaimNames.Sub, userToVerify.UserName),
                new Claim(JwtRegisteredClaimNames.Email, userToVerify.Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                }),


                Expires = DateTime.UtcNow.AddDays(5),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials
                (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var stringToken = tokenHandler.WriteToken(token);

            return Ok(new { Token = stringToken, msg = $"Welcome {userToVerify.UserName}", id = userToVerify.Id });
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

        [HttpPut("updateUserProfile/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> UpdateUserProfileAsync(string id, [FromBody] UserProfilDTO user)
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

        [HttpGet, Route("GetUserProfile/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> GetUserProfile(string id)
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
