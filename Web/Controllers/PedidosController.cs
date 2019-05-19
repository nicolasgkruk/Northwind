using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DB;

namespace Web.Controllers
{

    
    public class PedidosController : Controller
    {
        public HttpClient cliente;

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Buscar()
        {
            return View();
        }

        public async Task<IActionResult> Ficha(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var respuesta = await cliente.GetAsync("Orders/" + id.ToString());
            if (respuesta.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var pedido = await respuesta.Content.ReadAsAsync<Orders>();

                if (pedido == null) return NotFound();
                else return View(pedido);
            }
            else return new BadRequestResult();
        }

        public PedidosController()
        {
            cliente = new HttpClient();
            cliente.BaseAddress = new Uri("http://kruk.works/api/");
        }
    }
}