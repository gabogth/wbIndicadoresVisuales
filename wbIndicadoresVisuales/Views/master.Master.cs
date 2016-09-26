using Modelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace wbIndicadoresVisuales.Views
{
    public partial class master : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            dbProcedimientos.USUARIO_LOGINRow usuario = (dbProcedimientos.USUARIO_LOGINRow)Session["usuario"];
            if (usuario == null)
            {
                Response.Redirect("~/default.aspx");
            }
            else
            {
                lblMasterUser.InnerText = usuario.apellido + ", " + usuario.nombre;
                lblMasterUser2.InnerText = usuario.apellido + ", " + usuario.nombre;
                lblMasterType.InnerText = usuario.rol;
                string baseDiv = "<li ><a><i class=\"fa fa-{0}\"></i>{1}<span class=\"fa fa-chevron-down\"></span></a>" +
                                    "<ul class=\"nav child_menu\">";
                string baseList =  "<li><a href = \"{0}\">{1}</a></li>";
                string endDiv =  "</ul>" +
                              "</li>";
                dbProcedimientos.ROL_LISTAR_ITEMSDataTable objItems = DOMModel.ROL_LISTAR_ITEMS(usuario.idrol);
                lsMenu.InnerHtml += String.Format("<li ><a href=\"default.aspx\"><i class=\"fa fa-{0}\"></i>{1}<span class=\"fa fa-chevron-down\"></span></a><ul class=\"nav child_menu\">", "home", "INICIO");
                lsMenu.InnerHtml += endDiv;
                string antCategoria = "";
                bool isInicio = true;
                bool hasEntered = false;
                string path = Request.Url.LocalPath;
                if (objItems != null && objItems.Rows.Count > 0)
                {
                    foreach (dbProcedimientos.ROL_LISTAR_ITEMSRow item in objItems.Rows)
                    {
                        if (item.MARK == 1)
                        {
                            if (item.CATEGORIA_NOMBRE_MOSTRAR != antCategoria)
                            {
                                if (!isInicio) { lsMenu.InnerHtml += endDiv; }
                                lsMenu.InnerHtml += String.Format(baseDiv, item.CATEGORIA_ICON, item.CATEGORIA_NOMBRE_MOSTRAR);
                                lsMenu.InnerHtml += String.Format(baseList, item.FORMULARIO_LINK, item.FORMULARIO_NOMBRE_MOSTRAR);
                                antCategoria = item.CATEGORIA_NOMBRE_MOSTRAR;
                                isInicio = false;
                                if (path.Contains(item.FORMULARIO_LINK))
                                    hasEntered = true;
                            }
                            else
                            {
                                lsMenu.InnerHtml += String.Format(baseList, item.FORMULARIO_LINK, item.FORMULARIO_NOMBRE_MOSTRAR);
                                if (path.Contains(item.FORMULARIO_LINK))
                                    hasEntered = true;
                            }
                        }
                    }
                    lsMenu.InnerHtml += endDiv;
                    
                }
                if (path.Contains("default.aspx") || path.Contains("cambiar_contrasena.aspx") || path.Contains("perfil_modificar.aspx"))
                    hasEntered = true;
                if (!hasEntered)
                    Response.Redirect("~/default.aspx");

            }
}
    }
}