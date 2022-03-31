using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ACServiceAPI.Models;
using ACServiceAPI.Data;

namespace ACServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ACServiceDbContext _context;

        public UserController(ACServiceDbContext context)
        {
            _context = context;
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            return await _context.User.ToListAsync();
        }

        [HttpGet("{UserID}")]
        public async Task<ActionResult<UserModel>> GetUser(int UserID)
        {
            var userModel = await _context.User.FindAsync(UserID);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }
        
        [HttpPut("{UserID}")]
        public async Task<IActionResult> PutUser(int UserID, UserModel userModel)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (UserID != userModel.UserID)
            {
                return BadRequest();
            }

            _context.Entry(userModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(UserID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUser(UserModel userModel)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.User.Add(userModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { UserID = userModel.UserID }, userModel);
        }

        
        [HttpDelete("{UserID}")]
        public async Task<IActionResult> DeleteUser(int UserID)
        {
            var userModel = await _context.User.FindAsync(UserID);
            if (userModel == null)
            {
                return NotFound();
            }

            _context.User.Remove(userModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserModelExists(int UserID)
        {
            return _context.User.Any(e => e.UserID == UserID);
        }
       
    }
}
