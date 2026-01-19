using System.Web.Mvc;

namespace AdminTemp.Areas.GstBill
{
    public class GstBillAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "GstBill";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "GstBill_default",
                "GstBill/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}