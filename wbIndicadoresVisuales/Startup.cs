using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(wbIndicadoresVisuales.Startup))]
namespace wbIndicadoresVisuales
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            app.MapSignalR();
        }
    }
}
