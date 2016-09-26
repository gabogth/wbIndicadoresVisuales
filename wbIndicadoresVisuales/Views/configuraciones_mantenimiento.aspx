<%@ Page Title="" Language="C#" MasterPageFile="~/Views/master.Master" AutoEventWireup="true" CodeBehind="configuraciones_mantenimiento.aspx.cs" Inherits="wbIndicadoresVisuales.Views.configuraciones_mantenimiento" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphBody" runat="server">
    <div class="x_title">
        <h2>Configuraciones <small>Mantenimiento</small></h2>
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
            <input type="hidden" id="txtID" name="txtID" />
            <div class="row">
                <div class="col-lg-12">
                     <form id="frmInsertar">
                        <div class="content">
                            <div class="row">
                                <div class="col-lg-12 form-group">
                                    <label for="txtURLWeather">URL Weather: </label>
                                    <textarea id="txtURLWeather" name="txtURLWeather" placeholder="Ingrese la URL del clima" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 form-group">
                                    <label for="txtMensajeSalidas">Mensaje Salidas: </label>
                                    <textarea id="txtMensajeSalidas" name="txtMensajeSalidas" placeholder="Ingrese el mensaje de las salidas" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 form-group">
                                    <label for="txtMensajeLlegadas">Mensaje Llegadas: </label>
                                    <textarea id="txtMensajeLlegadas" name="txtMensajeLlegadas" placeholder="Ingrese el mensaje de las llegadas" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-times"></span> Cerrar</button>
                    <button type="submit" class="btn btn-primary" form="frmInsertar"><span class="fa fa-floppy-o"></span> Guardar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphHeader" runat="server">
    <script src="../Scripts/jquery.signalR-2.1.2.js" type="text/javascript"></script>
    <script src="../signalr/hubs" type="text/javascript"></script>
    <script src="../Controllers/jsConfiguraciones.js"></script>
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
