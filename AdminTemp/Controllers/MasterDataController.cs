using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminTemp.Controllers
{
    public class MasterDataController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult UnitAdd()
        {
            return Json("");
        }
        [HttpGet]
        public ActionResult UnitList()
        {
            return Json("");
        }
        [HttpPost]
        public ActionResult UnitEdit()
        {
            return Json("");
        }
        [HttpPost]
        public ActionResult UnitUpdate()
        {
            return Json("");
        }



        [HttpPost]
        public ActionResult GstAdd()
        {
            return Json("");
        }
        [HttpGet]
        public ActionResult GstList()
        {
            return Json("");
        }
        [HttpPost]
        public ActionResult GstEdit()
        {
            return Json("");
        }
        [HttpPost]
        public ActionResult GstUpdate()
        {
            return Json("");
        }

    }
}