<%@ Page Title="" Language="C#" MasterPageFile="~/Views/master.Master" AutoEventWireup="true" CodeBehind="perfil_modificar.aspx.cs" Inherits="wbIndicadoresVisuales.Views.perfil_modificar" %>
<%@ Import Namespace="Modelo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphBody" runat="server">
    <div class="x_title">
        <h2>Cambiar <small>ccontraseña</small></h2>
        <ul class="nav navbar-right panel_toolbox">
            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="javascript:location.reload();">Actualizar</a>
                    </li>
                    <li><a href="javascript:window.history.back();">Retroceder</a>
                    </li>
                </ul>
            </li>
            <li><a class="close-link"><i class="fa fa-close"></i></a>
            </li>
        </ul>
        <div class="clearfix"></div>
    </div>
    <%
        dbProcedimientos.USUARIO_LOGINRow usuario = (dbProcedimientos.USUARIO_LOGINRow)HttpContext.Current.Session["usuario"];    
    %>
    <div class="x_content">
        <div class="content">
            <div class="row">
                <div class="col-lg-12">
                     <form id="frmInsertar">
                        <div class="content">
                            <div class="row">
                                <div class="col-lg-6 form-group">
                                    <label for="txtNombre">Nombre: </label>
                                    <input type="text" id="txtNombre" value="<%= usuario.nombre %>" name="txtNombre" placeholder="Ingrese nombre" class="form-control" required="required" />
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label for="txtApellido">Apellido: </label>
                                    <input type="text" id="txtApellido" value="<%= usuario.apellido%>" name="txtApellido" placeholder="Ingrese apellido" class="form-control" required="required" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 form-group">
                                    <label for="txtTelefono">Teléfono: </label>
                                    <input type="tel" id="txtTelefono" value="<%= usuario.telefono %>" name="txtTelefono" placeholder="Ingrese teléfono." class="form-control" required="required" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <button type="submit" class="btn btn-primary" form="frmInsertar"><span class="fa fa-floppy-o"></span> Guardar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphHeader" runat="server">
    <script src="../Controllers/jsModificarPerfil.js"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphFooter" runat="server">
    <div class="modal fade bs-example-modal-lg" id="modalQuest" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="questTitulo"></h4>
                </div>
                <div class="modal-body">
                    <p id="bodyMessage"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-times"></span> Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnOK"><span class="fa fa-check"></span> Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>