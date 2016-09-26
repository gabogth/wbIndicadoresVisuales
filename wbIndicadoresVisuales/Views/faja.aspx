<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="faja.aspx.cs" Inherits="wbIndicadoresVisuales.Views.faja" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <link href="../vendors/bootstrap/dist/css/bootstrap.css" rel="stylesheet" />
    <link href="../css/estilos_faja.css" rel="stylesheet" />
    <script src="../js/jquery.min.js"></script>
    <script src="../js/jquery-ui.js"></script>
    <script src="../js/jquery.marquee.min.js" type="text/javascript"></script>
    <script src="../vendors/bootstrap/dist/js/bootstrap.js"></script>
    <script src="../Scripts/jquery.signalR-2.1.2.js" type="text/javascript"></script>
    <script src="../signalr/hubs" type="text/javascript"></script>
    <script src="../Controllers/jsFaja.js"></script>
</head>
<body>
    <div id="fullPage"></div>
        <input type="text" style="display: none;" id="txtIP" value="" runat="server" name="txtIP" />
        <div id="contenido">
            <img class="cad1" alt="maleta" src="../images/maleta1.png" />
	        <img class="cad2" alt="maleta" src="../images/maleta2.png" />
	        <img class="cad3" alt="maleta" src="../images/maleta3.png" />
	        <img class="cad4" alt="maleta" src="../images/maleta4.png" />
        </div>
        <div class="init_cabecera">
            <div class="text-tipo-vuelo" id="lblTipo" data-es="Faja" data-en="Belt"><span>Faja</span></div>
            <div class="faja"></div>
        </div>
        <img class="logo_aerolinea" src="#" id="pbLogoAerolinea1" alt="pbLogoAerolinea" />
        <img class="logo_aerolinea2" src="#" id="pbLogoAerolinea2" alt="pbLogoAerolinea" />
        <img class="default_class" src="../images/corpac_logo_blanco.png" id="pbCorpac" alt="pbLogoAerolinea" />
        <div class="vuelo" id="dvVueloCont1">
            <span class="desc" data-es="Vuelo " data-en="Flight ">Vuelo </span><span class="numero" id="dvVuelo1"></span>
        </div>
        <div class="vuelo2" id="dvVueloCont2">
            <span class="desc" data-es="Vuelo " data-en="Flight ">Vuelo </span><span class="numero" id="dvVuelo2"></span>
        </div>
        <div class="origen" id="dvOrigen1"></div>
        <div class="origen2" id="dvOrigen2"></div>
        <div class="hora"></div>
        <img src="#" class="pbClima" /><span id="lblWheater" class="label-wheater"></span>
        <div class="marquee"><span>BIENVENIDO</span></div>    
        <img class="img_footer" src="../images/trapezoide_fid.png" />
</body>
</html>