var currData;
var actual = 1;
var relojID;
$(function () {
    var objHub = $.connection.hubFID;
    objHub.client.getPuertaEmbarque = function () {
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

    var lang_toggle_3 = true;
    var timerID_3 = setInterval(function () {
        $('.desc').each(function () {
            var valorEn = $(this).attr('data-es');
            var valorEs = $(this).attr('data-en');
            $(this).fadeOut(500).promise().done(function () {
                $(this).html(lang_toggle_3 ? valorEn : valorEs);
                $(this).fadeIn(500).promise().done(function () {
                    $(this).html(lang_toggle_3 ? valorEn : valorEs);
                });
            });
        });
        lang_toggle_3 = !lang_toggle_3;
    }, 4000);

    $('#dvVueloCont2').hide();
    $('#pbLogoAerolinea2').hide();
    $('#dvOrigen2').hide();
    $('#dvOrigen2').hide();
    $('#pbCorpac').hide();
    var op = false;
    $('#lblTipo').click(function () {
        animacion(op);
        op = !op;
    });

    buscar_faja();

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
        setMessageBarner(objHub);
    });

    $.connection.hub.disconnected(function () {
        console.log('Desconectado');
        setTimeout(function () {
            $.connection.hub.start().done(function () {
                buscarAvisosActivos(objHub);
                objHub.server.getTime().done(function (data, result) {
                    reloj(data[0], data[1], data[2]);
                });
                setMessageBarner(objHub);
            });
        }, 1000);
    });

    objHub.client.actualizarPagina = function () {
        document.location.reload();
    };

    objHub.client.getWheather = function (data) {
        setWheater(data);
    };

    objHub.client.reset_web = function () {
        document.location.href = '../Views/home_redirect.aspx';
    };

    objHub.client.buscarConfiguraciones = function (data) {
        setMessageBarner(objHub);
    };

    function setMessageBarner(data) {
        objHub.server.buscarConfiguraciones().done(function (data, result) {
            console.log(data);
            if (data.result == 'success') {
                $('.marquee').html('<span>' + data.body[0].mensaje_llegadas + '</span>');
            } else {

            }
            $('.marquee').marquee({
                duration: 6000,
                delayBeforeStart: 0,
                gap: 150,
                direction: 'left',
                duplicated: true
            });
        });
    }

    function buscarAvisosActivos(objHub) {
        objHub.server.avisosBID($('#txtIP').val()).done(function (data, result) {
            var dataBody = getDataActive(data.body);
            data.body = dataBody;
            console.log(data);
            if (JSON.stringify(currData) != JSON.stringify(data)) {
                var html = '';
                if (data.body != null && data.body.length > 0) {
                    if (data.body.length == 1 && actual == 1) {
                        $.each(data.body, function (index, item) {
                            $('#pbCorpac').hide();
                            $('#dvVuelo1').html(item.AVFID_VUE_n_vuelo);
                            $('#dvOrigen1').html(item.AVFID_CUIDES_);
                            $('#pbLogoAerolinea1').attr('src', '../uploads/aerolineas/' + item.AVFID_VUE_AER_icon_max);
                            actual = 1;
                        });
                    } else if (data.body.length == 1 && actual == 2) {
                        $.each(data.body, function (index, item) {
                            $('#pbCorpac').hide();
                            $('#dvVuelo' + (index + 1).toString()).html(item.AVFID_VUE_n_vuelo);
                            $('#dvOrigen' + (index + 1).toString()).html(item.AVFID_CUIDES_);
                            $('#pbLogoAerolinea' + (index + 1).toString()).attr('src', '../uploads/aerolineas/' + item.AVFID_VUE_AER_icon_max);
                            actual = 1;
                            animacion(true);
                        });
                    } else if (data.body.length > 1 && actual == 1) {
                        $.each(data.body, function (index, item) {
                            $('#pbCorpac').hide();
                            $('#dvVuelo' + (index + 1).toString()).html(item.AVFID_VUE_n_vuelo);
                            $('#dvOrigen' + (index + 1).toString()).html(item.AVFID_CUIDES_);
                            $('#pbLogoAerolinea' + (index + 1).toString()).attr('src', '../uploads/aerolineas/' + item.AVFID_VUE_AER_icon_max);
                            actual = 2;
                            animacion(false);
                        });
                    } else if (data.body.length > 1 && actual == 2) {
                        $.each(data.body, function (index, item) {
                            $('#pbCorpac').hide();
                            $('#dvVuelo' + (index + 1).toString()).html(item.AVFID_VUE_n_vuelo);
                            $('#dvOrigen' + (index + 1).toString()).html(item.AVFID_CUIDES_);
                            $('#pbLogoAerolinea' + (index + 1).toString()).attr('src', '../uploads/aerolineas/' + item.AVFID_VUE_AER_icon_max);
                            actual = 2;
                        });
                    }
                    
                } else {
                    $('#pbCorpac').show();
                }
                currData = data;
                console.log('Has change');
            }
        });
    }
});

function getDataActive(data) {
    var anyData = [];
    if (data != null && data.length > 0) {
        $.each(data, function (ind, item) {
            if (item.AVFID_enable == 1) {
                anyData.push(item);
            }
        });
        return anyData;
    } else {
        return null;
    }
}

function buscar_faja() {
    $.ajax({
        url: 'faja_mantenimiento.aspx/buscar_ip',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            "IP": $('#txtIP').val()
        })
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        if (datos.result == "success")
            $('.faja').html(datos.body[0].faja);
        else
            $('.faja').html('X');
    }).fail(function (ro, rt, qrt) {
        $('.faja').html('X');
    });
}

function animacion(op) {
    if (op) {
        changeBg('../images/BID1.png');
        animateDiv('#dvVueloCont1', '20.3%');
        animateDiv('#dvOrigen1', '31.5%');
        animateDiv('#pbLogoAerolinea1', '19.55%');
        $('#dvVueloCont2').fadeOut(1000);
        $('#pbLogoAerolinea2').fadeOut(1000);
        $('#dvOrigen2').fadeOut(1000);
        $('.hora').fadeIn(1000);
        $('.pbClima').fadeIn(1000);
        $('.marquee').fadeIn(1000);
        $('#lblWheater').fadeIn(1000);
        $('.img_footer').fadeIn(1000);
    }
    else {
        changeBg('../images/BID2.png');
        animateDiv('#dvVueloCont1', '13.3%');
        animateDiv('#dvOrigen1', '24.5%');
        animateDiv('#pbLogoAerolinea1', '12.15%');
        $('#dvVueloCont2').fadeIn(3000);
        $('#pbLogoAerolinea2').fadeIn(3000);
        $('#dvOrigen2').fadeIn(3000);
        $('.hora').fadeOut(1000);
        $('.pbClima').fadeOut(1000);
        $('.marquee').fadeOut(1000);
        $('#lblWheater').fadeOut(1000);
        $('.img_footer').fadeOut(1000);
    }
    op = !op;
}

function changeBg(image) {
    $('body').css('backgroundImage', "url('" + image + "')");
    $('#fullPage').animate({
        backgroundColor: 'rgb(255, 255, 255)'
    }, 500, function () {
        $('#fullPage').animate({
            backgroundColor: 'transparent'
        }, 500);
    });
}

function animateDiv(domObject, position) {
    $(domObject).animate({
        marginTop: position
    }, 1000, "linear");
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
    }, 1000);
}

function setWheater(data) {
    if (data.result == 'success') {
        $('.pbClima').attr('src', '../uploads/clima_icons/' + data.body.icono + '.png');
        $('#lblWheater').html(Math.round(data.body.temperatura - 273.15).toString() + '°C');
    }
}

function padLeft(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}