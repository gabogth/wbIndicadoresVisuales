using Renci.SshNet;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Modelo
{
    public class DOMModel
    {
        #region Usuario
        public static dbProcedimientos.USUARIO_LOGINRow Login(string USUARIO, string PW)
        {
            dbProcedimientos.USUARIO_LOGINDataTable tableDT = new dbProcedimientos.USUARIO_LOGINDataTable();
            dbProcedimientosTableAdapters.USUARIO_LOGINTableAdapter adapterTA = new dbProcedimientosTableAdapters.USUARIO_LOGINTableAdapter();
            tableDT = adapterTA.GetData(USUARIO, PW);
            if (tableDT != null && tableDT.Rows.Count > 0)
                return (dbProcedimientos.USUARIO_LOGINRow)tableDT.Rows[0];
            else
                return null;
        }
        public static dbProcedimientos.USUARIO_BUSCARDataTable USUARIO_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.USUARIO_BUSCARDataTable tableDT = new dbProcedimientos.USUARIO_BUSCARDataTable();
            dbProcedimientosTableAdapters.USUARIO_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.USUARIO_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT != null && tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static dbProcedimientos.USUARIO_BUSCAR_IDRow USUARIO_BUSCAR_ID(int IDUSUARIO)
        {
            dbProcedimientos.USUARIO_BUSCAR_IDDataTable tableDT = new dbProcedimientos.USUARIO_BUSCAR_IDDataTable();
            dbProcedimientosTableAdapters.USUARIO_BUSCAR_IDTableAdapter adapterTA = new dbProcedimientosTableAdapters.USUARIO_BUSCAR_IDTableAdapter();
            tableDT = adapterTA.GetData(IDUSUARIO);
            if (tableDT != null && tableDT.Rows.Count > 0)
                return (dbProcedimientos.USUARIO_BUSCAR_IDRow)tableDT[0];
            else
                return null;
        }
        public static bool USUARIO_INSERTAR(string USUARIO, string PW, string NOMBRE, string APELLIDO, string TELEFONO, int IDROL)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.USUARIO_INSERTAR(USUARIO, PW, NOMBRE, APELLIDO, TELEFONO, IDROL);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool USUARIO_MODIFICAR(string USUARIO, string NOMBRE, string APELLIDO, string TELEFONO, int IDROL, int IDUSUARIO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.USUARIO_MODIFICAR(IDUSUARIO, USUARIO, NOMBRE, APELLIDO, TELEFONO, IDROL);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool USUARIO_MODIFICAR_ESTADO(int IDUSUARIO, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.USUARIO_MODIFICAR_ESTADO(IDUSUARIO, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool USUARIO_ELIMINAR(int IDUSUARIO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.USUARIO_ELIMINAR(IDUSUARIO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool USUARIO_RESET_PASSWORD(int IDUSUARIO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.USUARIO_RESET_PASSWORD(IDUSUARIO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool USUARIO_ENFORCE_CHANGE(int IDUSUARIO, string OLD_PW, string NEW_PW)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.USUARIO_ENFORCE_CHANGE(IDUSUARIO, OLD_PW, NEW_PW);
            if (op == 1)
                return true;
            else
                return false;
        }
        #endregion
        #region Categoria
        public static dbProcedimientos.CATEGORIA_BUSCARDataTable CATEGORIA_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.CATEGORIA_BUSCARDataTable tableDT = new dbProcedimientos.CATEGORIA_BUSCARDataTable();
            dbProcedimientosTableAdapters.CATEGORIA_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.CATEGORIA_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool CATEGORIA_INSERTAR(string ICON, string NOMBRE_MOSTRAR)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CATEGORIA_INSERTAR(ICON, NOMBRE_MOSTRAR);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool CATEGORIA_MODIFICAR(int IDCATEGORIA, string ICON, string NOMBRE_MOSTRAR)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CATEGORIA_MODIFICAR(IDCATEGORIA, ICON, NOMBRE_MOSTRAR);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool CATEGORIA_MODIFICAR_ESTADO(int IDCATEGORIA, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CATEGORIA_MODIFICAR_ESTADO(IDCATEGORIA, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool CATEGORIA_ELIMINAR(int IDCATEGORIA)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CATEGORIA_ELIMINAR(IDCATEGORIA);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Formulario
        public static dbProcedimientos.FORMULARIO_BUSCARDataTable FORMULARIO_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.FORMULARIO_BUSCARDataTable tableDT = new dbProcedimientos.FORMULARIO_BUSCARDataTable();
            dbProcedimientosTableAdapters.FORMULARIO_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.FORMULARIO_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool FORMULARIO_INSERTAR(string LINK, string NOMBRE_MOSTRAR, string DESCRIPCION, int IDCATEGORIA)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FORMULARIO_INSERTAR(LINK, NOMBRE_MOSTRAR, DESCRIPCION, IDCATEGORIA);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool FORMULARIO_MODIFICAR(int IDFORMULARIO, string LINK, string NOMBRE_MOSTRAR, string DESCRIPCION, int IDCATEGORIA)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FORMULARIO_MODIFICAR(IDFORMULARIO, LINK, NOMBRE_MOSTRAR, DESCRIPCION, IDCATEGORIA);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool FORMULARIO_MODIFICAR_ESTADO(int IDFORMULARIO, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FORMULARIO_MODIFICAR_ESTADO(IDFORMULARIO, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool FORMULARIO_ELIMINAR(int IDFORMULARIO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FORMULARIO_ELIMINAR(IDFORMULARIO);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Rol
        public static dbProcedimientos.ROL_BUSCARDataTable ROL_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.ROL_BUSCARDataTable tableDT = new dbProcedimientos.ROL_BUSCARDataTable();
            dbProcedimientosTableAdapters.ROL_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.ROL_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static dbProcedimientos.ROL_LISTAR_ITEMSDataTable ROL_LISTAR_ITEMS(int IDROL)
        {
            dbProcedimientos.ROL_LISTAR_ITEMSDataTable tableDT = new dbProcedimientos.ROL_LISTAR_ITEMSDataTable();
            dbProcedimientosTableAdapters.ROL_LISTAR_ITEMSTableAdapter adapterTA = new dbProcedimientosTableAdapters.ROL_LISTAR_ITEMSTableAdapter();
            tableDT = adapterTA.GetData(IDROL);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }

        public static int? ROL_INSERTAR(string ROL)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int? idrol = null;
            int op = adapterTA.ROL_INSERTAR(ROL, ref idrol);
            if (op != 0)
                return idrol;
            else
                return idrol;
        }
        public static bool ROL_MODIFICAR(int IDROL, string ROL)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.ROL_MODIFICAR(IDROL, ROL);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool ROL_MODIFICAR_ESTADO(int IDROL, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.ROL_MODIFICAR_ESTADO(IDROL, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool ROL_ELIMINAR(int IDROL)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.ROL_ELIMINAR(IDROL);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Registro Rol
        public static bool REGISTRO_ROL_ELIMINAR(int IDREGISTRO_ROL)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.REGISTRO_ROL_ELIMINAR(IDREGISTRO_ROL);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool REGISTRO_ROL_ELIMINAR_IDROL(int IDROL)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.REGISTRO_ROL_ELIMINAR_IDROL(IDROL);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool REGISTRO_ROL_INSERTAR(int IDROL, int[] IDFORMULARIOS)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            bool FOCO = true;
            foreach (int IDFORMULARIO in IDFORMULARIOS)
            {
                int op = adapterTA.REGISTRO_ROL_INSERTAR(IDFORMULARIO, IDROL);
                if (Math.Abs(op) == 0)
                {
                    FOCO = false;
                    break;
                }
            }
            return FOCO;
        }
        #endregion
        #region Aerolinea
        public static dbProcedimientos.AEROLINEA_BUSCARDataTable AEROLINEA_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.AEROLINEA_BUSCARDataTable tableDT = new dbProcedimientos.AEROLINEA_BUSCARDataTable();
            dbProcedimientosTableAdapters.AEROLINEA_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.AEROLINEA_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool AEROLINEA_INSERTAR(string AEROLINEA, string ICON_MIN, string ICON_MED, string ICON_MAX, string ABREV)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AEROLINEA_INSERTAR(AEROLINEA, ICON_MIN, ICON_MED, ICON_MAX, ABREV);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool AEROLINEA_MODIFICAR(int IDAEROLINEA, string AEROLINEA, string ICON_MIN, string ICON_MED, string ICON_MAX, string ABREV)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AEROLINEA_MODIFICAR(IDAEROLINEA, AEROLINEA, ICON_MIN, ICON_MED, ICON_MAX, ABREV);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool AEROLINEA_MODIFICAR_ESTADO(int IDAEROLINEA, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AEROLINEA_MODIFICAR_ESTADO(IDAEROLINEA, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool AEROLINEA_ELIMINAR(int IDAEROLINEA)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AEROLINEA_ELIMINAR(IDAEROLINEA);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Vuelos
        public static dbProcedimientos.VUELOS_BUSCARDataTable VUELOS_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.VUELOS_BUSCARDataTable tableDT = new dbProcedimientos.VUELOS_BUSCARDataTable();
            dbProcedimientosTableAdapters.VUELOS_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.VUELOS_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool VUELOS_INSERTAR(int IDAEROLINEA, string N_VUELO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.VUELOS_INSERTAR(IDAEROLINEA, N_VUELO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool VUELOS_MODIFICAR(int IDVUELOS, int IDAEROLINEA, string N_VUELO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.VUELOS_MODIFICAR(IDVUELOS, IDAEROLINEA, N_VUELO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool VUELOS_MODIFICAR_ESTADO(int IDVUELOS, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.VUELOS_MODIFICAR_ESTADO(IDVUELOS, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool VUELOS_ELIMINAR(int IDVUELOS)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.VUELOS_ELIMINAR(IDVUELOS);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Pais
        public static dbProcedimientos.PAIS_BUSCARDataTable PAIS_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.PAIS_BUSCARDataTable tableDT = new dbProcedimientos.PAIS_BUSCARDataTable();
            dbProcedimientosTableAdapters.PAIS_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.PAIS_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool PAIS_INSERTAR(string PAIS, string ABREV)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.PAIS_INSERTAR(PAIS, ABREV);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool PAIS_MODIFICAR(int IDPAIS, string PAIS, string ABREV)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.PAIS_MODIFICAR(IDPAIS, PAIS, ABREV);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool PAIS_MODIFICAR_ESTADO(int IDPAIS, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.PAIS_MODIFICAR_ESTADO(IDPAIS, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool PAIS_ELIMINAR(int IDPAIS)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.PAIS_ELIMINAR(IDPAIS);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Ciudades
        public static dbProcedimientos.CIUDADES_BUSCARDataTable CIUDADES_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.CIUDADES_BUSCARDataTable tableDT = new dbProcedimientos.CIUDADES_BUSCARDataTable();
            dbProcedimientosTableAdapters.CIUDADES_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.CIUDADES_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool CIUDADES_INSERTAR(string CIUDAD, int IDPAIS)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CIUDADES_INSERTAR(CIUDAD, IDPAIS);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool CIUDADES_MODIFICAR(int IDCIUDAD, string CIUDAD, int IDPAIS)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CIUDADES_MODIFICAR(IDCIUDAD, CIUDAD, IDPAIS);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool CIUDADES_MODIFICAR_ESTADO(int IDCIUDAD, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CIUDADES_MODIFICAR_ESTADO(IDCIUDAD, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool CIUDADES_ELIMINAR(int IDCIUDAD)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CIUDADES_ELIMINAR(IDCIUDAD);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Estado
        public static dbProcedimientos.ESTADO_BUSCARDataTable ESTADO_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.ESTADO_BUSCARDataTable tableDT = new dbProcedimientos.ESTADO_BUSCARDataTable();
            dbProcedimientosTableAdapters.ESTADO_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.ESTADO_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool ESTADO_INSERTAR(string ESTADO_ES, string ESTADO_EN, string COLOR)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.ESTADO_INSERTAR(ESTADO_ES, ESTADO_EN, COLOR);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool ESTADO_MODIFICAR(int IDESTADO, string ESTADO_ES, string ESTADO_EN, string COLOR)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.ESTADO_MODIFICAR(IDESTADO, ESTADO_ES, ESTADO_EN, COLOR);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool ESTADO_MODIFICAR_ESTADO(int IDESTADO, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.ESTADO_MODIFICAR_ESTADO(IDESTADO, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool ESTADO_ELIMINAR(int IDESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.ESTADO_ELIMINAR(IDESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region AvisosFID
        public static dbProcedimientos.AVISOSFID_BUSCARDataTable AVISOSFID_BUSCAR()
        {
            dbProcedimientos.AVISOSFID_BUSCARDataTable tableDT = new dbProcedimientos.AVISOSFID_BUSCARDataTable();
            dbProcedimientosTableAdapters.AVISOSFID_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.AVISOSFID_BUSCARTableAdapter();
            tableDT = adapterTA.GetData();
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool AVISOSFID_INSERTAR(int IDVUELO, int? IDDESTINO, int? HORA, int? MINUTO, int? IDPUERTA, int? IDESTADO, int ENABLE, int SALIDA_LLEGADA, int? IDFAJA, int? HORA_PROGRAMADO, int? MINUTO_PROGRAMADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AVISOSFID_INSERTAR(IDVUELO, IDDESTINO, HORA, HORA_PROGRAMADO, MINUTO, MINUTO_PROGRAMADO, IDPUERTA, IDESTADO, ENABLE, SALIDA_LLEGADA, IDFAJA);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool AVISOSFID_MODIFICAR(int IDAVISOSFID, int IDVUELO, int? IDDESTINO, int? HORA, int? MINUTO, int? IDPUERTA, int? IDESTADO, int ENABLE, int? IDFAJA, int? HORA_PROGRAMADO, int? MINUTO_PROGRAMADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AVISOSFID_MODIFICAR(IDAVISOSFID, IDVUELO, IDDESTINO, HORA, HORA_PROGRAMADO, MINUTO, MINUTO_PROGRAMADO, IDPUERTA, IDESTADO, ENABLE, IDFAJA);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool AVISOSFID_MODIFICAR_ESTADO(int IDAVISOSFID, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AVISOSFID_MODIFICAR_ESTADO(IDAVISOSFID, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool AVISOSFID_ELIMINAR(int IDAVISOSFID)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AVISOSFID_ELIMINAR(IDAVISOSFID);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Equipos
        public static dbProcedimientos.EQUIPOS_BUSCARDataTable EQUIPOS_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.EQUIPOS_BUSCARDataTable tableDT = new dbProcedimientos.EQUIPOS_BUSCARDataTable();
            dbProcedimientosTableAdapters.EQUIPOS_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.EQUIPOS_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool EQUIPOS_INSERTAR(string IP, string DESCRIPCION, string NOMBRE, string USUARIO, string PW)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.EQUIPOS_INSERTAR(IP, DESCRIPCION, NOMBRE, USUARIO, PW);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool EQUIPOS_MODIFICAR(int IDEQUIPO, string IP, string DESCRIPCION, string NOMBRE, string USUARIO, string PW)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.EQUIPOS_MODIFICAR(IDEQUIPO, IP, DESCRIPCION, NOMBRE, USUARIO, PW);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool EQUIPOS_MODIFICAR_ESTADO(int IDEQUIPO, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.EQUIPOS_MODIFICAR_ESTADO(IDEQUIPO, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool EQUIPOS_ELIMINAR(int IDEQUIPO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.EQUIPOS_ELIMINAR(IDEQUIPO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool EQUIPOS_REINICIAR(string IPEQUIPO, string USUARIO, string PW)
        {
            return reiniciar(IPEQUIPO, USUARIO, PW);
        }

        public static bool EQUIPOS_REINICIAR_FIREFOX(string IPEQUIPO, string USUARIO, string PW, string URL_RESTART)
        {
            return reiniciar_firefox(IPEQUIPO, USUARIO, PW, URL_RESTART);
        }

        public static clsDocumentacion EQUIPOS_GET_DOC(string IPEQUIPO, string USUARIO, string PW)
        {
            clsDocumentacion objDocumentacion = new clsDocumentacion();
            objDocumentacion.temperatura = executeCommand(IPEQUIPO, USUARIO, PW, "/opt/vc/bin/vcgencmd measure_temp").Replace("'", "°").Replace("\n", "").Split('=')[1];
            objDocumentacion.kernel = executeCommand(IPEQUIPO, USUARIO, PW, "uname -a").Replace("\t", "");
            string dist_inform = executeCommand(IPEQUIPO, USUARIO, PW, "lsb_release -a").Replace("\t", "");
            objDocumentacion.distributor_ID = dist_inform.Split('\n')[0].Split(':')[1];
            objDocumentacion.description = dist_inform.Split('\n')[1].Split(':')[1];
            objDocumentacion.release = dist_inform.Split('\n')[2].Split(':')[1];
            objDocumentacion.codename = dist_inform.Split('\n')[3].Split(':')[1];
            return objDocumentacion;
        }

        static bool reiniciar(string IP, string USUARIO, string PASSWORD)
        {
            string Server = IP;
            string Username = USUARIO;
            string Password = PASSWORD;
            SshClient client = null;
            ShellStream shellStream = null;
            client = new SshClient(Server, Username, Password);
            client.Connect();
            string reply = string.Empty;
            shellStream = client.CreateShellStream("dumb", 80, 24, 800, 600, 1024);
            reply = shellStream.Expect(new Regex(@":.*>#"), new TimeSpan(0, 0, 3));
            ShellRunner("sudo reboot", shellStream);
            ShellRunner(Password, shellStream);
            return true;
        }

        static bool reiniciar_firefox(string IP, string USUARIO, string PASSWORD, string URL_RESTART)
        {
            string Server = IP;
            string Username = USUARIO;
            string Password = PASSWORD;
            SshClient client = null;
            ShellStream shellStream = null;
            client = new SshClient(Server, Username, Password);
            client.Connect();
            string reply = string.Empty;
            shellStream = client.CreateShellStream("dumb", 80, 24, 800, 600, 1024);
            reply = shellStream.Expect(new Regex(@":.*>#"), new TimeSpan(0, 0, 3));
            ShellRunner("killall firefox", shellStream);
            ShellRunner("nohup firefox --display :0 -no-remote " + URL_RESTART, shellStream);
            return true;
        }

        static void ShellRunner(string command, ShellStream shellStream)
        {
            var reader = new StreamReader(shellStream);
            shellStream.WriteLine(command);
            string result = shellStream.ReadLine(new TimeSpan(0, 0, 3));
        }

        public static string executeCommand(string IP, string USUARIO, string PASSWORD, string COMMAND)
        {
            SshClient client = new SshClient(IP, USUARIO, PASSWORD);
            try
            {
                client.Connect();
                var terminal = client.RunCommand(COMMAND);
                return terminal.Result;
            }
            finally
            {
                client.Disconnect();
                client.Dispose();
            }
        }
        #endregion
        #region Relacion Fids
        public static dbProcedimientos.FIDS_BUSCARDataTable FIDS_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.FIDS_BUSCARDataTable tableDT = new dbProcedimientos.FIDS_BUSCARDataTable();
            dbProcedimientosTableAdapters.FIDS_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.FIDS_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool FIDS_INSERTAR(int IDEQUIPO, int SALIDA_LLEGADA)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FIDS_INSERTAR(IDEQUIPO, SALIDA_LLEGADA);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool FIDS_MODIFICAR(int IDFID, int IDEQUIPO, int SALIDA_LLEGADA)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FIDS_MODIFICAR(IDFID, IDEQUIPO, SALIDA_LLEGADA);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool FIDS_MODIFICAR_ESTADO(int IDFID, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FIDS_MODIFICAR_ESTADO(IDFID, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool FIDS_ELIMINAR(int IDFID)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FIDS_ELIMINAR(IDFID);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Puerta
        public static dbProcedimientos.PUERTA_BUSCARDataTable PUERTA_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.PUERTA_BUSCARDataTable tableDT = new dbProcedimientos.PUERTA_BUSCARDataTable();
            dbProcedimientosTableAdapters.PUERTA_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.PUERTA_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static dbProcedimientos.PUERTA_BUSCAR_IPDataTable PUERTA_BUSCAR_IP(string IP)
        {
            dbProcedimientos.PUERTA_BUSCAR_IPDataTable tableDT = new dbProcedimientos.PUERTA_BUSCAR_IPDataTable();
            dbProcedimientosTableAdapters.PUERTA_BUSCAR_IPTableAdapter adapterTA = new dbProcedimientosTableAdapters.PUERTA_BUSCAR_IPTableAdapter();
            tableDT = adapterTA.GetData(IP);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool PUERTA_INSERTAR(string PUERTA, string DECRIPCION, int? IDEQUIPO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.PUERTA_INSERTAR(PUERTA, DECRIPCION, IDEQUIPO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool PUERTA_MODIFICAR(int IDPUERTA, string PUERTA, string DECRIPCION, int? IDEQUIPO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.PUERTA_MODIFICAR(IDPUERTA, PUERTA, DECRIPCION, IDEQUIPO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool PUERTA_MODIFICAR_ESTADO(int IDPUERTA, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.PUERTA_MODIFICAR_ESTADO(IDPUERTA, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool PUERTA_ELIMINAR(int IDPUERTA)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.PUERTA_ELIMINAR(IDPUERTA);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Counter
        public static dbProcedimientos.COUNTER_BUSCARDataTable COUNTER_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.COUNTER_BUSCARDataTable tableDT = new dbProcedimientos.COUNTER_BUSCARDataTable();
            dbProcedimientosTableAdapters.COUNTER_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.COUNTER_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool COUNTER_INSERTAR(string COUNTER, string DESCRIPCION, int? IDEQUIPO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.COUNTER_INSERTAR(COUNTER, DESCRIPCION, IDEQUIPO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool COUNTER_MODIFICAR(int IDCOUNTER, string COUNTER, string DESCRIPCION, int? IDEQUIPO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.COUNTER_MODIFICAR(IDCOUNTER, COUNTER, DESCRIPCION, IDEQUIPO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool COUNTER_MODIFICAR_ESTADO(int IDCOUNTER, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.COUNTER_MODIFICAR_ESTADO(IDCOUNTER, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool COUNTER_ELIMINAR(int IDCOUNTER)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.COUNTER_ELIMINAR(IDCOUNTER);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region FAJA
        public static dbProcedimientos.FAJA_BUSCARDataTable FAJA_BUSCAR(string QUERY, int INDEX, int CANTIDAD, ref int? REGISTROS, int? ESTADO)
        {
            dbProcedimientos.FAJA_BUSCARDataTable tableDT = new dbProcedimientos.FAJA_BUSCARDataTable();
            dbProcedimientosTableAdapters.FAJA_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.FAJA_BUSCARTableAdapter();
            tableDT = adapterTA.GetData(QUERY, INDEX, CANTIDAD, ref REGISTROS, ESTADO);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }

        public static dbProcedimientos.FAJA_BUSCAR_IPDataTable FAJA_BUSCAR_IP(string IP)
        {
            dbProcedimientos.FAJA_BUSCAR_IPDataTable tableDT = new dbProcedimientos.FAJA_BUSCAR_IPDataTable();
            dbProcedimientosTableAdapters.FAJA_BUSCAR_IPTableAdapter adapterTA = new dbProcedimientosTableAdapters.FAJA_BUSCAR_IPTableAdapter();
            tableDT = adapterTA.GetData(IP);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool FAJA_INSERTAR(string FAJA, string DESCRIPCION, int? IDEQUIPO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FAJA_INSERTAR(FAJA, DESCRIPCION, IDEQUIPO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool FAJA_MODIFICAR(int IDFAJA, string FAJA, string DESCRIPCION, int? IDEQUIPO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FAJA_MODIFICAR(IDFAJA, FAJA, DESCRIPCION, IDEQUIPO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool FAJA_MODIFICAR_ESTADO(int IDFAJA, int ESTADO)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FAJA_MODIFICAR_ESTADO(IDFAJA, ESTADO);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool FAJA_ELIMINAR(int IDFAJA)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.FAJA_ELIMINAR(IDFAJA);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region AvisosGID
        public static dbProcedimientos.AVISOSGID_BUSCAR_IPDataTable AVISOSGID_BUSCAR(string IP)
        {
            dbProcedimientos.AVISOSGID_BUSCAR_IPDataTable tableDT = new dbProcedimientos.AVISOSGID_BUSCAR_IPDataTable();
            dbProcedimientosTableAdapters.AVISOSGID_BUSCAR_IPTableAdapter adapterTA = new dbProcedimientosTableAdapters.AVISOSGID_BUSCAR_IPTableAdapter();
            tableDT = adapterTA.GetData(IP);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        #endregion
        #region AvisosBID
        public static dbProcedimientos.AVISOSBID_BUSCAR_IPDataTable AVISOSBID_BUSCAR(string IP)
        {
            dbProcedimientos.AVISOSBID_BUSCAR_IPDataTable tableDT = new dbProcedimientos.AVISOSBID_BUSCAR_IPDataTable();
            dbProcedimientosTableAdapters.AVISOSBID_BUSCAR_IPTableAdapter adapterTA = new dbProcedimientosTableAdapters.AVISOSBID_BUSCAR_IPTableAdapter();
            tableDT = adapterTA.GetData(IP);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        #endregion
        #region AVISOS COUNTER
        public static dbProcedimientos.AVISOS_COUNTER_BUSCARDataTable AVISOS_COUNTER_BUSCAR()
        {
            dbProcedimientos.AVISOS_COUNTER_BUSCARDataTable tableDT = new dbProcedimientos.AVISOS_COUNTER_BUSCARDataTable();
            dbProcedimientosTableAdapters.AVISOS_COUNTER_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.AVISOS_COUNTER_BUSCARTableAdapter();
            tableDT = adapterTA.GetData();
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static dbProcedimientos.AVISOS_COUNTER_BUSCAR_IPDataTable AVISOS_COUNTER_BUSCAR(string IP)
        {
            dbProcedimientos.AVISOS_COUNTER_BUSCAR_IPDataTable tableDT = new dbProcedimientos.AVISOS_COUNTER_BUSCAR_IPDataTable();
            dbProcedimientosTableAdapters.AVISOS_COUNTER_BUSCAR_IPTableAdapter adapterTA = new dbProcedimientosTableAdapters.AVISOS_COUNTER_BUSCAR_IPTableAdapter();
            tableDT = adapterTA.GetData(IP);
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool AVISOS_COUNTER_INSERTAR(int? IDAEROLINEA, int? IDCOUNTER, string MENSAJE)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AVISOS_COUNTER_INSERTAR(IDAEROLINEA, IDCOUNTER, MENSAJE);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool AVISOS_COUNTER_MODIFICAR(int IDAVISOS_COUNTER, int? IDAEROLINEA, int? IDCOUNTER, string MENSAJE)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AVISOS_COUNTER_MODIFICAR(IDAVISOS_COUNTER, IDAEROLINEA, IDCOUNTER, MENSAJE);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool AVISOS_COUNTER_ELIMINAR(int IDAVISOS_COUNTER)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.AVISOS_COUNTER_ELIMINAR(IDAVISOS_COUNTER);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region HOME_REDIRECT
        public static dbProcedimientos.HOME_REDIRECTRow HOME_REDIRECT(string IP)
        {
            dbProcedimientos.HOME_REDIRECTDataTable tableDT = new dbProcedimientos.HOME_REDIRECTDataTable();
            dbProcedimientosTableAdapters.HOME_REDIRECTTableAdapter adapterTA = new dbProcedimientosTableAdapters.HOME_REDIRECTTableAdapter();
            tableDT = adapterTA.GetData(IP);
            if (tableDT.Rows.Count > 0)
                return tableDT[0];
            else
                return null;
        }

        public static dsTablas.tbl_configuracionesRow getConfiguraciones()
        {
            dsTablas.tbl_configuracionesDataTable tableDT = new dsTablas.tbl_configuracionesDataTable();
            dsTablasTableAdapters.tbl_configuracionesTableAdapter adapterTA = new dsTablasTableAdapters.tbl_configuracionesTableAdapter();
            tableDT = adapterTA.GetData();
            if (tableDT.Rows.Count > 0)
                return tableDT[0];
            else
                return null;
        }
        #endregion
        #region TEMPERATURA
        public static dbProcedimientos.TEMPERATURA_BUSCAR_FECHARow TEMPERATURA_BUSCAR_FECHA(DateTime FECHA)
        {
            dbProcedimientos.TEMPERATURA_BUSCAR_FECHADataTable tableDT = new dbProcedimientos.TEMPERATURA_BUSCAR_FECHADataTable();
            dbProcedimientosTableAdapters.TEMPERATURA_BUSCAR_FECHATableAdapter adapterTA = new dbProcedimientosTableAdapters.TEMPERATURA_BUSCAR_FECHATableAdapter();
            tableDT = adapterTA.GetData(FECHA);
            if (tableDT.Rows.Count > 0)
                return tableDT[0];
            else
                return null;
        }
        public static bool TEMPERATURA_INSERTAR(double TEMPERATURA, string ICONO, DateTime FECHA_GEN)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.TEMPERATURA_INSERTAR(Convert.ToDecimal(TEMPERATURA), ICONO, FECHA_GEN);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool TEMPERATURA_MODIFICAR(int IDTEMPERATURA, double TEMPERATURA, string ICONO, DateTime FECHA_GEN)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.TEMPERATURA_MODIFICAR(IDTEMPERATURA, Convert.ToDecimal(TEMPERATURA), ICONO, FECHA_GEN);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool TEMPERATURA_ELIMINAR(int IDTEMPERATURA)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.TEMPERATURA_ELIMINAR(IDTEMPERATURA);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
        #region Configuraciones
        public static dbProcedimientos.CONFIGURACIONES_BUSCARDataTable CONFIGURACIONES_BUSCAR()
        {
            dbProcedimientos.CONFIGURACIONES_BUSCARDataTable tableDT = new dbProcedimientos.CONFIGURACIONES_BUSCARDataTable();
            dbProcedimientosTableAdapters.CONFIGURACIONES_BUSCARTableAdapter adapterTA = new dbProcedimientosTableAdapters.CONFIGURACIONES_BUSCARTableAdapter();
            tableDT = adapterTA.GetData();
            if (tableDT.Rows.Count > 0)
                return tableDT;
            else
                return null;
        }
        public static bool CONFIGURACIONES_INSERTAR(string URL_WHEATER, string MENSAJE_SALIDAS, string MENSAJE_LLEGADAS)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CONFIGURACIONES_INSERTAR(URL_WHEATER, MENSAJE_SALIDAS, MENSAJE_LLEGADAS);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool CONFIGURACIONES_MODIFICAR(int IDCONFIGURACIONES, string URL_WHEATER, string MENSAJE_SALIDAS, string MENSAJE_LLEGADAS)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CONFIGURACIONES_MODIFICAR(IDCONFIGURACIONES, URL_WHEATER, MENSAJE_SALIDAS, MENSAJE_LLEGADAS);
            if (op != 0)
                return true;
            else
                return false;
        }
        public static bool CONFIGURACIONES_ELIMINAR(int IDCONFIGURACIONES)
        {
            dbProcedimientosTableAdapters.QueriesTableAdapter adapterTA = new dbProcedimientosTableAdapters.QueriesTableAdapter();
            int op = adapterTA.CONFIGURACIONES_ELIMINAR(IDCONFIGURACIONES);
            if (op != 0)
                return true;
            else
                return false;
        }
        #endregion
    }
}