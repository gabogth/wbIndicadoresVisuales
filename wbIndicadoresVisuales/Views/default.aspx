<%@ Page Title="" Language="C#" MasterPageFile="~/Views/master.Master" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="wbIndicadoresVisuales.Views._default" %>
<%@ Import Namespace="Modelo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphBody" runat="server">
    <div class="x_title">
        <h2>Inicio <small>Usuario</small></h2>
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
                    <p>
                        <%
                            dbProcedimientos.USUARIO_LOGINRow usuario = (dbProcedimientos.USUARIO_LOGINRow)Session["usuario"];
                            if (usuario != null)
                                Response.Write("Bienvenido " + usuario.apellido + ", " + usuario.nombre);
                            else
                                Response.Redirect("~/default.aspx");
                        %>
                    </p>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphHeader" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphFooter" runat="server">
</asp:Content>
