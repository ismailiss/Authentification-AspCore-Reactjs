using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ApiAuth.Entities.DTOs;
using ApiAuth.Entities.Models;
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
        public AuthController(MyDbContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManage)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManage;

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

            foreach (var role in roles)
            {
                claims.Add(new Claim( ClaimTypes.Role, role ));
            }
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:5000",
                claims: claims,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString ,msg=$"Welcome {userToVerify.UserName}"});
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
                else
                    return StatusCode(500, $"Internal server error{result.Errors.FirstOrDefault().Description}");

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
