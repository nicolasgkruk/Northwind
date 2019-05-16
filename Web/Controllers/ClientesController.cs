using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DB;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Net;
using System.Net.Http.Formatting;

namespace Web.Controllers
{
    public class ClientesController : Controller
    {
        public HttpClient cliente;

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Nuevo()
        {
            var paises = await (await cliente.GetAsync("Orders/Countries")).Content.ReadAsAsync<IEnumerable<string>>();
            ViewData["Paises"] = paises.Select(x => new SelectListItem() { Value = x, Text = x }).ToList();

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Editar(string id)
        {
            if (id == null) return NotFound();

            var respuesta = await cliente.GetAsync("Customers/" + id);
            if (respuesta.StatusCode == HttpStatusCode.OK)
            {
                var customer = await respuesta.Content.ReadAsAsync<Customers>();

                if (customer == null) return NotFound();
                else
                {
                    var paises = await (await cliente.GetAsync("Orders/Countries")).Content.ReadAsAsync<IEnumerable<string>>();
                    ViewData["Paises"] = paises.Select(x => new SelectListItem() { Value = x, Text = x }).ToList();

                    return View(customer);
                }
            }
            else return new BadRequestResult();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Editar(string id, [Bind("CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax")] Customers customer)
        {
            if (id != customer.CustomerID) return NotFound();

            if (ModelState.IsValid)
            {
                var respuesta = await cliente.PutAsync("Customers/" + id, customer, new JsonMediaTypeFormatter());
                if (respuesta.StatusCode == HttpStatusCode.NoContent) return RedirectToAction("index");
            }

            return View("Index");
        }

        public async Task<IActionResult> Ficha(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var respuesta = await cliente.GetAsync("Customers/" + id);
            if (respuesta.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var cliente = await respuesta.Content.ReadAsAsync<Customers>();

                if (cliente == null) return NotFound();
                else return View(cliente);
            }
            else return new BadRequestResult();
        }

       
        public ClientesController()
        {
            cliente = new HttpClient();
            cliente.BaseAddress = new Uri("https://localhost:44394/api/");
        }

    }
}