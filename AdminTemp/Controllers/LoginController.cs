using System.Web.Mvc;
using AdminTemp.Service;

namespace AdminTemp.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login/LoginIndex
        public ActionResult LoginIndex()
        {
            return View();
        }

        [HttpPost]
        public JsonResult CheckLogin(string email, string password, bool rememberMe)
        {
            var loginService = new LoginService();
            var result = loginService.CheckLogin(email, password);
            if (result != null)
            {
                // Set session or authentication here as needed
                if (result.UserType == 9)
                {
                    return Json(new { success = true, redirectUrl = Url.Action("Dashboard", "Default") });
                }
                else if (result.UserType == 1 || result.UserType == 2)
                {
                    return Json(new { success = true, redirectUrl = Url.Action("Index", "Home") });
                }
            }
            return Json(new { success = false, message = "Invalid credentials or inactive user." });
        }
    }
}
