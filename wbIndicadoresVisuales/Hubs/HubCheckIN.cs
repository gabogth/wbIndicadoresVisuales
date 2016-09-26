using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Modelo;
using System.Drawing;
using System.IO;
using Modelo.Wheater;
using System.Net;

namespace wbIndicadoresVisuales.Hubs
{
    public class HubCheckIN : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        public void ActualizarPagina()
        {
            Clients.All.actualizarPagina();
        }

        public void Reset_web()
        {
            Clients.All.reset_web();
        }

        public clsResult GetWheather(string location)
        {
            clsResult objResultado = new clsResult();
            try
            {
                dbProcedimientos.TEMPERATURA_BUSCAR_FECHARow temp = DOMModel.TEMPERATURA_BUSCAR_FECHA(DateTime.Now);
                if (temp == null)
                {
                    dsTablas.tbl_configuracionesRow config = DOMModel.getConfiguraciones();
                    clsApiClima objApiClima = new clsApiClima(String.Format(config.url_wheater, location));
                    RootObject objClima = objApiClima.getClima();
                    if (objApiClima.success && objClima != null)
                    {
                        DOMModel.TEMPERATURA_INSERTAR(objClima.main.temp, objClima.weather[0].icon, DateTime.Now);
                        temp = DOMModel.TEMPERATURA_BUSCAR_FECHA(DateTime.Now);
                        temp.icono = temp.icono.Remove(2);
                        objResultado.result = "success";
                        objResultado.message = "ok_server";
                        objResultado.registros = 1;
                        objResultado.body = temp;
                    }
                    else
                    {
                        objResultado.result = "error";
                        objResultado.message = "No hay ninguna coincidencia.";
                        objResultado.registros = 0;
                        objResultado.body = null;
                    }

                }
                else
                {
                    temp.icono = temp.icono.Remove(2);
                    objResultado.result = "success";
                    objResultado.message = "ok_server";
                    objResultado.registros = 1;
                    objResultado.body = temp;
                }

            }
            catch (Exception ex)
            {
                objResultado.result = "error";
                objResultado.message = ex.Message;
                objResultado.registros = 0;
                objResultado.body = null;
            }
            return objResultado;
        }

        public clsResult BuscarMensajesCheck()
        {
            clsResult objResultado = new clsResult();
            try
            {
                dbProcedimientos.AVISOS_COUNTER_BUSCARDataTable dataTable = DOMModel.AVISOS_COUNTER_BUSCAR();
                if (dataTable != null)
                {
                    objResultado.result = "success";
                    objResultado.message = "ok_server";
                    objResultado.registros = dataTable.Rows.Count;
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
            return objResultado;
        }

        public clsResult AvisosCID(string IP)
        {
            clsResult objResultado = new clsResult();
            try
            {
                dbProcedimientos.AVISOS_COUNTER_BUSCAR_IPDataTable dataTable = DOMModel.AVISOS_COUNTER_BUSCAR(IP);
                if (dataTable != null)
                {
                    objResultado.result = "success";
                    objResultado.message = "ok_server";
                    objResultado.registros = dataTable.Rows.Count;
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
            return objResultado;
        }

        public void SincronizarTodosLosRelojes()
        {
            Clients.All.sincronizarReloj(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);
        }

        public int[] GetTime()
        {
            return new int[3] { DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second };
        }

        public clsResult InsertarMensajesCheck(int? IDAEROLINEA, int?IDCOUNTER, string MENSAJE)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.AVISOS_COUNTER_INSERTAR(IDAEROLINEA, IDCOUNTER, MENSAJE);
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
            Clients.All.getBuscarCheck();
            return objResultado;
        }


        public clsResult ModificarMensajesCheck(int IDAVISOS_COUNTER, int? IDAEROLINEA, int? IDCOUNTER, string MENSAJE)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.AVISOS_COUNTER_MODIFICAR(IDAVISOS_COUNTER, IDAEROLINEA, IDCOUNTER, MENSAJE);
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
            Clients.All.getBuscarCheck();
            return objResultado;
        }

        public clsResult EliminarMensajesCheck(int IDAVISOS_COUNTER)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.AVISOS_COUNTER_ELIMINAR(IDAVISOS_COUNTER);
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
            Clients.All.getBuscarCheck();
            return objResultado;
        }
    }
}