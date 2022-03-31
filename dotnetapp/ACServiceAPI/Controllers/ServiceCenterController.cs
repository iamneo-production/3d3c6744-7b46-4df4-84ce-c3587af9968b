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
    public class ServiceCenterController : ControllerBase
    {
        private readonly ACServiceDbContext _context;

        public ServiceCenterController(ACServiceDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceCenterModel>>> GetServiceCenters()
        {
            return await _context.ServiceCenter.ToListAsync();
        }

        [HttpGet("{serviceCenterID}")]
        public async Task<ActionResult<ServiceCenterModel>> GetServiceCenter(int serviceCenterID)
        {
            var serviceCenter = await _context.ServiceCenter.FindAsync(serviceCenterID);

            if (serviceCenter == null)
            {
                return NotFound();
            }

            return serviceCenter;
        }

        [HttpPut("{serviceCenterID}")]
        public async Task<IActionResult> PutServiceCenter(int serviceCenterID, ServiceCenterModel serviceCenter)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (serviceCenterID != serviceCenter.serviceCenterID)
            {
                return BadRequest();
            }

            _context.Entry(serviceCenter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceCenterModelExists(serviceCenterID))
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
        public async Task<ActionResult<ServiceCenterModel>> PostServiceCenter(ServiceCenterModel serviceCenter)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            _context.ServiceCenter.Add(serviceCenter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceCenter", new { serviceCenterID = serviceCenter.serviceCenterID }, serviceCenter);
        }


        [HttpDelete("{serviceCenterID}")]
        public async Task<IActionResult> DeleteServiceCenter(int serviceCenterID)
        {
            var serviceCenter = await _context.ServiceCenter.FindAsync(serviceCenterID);
            if (serviceCenter == null)
            {
                return NotFound();
            }

            _context.ServiceCenter.Remove(serviceCenter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiceCenterModelExists(int serviceCenterID)
        {
            return _context.ServiceCenter.Any(e => e.serviceCenterID == serviceCenterID);
        }
    }
}
