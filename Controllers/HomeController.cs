using Microsoft.AspNetCore.Mvc;

namespace Fonoteka.WebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}