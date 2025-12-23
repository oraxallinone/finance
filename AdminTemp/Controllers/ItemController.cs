using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminTemp.Controllers
{
    public class ItemController : Controller
    {
        [HttpGet]
        public ActionResult Registration()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Registration(int id)
        {
            if (id == 0)
            {
                return RedirectToAction("List");
            }
            return View();
        }

        [HttpGet]
        public ActionResult List()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Edit()
        {
            return Json("");
        }

        [HttpPost]
        public ActionResult Update(int id)
        {
            if (id == 0)
            {
                return RedirectToAction("List");
            }
            return View();
        }

        [HttpPost]
        public JsonResult Delete()
        {
            return Json("");
        }
    }
}