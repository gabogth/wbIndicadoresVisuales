var currData;
var relojID;
$(function () {
    var objHub = $.connection.hubCheckIN;
    objHub.client.getBuscarCheck = function () {
        buscarAvisosActivos(objHub);
    }; 
    var lang_toggle = true;
    var timerID = setInterval(function () {
        var valorEn = $('#lblTipo').attr('data-es');
        var valorEs = $('#lblTipo').attr('data-en');
        $('#lblTipo span').fadeOut(500).promise().done(function () {
            $(this).html(lang_toggle ? valorEn : valorEs);
            $(this).fadeIn(500).promise().done(function () {
                $(this).html(lang_toggle ? valorEn : valorEs);
            });
        });
        lang_toggle = !lang_toggle;
    }, 4000);

    objHub.client.actualizarPagina = function () {
        document.location.reload();
    };

    objHub.client.reset_web = function () {
        document.location.href = '../Views/home_redirect.aspx';
    };

    objHub.client.sincronizarReloj = function (hora, minuto, segundo) {
        reloj(hora, minuto, segundo);
    };

    $.connection.hub.start().done(function () {
        buscarAvisosActivos(objHub);
        objHub.server.getTime().done(function (data, result) {
            reloj(data[0], data[1], data[2]);
        });
        setInterval(function () {
            objHub.server.getWheather('cusco, pe').done(function (data, result) {
                setWheater(data);
            });
        }, 1000);
    });

    $.connection.hub.disconnected(function () {
        console.log('Desconectado');
        setTimeout(function () {
            $.connection.hub.start().done(function () {
                buscarAvisosActivos(objHub);
                objHub.server.getTime().done(function (data, result) {
                    reloj(data[0], data[1], data[2]);
                });
            });
        }, 1000);
    });

    function setWheater(data) {
        $('#pbImageWheater').hide();
        $('#lblWheater').hide();
        if (data.result == 'success') {
            $('#pbImageWheater').attr('src', '../uploads/clima_icons/' + data.body.icono + '.png');
            $('#lblWheater').html(Math.round(data.body.temperatura - 273.15).toString() + '°C');
            $('#pbImageWheater').show();
            $('#lblWheater').show();
        } else {
            $('#lblWheater').hide();
            $('#pbImageWheater').hide();
        }
    }

    function reloj(hora, minuto, segundo) {
        clearInterval(relojID);
        relojID = setInterval(function () {
            segundo++;
            if (segundo > 59) {
                segundo = 0;
                minuto++;
                if (minuto > 59) {
                    minuto = 0;
                    hora++;
                    if (hora > 23) {
                        hora = 0;
                    }
                }
            }
            $('.hora').html(padLeft(hora.toString(), 2, '0') + ':' + padLeft(minuto.toString(), 2, '0'));
            $('.hora_2').html(padLeft(hora.toString(), 2, '0') + ':' + padLeft(minuto.toString(), 2, '0'));
        }, 1000);
    }

    function buscarAvisosActivos(objHub) {
        objHub.server.avisosCID($('#txtIP').val()).done(function (data, result) {
            console.log(data);
            if (JSON.stringify(currData) != JSON.stringify(data)) {
                var html = '';
                if (data.body != null && data.body.length > 0) {
                    if (data.body[0].idaerolinea != null) {
                        $('body').css('background-image', 'url(../images/CHECK_IN.png)');
                        $('.logo_aerolinea').attr('src', "../uploads/aerolineas/" + data.body[0].icon_max);
                        $('#lblTipo').css('visibility', 'visible');
                        $('.hora').css('float', 'left');
                        $('.hora').css('margin-left', '2%');
                        $('.hora').css('color', '#00EAFE');
                        $('.marquee').unbind();
                        $('.marquee').html('<span>' + data.body[0].mensaje + '</span>');
                        $('.marquee').marquee({
                            duration: 15000,
                            delayBeforeStart: 0,
                            gap: 150,
                            direction: 'left',
                            duplicated: true
                        });
                        
                    } else if (data.body[0].idavisos_counter != null && data.body[0].mensaje) {
                        $('body').css('background-image', 'url(../images/CHECK_IN_SIN_AEROLINEA.png)');
                        $('.logo_aerolinea').attr('src', '../images/corpac_logo_blanco.png');
                        $('#lblTipo').css('visibility', 'hidden');
                        $('.hora').css('float', 'right');
                        $('.hora').css('margin-right', '4%');
                        $('.hora').css('color', '#00084A');
                        $('.marquee').unbind();
                        $('.marquee').html('<span>' + data.body[0].mensaje + '</span>');
                        $('.marquee').marquee({
                            duration: 15000,
                            delayBeforeStart: 0,
                            gap: 150,
                            direction: 'left',
                            duplicated: true
                        });
                    } else {
                        $('body').css('background-image', 'url(../images/CHECK_IN_SIN_AEROLINEA.png)');
                        $('.logo_aerolinea').attr('src', '../images/corpac_logo_blanco.png');
                        $('#lblTipo').css('visibility', 'hidden');
                        $('.hora').css('float', 'right');
                        $('.hora').css('margin-right', '4%');
                        $('.hora').css('color', '#00EAFE');
                        $('.marquee').unbind();
                        $('.marquee').marquee({
                            duration: 15000,
                            delayBeforeStart: 0,
                            gap: 150,
                            direction: 'left',
                            duplicated: true
                        });
                    }
                } else {
                    $('body').css('background-image', 'url(../images/CHECK_IN_SIN_AEROLINEA.png)');
                    $('.logo_aerolinea').attr('src', '../images/corpac_logo_blanco.png');
                    $('#lblTipo').css('visibility', 'hidden');
                    $('.hora').css('float', 'right');
                    $('.hora').css('margin-right', '4%');
                    $('.hora').css('color', '#00EAFE');
                    $('.marquee').unbind();
                    $('.marquee').marquee({
                        duration: 15000,
                        delayBeforeStart: 0,
                        gap: 150,
                        direction: 'left',
                        duplicated: true
                    });
                }
                currData = data;
                console.log('Has change');
            }
        });
    }

    function padLeft(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
});