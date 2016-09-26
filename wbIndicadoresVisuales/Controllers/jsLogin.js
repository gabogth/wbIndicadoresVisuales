$(function () {
    $('#dvNotificacion').hide();
    $('#frmInsertar').unbind();
    $('#frmInsertar').submit(function (event) {
        login();
        event.preventDefault();
    });
});

function login() {
    var formData = $('#frmInsertar').serializeJSON();
    $.ajax({
        url: 'Views/usuario_mantenimiento.aspx/login',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(formData),
        beforeSend: function () {
            $('#btnLogearse').hide();
            $('#dvNotificacion').html('<center>Cargando...</center>');
            $('#dvNotificacion').show();
        }
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        if (datos.result == "success") {
            showMessage('Correcto!', 'Bienvenido', datos.result);
            document.location.href = 'Views/default.aspx';
        } else {
            showMessage('Error!', datos.message, datos.result);
        }
    }).fail(function (ro, rt, qrt) {
        showMessage('Error!', rt, 'error');
    }).always(function () {
        $('#dvNotificacion').hide();
        $('#btnLogearse').show();
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