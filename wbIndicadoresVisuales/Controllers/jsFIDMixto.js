var timerID;
var relojID;
var lang_toggle = true;
var html = {};
var currentTry;
$(function () {
    $('#pbImageWheater').hide();
    $('#lblWheater').hide();
    var objHub = $.connection.hubFID;
    objHub.client.getBuscar = function () {
        buscar(objHub);
    };
    $('.marquee').marquee({
        duration: 15000,
        delayBeforeStart: 0,
        gap: 150,
        direction: 'left',
        duplicated: true
    });
    $.connection.hub.start().done(function () {
        buscar(objHub);
        showAnimate();
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
                buscar(objHub);
                showAnimate();
                objHub.server.getTime().done(function (data, result) {
                    reloj(data[0], data[1], data[2]);
                });
                setMessageBarner(objHub);
            });
        }, 10000);
    });


    objHub.client.sincronizarReloj = function (hora, minuto, segundo) {
        reloj(hora, minuto, segundo);
    };

    objHub.client.buscarConfiguraciones = function (data) {
        setMessageBarner(objHub);
    };

    objHub.client.getWheather = function (data) {
        setWheater(data);
    };

    objHub.client.actualizarPagina = function () {
        document.location.reload();
    };

    objHub.client.reset_web = function () {
        document.location.href = '../Views/home_redirect.aspx';
    };

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

    function setMessageBarner(data) {
        objHub.server.buscarConfiguraciones().done(function (data, result) {
            console.log(data);
            if (data.result == 'success') {
                $('.marquee').html('<span>' + data.body[0].mensaje_salidas + '</span>');
            } else {

            }
            $('.marquee').marquee({
                duration: 15000,
                delayBeforeStart: 0,
                gap: 150,
                direction: 'left',
                duplicated: true
            });
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

    function llenarData(tipo, data) {
        var anyData = [];
        if (data != null && data.length > 0) {
            $.each(data, function (ind, item) {
                if (item.AVFID_salida_llegada == tipo) {
                    anyData.push(item);
                }
            });
            return anyData;
        } else {
            return null;
        }
    }

    function padLeft(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }


    function buscar(objHub) {
        clearInterval(timerID);
        objHub.server.buscarMensajesFID().done(function (data, result) {
            if (data.result == "success") {
                if (data.registros > 0) {
                    appendHTML(data.body, objHub);
                } else {
                    appendHTML(null, objHub);
                }
            } else {
                appendHTML(null, objHub);
            }
        }).fail(function (ro, rt, qrt) {
            $('#tbl_result').html('<tr><td colspan="14" class="text-center">Error: JSError</td></tr>');
            console.log(ro);
            console.log(rt);
            console.log(qrt);
        });
    }

    function appendHTML(items, objFID) {
        var dataSalidas;
        var dataLlegadas;
        var htmlSalidas;
        var htmlLlegadas;
        dataSalidas = llenarData(0, items);
        dataLlegadas = llenarData(1, items);
        htmlSalidas = getHTML(dataSalidas, 0);
        htmlLlegadas = getHTML(dataLlegadas, 1);
        html[0] = htmlSalidas;
        html[1] = htmlLlegadas;
    }

    function showAnimate() {
        var lang = 0,
            type = 0;
        setInterval(function () {
            if (type == 0 && lang == 0) {
                changeLangTitle('SALIDAS');
                animate(html[type]);
            } else if (type == 0 && lang == 1) {
                changeLangTitle('DEPARTURES');
                changeLang(type);
            } else if (type == 1 && lang == 0) {
                changeLangTitle('LLEGADAS');
                animate(html[type]);
            } else if (type == 1 && lang == 1) {
                changeLangTitle('ARRIVALS');
                changeLang(type);
            }
            lang++;
            if (lang > 1) {
                lang = 0;
                type++;
                if (type > 1) {
                    type = 0;
                    lang = 0;
                }
            }
        }, 4000);
    }

    function animate(html) {
        $('#fid_anuncios div').fadeOut(500).promise().done(function () {
            $('#fid_anuncios').html(html);
            $('#fid_anuncios div').fadeOut(0);
            $('#fid_anuncios div').fadeIn(500).promise().done(function () {
                $('#fid_anuncios').html(html);
            });
        });
    }

    function changeLang(type) {
        $('#fid_anuncios div').each(function (indice, item) {
            var valorEs = $(this).attr('data-es');
            var valorEn = $(this).attr('data-en');
            $(this).find('span').fadeOut(500).promise().done(function () {
                $(this).html(valorEn);
                $(this).fadeIn(500).promise().done(function () {
                    $(this).html(valorEn);
                });
            });
        });
    }

    function changeLangTitle(valor) {
        $('#lblTipo').each(function (indice, item) {
            $(this).find('span').fadeOut(500).promise().done(function () {
                $(this).html(valor);
                $(this).fadeIn(500).promise().done(function () {
                    $(this).html(valor);
                });
            });
        });
    }

    function getHTML(data, type) {
        var html = '';
        html = '<div class="row cabecera">\n' +
                    '<div class="col-lg-2 col-md-2 col-sm-2 nestun text-center" data-en="Airline" data-es="Compañia">\n' +
                        '<span style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">Compañia</span>\n' +
                    '</div>\n' +
                    '<div class="col-lg-1 col-md-1 col-sm-1 nestun text-center" data-en="Flight" data-es="Vuelo">\n' +
                        '<span style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">Vuelo</span>\n' +
                    '</div>\n' +
                    '<div class="col-lg-2 col-md-2 col-sm-2 nestun text-center" data-en="Time" data-es="Hora">\n' +
                        '<span style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">Hora</span>\n' +
                    '</div>\n' +
                    '<div class="col-lg-3 col-md-3 col-sm-3 nestun text-center" ' + (type == 0 ? 'data-en="Destination" data-es="Destino"' : 'data-en="From" data-es="Origen"') + '>\n' +
                        (type == 0 ? '<span style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">Destino</span>' : '<span style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">Origen</span>') +
                    '\n</div>' +
                    '<div class="col-lg-1 col-md-1 col-sm-1 nestun text-center" data-en="Gate" data-es="Puerta">\n' +
                        '<span style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">Puerta</span>\n' +
                    '</div>\n' +
                    '<div class="col-lg-3 col-md-3 col-sm-3 nestun text-center" data-en="Status" data-es="Estado">\n' +
                        '<span style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">Estado</span>\n' +
                    '</div>\n' +
                '</div>';
        var counter = 0;
        var isFirst = true;
        if (data != null && data.length > 0) {
            $.each(data, function (ind, item) {
                if (item.AVFID_enable == 1) {
                    if (counter < 8) {
                        html += '<div class="row ' + (isFirst ? 'body_first' : 'body_large') + '">\n' +
                                '<div class="col-lg-2 col-md-2 col-sm-2">\n' +
                                    '<img src="../uploads/aerolineas/' + item.AVFID_VUE_AER_icon_med + '" class="aerolinea_logo" alt="' + item.AVFID_VUE_AER_icon_med + '" />\n' +
                                '</div>\n' +
                                '<div class="col-lg-1 col-md-1 col-sm-1 nestun text-center" style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">\n' +
                                    padLeft(item.AVFID_VUE_n_vuelo, 4, '0') +
                                '</div>\n' +
                                '<div class="col-lg-2 col-md-2 col-sm-2 nestun text-center" style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">\n' +
                                    (item.AVFID_hora != null ? (padLeft(item.AVFID_hora.toString(), 2, '0') + ':' + padLeft(item.AVFID_minuto.toString(), 2, '0')) : '') + '\n' +
                                '</div>\n' +
                                '<div class="col-lg-3 col-md-3 col-sm-3 nestun text-center" style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">\n' +
                                    (item.AVFID_iddestino != null ? item.AVFID_CUIDES_.toUpperCase() : '') + '\n' +
                                '</div>\n' +
                                '<div class="col-lg-1 col-md-1 col-sm-1 nestun text-center" style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">\n' +
                                    (item.AVFID_PUE_puerta != null ? item.AVFID_PUE_puerta : '') + '\n' +
                                '</div>\n' +
                                '<div class="col-lg-3 col-md-3 col-sm-3 nestun text-center" style="color: ' + item.AVFID_EST_color + '; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;" ' + (item.AVFID_EST_estado_es != null ? ('data-en="' + item.AVFID_EST_estado_en + '" data-es="' + item.AVFID_EST_estado_es + '"') : 'data-en="" data-es=""') + '>\n<span>' +
                                    (item.AVFID_EST_estado_es != null ? item.AVFID_EST_estado_es : '').toUpperCase() + '</span>\n' +
                                '</div>\n</div>\n';
                        isFirst = false;
                        counter++;
                    }
                }
            });
        }
        return html;
    }
});