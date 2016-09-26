$(function () {
    $('#cbCantidad').on('change', function (e) {
        buscar(1);
    });
    $('#btnAdd').on('click', function (e) {
        $('#myModalLabel').html('Nueva herramienta');
        $('#txtHerramienta').val('');
        $('#modalInsertar').modal('show');
        $('#frmInsertar').unbind();
        $('#frmInsertar').submit(function (event) {
            insertar();
            event.preventDefault();
        });
    });
    buscar(1);
    $('#modalInsertar').on('shown.bs.modal', function () {
        $('#txtHerramienta').focus();
        $('#txtHerramienta').select();
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

function getPages(cantidad_page, cantidad_registros) {
    
}

function buscar(index) {
    $.ajax({
        url: 'herramientasMantenimiento.aspx/buscar',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            "QUERY": $('#inputSuccess2').val(),
            "INDEX": index,
            "CANTIDAD": parseInt($('#cbCantidad').val())
        }),
        beforeSend: function(){
            $('#tbl_result').html('<tr><td colspan="14" class="text-center">Cargando...</td></tr>');
        }
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        if (datos.result == "success") {
            $('#tbl_result').html('');
            if (datos.registros > 0) {
                $.each(datos.body, function (ind, item) {
                    $('#tbl_result').append('<tr>');
                    $('#tbl_result').append('<td class="text-center" scope="row">' + (((index - 1) * parseInt($('#cbCantidad').val())) + (ind + 1)) + '</td>');
                    $('#tbl_result').append('<td>' + item.herramienta + '</td>');
                    $('#tbl_result').append('<td>' + getRiesgo(item.riesgo) + '</td>');
                    $('#tbl_result').append('<td class="text-center" id="modificar-' + item.idherramienta + '" style="cursor: pointer;"><span class="fa fa-pencil"></span></td>');
                    $('#tbl_result').append('<td class="text-center" id="eliminar-' + item.idherramienta + '" style="cursor: pointer;"><span class="fa fa-trash"></span></td>');
                    $('#tbl_result').append('<tr>');
                    $('#modificar-' + item.idherramienta).unbind();
                    $('#modificar-' + item.idherramienta).on('click', function (e) {
                        $('#txtHerramienta').val(item.herramienta);
                        $('#cbRiesgo').val(item.riesgo);
                        $('#modalInsertar').modal('show');
                        $('#myModalLabel').html('Modificar ' + item.herramienta);
                        $('#frmInsertar').unbind();
                        $('#frmInsertar').submit(function (event) {
                            modificar(item.idherramienta);
                            event.preventDefault();
                        });
                    });
                    $('#eliminar-' + item.idherramienta).unbind();
                    $('#eliminar-' + item.idherramienta).on('click', function (e) {
                        $('#questTitulo').html('Advertencia');
                        $('#bodyMessage').html('¿Está seguro que desea eliminar a <b>' + item.herramienta + '</b>?');
                        $('#modalQuest').modal('show');
                        $('#btnOK').unbind();
                        $('#btnOK').on('click', function (e) {
                            eliminar(item.idherramienta);
                        });
                    });
                });
            } else {
                $('#tbl_result').html('<tr><td colspan="14" class="text-center">' + datos.message + '</td></tr>');
            }
        } else {
            $('#tbl_result').html('<tr><td colspan="14" class="text-center">' + datos.message + '</td></tr>');
        }
        paginacionMode(index, datos.registros, parseInt($('#cbCantidad').val()))
    }).fail(function (ro, rt, qrt) {
        paginacionMode(1, 1, parseInt($('#cbCantidad').val()));
        $('#tbl_result').html('<tr><td colspan="14" class="text-center">Error: JSError</td></tr>');
        console.log(ro);
        console.log(rt);
        console.log(qrt);
    });
}

function insertar() {
    var formData = $('#frmInsertar').serializeJSON();
    $.ajax({
        url: 'herramientasMantenimiento.aspx/insertar',
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
        url: 'herramientasMantenimiento.aspx/modificar',
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

function eliminar(ID) {
    $.ajax({
        url: 'herramientasMantenimiento.aspx/eliminar',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: '{"ID": ' + ID + '}'
    }).done(function (data, result) {
        var datos = JSON.parse(data.d);
        console.log(datos);
        $('#modalInsertar').modal('hide');
        if (datos.result == "success") {
            showMessage('Correcto!', 'Se ha insertado correctamente.', datos.result);
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

function getRiesgo(i) {
    switch (i) {
        case 0:
            return 'Nulo';
            break;
        case 1:
            return 'Minimo';
            break;
        case 2:
            return 'Moderado';
            break;
        case 3:
            return 'Medio';
            break;
        case 4:
            return 'Alto';
            break;
        case 5:
            return 'Muy Riesgoso';
            break;
    }
}