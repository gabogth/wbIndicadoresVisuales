<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fid_mixto.aspx.cs" Inherits="wbIndicadoresVisuales.Views.fid_mixto" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../css/estilos_fid.css" rel="stylesheet" />
    <link href="../vendors/bootstrap/dist/css/bootstrap.css" rel="stylesheet" />
    <script src="../js/jquery.min.js"></script>
    <script src="../js/jquery.marquee.min.js" type="text/javascript"></script>
    <script src="../vendors/bootstrap/dist/js/bootstrap.js"></script>
    <script src="../Scripts/jquery.signalR-2.1.2.js" type="text/javascript"></script>
    <script src="../signalr/hubs" type="text/javascript"></script>
    <script src="../Controllers/jsFIDMixto.js"></script>
</head>
<body>
    <div class="init_cabecera">
        <img src="../images/salidas.png" alt="salidas" class="tipo_vuelo" /><div class="text-tipo-vuelo" id="lblTipo"><span> SALIDAS</span></div>
    </div>
    <div class="clearfix"></div>
    <div class="container-fluid" id="fid_anuncios">
    </div>
    <div class="footer">
        <span class="hora"></span><img src="#" alt="" id="pbImageWheater" /><span id="lblWheater" class="label-wheater"></span>
    </div>
    <div class="marquee"><span></span></div>
    <img class="img_footer" src="../images/trapezoide_fid.png" />
</body>
</html>