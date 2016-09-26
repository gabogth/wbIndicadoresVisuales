using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Modelo;
using Modelo.Wheater;
using System.IO;
using System.Drawing;
using System.Net;

namespace wbIndicadoresVisuales.Hubs
{
    public class HubFID : Hub
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

        public clsResult BuscarConfiguraciones()
        {
            clsResult objResultado = new clsResult();
            try
            {
                int? cantidad_registros = 0;
                dbProcedimientos.CONFIGURACIONES_BUSCARDataTable dataTable = DOMModel.CONFIGURACIONES_BUSCAR();
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
            return objResultado;
        }
        public clsResult InsertarConfiguraciones(string txtURLWeather, string txtMensajeSalidas, string txtMensajeLlegadas)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.CONFIGURACIONES_INSERTAR(txtURLWeather, txtMensajeSalidas, txtMensajeLlegadas);
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
            Clients.All.buscarConfiguraciones();
            return objResultado;
        }
        public clsResult ModificarConfiguraciones(int ID, string txtURLWeather, string txtMensajeSalidas, string txtMensajeLlegadas)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.CONFIGURACIONES_MODIFICAR(ID, txtURLWeather, txtMensajeSalidas, txtMensajeLlegadas);
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
            Clients.All.buscarConfiguraciones();
            return objResultado;
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

        public clsResult BuscarMensajesFID()
        {
            clsResult objResultado = new clsResult();
            try
            {
                dbProcedimientos.AVISOSFID_BUSCARDataTable dataTable = DOMModel.AVISOSFID_BUSCAR();
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

        public void SincronizarTodosLosRelojes() {
            Clients.All.sincronizarReloj(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);
        }

        public int[] GetTime()
        {
            return new int[3] { DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second };
        }

        public clsResult InsertarMensajesFID(int IDVUELO, int? IDDESTINO, int? HORA, int? MINUTO, int? IDPUERTA, int? IDESTADO, int ENABLE, int SALIDA_LLEGADA, int? IDFAJA, int? HORA_PROGRAMADO, int? MINUTO_PROGRAMADO)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.AVISOSFID_INSERTAR(IDVUELO,
                    IDDESTINO == -1 ? null : IDDESTINO,
                    HORA == -1 ? null : HORA,
                    MINUTO == -1 ? null : MINUTO,
                    IDPUERTA == -1 ? null : IDPUERTA,
                    IDESTADO == -1 ? null : IDESTADO,
                    ENABLE,
                    SALIDA_LLEGADA,
                    IDFAJA == -1 ? null : IDFAJA,
                    HORA_PROGRAMADO == -1 ? null : HORA_PROGRAMADO,
                    MINUTO_PROGRAMADO == -1 ? null : MINUTO_PROGRAMADO);
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
            Clients.All.getBuscar();
            Clients.All.getPuertaEmbarque();
            return objResultado;
        }


        public clsResult ModificarMensajesFID(int IDAVISOSFID, int IDVUELO, int? IDDESTINO, int? HORA, int? MINUTO, int? IDPUERTA, int? IDESTADO, int ENABLE, int? IDFAJA, int? HORA_PROGRAMADO, int? MINUTO_PROGRAMADO)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.AVISOSFID_MODIFICAR(IDAVISOSFID, 
                    IDVUELO, 
                    IDDESTINO == -1 ? null : IDDESTINO, 
                    HORA == -1 ? null : HORA, 
                    MINUTO == -1 ? null : MINUTO, 
                    IDPUERTA == -1 ? null : IDPUERTA, 
                    IDESTADO == -1 ? null : IDESTADO, 
                    ENABLE,
                    IDFAJA == -1 ? null : IDFAJA,
                    HORA_PROGRAMADO == -1 ? null : HORA_PROGRAMADO,
                    MINUTO_PROGRAMADO == -1 ? null : MINUTO_PROGRAMADO);
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
            Clients.All.getBuscar();
            Clients.All.getPuertaEmbarque();
            return objResultado;
        }

        public clsResult ModificarEstadoMensajesFID(int IDAVISOSFID, int ENABLE)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.AVISOSFID_MODIFICAR_ESTADO(IDAVISOSFID, ENABLE);
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
            Clients.All.getBuscar();
            Clients.All.getPuertaEmbarque();
            return objResultado;
        }

        public clsResult EliminarMensajesFID(int IDAVISOSFID)
        {
            clsResult objResultado = new clsResult();
            try
            {
                bool op = DOMModel.AVISOSFID_ELIMINAR(IDAVISOSFID);
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
            Clients.All.getBuscar();
            Clients.All.getPuertaEmbarque();
            return objResultado;
        }

        public clsResult AvisosGID(string IP)
        {
            clsResult objResultado = new clsResult();
            try
            {
                dbProcedimientos.AVISOSGID_BUSCAR_IPDataTable dataTable = DOMModel.AVISOSGID_BUSCAR(IP);
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
            Clients.All.getBuscar();
            return objResultado;
        }

        public clsResult AvisosBID(string IP)
        {
            clsResult objResultado = new clsResult();
            try
            {
                dbProcedimientos.AVISOSBID_BUSCAR_IPDataTable dataTable = DOMModel.AVISOSBID_BUSCAR(IP);
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
            Clients.All.getBuscar();
            return objResultado;
        }
    }
}