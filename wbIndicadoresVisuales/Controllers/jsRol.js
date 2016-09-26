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
        $('#myModalLabel').html('Nuevo Rol');
        $('#txtRol').val('');
        $('#modalInsertar').modal('show');
        showCuadroItems(0, 'INSERTAR', null);
    });
    buscar(1);
    $('#modalInsertar').on('shown.bs.modal', function () {
        $('#txtRol').focus();
        $('#txtRol').select();
    });
});

function showCuadroItems(IDROL, MODE, objResult) {
    $.ajax({
        url: 'rol_mantenimiento.aspx/listar_items',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: '{"IDROL": ' + IDROL + '}',
        beforeSend: function () {

        }
    }).done(function (data, result) {
        var jsonData = jQuery.parseJSON(data.d);
        if (jsonData.result == 'error') {
            utilClass.showMessage('#dvResultado', 'danger', 'Error:|' + jsonData.message);
            $('#paginacionFoot').pagination('updateItems', 1);
        } else {
            var esInicio = 0;
            var count_categoria = 0;
            var count_formulario = 0;
            var ant_categoria = 0;
            $('#tbl_formularios').html('');
            $.each(jsonData.body, function (index, item) {
                if (esInicio == 0) {
                    esInicio = 1;
                    ant_categoria = item.idcategoria;
                    $('#tbl_formularios').append('<tr>');
                    $('#tbl_formularios').append('<td colspan="2">' + (count_categoria + 1) + '</td>');
                    $('#tbl_formularios').append('<td><b>' + item.CATEGORIA_NOMBRE_MOSTRAR + '</b></td>');
                    $('#tbl_formularios').append('<td class="text-center"><input type="checkbox" name="gbCategoriaAll" class="NoName" id="gbCatAll-' + item.idcategoria + '" value="-1" style="opacity: 50;" /></td></tr>');
                    $('#tbl_formularios').append('<tr>');
                    $('#tbl_formularios').append('<td>&nbsp;</td>');
                    $('#tbl_formularios').append('<td>' + (count_categoria + 1) + '.' + (count_formulario + 1) + '</td>');
                    $('#tbl_formularios').append('<td style="padding-left:2em">' + item.FORMULARIO_NOMBRE_MOSTRAR + '</td>');
                    $('#tbl_formularios').append('<td class="text-center"><input data-inner="cat-' + item.idcategoria + '" type="checkbox" name="gbCategoria[]:number" value="' + item.idformulario + '" style="opacity: 50;" ' + (item.MARK == 1 ? 'checked="checked"' : '') + ' /></td></tr>');

                    $('#gbCatAll-' + item.idcategoria).unbind();
                    $('#gbCatAll-' + item.idcategoria).change(function (e) {
                        $('input[data-inner=cat-' + item.idcategoria + ']').each(function (inIndex, inItem) {
                            if ($('#gbCatAll-' + item.idcategoria).is(':checked')) {
                                $(this).prop('checked', true);
                            } else {
                                $(this).prop('checked', false);
                            }
                        });
                    });

                    count_formulario++;
                } else {
                    if (ant_categoria == item.idcategoria) {
                        $('#tbl_formularios').append('<tr>');
                        $('#tbl_formularios').append('<td>&nbsp;</td>');
                        $('#tbl_formularios').append('<td>' + (count_categoria + 1) + '.' + (count_formulario + 1) + '</td>');
                        $('#tbl_formularios').append('<td style="padding-left:2em">' + item.FORMULARIO_NOMBRE_MOSTRAR + '</td>');
                        $('#tbl_formularios').append('<td class="text-center"><input type="checkbox" data-inner="cat-' + item.idcategoria + '" name="gbCategoria[]:number" value="' + item.idformulario + '" style="opacity: 50;" ' + (item.MARK == 1 ? 'checked="checked"' : '') + ' /></td></tr>');
                        count_formulario++;
                    } else {
                        count_categoria++;
                        count_formulario = 0;
                        ant_categoria = item.idcategoria;
                        $('#tbl_formularios').append('<tr>');
                        $('#tbl_formularios').append('<td colspan="2">' + (count_categoria + 1) + '</td>');
                        $('#tbl_formularios').append('<td>' + item.CATEGORIA_NOMBRE_MOSTRAR + '</td>');
                        $('#tbl_formularios').append('<td class="text-center"><input type="checkbox" name="gbCategoriaAll:number" value="-1" id="gbCatAll-' + item.idcategoria + '" style="opacity: 50;" /></td></tr>');

                        $('#tbl_formularios').append('<tr>');
                        $('#tbl_formularios').append('<td>&nbsp;</td>');
                        $('#tbl_formularios').append('<td>' + (count_categoria + 1) + '.' + (count_formulario + 1) + '</td>');
                        $('#tbl_formularios').append('<td style="padding-left:2em">' + item.FORMULARIO_NOMBRE_MOSTRAR + '</td>');
                        $('#tbl_formularios').append('<td class="text-center"><input data-inner="cat-' + item.idcategoria + ':number" type="checkbox" name="gbCategoria[]:number" value="' + item.idformulario + '" style="opacity: 50;" ' + (item.MARK == 1 ? 'checked="checked"' : '') + ' /></td></tr>');
                        count_formulario++;
                        $('#gbCatAll-' + item.idcategoria).unbind();
                        $('#gbCatAll-' + item.idcategoria).change(function (e) {
                            $('input[data-inner=cat-' + item.idcategoria + ']').each(function (inIndex, inItem) {
                                if ($('#gbCatAll-' + item.idcategoria).is(':checked')) {
                                    $(this).prop('checked', true);
                                } else {
                                    $(this).prop('checked', false);
                                }
                            });
                        });
                    }
                }
            });
        }
    }).fail(function (responseObject, responseText, hqqr) {
        $('#tbl_formularios').html('<tr><td colspan="13" class="text-center">Error: ' + responseText + '</td></tr>');
    }).always(function (jqXHR, textStatus, errorThrown) {
        if (MODE == 'INSERTAR') {
            $('#frmInsertar').unbind();
            $('#frmInsertar').submit(function (event) {
                insertar();
                event.preventDefault();
            });
        } else {
            $('#modalInsertar').modal('show');
            $('#myModalLabel').html('Modificar ' + objResult.rol);
            $('#frmInsertar').unbind();
            $('#frmInsertar').submit(function (event) {
                modificar(objResult.idrol);
                event.preventDefault();
            });
        }
    });
}


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
        url: 'rol_mantenimiento.aspx/buscar',
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
        html += '<tr>';
        html += '<td class="text-center" scope="row">' + (((index - 1) * parseInt($('#cbCantidad').val())) + (ind + 1)) + '</td>';
        html += '<td>' + item.rol + '</td>';
        html += '<td class="text-center" id="estado-' + item.idrol + '" style="cursor: pointer;">' + getEstado(item.estado) + '</td>';
        html += '<td class="text-center" id="modificar-' + item.idrol + '" style="cursor: pointer;"><span class="fa fa-pencil"></span></td>';
        html += '<td class="text-center" id="eliminar-' + item.idrol + '" style="cursor: pointer;"><span class="fa fa-trash"></span></td>';
        html += '<tr>';
    });
    $('#tbl_result').html(html);
}

function appendMethods(items) {
    $.each(items, function (ind, item) {
        $('#modificar-' + item.idrol).unbind();
        $('#modificar-' + item.idrol).on('click', function (e) {
            $('#txtRol').val(item.rol);
            showCuadroItems(item.idrol, 'MODIFICAR', item);
        });
        $('#eliminar-' + item.idrol).unbind();
        $('#eliminar-' + item.idrol).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea eliminar a <b>' + item.rol + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                eliminar(item.idrol);
            });
        });
        $('#estado-' + item.idrol).unbind();
        $('#estado-' + item.idrol).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea cambiar el estado a <b>' + item.rol + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                var estado = 1 - item.estado;
                modificar_estado(item.idrol, estado);
            });
        });
    });
}

function insertar() {
    var formData = $('#frmInsertar').serializeJSON();
    $.ajax({
        url: 'rol_mantenimiento.aspx/insertar',
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
        url: 'rol_mantenimiento.aspx/modificar',
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
        url: 'rol_mantenimiento.aspx/modificar_estado',
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

function eliminar(ID) {
    $.ajax({
        url: 'rol_mantenimiento.aspx/eliminar',
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