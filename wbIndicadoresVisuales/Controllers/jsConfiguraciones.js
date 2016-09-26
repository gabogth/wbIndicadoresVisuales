$(function () {
    var objHub = $.connection.hubFID;
    objHub.client.buscarConfiguraciones = function () {
        buscar(objHub);
    };
    $.connection.hub.start().done(function () {
        $('#frmInsertar').unbind();
        $('#frmInsertar').submit(function (event) {
            var ID = $('#txtID').val();
            if (ID == null || ID == '') {
                insertar(objHub);
            } else {
                modificar(objHub, ID);
            }
            event.preventDefault();
        });
        buscar(objHub);
    });
});

function buscar(objHub) {
    objHub.server.buscarConfiguraciones().done(function (data, result) {
        if (data.result == "success") {
            $('#txtID').val(data.body[0].idConfiguraciones);
            $('#txtURLWeather').val(data.body[0].url_wheater);
            $('#txtMensajeSalidas').val(data.body[0].mensaje_salidas);
            $('#txtMensajeLlegadas').val(data.body[0].mensaje_llegadas);
        } else {
            $('#txtID').val('');
            $('#txtURLWeather').val('');
            $('#txtMensajeSalidas').val('');
            $('#txtMensajeLlegadas').val('');
        }
    }).fail(function (ro, rt, qrt) {
        console.log(ro);
        console.log(rt);
        console.log(qrt);
    });
}

function insertar(objHub) {
    objHub.server.insertarConfiguraciones($('#txtURLWeather').val(), $('#txtMensajeSalidas').val(), $('#txtMensajeLlegadas').val()).done(function (data, result) {
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha insertado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
        }
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
    });
}

function modificar(objHub, ID) {
    objHub.server.modificarConfiguraciones(ID, $('#txtURLWeather').val(), $('#txtMensajeSalidas').val(), $('#txtMensajeLlegadas').val()).done(function (data, result) {
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha modificado correctamente.', data.result);
        } else {
            showMessage('Error!', data.message, data.result);
        }
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
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