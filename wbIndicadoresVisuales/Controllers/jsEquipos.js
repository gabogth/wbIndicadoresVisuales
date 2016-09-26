$(function () {
    $('#cbCantidad').on('change', function (e) {
        buscar(1);
    });
    $('#inputSuccess2').keyup(function (e) {
        switch (e.keyCode) {
            case 13:
                buscar(1);
                break;
        }
    });
    $('#btnAdd').on('click', function (e) {
        $('#myModalLabel').html('Nuevo Equipo');
        $('#txtNombre').val('');
        $('#txtIP').val('');
        $('#txtUsuario').val('');
        $('#txtPW').val('');
        $('#txtDescripcion').val('');
        
        $('#modalInsertar').modal('show');
        $('#frmInsertar').unbind();
        $('#frmInsertar').submit(function (event) {
            insertar();
            event.preventDefault();
        });
    });
    buscar(1);
    $('#modalInsertar').on('shown.bs.modal', function () {
        $('#txtNombre').focus();
        $('#txtNombre').select();
    });

    var hubFid = $.connection.hubFID;
    var hubChe = $.connection.hubCheckIN;
    $.connection.hub.start().done(function () {
        $('#btnActualizar').unbind();
        $('#btnActualizar').on('click', function () {
            hubFid.server.actualizarPagina();
            hubChe.server.actualizarPagina();
        }); 
        $('#btnResetPagina').unbind();
        $('#btnResetPagina').on('click', function () {
            hubFid.server.reset_web();
            hubChe.server.reset_web();
        });
    });
    
});

function paginacionMode(page, cantidad_registros, cantidad_page) {
    var mod = cantidad_registros % cantidad_page;
    var pagina = 0;
    if (mod == 0)
        pagina = (cantidad_registros / cantidad_page);
    else
        pagina = Math.floor(cantidad_registros / cantidad_page) + 1;

    $('#dvPaginacion').bootpag({
        total: pagina,
        page: page,
        maxVisible: 5,
        leaps: true,
        firstLastUse: true,
        first: '←',
        last: '→',
        wrapClass: 'pagination',
        activeClass: 'active',
        disabledClass: 'disabled',
        nextClass: 'next',
        prevClass: 'prev',
        lastClass: 'last',
        firstClass: 'first'
    }).on("page", function (event, num) {
        buscar(num)
    });
}

function buscar(index) {
    $.ajax({
        url: 'equipos_manteniento.aspx/buscar',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            "QUERY": $('#inputSuccess2').val(),
            "INDEX": index,
            "ESTADO": null,
            "CANTIDAD": parseInt($('#cbCantidad').val())
        }),
        beforeSend: function () {
            $('#tbl_result').html('<tr><td colspan="14" class="text-center">Cargando...</td></tr>');
        }
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        if (datos.result == "success") {
            $('#tbl_result').html('');
            
            if (datos.registros > 0) {
                appendHTML(datos.body, index);
                appendMethods(datos.body);
            } else {
                $('#tbl_result').html('<tr><td colspan="14" class="text-center">' + datos.message + '</td></tr>');
            }
        } else {
            $('#tbl_result').html('<tr><td colspan="14" class="text-center">' + datos.message + '</td></tr>');
        }
        paginacionMode(index, datos.registros, parseInt($('#cbCantidad').val()));
    }).fail(function (ro, rt, qrt) {
        paginacionMode(1, 1, parseInt($('#cbCantidad').val()));
        $('#tbl_result').html('<tr><td colspan="14" class="text-center">Error: JSError</td></tr>');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
    });
}

function appendHTML(items, index) {
    var html = '';
    $.each(items, function (ind, item) {
        html += '<tr class="even pointer">';
        html += '<td class="text-center" scope="row">' + (((index - 1) * parseInt($('#cbCantidad').val())) + (ind + 1)) + '</td>';
        html += '<td>' + item.nombre + '</td>';
        html += '<td>' + item.ip + '</td>';
        html += '<td title="' + item.descripcion + '">' + (item.descripcion.length > 20 ? item.descripcion.substring(0, 19) : item.descripcion) + '</td>';
        html += '<td>' + item.usuario + '</td>';
        html += '<td>' + item.pw + '</td>';
        html += '<td class="text-center" id="reiniciar-' + item.idequipo + '" style="cursor: pointer;"><span class="fa fa-refresh"></span</td>';
        html += '<td class="text-center" id="firefox-' + item.idequipo + '" style="cursor: pointer;"><span class="fa fa-firefox"></span</td>';
        html += '<td class="text-center" id="document-' + item.idequipo + '" style="cursor: pointer;"><span class="fa fa-bars"></span</td>';
        html += '<td class="text-center" id="estado-' + item.idequipo + '" style="cursor: pointer;">' + getEstado(item.estado) + '</td>';
        html += '<td class="text-center" id="modificar-' + item.idequipo + '" style="cursor: pointer;"><span class="fa fa-pencil"></span></td>';
        html += '<td class="text-center" id="eliminar-' + item.idequipo + '" style="cursor: pointer;"><span class="fa fa-trash"></span></td>';
        html += '<tr>';
    });
    $('#tbl_result').html(html);
}

function appendMethods(items) {
    $.each(items, function (ind, item) {
        $('#modificar-' + item.idequipo).unbind();
        $('#modificar-' + item.idequipo).on('click', function (e) {
            $('#txtNombre').val(item.nombre);
            $('#txtIP').val(item.ip);
            $('#txtUsuario').val(item.usuario);
            $('#txtPW').val(item.pw);
            $('#txtDescripcion').val(item.descripcion);
            $('#modalInsertar').modal('show');
            $('#myModalLabel').html('Modificar ' + item.nombre + '-' + item.ip);
            $('#frmInsertar').unbind();
            $('#frmInsertar').submit(function (event) {
                modificar(item.idequipo);
                event.preventDefault();
            });
        });
        $('#eliminar-' + item.idequipo).unbind();
        $('#eliminar-' + item.idequipo).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea eliminar a <b>' + item.nombre + '-' + item.ip + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                eliminar(item.idequipo);
            });
        });
        $('#estado-' + item.idequipo).unbind();
        $('#estado-' + item.idequipo).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea cambiar el estado a <b>' + item.nombre + '-' + item.ip + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                var estado = 1 - item.estado;
                modificar_estado(item.idequipo, estado);
            });
        });
        $('#reiniciar-' + item.idequipo).unbind();
        $('#reiniciar-' + item.idequipo).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea reiniciar el equipo <b>' + item.nombre + '-' + item.ip + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                reiniciar(item.ip, item.usuario, item.pw);
            });
        });
        $('#firefox-' + item.idequipo).unbind();
        $('#firefox-' + item.idequipo).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea reiniciar el firefox del equipo <b>' + item.nombre + '-' + item.ip + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                reiniciar_firefox(item.ip, item.usuario, item.pw, 'http://172.20.201.80:8080/views/home_redirect.aspx');
            });
        });
        $('#document-' + item.idequipo).unbind();
        $('#document-' + item.idequipo).on('click', function (e) {
            $('#btnOK').unbind();
            getCaracteristicas(item.ip, item.usuario, item.pw);
        });
    });
}

function insertar() {
    var formData = $('#frmInsertar').serializeJSON();
    $.ajax({
        url: 'equipos_manteniento.aspx/insertar',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(formData)
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        $('#modalInsertar').modal('hide');
        if (datos.result == "success") {
            showMessage('Correcto!', 'Se ha insertado correctamente.', datos.result);
        } else {
            showMessage('Error!', datos.message, datos.result);
            console.log(ro);
            console.log(rt);
            console.log(qrt);
            $('#modalInsertar').modal('hide');
        }
        buscar(1);
    }).fail(function (ro, rt, qrt) {
        paginacionMode(1, 1, parseInt($('#cbCantidad').val()));
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalInsertar').modal('hide');
    });
}

function modificar(ID) {
    var formData = $('#frmInsertar').serializeJSON();
    formData["ID"] = ID;
    console.log(formData);
    $.ajax({
        url: 'equipos_manteniento.aspx/modificar',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(formData)
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        $('#modalInsertar').modal('hide');
        if (datos.result == "success") {
            showMessage('Correcto!', 'Se ha modificado correctamente.', datos.result);
        } else {
            showMessage('Error!', datos.message, datos.result);
            $('#modalInsertar').modal('hide');
        }
        buscar(1);
    }).fail(function (ro, rt, qrt) {
        paginacionMode(1, 1, parseInt($('#cbCantidad').val()));
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalInsertar').modal('hide');
    });
}

function modificar_estado(ID, ESTADO) {
    $.ajax({
        url: 'equipos_manteniento.aspx/modificar_estado',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: '{"ID": ' + ID + ', "ESTADO": ' + ESTADO + '}'
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        $('#modalQuest').modal('hide');
        if (datos.result == "success") {
            showMessage('Correcto!', 'Se ha modificado correctamente.', datos.result);
        } else {
            showMessage('Error!', datos.message, datos.result);
            $('#modalQuest').modal('hide');
        }
        buscar(1);
    }).fail(function (ro, rt, qrt) {
        paginacionMode(1, 1, parseInt($('#cbCantidad').val()));
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalQuest').modal('hide');
    });
}

function reiniciar(IP, USUARIO, PASSWORD) {
    $.ajax({
        url: 'equipos_manteniento.aspx/reiniciar',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: '{"IP": "' + IP + '", "USUARIO": "' + USUARIO + '", "PW": "' + PASSWORD + '"}'
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        $('#modalQuest').modal('hide');
        if (datos.result == "success") {
            showMessage('Correcto!', 'Se ha reiniciado correctamente.', datos.result);
        } else {
            showMessage('Error!', datos.message, datos.result);
            $('#modalQuest').modal('hide');
        }
        buscar(1);
    }).fail(function (ro, rt, qrt) {
        paginacionMode(1, 1, parseInt($('#cbCantidad').val()));
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalQuest').modal('hide');
    });
}

function reiniciar_firefox(IP, USUARIO, PASSWORD, URL_RESTART) {
    $.ajax({
        url: 'equipos_manteniento.aspx/reiniciar_firefox',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: '{"IP": "' + IP + '", "USUARIO": "' + USUARIO + '", "PW": "' + PASSWORD + '", "URL_RESTART": "' + URL_RESTART + '" }'
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        $('#modalQuest').modal('hide');
        if (datos.result == "success") {
            showMessage('Correcto!', 'Se ha reiniciado correctamente.', datos.result);
        } else {
            showMessage('Error!', datos.message, datos.result);
            $('#modalQuest').modal('hide');
        }
        buscar(1);
    }).fail(function (ro, rt, qrt) {
        paginacionMode(1, 1, parseInt($('#cbCantidad').val()));
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
        $('#modalQuest').modal('hide');
    });
}

function getCaracteristicas(IP, USUARIO, PASSWORD) {
    $.ajax({
        url: 'equipos_manteniento.aspx/getCaracteristicas',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            $('#questTitulo').html('Consulta ' + IP);
            $('#bodyMessage').html('Se estan consultando los datos, porfavor espere...');
            $('#modalQuest').modal('show');
        },
        data: '{"IP": "' + IP + '", "USUARIO": "' + USUARIO + '", "PW": "' + PASSWORD + '"}'
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        if (datos.result == "success") {
            $('#bodyMessage').html('');
            var dx = '<table><tbody>' +
                '<tr><td><b>Temperatura: </b></td><td>' + datos.body.temperatura + '</td></tr>' +
                '<tr><td><b>Kernel: </b></td><td>' + datos.body.kernel + '</td></tr>' +
                '<tr><td><b>ID Distribuidor: </b></td><td>' + datos.body.distributor_ID + '</td></tr>' +
                '<tr><td><b>Descripción: </b></td><td>' + datos.body.description + '</td></tr>' +
                '<tr><td><b>Release: </b></td><td>' + datos.body.release + '</td></tr>' +
                '<tr><td><b>Code Name: </b></td><td>' + datos.body.codename + '</td></tr>' +
                +'</tbody></table>';
            $('#bodyMessage').html(dx);
        } else {
            showMessage('Error!', datos.message, datos.result);
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

function eliminar(ID) {
    $.ajax({
        url: 'equipos_manteniento.aspx/eliminar',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: '{"ID": ' + ID + '}'
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        $('#modalInsertar').modal('hide');
        if (datos.result == "success") {
            showMessage('Correcto!', 'Se ha eliminado correctamente.', datos.result);
        } else {
            showMessage('Error!', datos.message, datos.result);
        }
        $('#modalQuest').modal('hide');
        buscar(1);
    }).fail(function (ro, rt, qrt) {
        paginacionMode(1, 1, parseInt($('#cbCantidad').val()));
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