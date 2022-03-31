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
    public class AppointmentController : ControllerBase
    {
        private readonly ACServiceDbContext _context;

        public AppointmentController(ACServiceDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductModel>>> getAppointments()
        {
            return await _context.Product.ToListAsync();
        }

        [HttpGet("{id}")]
        public async  Task<List<ProductModel>> getBookingDetails(int id)
        {

            var productModel =  ( from c in _context.Product
                                where c.userId==id select c).ToList();

            if (productModel == null)
            {
                return null;
            }

            return productModel;
        }

        [HttpPut("{ProductID}")]
        public async Task<IActionResult> EditAppointment(int ProductID, ProductModel productModel)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (ProductID != productModel.ProductID)
            {
                return BadRequest();
            }

            _context.Entry(productModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductModelExists(ProductID))
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
        public async Task<ActionResult<ProductModel>> saveAppointment(ProductModel productModel)
        {
            if (!ModelState.IsValid)
            {
                 return productModel;
             }

            _context.Product.Add(productModel);
            await _context.SaveChangesAsync();
            
            return productModel;
        }


        [HttpDelete("{ProductID}")]
        public async Task<IActionResult> saveAppointment(int ProductID)
        {
            var productModel = await _context.Product.FindAsync(ProductID);
            if (productModel == null)
            {
                return NotFound();
            }

            _context.Product.Remove(productModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductModelExists(int ProductID)
        {
            return _context.Product.Any(e => e.ProductID == ProductID);
        }
    }
}
