using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminTemp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Index2()
        {
            ViewBag.Message = "Index2";

            return View();
        }
        public ActionResult Index3()
        {
            ViewBag.Message = "Index3";

            return View();
        }
        public ActionResult smallbox()
        {
            ViewBag.Message = "smallbox";

            return View();
        }


        //
        public ActionResult GeneralElements()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }



        public ActionResult SimpleTables()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }



        public ActionResult infobox()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult cards()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult general()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult icons()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Timeline()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult lgin2()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public ActionResult LayoutDmo()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public ActionResult MaxCard()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult TblScorrable()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }









        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult FloatingTextbox()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult FloatingTextbox2()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public ActionResult testTable()
        {
            return View();
        }


        public ActionResult calenderWithClr()
        {
            return View();
        }

    }
}