using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AdminTemp.Startup))]
namespace AdminTemp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
