using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class ClientesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Editar()
        {
            return View();
        }

        public IActionResult Ficha()
        {
            return View();
        }

        public IActionResult Nuevo()
        {
            return View();
        }
    }
}