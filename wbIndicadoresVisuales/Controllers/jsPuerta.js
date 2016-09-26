var currData;
var relojID;
var timermarquee;
$(function () {
    var objHub = $.connection.hubFID;
    objHub.client.getPuertaEmbarque = function () {
        buscarAvisosActivos(objHub);
    };
    buscar_puerta();
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
        var valorEn = $('.desc').attr('data-es');
        var valorEs = $('.desc').attr('data-en');
        $('.desc').fadeOut(500).promise().done(function () {
            $(this).html(lang_toggle_3 ? valorEn : valorEs);
            $(this).fadeIn(500).promise().done(function () {
                $(this).html(lang_toggle_3 ? valorEn : valorEs);
            });
        });
        lang_toggle_3 = !lang_toggle_3;
    }, 4000);

    var lang_toggle_4 = true;
    var timerID_4 = setInterval(function () {
        var valorEn = $('.desc_hora').attr('data-es');
        var valorEs = $('.desc_hora').attr('data-en');
        $('.desc_hora').fadeOut(500).promise().done(function () {
            $(this).html(lang_toggle_4 ? valorEn : valorEs);
            $(this).fadeIn(500).promise().done(function () {
                $(this).html(lang_toggle_4 ? valorEn : valorEs);
            });
        });
        lang_toggle_4 = !lang_toggle_4;
    }, 4000);

    $.connection.hub.disconnected(function () {
        console.log('Desconectado');
        setTimeout(function () {
            $.connection.hub.start().done(function () {
                buscarAvisosActivos(objHub);
                objHub.server.getTime().done(function (data, result) {
                    reloj(data[0], data[1], data[2]);
                });
                objHub.server.getWheather('cusco, pe').done(function (data, result) {
                    setWheater(data);
                });
            });
        }, 10000);
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

    function buscarAvisosActivos(objHub) {
        objHub.server.avisosGID($('#txtIP').val()).done(function (data, result) {
            if (JSON.stringify(currData) != JSON.stringify(data)) {
                console.log(data);
                var html = '';
                if (data.body != null && data.body.length > 0) {
                    $.each(data.body, function (index, item) {
                        $('.window_blank').hide();
                        $('.cabecera_destino').html(item.AVFID_CUIDES_);
                        $('.numero').html(item.AVFID_VUE_n_vuelo);
                        var time = item.AVFID_hora == null || item.AVFID_hora == "" ? "" : item.AVFID_hora + ':' + item.AVFID_minuto;
                        $('.hora_now').html(time);
                        $('.marquee').html('<span data-en="' + item.AVFID_EST_estado_en + '" data-es="' + item.AVFID_EST_estado_es + '">' + item.AVFID_EST_estado_es + '</span>');
                        $('#pbLogoAerolinea').attr('src', '../uploads/aerolineas/' + item.AVFID_VUE_AER_icon_max);
                    });
                } else {
                    $('.window_blank').show();
                    $('.cabecera_destino').html('');
                    $('.numero').html('');
                    $('.hora_now').html('');
                    $('.marquee').html('<span data-en="" data-es=""></span>');
                    $('#pbLogoAerolinea').attr('src', '#');
                }
                clearInterval(timermarquee);
                var lang_toggle_2 = true;
                timermarquee = setInterval(function () {
                    var valorEn = $('.marquee span').attr('data-es');
                    var valorEs = $('.marquee span').attr('data-en');
                    $('.marquee span').fadeOut(500).promise().done(function () {
                        $(this).html(lang_toggle_2 ? valorEn : valorEs);
                        $(this).fadeIn(500).promise().done(function () {
                            $(this).html(lang_toggle_2 ? valorEn : valorEs);
                        });
                    });
                    lang_toggle_2 = !lang_toggle_2;
                }, 4000);
                currData = data;
                console.log('Has change');
            }
        });
    }
});

function buscar_puerta() {
    $.ajax({
        url: 'puerta_relacionar.aspx/buscar_ip',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            "IP": $('#txtIP').val()
        })
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        if (datos.result == "success")
            $('.puerta').html(datos.body[0].puerta);
        else
            $('.puerta').html('X');
    }).fail(function (ro, rt, qrt) {
        $('.puerta').html('X');
    });
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
    $('.pbClima').hide();
    $('#lblWheater').hide();
    if (data.result == 'success') {
        $('.pbClima').attr('src', '../uploads/clima_icons/' + data.body.icono + '.png');
        $('#lblWheater').html(Math.round(data.body.temperatura - 273.15).toString() + '°C');
        $('.pbClima').show();
        $('#lblWheater').show();
    } else {
        $('#lblWheater').hide();
        $('.pbClima').hide();
    }
}

function padLeft(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}