<%@ Page Title="" Language="C#" MasterPageFile="~/Views/master.Master" AutoEventWireup="true" CodeBehind="cambiar_contrasena.aspx.cs" Inherits="wbIndicadoresVisuales.Views.cambiar_contrasena" %>
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
    <div class="x_content">
        <div class="content">
            <div class="row">
                <div class="col-lg-12">
                     <form id="frmInsertar">
                        <div class="content">
                            <div class="row">
                                <div class="col-lg-12 form-group">
                                    <label for="txtAntiguaContrasena">Antigua contraseña: </label>
                                    <input type="password" id="txtAntiguaContrasena" name="txtAntiguaContrasena" placeholder="Ingrese la antigua contraseña" class="form-control" required="required" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 form-group">
                                    <label for="txtNuevaContrasena">Nueva contraseña: </label>
                                    <input type="password" id="txtNuevaContrasena" pattern=".{5,50}" title="Las contraseñas deben coincidir." name="txtNuevaContrasena" placeholder="Ingrese la nueva contraseña" class="form-control" required="required" />
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label for="txtReContra">Repita la nueva contraseña: </label>
                                    <input type="password" id="txtReContra" pattern=".{5,50}" title="Las contraseñas deben coincidir." name="txtReContra" placeholder="Ingrese denuevo la nueva contraseña" class="form-control" required="required" />
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
    <script src="../Controllers/jsCambiarContrasena.js"></script>
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