<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="checkin.aspx.cs" Inherits="wbIndicadoresVisuales.Views.checkin" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <link href="../vendors/bootstrap/dist/css/bootstrap.css" rel="stylesheet" />
    <link href="../css/estilos_checkin.css" rel="stylesheet" />
    <script src="../js/jquery.min.js"></script>
    <script src="../js/jquery.marquee.min.js" type="text/javascript"></script>
    <script src="../vendors/bootstrap/dist/js/bootstrap.js"></script>
    <script src="../Scripts/jquery.signalR-2.1.2.js" type="text/javascript"></script>
    <script src="../signalr/hubs" type="text/javascript"></script>
    <script src="../Controllers/jsCheck.js"></script>
</head>
<body>
    <div id="contenido">
        <div class="init_cabecera">
            <div class="hora"></div><div class="text-tipo-vuelo" id="lblTipo" data-es="Facturación" data-en="Check In"><span> Facturación</span></div>
        </div>
        <input type="text" style="display: none;" id="txtIP" value="" runat="server" name="txtIP" />
        <img class="logo_aerolinea" src="../images/corpac_logo_blanco.png" alt="alt" />
        <div class="footer">
            <img id="pbImageWheater" src="../uploads/clima_icons/01.png" /><span id="lblWheater" class="label-wheater">23°C</span>
        </div>
        <div class="marquee"><span>CORPAC S.A.</span></div>
    </div>
    <img class="img_footer" src="../images/left_checkin.png" />
</body>
</html>