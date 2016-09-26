<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="wbIndicadoresVisuales._default" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sistema GFIBAC</title>
    <link rel="icon" type="image/png" href="images/favicon_tele.png">
    <link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="vendors/nprogress/nprogress.css" rel="stylesheet">
    <link href="vendors/animate.css/animate.min.css" rel="stylesheet" />
    <link href="build/css/custom.min.css" rel="stylesheet">
    <link href="vendors/pnotify/dist/pnotify.css" rel="stylesheet">
    <link href="vendors/pnotify/dist/pnotify.buttons.css" rel="stylesheet">
    <link href="vendors/pnotify/dist/pnotify.nonblock.css" rel="stylesheet">
    <script src="js/jquery.min.js"></script>
    <script src="vendors/pnotify/dist/pnotify.js"></script>
    <script src="vendors/pnotify/dist/pnotify.buttons.js"></script>
    <script src="vendors/pnotify/dist/pnotify.nonblock.js"></script>
    <script src="js/jquery.serializejson.min.js"></script>
    <script src="Controllers/jsLogin.js"></script>
</head>

<body class="login">
    <div>
        <a class="hiddenanchor" id="signup"></a>
        <a class="hiddenanchor" id="signin"></a>
        <div class="login_wrapper">
            <div class="animate form login_form">
                <section class="login_content">
                    <form id="frmInsertar" autocomplete="off">
                        <h1>Sistema GFIBAC</h1>
                        <div>
                            <input type="text" class="form-control" name="txtUsername" id="txtUsername" placeholder="Username" required="" />
                        </div>
                        <div>
                            <input type="password" class="form-control" name="txtPassword" id="txtPassword" placeholder="Password" required="" />
                        </div>
                        <div>
                            <input type="submit" value="Entrar" class="btn btn-default submit" id="btnLogearse" />
                            <a class="reset_pass" href="#">¿Perdiste tu contraseña?</a>
                        </div>
                        <div class="clearfix"></div>
                        <div class="separator">
                            <p id="dvNotificacion">
                            </p>
                            <div class="clearfix"></div>
                            <br />
                            <div>
                                <h1>
                                    <img src="images/corpac_logo.png" width="50%" height="25%" /></h1>
                                <p>Powered by <b><a href="http://www.gbl.us.com/" target="_blank">GLOBAL BUSINESS LATAM ©2016</a></b></p>
                                <p>All Rights Reserved. <a href="http://id360.ddns.net:8089/terminos_condiciones.html" target="_blank">Privacy and Terms.</a></p>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
    <div style="position: absolute; bottom: 0%; right: 0%;">Version: [2.1]</div>
</body>
</html>
