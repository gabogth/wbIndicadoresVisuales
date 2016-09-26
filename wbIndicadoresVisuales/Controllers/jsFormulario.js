$(function () {
    cargarLink();
    cargarCategoria()
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
        $('#myModalLabel').html('Nueva Categoria');
        $('#txtFormulario').val('');
        $('#cbLINK').select2('val', null);
        $('#txtDescripcion').val('');
        $('#cbCategoria').select2('val', null);
        
        $('#modalInsertar').modal('show');
        $('#frmInsertar').unbind();
        $('#frmInsertar').submit(function (event) {
            insertar();
            event.preventDefault();
        });
    });
    buscar(1);
    $('#modalInsertar').on('shown.bs.modal', function () {
        $('#txtCategoria').focus();
        $('#txtCategoria').select();
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
        url: 'formulario_mantenimiento.aspx/buscar',
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
        html += '<td>' + item.nombre_mostrar + '</td>';
        html += '<td>' + item.link + '</td>';
        html += '<td title="' + item.descripcion + '">' + (item.descripcion.length > 20 ? item.descripcion.substring(0, 19) : item.descripcion) + '</td>';
        html += '<td><span class="fa fa-' + item.CATEGORIA_ICON + '"></span> ' + item.CATEGORIA + '</td>';
        html += '<td class="text-center" id="estado-' + item.idformulario + '" style="cursor: pointer;">' + getEstado(item.estado) + '</td>';
        html += '<td class="text-center" id="modificar-' + item.idformulario + '" style="cursor: pointer;"><span class="fa fa-pencil"></span></td>';
        html += '<td class="text-center" id="eliminar-' + item.idformulario + '" style="cursor: pointer;"><span class="fa fa-trash"></span></td>';
        html += '<tr>';
    });
    $('#tbl_result').html(html);
}

function appendMethods(items) {
    $.each(items, function (ind, item) {
        $('#modificar-' + item.idformulario).unbind();
        $('#modificar-' + item.idformulario).on('click', function (e) {
            $('#txtFormulario').val(item.nombre_mostrar);
            $('#txtDescripcion').val(item.descripcion);
            setSelect2('#cbCategoria', item.idcategoria, item.CATEGORIA);
            setSelect2('#cbLINK', item.link, item.link);
            $('#modalInsertar').modal('show');
            $('#myModalLabel').html('Modificar ' + item.nombre_mostrar);
            $('#frmInsertar').unbind();
            $('#frmInsertar').submit(function (event) {
                modificar(item.idformulario);
                event.preventDefault();
            });
        });
        $('#eliminar-' + item.idformulario).unbind();
        $('#eliminar-' + item.idformulario).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea eliminar a <b>' + item.nombre_mostrar + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                eliminar(item.idformulario);
            });
        });
        $('#estado-' + item.idformulario).unbind();
        $('#estado-' + item.idformulario).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea cambiar el estado a <b>' + item.nombre_mostrar + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                var estado = 1 - item.estado;
                modificar_estado(item.idformulario, estado);
            });
        });
    });
}

function setSelect2(div, id, value) {
    $(div).empty().append('<option value="' + id + '">' + value + '</option>').val(id).trigger('change');
}

function insertar() {
    var formData = $('#frmInsertar').serializeJSON();
    $.ajax({
        url: 'formulario_mantenimiento.aspx/insertar',
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
        url: 'formulario_mantenimiento.aspx/modificar',
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
        url: 'formulario_mantenimiento.aspx/modificar_estado',
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
        url: 'formulario_mantenimiento.aspx/eliminar',
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

function cargarLink() {
    $('#cbLINK').select2({
        ajax: {
            url: 'formulario_mantenimiento.aspx/buscar_pagina',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: function (params) {
                if (params == null) {
                    return JSON.stringify({ query: '' });
                } else {
                    return JSON.stringify({ query: (params.term == null ? '' : params.term).toString() });
                }
            },
            processResults: function (data, page) {
                var datos = jQuery.parseJSON(data.d);
                datos = datos.body;
                var solve = [];
                if (datos != null && datos.length > 0) {
                    var hige = datos.length > 10 ? 10 : datos.length;
                    for (var i = 0; i < hige; i++) {
                        datos[i].id = datos[i].OriginalPath;
                        datos[i].text = datos[i].OriginalPath;
                        solve.push(datos[i]);
                    }
                } else {
                    solve = null;
                }
                return {
                    results: solve
                };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: format,
        templateSelection: formatRepoSelection
    });
}

function cargarCategoria() {
    $('#cbCategoria').select2({
        ajax: {
            url: 'categoria_mantenimiento.aspx/buscar',
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
                        datos[i].id = datos[i].idcategoria;
                        datos[i].text = datos[i].nombre_mostrar;
                    }
                }
                return {
                    results: datos
                };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatCategoria,
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

function formatCategoria(e) {
    if (e.loading) {
        return '<div>' + e.text + '</div>';
    }
    var markup = '<div><span class="fa fa-' + e.icon + '"></span> ' + e.text + '</div>';
    return markup;
}
function formatRepoSelection(repo) {
    return repo.text || repo.text;
}