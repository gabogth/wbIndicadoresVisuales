$(function () {
    $('#frmInsertar').unbind();
    $('#frmInsertar').submit(function (event) {
        modificar();
        event.preventDefault();
    });
});

function modificar() {
    var formData = $('#frmInsertar').serializeJSON();
    $.ajax({
        url: 'usuario_mantenimiento.aspx/modificar_sesion',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(formData)
    }).done(function (data, result) {
        var data = JSON.parse(data.d);
        console.log(data);
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha modificado correctamente.', data.result);
            document.location.reload();
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