using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace wbIndicadoresVisuales.Response
{
    /// <summary>
    /// Descripción breve de close_session
    /// </summary>
    public class close_session : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                context.Session.Clear();
                context.Session.Abandon();
                context.Response.Redirect("~/default.aspx");
            }
            catch
            {
                context.Response.Redirect("~/default.aspx");
            }
            
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}