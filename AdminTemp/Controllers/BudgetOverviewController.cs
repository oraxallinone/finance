using AdminTemp.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminTemp.Controllers
{
    public class BudgetOverviewController : Controller
    {
        public ActionResult GroupBudgetOverview()
        {
            //budget-overview
            //budgetOverview:js
            //GetBudgetOverview() js function
            //GroupBudgetOverview :action method
            //BudgetOverviewService.cs :service
            //GroupBudgetOverviewService

            //sp_GetGroupBudgetOverview month, year salary table get fromDate toDate
            return View();
        }

        private readonly BudgetOverviewService _svc = new BudgetOverviewService();

        // existing action: GroupBudgetOverview view (unchanged)

        [HttpGet]
        public JsonResult BudgetOverview(int year, int month)
        {
            var list = _svc.GetSumAsGroupService(year, month);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}