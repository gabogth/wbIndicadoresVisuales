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
    public partial class rol_mantenimiento : System.Web.UI.Page
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
                dbProcedimientos.ROL_BUSCARDataTable dataTable = DOMModel.ROL_BUSCAR(QUERY, INDEX, CANTIDAD, ref cantidad_registros, ESTADO);
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
        public static string insertar(string txtRol, int[] gbCategoria)
        {
            clsResult objResultado = new clsResult();
            try
            {
                int? ID = DOMModel.ROL_INSERTAR(txtRol);
                if (ID.HasValue)
                {
                    if (ID.Value > 0)
                    {
                        bool op2 = DOMModel.REGISTRO_ROL_INSERTAR(ID.Value, gbCategoria);
                        if (op2)
                        {
                            objResultado.result = "success";
                            objResultado.message = "ok_server";
                            objResultado.registros = 1;
                            objResultado.body = op2;
                        }
                        else
                        {
                            objResultado.result = "error";
                            objResultado.message = "No se pudo insertar correctamente, puede que se hallan insertado algunos registros de manera inconclusa.";
                            objResultado.registros = 0;
                            objResultado.body = null;
                        }
                    }
                    else
                    {
                        objResultado.result = "error";
                        objResultado.message = "No se pudo insertar correctamente.";
                        objResultado.registros = 0;
                        objResultado.body = null;
                    }
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
        public static string modificar(int ID, string txtRol, int[] gbCategoria)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.ROL_MODIFICAR(ID, txtRol);
                if (op)
                {
                    DOMModel.REGISTRO_ROL_ELIMINAR_IDROL(ID);
                    bool op2 = DOMModel.REGISTRO_ROL_INSERTAR(ID, gbCategoria);
                    if (op2)
                    {
                        objResultado.result = "success";
                        objResultado.message = "ok_server";
                        objResultado.registros = 1;
                        objResultado.body = op2;
                    }
                    else
                    {
                        objResultado.result = "error";
                        objResultado.message = "No se pudo modificar correctamente, puede que se hallan insertado algunos registros de manera inconclusa.";
                        objResultado.registros = 0;
                        objResultado.body = null;
                    }
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
                bool op = DOMModel.ROL_MODIFICAR_ESTADO(ID, ESTADO);
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
                bool op = DOMModel.ROL_ELIMINAR(ID);
                if (op != false)
                {
                    DOMModel.REGISTRO_ROL_ELIMINAR_IDROL(ID);
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
        public static string listar_items(int IDROL)
        {
            clsResult objResultado = new clsResult();
            try
            {
                int registros = 0;
                dbProcedimientos.ROL_LISTAR_ITEMSDataTable dtResultado = DOMModel.ROL_LISTAR_ITEMS(IDROL);
                if (dtResultado != null)
                {
                    objResultado.result = "success";
                    objResultado.message = "ok_server";
                    objResultado.registros = registros;
                    objResultado.body = dtResultado;
                }
                else
                {
                    objResultado.result = "error";
                    objResultado.message = "session_expired";
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