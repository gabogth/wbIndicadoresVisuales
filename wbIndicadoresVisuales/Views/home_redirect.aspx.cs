using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Modelo;

namespace wbIndicadoresVisuales.Views
{
    public partial class home_redirect : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                string IPAdd = string.Empty;
                IPAdd = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (String.IsNullOrEmpty(IPAdd))
                    IPAdd = Request.ServerVariables["REMOTE_ADDR"];
                dbProcedimientos.HOME_REDIRECTRow dataTable = DOMModel.HOME_REDIRECT(IPAdd);
                if (dataTable != null)
                {
                    if (dataTable.idcounter != 0)
                        Response.Redirect("~/Views/checkin.aspx");
                    if (dataTable.idfaja != 0)
                        Response.Redirect("~/Views/faja.aspx");
                    if (dataTable.idpuerta != 0)
                        Response.Redirect("~/Views/puerta.aspx");
                    if (dataTable.salida_llegada == 0)
                        Response.Redirect("~/Views/fid_salida.aspx");
                    if (dataTable.salida_llegada == 1)
                        Response.Redirect("~/Views/fid_llegada.aspx");
                    if (dataTable.salida_llegada == 2)
                        Response.Redirect("~/Views/fid_mixto.aspx");
                }
            }
            catch (Exception ex)
            {
                txtMensaje.InnerText =ex.Message;
            }
        }
    }
}