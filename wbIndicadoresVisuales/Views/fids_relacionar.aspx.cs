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
    public partial class fids_relacionar : System.Web.UI.Page
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
                dbProcedimientos.FIDS_BUSCARDataTable dataTable = DOMModel.FIDS_BUSCAR(QUERY, INDEX, CANTIDAD, ref cantidad_registros, ESTADO);
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
        public static string insertar(int cbEquipo, int cbIO)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.FIDS_INSERTAR(cbEquipo, cbIO);
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
        public static string modificar(int ID, int cbEquipo, int cbIO)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.FIDS_MODIFICAR(ID, cbEquipo, cbIO);
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
        public static string modificar_estado(int ID, int ESTADO)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.FIDS_MODIFICAR_ESTADO(ID, ESTADO);
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
        public static string eliminar(int ID)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.FIDS_ELIMINAR(ID);
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
    }
}