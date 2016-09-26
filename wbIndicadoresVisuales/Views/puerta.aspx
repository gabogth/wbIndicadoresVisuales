<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="puerta.aspx.cs" Inherits="wbIndicadoresVisuales.Views.puerta" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <link href="../vendors/bootstrap/dist/css/bootstrap.css" rel="stylesheet" />
    <link href="../css/estilos_gate.css" rel="stylesheet" />
    <script src="../js/jquery.min.js"></script>
    <script src="../js/jquery.marquee.min.js" type="text/javascript"></script>
    <script src="../vendors/bootstrap/dist/js/bootstrap.js"></script>
    <script src="../Scripts/jquery.signalR-2.1.2.js" type="text/javascript"></script>
    <script src="../signalr/hubs" type="text/javascript"></script>
    <script src="../Controllers/jsPuerta.js"></script>
</head>
<body>
    <div id="contenido">
        <div class="init_cabecera">
            <div class="text-tipo-vuelo" id="lblTipo" data-en="Gate" data-es="Puerta"><span>Puerta</span></div>
            <div class="puerta"></div>
            <div class="hora"></div>
            <img src="#" class="pbClima" /><span id="lblWheater" class="label-wheater"></span>
        </div>
        <input type="text" style="display: none;" id="txtIP" value="" runat="server" name="txtIP" />
        <div class="cabecera_destino">
            
        </div>
        <div class="vuelo">
            <span class="desc" data-es="Vuelo " data-en="Flight "> Vuelo </span><span class="numero"></span>
        </div>
        <div class="hora_prog">
            <span class="desc_hora" data-es="Hora " data-en="Time "> Hora </span><span class="hora_now"></span>
        </div>
        <img class="logo_aerolinea" src="../images/peruvian.png" id="pbLogoAerolinea" alt="pbLogoAerolinea" />
        <div class="marquee"><span data-en="" data-es="" ></span></div>
        <img class="window_blank" src="../images/corpac_logo_blanco.png" alt="window_blank" />
    </div>
</body>
</html>