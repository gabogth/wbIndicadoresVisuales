using Modelo;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace wbIndicadoresVisuales.Views
{
    public partial class aerolineas_mantenimiento : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public static string buscar(string QUERY, int INDEX, int CANTIDAD, int? ESTADO)
        {
            clsResult objResultado = new clsResult();
            try
            {
                int? cantidad_registros = 0;
                dbProcedimientos.AEROLINEA_BUSCARDataTable dataTable = DOMModel.AEROLINEA_BUSCAR(QUERY, INDEX, CANTIDAD, ref cantidad_registros, ESTADO);
                if (dataTable != null)
                {
                    objResultado.result = "success";
                    objResultado.message = "ok_server";
                    objResultado.registros = cantidad_registros;
                    objResultado.body = dataTable;
                }
                else
                {
                    objResultado.result = "error";
                    objResultado.message = "No hay ninguna coincidencia.";
                    objResultado.registros = 0;
                    objResultado.body = null;
                }
            }
            catch (Exception ex)
            {
                objResultado.result = "error";
                objResultado.message = ex.Message;
                objResultado.registros = 0;
                objResultado.body = null;
            }
            return JsonConvert.SerializeObject(objResultado);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public static string insertar(string txtAerolinea, string txtAbrev, string logo_aerolinea)
        {
            System.Drawing.Bitmap bmp = null;
            string dateTimeString = "(" + DateTime.Now.ToString().Replace("/", "").Replace(":", "").Replace(".", "").Replace(" ", "") + ")-";
            clsResult objResultado = new clsResult();
            try
            {
                bmp = clsUtil.converDataImage(logo_aerolinea);
                System.Drawing.Bitmap bmpMin = clsUtil.ResizeImage(bmp, 48, 32);
                System.Drawing.Bitmap bmpMed = clsUtil.ResizeImage(bmp, 640, 480);
                System.Drawing.Bitmap bmpMax = clsUtil.ResizeImage(bmp, 1280, 720);
                string ICON_MIN = dateTimeString + "gbl_archivetemplatex48.png",
                    ICON_MED = dateTimeString + "gbl_archivetemplatex96.png",
                    ICON_MAX = dateTimeString + "gbl_archivetemplatex128.png";
                bmpMin.Save(HttpContext.Current.Server.MapPath("~/uploads/aerolineas/" + ICON_MIN));
                bmpMed.Save(HttpContext.Current.Server.MapPath("~/uploads/aerolineas/" + ICON_MED));
                bmpMax.Save(HttpContext.Current.Server.MapPath("~/uploads/aerolineas/" + ICON_MAX));
                bool op = DOMModel.AEROLINEA_INSERTAR(txtAerolinea, ICON_MIN, ICON_MED, ICON_MAX, txtAbrev);
                if (op != false)
                {
                    objResultado.result = "success";
                    objResultado.message = "ok_server";
                    objResultado.registros = 1;
                    objResultado.body = op;
                }
                else
                {
                    objResultado.result = "error";
                    objResultado.message = "No se pudo insertar correctamente.";
                    objResultado.registros = 0;
                    objResultado.body = null;
                }
            }
            catch (Exception ex)
            {
                objResultado.result = "error";
                objResultado.message = ex.Message;
                objResultado.registros = 0;
                objResultado.body = null;
            }
            return JsonConvert.SerializeObject(objResultado);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public static string modificar(int ID, string txtAerolinea, string txtAbrev, string logo_aerolinea)
        {
            clsResult objResultado = new clsResult();
            System.Drawing.Bitmap bmp = null;
            string dateTimeString = "(" + DateTime.Now.ToString().Replace("/", "").Replace(":", "").Replace(".", "").Replace(" ", "") + ")-";
            try
            {
                bmp = clsUtil.converDataImage(logo_aerolinea);
                System.Drawing.Bitmap bmpMin = clsUtil.ResizeImage(bmp, 48, 32);
                System.Drawing.Bitmap bmpMed = clsUtil.ResizeImage(bmp, 640, 480);
                System.Drawing.Bitmap bmpMax = clsUtil.ResizeImage(bmp, 1280, 720);
                string ICON_MIN = dateTimeString + "gbl_archivetemplatex48.png",
                    ICON_MED = dateTimeString + "gbl_archivetemplatex96.png",
                    ICON_MAX = dateTimeString + "gbl_archivetemplatex128.png";
                bmpMin.Save(HttpContext.Current.Server.MapPath("~/uploads/aerolineas/" + ICON_MIN));
                bmpMed.Save(HttpContext.Current.Server.MapPath("~/uploads/aerolineas/" + ICON_MED));
                bmpMax.Save(HttpContext.Current.Server.MapPath("~/uploads/aerolineas/" + ICON_MAX));
                bool op = DOMModel.AEROLINEA_MODIFICAR(ID, txtAerolinea, ICON_MIN, ICON_MED, ICON_MAX, txtAbrev);
                if (op != false)
                {
                    objResultado.result = "success";
                    objResultado.message = "ok_server";
                    objResultado.registros = 1;
                    objResultado.body = op;
                }
                else
                {
                    objResultado.result = "error";
                    objResultado.message = "No se pudo modificar correctamente.";
                    objResultado.registros = 0;
                    objResultado.body = null;
                }
            }
            catch (Exception ex)
            {
                objResultado.result = "error";
                objResultado.message = ex.Message;
                objResultado.registros = 0;
                objResultado.body = null;
            }
            return JsonConvert.SerializeObject(objResultado);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public static string modificar_estado(int ID, int ESTADO)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.AEROLINEA_MODIFICAR_ESTADO(ID, ESTADO);
                if (op != false)
                {
                    objResultado.result = "success";
                    objResultado.message = "ok_server";
                    objResultado.registros = 1;
                    objResultado.body = op;
                }
                else
                {
                    objResultado.result = "error";
                    objResultado.message = "No se pudo modificar correctamente.";
                    objResultado.registros = 0;
                    objResultado.body = null;
                }
            }
            catch (Exception ex)
            {
                objResultado.result = "error";
                objResultado.message = ex.Message;
                objResultado.registros = 0;
                objResultado.body = null;
            }
            return JsonConvert.SerializeObject(objResultado);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public static string eliminar(int ID)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.AEROLINEA_ELIMINAR(ID);
                if (op != false)
                {
                    objResultado.result = "success";
                    objResultado.message = "ok_server";
                    objResultado.registros = 1;
                    objResultado.body = op;
                }
                else
                {
                    objResultado.result = "error";
                    objResultado.message = "No se pudo eliminar correctamente.";
                    objResultado.registros = 0;
                    objResultado.body = null;
                }
            }
            catch (Exception ex)
            {
                objResultado.result = "error";
                objResultado.message = ex.Message;
                objResultado.registros = 0;
                objResultado.body = null;
            }
            return JsonConvert.SerializeObject(objResultado);
        }
    }
}