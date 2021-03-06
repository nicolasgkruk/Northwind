﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DB;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ModelNorthwind _context;

        public CustomersController(ModelNorthwind context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customers>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/ANATR/Orders
        [HttpGet("{id}/orders")]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrdersByCustomer([FromRoute] string id)
        {
            return await _context.Orders.Where(x => x.CustomerID == id)
                .Include(x => x.Customer)
                .Include(x => x.ShipViaNavigation)
                .ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customers>> GetCustomers(string id)
        {
            var customers = await _context.Customers.FindAsync(id);

            if (customers == null)
            {
                return NotFound();
            }

            return customers;
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomers(string id, Customers customer)
        {
            if (id != customer.CustomerID)
            {
                return BadRequest();
            }

                _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomersExists(id))
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

        // POST: api/Customers
        [HttpPost]
        public async Task<ActionResult<Customers>> PostCustomers([FromBody] Customers customers)
        {
            _context.Customers.Add(customers);
            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CustomersExists(customers.CustomerID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCustomers", new { id = customers.CustomerID }, customers);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customers>> DeleteCustomers(string id)
        {
            var customers = await _context.Customers.FindAsync(id);
            if (customers == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customers);
            await _context.SaveChangesAsync();

            return customers;
        }

        private bool CustomersExists(string id)
        {
            return _context.Customers.Any(e => e.CustomerID == id);
        }
    }
}
