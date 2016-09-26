<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home_redirect.aspx.cs" Inherits="wbIndicadoresVisuales.Views.home_redirect" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style>
        body {
            background-image: url('../images/corpac.png');
            background-position: center center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
        }
    </style>
    <script src="../js/jquery.min.js"></script>
    <script src="../Scripts/jquery.signalR-2.1.2.js" type="text/javascript"></script>
    <script src="../signalr/hubs" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var objHub = $.connection.hubCheckIN;
            objHub.client.actualizarPagina = function () {
                document.location.reload();
            };

            objHub.client.reset_web = function () {
                document.location.href = '../Views/home_redirect.aspx';
            };

            $.connection.hub.start().done(function () {

            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="txtMensaje" runat="server"></div>
    </div>
    </form>
</body>
</html>
