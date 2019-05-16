using System;
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
    public class OrdersController : ControllerBase
    {
        private readonly ModelNorthwind _context;

        public OrdersController(ModelNorthwind context)
        {
            _context = context;
        }


        // GET: api/Customers/ANATR/Orders
        [HttpGet("{id}/OrderDetails")]
        public async Task<ActionResult<IEnumerable<Order_Details>>> GetOrdersByCustomer([FromRoute] int? id)
        {
            return await _context.Order_Details.Where(x => x.OrderID == id)
                .Include(x => x.Product)
                .ToListAsync();
        }

        // GET: api/Orders/Countries
        [HttpGet("Countries")]
        public async Task<ActionResult<IEnumerable<string>>> GetCountriesInOrders()
        {
            return await _context.Orders
                .Select(r => r.ShipCountry)
                .Distinct()
                .OrderBy(r => r)
                .ToListAsync();
        }

        // GET: api/Orders/
        // GET: api/Orders?cliente=oceano&producto=queso&pais=Argentina
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders([FromQuery] string cliente, [FromQuery] string producto, [FromQuery] string pais)
        {
            if ((cliente == null || cliente == "") && (producto == "" || producto == null) && (pais == "" || pais == null || pais == "all"))
            {
                return await _context.Orders
                .Include(x => x.Customer)
                .Include(x => x.ShipViaNavigation)
                .ToListAsync();
            }
            else if ((cliente != "" && cliente != null) && (producto == "" || producto == null) && (pais == "" || pais == null || pais == "all"))
            {
                return await _context.Orders
                    .Where(r => r.ShipName.Contains(cliente))
                    .Include(r => r.Customer)
                    .Include(r => r.ShipViaNavigation)
                    .ToListAsync();
            }
            else if ((cliente == null || cliente == "") && (producto != "" && producto != null) && (pais == "" || pais == null || pais == "all"))
            {
                return await _context.Orders                   
                    .Include(a => a.Order_Details)
                    .Include("Order_Details.Product")
                    .Where(r => r.Order_Details
                    .Count(h => h.Product.ProductName.Contains(producto)) > 0)
                    .Include(r => r.Customer)
                    .Include(r => r.ShipViaNavigation)
                    .ToListAsync();
            }
            else if ((cliente == null || cliente == "") && (producto == "" || producto == null) && (pais != "" && pais != null && pais != "all"))
            {
                return await _context.Orders
                    .Where(r => r.ShipCountry == pais)
                    .Include(x => x.Customer)
                    .Include(x => x.ShipViaNavigation)
                    .ToListAsync();
            }
            else if ((cliente != "" && cliente != null) && (producto != "" && producto != null) && (pais == "" || pais == null || pais == "all"))
            {
                return await _context.Orders         
                    .Include(a => a.Order_Details)
                    .Include("Order_Details.Product")
                    .Where(r => r.ShipName.Contains(cliente) &&
                                r.Order_Details
                    .Count(h => h.Product.ProductName.Contains(producto)) > 0)
                    .Include(r => r.Customer)
                    .Include(r => r.ShipViaNavigation)
                    .ToListAsync();
            }
            else if ((cliente != "" && cliente != null) && (producto == "" || producto == null) && (pais != "" && pais != null && pais != "all"))
            {
                return await _context.Orders
                    .Where(r => r.ShipName.Contains(cliente) && r.ShipCountry == pais)
                    .Include(x => x.ShipViaNavigation)
                    .Include(x => x.Customer)
                    .ToListAsync();
            }
            else if ((cliente == null || cliente == "") && (producto != "" && producto != null) && (pais != "" && pais != null && pais != "all"))
            {
                return await _context.Orders                
                     .Include(a => a.Order_Details)
                     .Include("Order_Details.Product")
                     .Where(r => r.ShipCountry == pais &&
                                 r.Order_Details
                     .Count(h => h.Product.ProductName.Contains(producto)) > 0)
                     .Include(r => r.Customer)
                     .Include(r => r.ShipViaNavigation)
                     .ToListAsync();
            }
            else if ((cliente != "" && cliente != null) && (producto != "" && producto != null) && (pais != "" && pais != null && pais != "all"))
            {
                return await _context.Orders
                     .Include(a => a.Order_Details)
                     .Include("Order_Details.Product")
                     .Where(r => r.ShipCountry == pais &&
                                 r.ShipName.Contains(cliente) &&
                                 r.Order_Details
                     .Count(h => h.Product.ProductName.Contains(producto)) > 0)
                     .Include(r => r.Customer)
                     .Include(r => r.ShipViaNavigation)
                     .ToListAsync();
            }


            return NoContent();
        }


        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Orders>> GetOrders(int id)
        {
            var orders = await _context.Orders
                .Where(r => r.OrderID == id)
                .Include(r => r.Employee)
                .Include(r=> r.ShipViaNavigation)
                .Include(r => r.Order_Details)
                .Include("Order_Details.Product")
                .FirstOrDefaultAsync();

            if (orders == null)
            {
                return NotFound();
            }

            return orders;
        }     

        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.OrderID == id);
        }
    }
}
