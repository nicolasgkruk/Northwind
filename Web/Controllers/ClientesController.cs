using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DB;

namespace Web.Controllers
{
    public class ClientesController : Controller
    {
        public HttpClient cliente;

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Nuevo()
        {
            return View();
        }

        public IActionResult Editar()
        {
            return View();
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