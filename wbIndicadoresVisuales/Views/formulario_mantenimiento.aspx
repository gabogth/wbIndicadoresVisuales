﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Views/master.Master" AutoEventWireup="true" CodeBehind="formulario_mantenimiento.aspx.cs" Inherits="wbIndicadoresVisuales.Views.formulario_mantenimiento" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphBody" runat="server">
    <div class="x_title">
        <h2>Formulario <small>Mantenimiento</small></h2>
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
                <div class="col-sm-12 form-group has-feedback">
                    <div class="input-group">
                        <input type="text" class="form-control has-feedback-left" id="inputSuccess2" placeholder="Buscar...">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-primary" id="btnAdd"><span class="fa fa-plus"></span></button>
                        </span>
                    </div>
                    <span class="fa fa-search form-control-feedback left" aria-hidden="true"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div id="counter" class="text-right">
                        <span class="label label-default">Default</span>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped jambo_table table-hover table-bordered">
                            <thead>
                                <tr class="headings">
                                    <th class="column-title text-center"># </th>
                                    <th class="column-title text-center">FORMULARIO </th>
                                    <th class="column-title text-center">LINK </th>
                                    <th class="column-title text-center">DESCRIPCION</th>
                                    <th class="column-title text-center">CATEGORIA</th>
                                    <th class="column-title text-center"></th>
                                    <th class="column-title text-center"><span class="fa fa-pencil"></span></th>
                                    <th class="column-title text-center"><span class="fa fa-trash"></span></th>
                                </tr>
                            </thead>
                            <tbody id="tbl_result">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div id="dvPaginacion"></div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6" style="padding-top: 20px;">
                    <select id="cbCantidad">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                    Registros por página
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphHeader" runat="server">
    <script src="../Controllers/jsFormulario.js"></script>
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
                                    <label for="txtFormulario">Formulario: </label>
                                    <input type="text" class="form-control" id="txtFormulario" name="txtFormulario" placeholder="Formulario" required="required">
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label for="cbLINK">LINK: </label>
                                    <select id="cbLINK" style="width:100%;" class="select2_single form-control" name="cbLINK" required="required"></select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 form-group">
                                    <label for="txtDescripcion">Descripcion: </label>
                                    <textarea class="form-control" id="txtDescripcion" name="txtDescripcion" placeholder="Descripciòn"></textarea>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <label for="cbCategoria:number">Categoria: </label>
                                    <select id="cbCategoria" style="width:100%;" class="select2_single form-control" name="cbCategoria:number" required="required"></select>
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
