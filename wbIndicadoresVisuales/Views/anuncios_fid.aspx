<%@ Page Title="" Language="C#" MasterPageFile="~/Views/master.Master" AutoEventWireup="true" CodeBehind="anuncios_fid.aspx.cs" Inherits="wbIndicadoresVisuales.Views.anuncios_fid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphBody" runat="server">
    <div class="x_title">
        <h2>FIDS <small>Flight Informer Digital System</small></h2>
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
            <div class="" role="tabpanel" data-example-id="togglable-tabs">
                <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true"><img src="../images/departures.png" title="Salidas" alt="Salidas" /> SALIDAS</a></li>
                    <li role="presentation" class=""><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false"><img src="../images/arrivals.png" title="Llegadas" alt="Llegadas" /> LLEGADAS</a></li>
                    <li role="presentation" class=""><a href="#tab_content3" role="tab" id="profile-tab_2" data-toggle="tab" aria-expanded="false"><span class="fa fa-map-marker fa-2x" style="color: #3f50a4;"></span> COUNTERS</a></li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                        <div class="content">
                            <div class="text-right">
                                <div style="font-size: 20px; overflow: hidden; width: 83%; float: left;" id="dvMensajesSalidas"><span></span></div>
                                <button type="button" class="btn btn-primary" id="btnMensajesSalidas"><span class="fa fa-bullhorn"></span></button>
                                <button type="button" class="btn btn-primary" id="btnAddSalidas"><span class="fa fa-plus"></span></button>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="table-responsive">
                                        <table class="table table-striped jambo_table table-hover table-bordered" data-show-toggle="false"">
                                            <thead>
                                                <tr class="headings">
                                                    <th class="column-title text-center"># </th>
                                                    <th class="column-title text-center">VUELO </th>
                                                    <th class="column-title text-center">DESTINO </th>
                                                    <th class="column-title text-center">H.PR </th>
                                                    <th class="column-title text-center">HORA </th>
                                                    <th class="column-title text-center">PU </th>
                                                    <th class="column-title text-center">ESTADO </th>
                                                    <th class="column-title text-center">ENVIAR</th>
                                                    <th class="column-title text-center"><span class="fa fa-pencil"></span></th>
                                                    <th class="column-title text-center"><span class="fa fa-trash"></span></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbl_salidas">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                        <div class="content">
                            <div class="text-right">
                                <div style="font-size: 20px; overflow: hidden; width: 83%; float: left;" id="dvMensajesLlegadas"><span></span></div>
                                <button type="button" class="btn btn-primary" id="btnMensajesLlegadas"><span class="fa fa-bullhorn"></span></button>
                                <button type="button" class="btn btn-primary" id="btnAddLlegadas"><span class="fa fa-plus"></span></button>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="table-responsive">
                                        <table class="table table-striped jambo_table table-hover table-bordered" data-show-toggle="false"">
                                            <thead>
                                                <tr class="headings">
                                                    <th class="column-title text-center"># </th>
                                                    <th class="column-title text-center">VUELO </th>
                                                    <th class="column-title text-center">ORIGEN </th>
                                                    <th class="column-title text-center">H.PR </th>
                                                    <th class="column-title text-center">HORA </th>
                                                    <th class="column-title text-center">FA </th>
                                                    <th class="column-title text-center">ESTADO </th>
                                                    <th class="column-title text-center">ENVIAR</th>
                                                    <th class="column-title text-center"><span class="fa fa-pencil"></span></th>
                                                    <th class="column-title text-center"><span class="fa fa-trash"></span></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbl_llegadas">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade active in" style="display: none;" id="tab_content3" aria-labelledby="home-tab">
                        <div class="content">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="content">
                                        <div class="row" id="contentCheck">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphHeader" runat="server">
    <script src="../Scripts/jquery.signalR-2.1.2.js" type="text/javascript"></script>
    <script src="../signalr/hubs" type="text/javascript"></script>
    <script src="../Controllers/jsAnunciosFID.js"></script>
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphFooter" runat="server">
    <div class="modal fade bs-example-modal-lg" id="modalInsertar" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div class="modal-body">
                    <form id="frmInsertar">
                        <div class="content">
                            <div class="row">
                                <div class="col-lg-6 form-group">
                                    <label for="cbVuelo">Vuelo: <span class="fa fa-eraser" style="cursor: pointer"></span></label>
                                    <select id="cbVuelo" data-tags="true" data-placeholder="Seleccione un vuelo" data-allow-clear="true" style="width:100%;" name="cbVuelo" required="required"></select>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label for="cbDestino" id="lblDestino">Destino: <span class="fa fa-eraser" style="cursor: pointer"></span></label>
                                    <select id="cbDestino" data-tags="true" data-placeholder="Seleccione un destino" data-allow-clear="true" style="width:100%;" name="cbDestino"></select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 form-group" style="display: none;">
                                    <label for="txtHoraProgramada">Hora Programada: </label>
                                    <input type="time" id="txtHoraProgramada" class="form-control" name="txtHoraProgramada">
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label for="txtHora">Hora: <span class="fa fa-eraser" id="btnClearHora" style="cursor: pointer"></span></label>
                                    <input type="time" id="txtHora" class="form-control" name="txtHora">
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label for="cbEstado">Estado: <span class="fa fa-eraser" style="cursor: pointer"></span></label>
                                    <select id="cbEstado" data-tags="true" data-placeholder="Seleccione un estado" data-allow-clear="true" style="width:100%;" name="cbEstado"></select>
                                </div> 
                            </div>
                            <div class="row">
                                <div class="col-lg-6 form-group" id="dvPuerta">
                                    <label for="cbPuerta">Puerta: <span class="fa fa-eraser" style="cursor: pointer"></span></label>
                                    <select id="cbPuerta" data-tags="true" data-placeholder="Seleccione una puerta" data-allow-clear="true" style="width:100%;" name="cbPuerta"></select>
                                </div>
                                <div class="col-lg-6 form-group" id="dvFaja">
                                    <label for="cbFaja">Faja: <span class="fa fa-eraser" style="cursor: pointer"></span></label>
                                    <select id="cbFaja" data-tags="true" data-placeholder="Seleccione una faja" data-allow-clear="true" style="width:100%;" name="cbFaja"></select>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label for="cbEnable">Habilitado: <br />
                                        <input type="checkbox" id="cbEnable" checked="checked" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-times"></span> Cerrar</button>
                    <button type="submit" class="btn btn-primary" form="frmInsertar"><span class="fa fa-floppy-o"></span> Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-sm in" id="modalCheck" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabelCheck">Modal title</h4>
                </div>
                <div class="modal-body">
                    <form id="frmInsertarCheck">
                        <div class="content">
                            <div class="row">
                                <div class="col-lg-12 form-group">
                                    <label for="cbAerolinea">Aerolinea: <span class="fa fa-eraser" id="btnClearCB" style="cursor: pointer"></span></label>
                                    <select id="cbAerolinea" data-tags="true" data-placeholder="Seleccione una aerolinea" data-allow-clear="true" style="width:100%;" name="cbAerolinea"></select>
                                </div>
                                <div class="col-lg-12 form-group">
                                    <label for="txtMensaje">Mensaje: </label>
                                    <textarea class="form-control" id="txtMensaje" name="txtMensaje" placeholder="Ingrese un mensaje..."></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-times"></span> Cerrar</button>
                    <button type="submit" class="btn btn-primary" form="frmInsertarCheck"><span class="fa fa-floppy-o"></span> Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-sm in" id="modalMensajes" role="dialog" aria-labelledby="myModalLabelMensajes" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabelMensajes">Modal title</h4>
                </div>
                <div class="modal-body">
                    <form id="frmMensajes">
                        <div class="content">
                            <div class="row">
                                <input type="hidden" id="idMensajesDifusion" name="idMensajesDifusion" />
                                <input type="hidden" id="idURLWeather" name="idURLWeather" />
                                <div class="col-lg-12 form-group" id="xtrSalidas">
                                    <label for="txtMensajeDifusionSalidas">Mensaje: </label>
                                    <textarea class="form-control" id="txtMensajeDifusionSalidas" name="txtMensajeDifusionSalidas" placeholder="Ingrese un mensaje..."></textarea>
                                </div>
                                <div class="col-lg-12 form-group" id="xtrLlegadas">
                                    <label for="txtMensajeDifusionLlegadas">Mensaje: </label>
                                    <textarea class="form-control" id="txtMensajeDifusionLlegadas" name="txtMensajeDifusionLlegadas" placeholder="Ingrese un mensaje..."></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-times"></span> Cerrar</button>
                    <button type="submit" class="btn btn-primary" form="frmMensajes"><span class="fa fa-floppy-o"></span> Guardar</button>
                </div>
            </div>
        </div>
    </div>

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
