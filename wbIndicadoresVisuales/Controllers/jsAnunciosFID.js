$(function () {
    cargarVuelo();
    cargarDestino();
    cargarEstado();
    cargarPuerta();
    cargarFaja();
    cargarAerolinea();
    $('#modalInsertar').on('shown.bs.modal', function () {
        $('#cbVuelo').focus();
        $('#cbVuelo').select();
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        if (target == '#tab_content3') {
            $('#tab_content3').show();
        }
    });


    $('#btnMensajesSalidas').unbind();
    $('#btnMensajesSalidas').on('click', function () {
        $('#xtrSalidas').show();
        $('#xtrLlegadas').hide();
        $('#myModalLabelMensajes').html('Mensaje para las salidas');
        $('#modalMensajes').modal('show');
    });
    $('#btnMensajesLlegadas').unbind();
    $('#btnMensajesLlegadas').on('click', function () {
        $('#xtrSalidas').hide();
        $('#xtrLlegadas').show();
        $('#myModalLabelMensajes').html('Mensaje para las llegadas');
        $('#modalMensajes').modal('show');
    });

    clearEvents();

    var objHub = $.connection.hubFID;
    var objHubCheck = $.connection.hubCheckIN;
    objHub.client.getBuscar = function () {
        buscar(objHub);
    };

    objHub.client.buscarConfiguraciones = function () {
        buscar_mensajes_difusion(objHub);
    };

    objHubCheck.client.getBuscarCheck = function () {
        buscarCheck(objHubCheck);
    };

    $.connection.hub.disconnected(function () {
        console.log('Desconectado');
        setTimeout(function () {
            $.connection.hub.start().done(function () {
                buscar(objHub);
                buscarCheck(objHubCheck);
                getWheater(objHub, 'cusco, pe');
                console.log('Conectado');
            });
        }, 10000);
    });

    $.connection.hub.start().done(function () {
        $('#btnAddSalidas').on('click', function () {
            $('#myModalLabel').html('Nueva Salida');
            $('#dvFaja').hide();
            $('#dvPuerta').show();
            clearForms();
            $('#lblDestino').html('Destino <span class="fa fa-eraser" id="btnClearDestino" style="cursor: pointer"></span>');
            clearEvents();
            $('#frmInsertar').unbind();
            $('#frmInsertar').submit(function (event) {
                var IDVUELO = $('#cbVuelo').val();
                var IDDESTINO = $('#cbDestino').val();
                var HORA = $('#txtHora').val().split(':')[0];
                var MINUTO = $('#txtHora').val().split(':')[1];
                var HORA_PROGRAMADA = $('#txtHoraProgramada').val().split(':')[0];
                var MINUTO_PROGRAMADA = $('#txtHoraProgramada').val().split(':')[1];
                var IDESTADO = $('#cbEstado').val();
                var ENABLE = $('#cbEnable').is(':checked') ? 1 : 0;
                var IDPUERTA = $('#cbPuerta').val();
                var IDFAJA = null;
                var SALIDA_LLEGADA = 0;
                insertar(objHub, IDVUELO, IDDESTINO, HORA, MINUTO, IDPUERTA, IDESTADO, ENABLE, SALIDA_LLEGADA, IDFAJA, HORA_PROGRAMADA, MINUTO_PROGRAMADA);
                event.preventDefault();
            });
        });

        $('#btnAddLlegadas').on('click', function () {
            $('#myModalLabel').html('Nueva Llegada');
            $('#dvFaja').show();
            $('#dvPuerta').hide();
            clearForms();
            $('#lblDestino').html('Origen <span class="fa fa-eraser" id="btnClearDestino" style="cursor: pointer"></span>');
            clearEvents();
            $('#frmInsertar').unbind();
            $('#frmInsertar').submit(function (event) {
                var IDVUELO = $('#cbVuelo').val();
                var IDDESTINO = $('#cbDestino').val();
                var HORA = $('#txtHora').val().split(':')[0];
                var MINUTO = $('#txtHora').val().split(':')[1];
                var HORA_PROGRAMADA = $('#txtHoraProgramada').val().split(':')[0];
                var MINUTO_PROGRAMADA = $('#txtHoraProgramada').val().split(':')[1];
                var IDPUERTA = null;
                var IDFAJA = $('#cbFaja').val();
                var IDESTADO = $('#cbEstado').val();
                var ENABLE = $('#cbEnable').is(':checked') ? 1 : 0;
                var SALIDA_LLEGADA = 1;
                insertar(objHub, IDVUELO, IDDESTINO, HORA, MINUTO, IDPUERTA, IDESTADO, ENABLE, SALIDA_LLEGADA, IDFAJA, HORA_PROGRAMADA, MINUTO_PROGRAMADA);
                event.preventDefault();
            });
        });
        buscar(objHub);
        buscarCheck(objHubCheck);
        getWheater(objHub, 'cusco, pe');
        initMensajes(objHub);
    });
});

function initMensajes(objHub) {
    $('#frmMensajes').unbind();
    $('#frmMensajes').submit(function (event) {
        var ID = $('#idMensajesDifusion').val();
        if (ID == null || ID == '') {
            insertar_mensaje_difusion(objHub);
        } else {
            modificar_mensaje_difusion(objHub, ID);
        }
        event.preventDefault();
    });
    buscar_mensajes_difusion(objHub);
}

function insertar_mensaje_difusion(objHub) {
    objHub.server.insertarConfiguraciones($('#idURLWeather').val(), $('#txtMensajeDifusionSalidas').val(), $('#txtMensajeDifusionLlegadas').val()).done(function (data, result) {
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha insertado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
        }
        $('#modalMensajes').modal('hide');
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalMensajes').modal('hide');
    });
}

function modificar_mensaje_difusion(objHub, ID) {
    objHub.server.modificarConfiguraciones(ID, $('#idURLWeather').val(), $('#txtMensajeDifusionSalidas').val(), $('#txtMensajeDifusionLlegadas').val()).done(function (data, result) {
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha modificado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
        }
        $('#modalMensajes').modal('hide');
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalMensajes').modal('hide');
    });
}

function buscar_mensajes_difusion(objHub) {
    objHub.server.buscarConfiguraciones().done(function (data, result) {
        if (data.result == "success") {
            $('#idMensajesDifusion').val(data.body[0].idConfiguraciones);
            $('#idURLWeather').val(data.body[0].url_wheater);
            $('#dvMensajesSalidas').html(data.body[0].mensaje_salidas);
            $('#dvMensajesLlegadas').html(data.body[0].mensaje_llegadas);
            $('#txtMensajeDifusionSalidas').val(data.body[0].mensaje_salidas);
            $('#txtMensajeDifusionLlegadas').val(data.body[0].mensaje_llegadas);
            $('#dvMensajesSalidas').unbind();
            $('#dvMensajesSalidas').marquee('destroy');
            $('#dvMensajesSalidas').html('<span><marquee>' + data.body[0].mensaje_salidas + '</marquee></span>');
            $('#dvMensajesLlegadas').unbind();
            $('#dvMensajesLlegadas').marquee('destroy');
            $('#dvMensajesLlegadas').html('<span><marquee>' + data.body[0].mensaje_llegadas + '</marquee></span>');
        } else {
            $('#idMensajesDifusion').val('');
            $('#idURLWeather').val('');
            $('#dvMensajesSalidas').html('');
            $('#dvMensajesLlegadas').html('');
            $('#txtMensajeDifusionSalidas').val('');
            $('#txtMensajeDifusionLlegadas').val('');
        }
    }).fail(function (ro, rt, qrt) {
        console.log(ro);
        console.log(rt);
        console.log(qrt);
    });
}


function clearSelect(id) {
    setSelect2(id, null, null);
}

function clearEvents() {
    $('.fa-eraser').each(function (index, item) {
        $(this).unbind();
        $(this).on('click', function () {
            setSelect2($(this).parent().parent().find('select'), null, null);
        });
    });
    $('#btnClearHora').unbind();
    $('#btnClearHora').on('click', function () {
        $('#txtHora').val('');
    });
}

function clearForms() {
    clearSelect('#cbVuelo');
    clearSelect('#cbDestino');
    clearSelect('#cbVia');
    clearSelect('#cbPuerta');
    clearSelect('#cbEstado');
    clearSelect('#cbFaja');
    $('#txtHora').val(null);
    $('#txtHoraProgramada').val(null);
    $('#cbEnable').attr('checked', true);
    $('#modalInsertar').modal('show');
}

function setForms(item) {
    setSelect2('#cbVuelo', item.AVFID_idvuelo, item.AVFID_VUE_n_vuelo + '-' + item.AVFID_VUE_AER_abrev);
    if (item.AVFID_iddestino != null) {
        setSelect2('#cbDestino', item.AVFID_iddestino, item.AVFID_CUIDES_ + '-' + item.AVFID_CUIDES_PAI_pais);
    } else {
        setSelect2('#cbDestino', null, null);
    }
    if (item.AVFID_idpuerta != null) {
        setSelect2('#cbPuerta', item.AVFID_idpuerta, item.AVFID_PUE_puerta);
    } else {
        setSelect2('#cbPuerta', null, null);
    }
    if (item.AVFID_idfaja != null) {
        setSelect2('#cbFaja', item.AVFID_idfaja, item.AVFID_FAJ_faja);
    } else {
        setSelect2('#cbFaja', null, null);
    }
    if (item.AVFID_idestado != null) {
        setSelect2('#cbEstado', item.AVFID_idestado, item.AVFID_EST_estado_es);
    } else {
        setSelect2('#cbEstado', null, null);
    }
    if (item.AVFID_hora != null) {
        $('#txtHora').val(padLeft(item.AVFID_hora.toString(), 2, '0') + ':' + padLeft(item.AVFID_minuto.toString(), 2, '0'));
    } else {
        $('#txtHora').val(null);
    }
    if (item.AVFID_hora_programado != null) {
        $('#txtHoraProgramada').val(padLeft(item.AVFID_hora_programado.toString(), 2, '0') + ':' + padLeft(item.AVFID_minuto_programado.toString(), 2, '0'));
    } else {
        $('#txtHoraProgramada').val(null);
    }
    $('#cbEnable').prop('checked', (item.AVFID_enable == 0 ? false : true));
    $('#modalInsertar').modal('show');
}

function buscar(objHub) {
    objHub.server.buscarMensajesFID().done(function (data, result) {
        if (data.result == "success") {
            $('#tbl_result').html('');
            if (data.registros > 0) {
                appendHTML(data.body, objHub);
            } else {
                $('#tbl_salidas').html('<tr class="even pointer"><td class="text-center" colspan="17" scope="row">No hay ningun registro de vuelo.</td><tr>');
                $('#tbl_llegadas').html('<tr class="even pointer"><td class="text-center" colspan="17" scope="row">No hay ningun registro de vuelo.</td><tr>');
            }
        } else {
            $('#tbl_salidas').html('<tr class="even pointer"><td class="text-center" colspan="17" scope="row">' + data.message + '</td><tr>');
            $('#tbl_llegadas').html('<tr class="even pointer"><td class="text-center" colspan="17" scope="row">' + data.message + '</td><tr>');
        }
    }).fail(function (ro, rt, qrt) {
        $('#tbl_result').html('<tr><td colspan="14" class="text-center">Error: JSError</td></tr>');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
    });
}

function buscarCheck(objHubCheck) {
    objHubCheck.server.buscarMensajesCheck().done(function (data, result) {
        if (data.result == "success") {
            $('#contentCheck').html('');
            if (data.registros > 0) {
                //OK MODE
                console.log(data);
                var html = appendHTMLCheckIn(data.body, objHubCheck);
                $('#contentCheck').html(html);
                appendMethodsCheckIn(data.body, objHubCheck);
            } else {
                
            }
        } else {
            //$('#tbl_result').html('<tr><td colspan="14" class="text-center">' + data.message + '</td></tr>');
        }
    }).fail(function (ro, rt, qrt) {
        //$('#tbl_result').html('<tr><td colspan="14" class="text-center">Error: JSError</td></tr>');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
    });
}

function appendHTML(items, objFID) {
    var dataSalidas = llenarData(0, items);
    var dataLlegadas = llenarData(1, items);
    var htmlSalidas = getHTML(dataSalidas, 0);
    var htmlLlegadas = getHTML(dataLlegadas, 1);
    $('#tbl_salidas').html(htmlSalidas);
    $('#tbl_llegadas').html(htmlLlegadas);
    appendMethods(dataSalidas, objFID);
    appendMethods(dataLlegadas, objFID);
}

function appendHTMLCheckIn(items, objHubCheck) {
    var html = '';
    $.each(items, function (index, item) {
        if (item.idaerolinea == null) {
            html += '<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6">' +
                        '<div class="thumbnail">' +
                            '<div class="image view view-first" style="cursor: pointer;" id="check-up-' + item.idcounter + '">' +
                                '<img style="width: 100%; display: block;" src="../images/corpac.png" alt="image" />' +
                                '<div class="mask">' +
                                '<p style="font-size: 30px;"><b>' + item.counter + '</b></p>' +
                                '<div class="tools tools-bottom">' +
                                    
                                '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="caption" style="text-align: center;">' +
                                '<p>' + item.counter + ' - ' + (item.mensaje == '' || item.mensaje == null ? item.DESCRIPCION_COUNTER : item.mensaje) + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
        } else {
            html += '<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6">' +
                        '<div class="thumbnail">' +
                            '<div class="image view view-first" style="cursor: pointer;"  id="check-up-' + item.idcounter + '">' +
                                '<img style="width: 100%; display: block;" src="../uploads/aerolineas/' + item.icon_max + '" alt="image" />' +
                                '<div class="mask">' +
                                '<p style="font-size: 30px;"><b>' + item.counter + '</b></p>' +
                                '<div class="tools tools-bottom">' +
                                    
                                '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="caption" style="text-align: center;">' +
                                '<p>' + item.counter + ' - ' +  (item.mensaje) + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
        }
        
    });
    return html;
}

function appendMethodsCheckIn(items, objHubCheck) {
    var html = '';
    $.each(items, function (index, item) {
        $('#check-up-' + item.idcounter).unbind();
        $('#check-up-' + item.idcounter).click(function () {
            $('#myModalLabelCheck').html('COUNTER ' + item.counter);
            $('#modalCheck').modal('show');
            setSelect2('#cbAerolinea', item.idaerolinea, item.aerolinea);
            $('#txtMensaje').val(item.mensaje);
            $('#frmInsertarCheck').unbind();
            $('#frmInsertarCheck').submit(function (event) {
                if (item.idavisos_counter == null) {
                    insertarCheck(objHubCheck, $('#cbAerolinea').val(), item.idcounter, $('#txtMensaje').val());
                } else {
                    modificarCheck(objHubCheck, item.idavisos_counter, $('#cbAerolinea').val(), item.idcounter, $('#txtMensaje').val());
                }
                event.preventDefault();
            });
        });
    });
}

function llenarData(tipo, data) {
    var anyData = [];
    if (data != null && data.length > 0) {
        $.each(data, function (ind, item) {
            if (item.AVFID_salida_llegada == tipo) {
                anyData.push(item);
            }
        });
    } else {
        return null;
    }
    return anyData;
}

function getHTML(data, tipo) {
    var html = '';
    var counter = 1;
    if (data != null && data.length > 0) {
        $.each(data, function (ind, item) {
            if (tipo == 0) {
                html += '<tr class="even pointer">';
                html += '<td class="text-center" scope="row">' + (counter++) + '</td>';
                html += '<td><img style="width: 48px; height: 32px;" display: block;" src="../uploads/aerolineas/' + item.AVFID_VUE_AER_icon_med + '" alt="' + item.AVFID_VUE_AER_icon_med + '" /> ' + padLeft(item.AVFID_VUE_n_vuelo, 4, '0') + '</td>';
                html += '<td>' + (item.AVFID_iddestino != null ? ('[' + item.AVFID_CUIDES_PAI_abrev + ']-' + item.AVFID_CUIDES_) : '') + '</td>';
                html += '<td class="text-center">' + (item.AVFID_hora_programado != null ? (padLeft(item.AVFID_hora_programado.toString(), 2, '0') + ':' + padLeft(item.AVFID_minuto_programado.toString(), 2, '0')) : '') + '</td>';
                html += '<td class="text-center">' + (item.AVFID_hora != null ? (padLeft(item.AVFID_hora.toString(), 2, '0') + ':' + padLeft(item.AVFID_minuto.toString(), 2, '0')) : '') + '</td>';
                html += '<td class="text-center">' + (item.AVFID_PUE_puerta != null ? item.AVFID_PUE_puerta : '') + '</td>';
                html += '<td  class="text-center" style="color: ' + item.AVFID_EST_color + '"><b>' + (item.AVFID_EST_estado_es != null ? item.AVFID_EST_estado_es : '') + '</b></td>';
                html += '<td class="text-center" id="estado-' + item.AVFID_idavisosfid + '" style="cursor: pointer;">' + getEstado(item.AVFID_enable) + '</td>';
                html += '<td class="text-center" id="modificar-' + item.AVFID_idavisosfid + '" style="cursor: pointer;"><span class="fa fa-pencil"></span></td>';
                html += '<td class="text-center" id="eliminar-' + item.AVFID_idavisosfid + '" style="cursor: pointer;"><span class="fa fa-trash"></span></td>';
                html += '<tr>';
            } else {
                html += '<tr class="even pointer">';
                html += '<td class="text-center" scope="row">' + (counter++) + '</td>';
                html += '<td><img style="width: 48px; height: 32px;" display: block;" src="../uploads/aerolineas/' + item.AVFID_VUE_AER_icon_med + '" alt="' + item.AVFID_VUE_AER_icon_med + '" /> ' + padLeft(item.AVFID_VUE_n_vuelo, 4, '0') + '</td>';
                html += '<td>' + (item.AVFID_iddestino != null ? ('[' + item.AVFID_CUIDES_PAI_abrev + ']-' + item.AVFID_CUIDES_) : '') + '</td>';
                html += '<td class="text-center">' + (item.AVFID_hora_programado != null ? (padLeft(item.AVFID_hora_programado.toString(), 2, '0') + ':' + padLeft(item.AVFID_minuto_programado.toString(), 2, '0')) : '') + '</td>';
                html += '<td class="text-center">' + (item.AVFID_hora != null ? (padLeft(item.AVFID_hora.toString(), 2, '0') + ':' + padLeft(item.AVFID_minuto.toString(), 2, '0')) : '') + '</td>';
                html += '<td class="text-center">' + (item.AVFID_FAJ_faja != null ? item.AVFID_FAJ_faja : '') + '</td>';
                html += '<td  class="text-center" style="color: ' + item.AVFID_EST_color + '"><b>' + (item.AVFID_EST_estado_es != null ? item.AVFID_EST_estado_es : '') + '</b></td>';
                html += '<td class="text-center" id="estado-' + item.AVFID_idavisosfid + '" style="cursor: pointer;">' + getEstado(item.AVFID_enable) + '</td>';
                html += '<td class="text-center" id="modificar-' + item.AVFID_idavisosfid + '" style="cursor: pointer;"><span class="fa fa-pencil"></span></td>';
                html += '<td class="text-center" id="eliminar-' + item.AVFID_idavisosfid + '" style="cursor: pointer;"><span class="fa fa-trash"></span></td>';
                html += '<tr>';
            }
        });
    } else {
        html += '<tr class="even pointer">';
        html += '<td class="text-center" colspan="17" scope="row">No hay ningun registro de vuelo.</td>';
        html += '<tr>';
    }
    return html;
}

function padLeft (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function appendMethods(items, objFID) {
    $.each(items, function (ind, item) {
        $('#modificar-' + item.AVFID_idavisosfid).unbind();
        $('#modificar-' + item.AVFID_idavisosfid).on('click', function (e) {
            setForms(item);
            $('#modalInsertar').modal('show');
            if (item.AVFID_salida_llegada == 0) {
                $('#myModalLabel').html('MODIFICAR SALIDA ' + item.AVFID_VUE_AER_aerolinea + '-' + item.AVFID_VUE_n_vuelo);
                $('#dvFaja').hide();
                $('#dvPuerta').show();
            } else {
                $('#myModalLabel').html('MODIFICAR LLEGADA ' + item.AVFID_VUE_AER_aerolinea + '-' + item.AVFID_VUE_n_vuelo);
                $('#dvFaja').show();
                $('#dvPuerta').hide();
            }
            
            $('#frmInsertar').unbind();
            $('#frmInsertar').submit(function (event) {
                var IDVUELO = $('#cbVuelo').val();
                var IDDESTINO = $('#cbDestino').val();
                var HORA = $('#txtHora').val().split(':')[0];
                var MINUTO = $('#txtHora').val().split(':')[1];
                var IDESTADO = $('#cbEstado').val();
                var ENABLE = $('#cbEnable').is(':checked') ? 1 : 0;
                var IDPUERTA = item.AVFID_salida_llegada == 0 ? $('#cbPuerta').val() : null;
                var IDFAJA = item.AVFID_salida_llegada == 0 ? null : $('#cbFaja').val();
                var HORA_PROGRAMADA = $('#txtHoraProgramada').val().split(':')[0];
                var MINUTO_PROGRAMADA = $('#txtHoraProgramada').val().split(':')[1];
                modificar(objFID, item.AVFID_idavisosfid, IDVUELO, IDDESTINO, HORA, MINUTO, IDPUERTA, IDESTADO, ENABLE, IDFAJA, HORA_PROGRAMADA, MINUTO_PROGRAMADA);
                event.preventDefault();
            });
        });
        $('#eliminar-' + item.AVFID_idavisosfid).unbind();
        $('#eliminar-' + item.AVFID_idavisosfid).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea eliminar a <b>' + item.AVFID_VUE_AER_aerolinea + '-' + item.AVFID_VUE_n_vuelo + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                eliminar(objFID, item.AVFID_idavisosfid);
            });
        });
        $('#estado-' + item.AVFID_idavisosfid).unbind();
        $('#estado-' + item.AVFID_idavisosfid).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea cambiar el estado a <b>' + item.AVFID_VUE_AER_aerolinea + '-' + item.AVFID_VUE_n_vuelo + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                var estado = 1 - item.AVFID_enable;
                modificar_estado(objFID, item.AVFID_idavisosfid, estado);
            });
        });
    });
}

function setSelect2(div, id, value) {
    $(div).empty().append('<option value="' + id + '">' + value + '</option>').val(id).trigger('change');
}

function insertar(objHub, IDVUELO, IDDESTINO, HORA, MINUTO, IDPUERTA, IDESTADO, ENABLE, SALIDA_LLEGADA, IDFAJA, HORA_PROGRAMADO, MINUTO_PROGRAMADO) {
    objHub.server.insertarMensajesFID(IDVUELO, IDDESTINO, HORA, MINUTO, IDPUERTA, IDESTADO, ENABLE, SALIDA_LLEGADA, IDFAJA, HORA_PROGRAMADO, MINUTO_PROGRAMADO).done(function (data) {
        $('#modalInsertar').modal('hide');
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha insertado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
            console.log(ro);
            console.log(rt);
            console.log(qrt);
            $('#modalInsertar').modal('hide');
        }
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalInsertar').modal('hide');
    });
}

function insertarCheck(objHub, IDAEROLINEA, IDCOUNTER, MENSAJE) {
    objHub.server.insertarMensajesCheck(IDAEROLINEA, IDCOUNTER, MENSAJE).done(function (data) {
        $('#modalCheck').modal('hide');
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha insertado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
            console.log(ro);
            console.log(rt);
            console.log(qrt);
            $('#modalCheck').modal('hide');
        }
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalCheck').modal('hide');
    });
}

function getWheater(objHub, location) {
    objHub.server.getWheather(location).done(function (data) {
        if (data.result == "success") {
            console.log(data);
        } else {
            console.log(data);
        }
    }).fail(function (ro, rt, qrt) {
        console.log(ro);
        console.log(rt);
        console.log(qrt);
    });
}

function modificarCheck(objHub, IDAVISOS_COUNTER, IDAEROLINEA, IDCOUNTER, MENSAJE) {
    objHub.server.modificarMensajesCheck(IDAVISOS_COUNTER, IDAEROLINEA, IDCOUNTER, MENSAJE).done(function (data) {
        $('#modalCheck').modal('hide');
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha modificado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
            console.log(ro);
            console.log(rt);
            console.log(qrt);
            $('#modalCheck').modal('hide');
        }
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalCheck').modal('hide');
    });
}

function modificar(objHub, IDAVISOSFID, IDVUELO, IDDESTINO, HORA, MINUTO, IDPUERTA, IDESTADO, ENABLE, IDFAJA, HORA_PROGRAMADO, MINUTO_PROGRAMADO) {
    objHub.server.modificarMensajesFID(IDAVISOSFID, IDVUELO, IDDESTINO, HORA, MINUTO, IDPUERTA, IDESTADO, ENABLE, IDFAJA, HORA_PROGRAMADO, MINUTO_PROGRAMADO).done(function (data, result) {
        $('#modalInsertar').modal('hide');
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha modificado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
            $('#modalInsertar').modal('hide');
        }
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalInsertar').modal('hide');
    });
}

function modificar_estado(objHub, IDAVISOSFID, ENABLE) {
    objHub.server.modificarEstadoMensajesFID(IDAVISOSFID, ENABLE).done(function (data) {
        $('#modalQuest').modal('hide');
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha modificado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
            $('#modalQuest').modal('hide');
        }
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalQuest').modal('hide');
    });
}

function eliminar(objHub, ID) {
    objHub.server.eliminarMensajesFID(ID).done(function (data) {
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha eliminado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
        }
        $('#modalQuest').modal('hide');
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalQuest').modal('hide');
    });
}

function showMessage(title, text, type) {
    new PNotify({
        title: title,
        text: text,
        type: type,
        hide: true,
        delay: 3000,
        styling: 'bootstrap3'
    });
}

function getEstado(estado) {
    if (estado == 0) {
        return '<span class="fa fa-circle" style="color: red;"></span>';
    } else {
        return '<span class="fa fa-circle" style="color: green;"></span>';
    }
}

function cargarVuelo() {
    $('#cbVuelo').select2({
        ajax: {
            url: 'vuelos_mantenimiento.aspx/buscar',
            placeholder: "Select an option",
            allowClear: true,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: function (params) {
                if (params == null) {
                    return JSON.stringify({ QUERY: '', INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                } else {
                    return JSON.stringify({ QUERY: (params.term == null ? '' : params.term).toString(), INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                }
            },
            processResults: function (data, page) {
                var datos = jQuery.parseJSON(data.d);
                datos = datos.body;
                if (datos != null && datos.length > 0) {
                    for (var i = 0; i < datos.length; i++) {
                        datos[i].id = datos[i].idvuelos;
                        datos[i].text = datos[i].n_vuelo + '-' + datos[i].abrev;
                    }
                }
                return {
                    results: datos
                };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatVuelo,
        templateSelection: formatRepoSelection
    });
}

function cargarDestino() {
    $('#cbDestino').select2({
        ajax: {
            url: 'ciudades_mantenimiento.aspx/buscar',
            dataType: 'json',
            placeholder: "Select an option",
            allowClear: true,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: function (params) {
                if (params == null) {
                    return JSON.stringify({ QUERY: '', INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                } else {
                    return JSON.stringify({ QUERY: (params.term == null ? '' : params.term).toString(), INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                }
            },
            processResults: function (data, page) {
                var datos = jQuery.parseJSON(data.d);
                datos = datos.body;
                if (datos != null && datos.length > 0) {
                    for (var i = 0; i < datos.length; i++) {
                        datos[i].id = datos[i].idciudad;
                        datos[i].text = datos[i].ciudad + '-' + datos[i].pais;
                    }
                }
                return {
                    results: datos
                };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: format,
        templateSelection: formatRepoSelection
    });
}

function cargarPuerta() {
    $('#cbPuerta').select2({
        ajax: {
            url: 'puerta_relacionar.aspx/buscar',
            dataType: 'json',
            placeholder: "Select an option",
            allowClear: true,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: function (params) {
                if (params == null) {
                    return JSON.stringify({ QUERY: '', INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                } else {
                    return JSON.stringify({ QUERY: (params.term == null ? '' : params.term).toString(), INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                }
            },
            processResults: function (data, page) {
                var datos = jQuery.parseJSON(data.d);
                datos = datos.body;
                if (datos != null && datos.length > 0) {
                    for (var i = 0; i < datos.length; i++) {
                        datos[i].id = datos[i].idpuerta;
                        datos[i].text = datos[i].puerta;
                    }
                }
                return {
                    results: datos
                };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: format,
        templateSelection: formatRepoSelection
    });
}

function cargarFaja() {
    $('#cbFaja').select2({
        ajax: {
            url: 'faja_mantenimiento.aspx/buscar',
            dataType: 'json',
            placeholder: "Select an option",
            allowClear: true,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: function (params) {
                if (params == null) {
                    return JSON.stringify({ QUERY: '', INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                } else {
                    return JSON.stringify({ QUERY: (params.term == null ? '' : params.term).toString(), INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                }
            },
            processResults: function (data, page) {
                var datos = jQuery.parseJSON(data.d);
                datos = datos.body;
                if (datos != null && datos.length > 0) {
                    for (var i = 0; i < datos.length; i++) {
                        datos[i].id = datos[i].idfaja;
                        datos[i].text = datos[i].faja;
                    }
                }
                return {
                    results: datos
                };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: format,
        templateSelection: formatRepoSelection
    });
}

function cargarEstado() {
    $('#cbEstado').select2({
        ajax: {
            url: 'estado_mantenimiento.aspx/buscar',
            dataType: 'json',
            placeholder: "Select an option",
            allowClear: true,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: function (params) {
                if (params == null) {
                    return JSON.stringify({ QUERY: '', INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                } else {
                    return JSON.stringify({ QUERY: (params.term == null ? '' : params.term).toString(), INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                }
            },
            processResults: function (data, page) {
                var datos = jQuery.parseJSON(data.d);
                datos = datos.body;
                if (datos != null && datos.length > 0) {
                    for (var i = 0; i < datos.length; i++) {
                        datos[i].id = datos[i].idestado;
                        datos[i].text = datos[i].estado_es;
                    }
                }
                return {
                    results: datos
                };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: format,
        templateSelection: formatRepoSelection
    });
}




function format(e) {
    if (e.loading) {
        return "<div>" + e.text + "</div>";
    }
    var markup = '<div>' + e.text + '</div>';
    return markup;
}

function formatVuelo(e) {
    if (e.loading) {
        return '<div>' + e.text + '</div>';
    }
    var markup = '<div><img style="width: 48px; height: 32px;" display: block;" src="../uploads/aerolineas/' + e.icon_med + '" alt="' + e.icon_med + '" /></span> ' + e.text + '</div>';
    return markup;
}

function formatCiudad(e) {
    if (e.loading) {
        return '<div>' + e.text + '</div>';
    }
    if (e.icon_ciudad_med != null) {
        var markup = '<div><img style="width: 48px; height: 32px;" display: block;" src="../uploads/ciudades/' + e.icon_ciudad_med + '" alt="' + e.icon_ciudad_med + '" /></span> ' + e.text + '</div>';
    } else {
        var markup = '<div><img style="width: 48px; height: 32px;" display: block;" src="../images/unknowimage.png" alt="unknowimage.png" /></span> ' + e.text + '</div>';
    }
    return markup;
}

function formatRepoSelection(repo) {
    return repo.text || repo.text;
}

function cargarAerolinea() {
    $('#cbAerolinea').select2({
        ajax: {
            url: 'aerolineas_mantenimiento.aspx/buscar',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: function (params) {
                if (params == null) {
                    return JSON.stringify({ QUERY: '', INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                } else {
                    return JSON.stringify({ QUERY: (params.term == null ? '' : params.term).toString(), INDEX: 1, CANTIDAD: 10, ESTADO: 1 });
                }
            },
            processResults: function (data, page) {
                var datos = jQuery.parseJSON(data.d);
                datos = datos.body;
                if (datos != null && datos.length > 0) {
                    for (var i = 0; i < datos.length; i++) {
                        datos[i].id = datos[i].idaerolinea;
                        datos[i].text = datos[i].aerolinea;
                    }
                }
                return {
                    results: datos
                };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatAerolinea,
        templateSelection: formatRepoSelection
    });
}

function formatAerolinea(e) {
    if (e.loading) {
        return '<div>' + e.text + '</div>';
    }
    var markup = '<div><img style="width: 48px; height: 32px;" display: block;" src="../uploads/aerolineas/' + e.icon_med + '" alt="' + e.icon_med + '" /></span> ' + e.text + '</div>';
    return markup;
}