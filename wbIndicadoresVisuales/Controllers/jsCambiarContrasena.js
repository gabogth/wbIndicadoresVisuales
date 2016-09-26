$(function () {
    $('#frmInsertar').unbind();
    $('#frmInsertar').submit(function (event) {
        if ($('#txtNuevaContrasena').val() == $('#txtReContra').val()) {
            modificar();
        } else {
            showMessage('Error!', 'Las contraseñas deben ser iguales.', 'error');
        }
        event.preventDefault();
    });
});

function check(input) {
    if (input.value != document.getElementById('txtNuevaContrasena').value) {
        input.setCustomValidity('Las contraseñas deben ser iguales.');
    } else {
        input.setCustomValidity('');
    }
}

function modificar() {
    var formData = $('#frmInsertar').serializeJSON();
    $.ajax({
        url: 'usuario_mantenimiento.aspx/usuario_enforce_change',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(formData)
    }).done(function (data, result) {
        var data = JSON.parse(data.d);
        console.log(data);
        if (data.result == "success") {
            showMessage('Correcto!', 'Se ha modificado correctamente.', data.result);
            document.location.href = "../default.aspx";
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