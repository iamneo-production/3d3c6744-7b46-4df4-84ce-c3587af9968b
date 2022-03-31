using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ACServiceAPI.Models;
using ACServiceAPI.Data;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace ACServiceAPI.Controllers
{
    
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ACServiceDbContext _context;

        private readonly IConfiguration _config;

        public AuthController(ACServiceDbContext context,IConfiguration config)
        {
            _context = context;
            _config = config;
        }
       
        [HttpGet]
        [Route("api/UserID")]
        public async Task<ActionResult<UserModel>> GetUser(int UserID)
        {
            var userModel = await _context.User.FindAsync(UserID);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }

        [HttpGet]
        [Route("api/AdminID")]
        public async Task<ActionResult<AdminModel>> GetAdmin(int AdminID)
        {
            var adminModel = await _context.Admin.FindAsync(AdminID);

            if (adminModel == null)
            {
                return NotFound();
            }

            return adminModel;
        }

        
        [HttpPost]
        [Route("api/saveUser")]
        public async Task<ActionResult<UserModel>> saveUser(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return userModel;
            }
            _context.User.Add(userModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { UserID = userModel.UserID }, userModel);
        }


        [HttpPost]
        [Route("api/saveAdmin")]
        public async Task<ActionResult<AdminModel>> saveAdmin(AdminModel adminModel)
        {
            if (!ModelState.IsValid)
            {
                return adminModel;
            }
            _context.Admin.Add(adminModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdmin", new { AdminID = adminModel.AdminID }, adminModel);
        }
       
        [HttpPost]
        [Route("api/isUserPresent")]
        public IActionResult isUserPresent([FromBody] LoginModel userObj)
        {

            if (userObj == null)
            {
                return BadRequest();
            }
            else
            {
                var user = _context.User.Where(a => a.email == userObj.email).FirstOrDefault();
                if (user != null && user.password == userObj.password)
                {
                    var token = GenerateToken(userObj.email);
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Logged In Successfully",
                        UserType = user.userRole,
                        UserId = user.UserID,
                        JwtToken = token
                    }); ;
                
                }
                else
                {
                  
                    return NotFound(new
                    {
                        StatusCode = 404,
                        Message = "User Not Found"
                    });
                 

                }
            }
        }


        [HttpPost]
        [Route("api/isAdminPresent")]
        public bool isAdminPresent([FromBody] LoginModel adminObj)
        {
            if (adminObj == null)
            {
                return false;
            }
            else
            {
                var admin = _context.Admin.Where(a => a.email == adminObj.email).FirstOrDefault();


                if (admin != null && admin.password == adminObj.password)
                {
                    return true;

                }
                else
                {
                    return false;

                }
            }
        }


        private string GenerateToken(string email)
        {
            var tokenhanndler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:key"]));
            var credential = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email,email),
                new Claim("CompanyName","raj@gmail.com")  
            };
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credential
                );
            return tokenhanndler.WriteToken(token);
        }

    }
}
