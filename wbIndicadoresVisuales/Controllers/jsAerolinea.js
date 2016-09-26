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
        $('#myModalLabel').html('Nueva Aerolínea');
        $('#txtAerolinea').val('');
        $('#txtAbrev').val('');
        $('#txtImagen').val('');
        $('#pbLogo').attr('src', '../images/unknowimage.png');
        $('#modalInsertar').modal('show');
        $('#frmInsertar').unbind();
        $('#frmInsertar').submit(function (event) {
            var op = $('#rowSumario').is(':visible');
            if (!op) {
                insertar();
            } else {
                showMessage('Error', 'Debe seleccionar una imagen válida.', 'error');
            }
            event.preventDefault();
        });
    });
    buscar(1);
    $('#modalInsertar').on('shown.bs.modal', function () {
        $('#txtAerolinea').focus();
        $('#txtAerolinea').select();
    });
    $('#rowSumario').hide();
    $('#txtImagen').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                console.log(this.width);
                console.log(this.height);
                $('#lblSumario').html('');
                if (this.width < 1280) {
                    $('#lblSumario').html('Ancho = [' + this.width + 'px]. El ancho (width) de la imagen no puede ser menor a 1280 pixeles. <br />');
                    $('#rowSumario').show();
                } else { $('#rowSumario').hide(); }
                if (this.height < 720) {
                    $('#lblSumario').html($('#lblSumario').html() + 'Altura = [' + this.height + 'px]. La altura (height) de la imagen no puede ser menor a 720 pixeles.');
                    $('#rowSumario').show();
                }
            };
            $('#pbLogo')[0].src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
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
        url: 'aerolineas_mantenimiento.aspx/buscar',
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
        html += '<td>' + item.aerolinea + '</td>';
        html += '<td>' + item.abrev + '</td>';
        html += '<td class="text-center" id="preview-' + item.idaerolinea + '" style="cursor: pointer;"><img style="width: 48px; height: 32px;" display: block;" src="../uploads/aerolineas/' + item.icon_med + '" alt="' + item.icon_med + '" /></td>';
        html += '<td class="text-center" id="estado-' + item.idaerolinea + '" style="cursor: pointer;">' + getEstado(item.estado) + '</td>';
        html += '<td class="text-center" id="modificar-' + item.idaerolinea + '" style="cursor: pointer;"><span class="fa fa-pencil"></span></td>';
        html += '<td class="text-center" id="eliminar-' + item.idaerolinea + '" style="cursor: pointer;"><span class="fa fa-trash"></span></td>';
        html += '<tr>';
    });
    $('#tbl_result').html(html);
}

function appendMethods(items) {
    $.each(items, function (ind, item) {
        $('#modificar-' + item.idaerolinea).unbind();
        $('#modificar-' + item.idaerolinea).on('click', function (e) {
            $('#txtAerolinea').val(item.aerolinea);
            $('#txtAbrev').val(item.abrev);
            $('#txtImagen').val('');
            $('#pbLogo').attr('src', '../uploads/aerolineas/' + item.icon_max);
            $('#modalInsertar').modal('show');
            $('#myModalLabel').html('Modificar ' + item.aerolinea);
            $('#frmInsertar').unbind();
            $('#frmInsertar').submit(function (event) {
                modificar(item.idaerolinea);
                event.preventDefault();
            });
        });
        $('#eliminar-' + item.idaerolinea).unbind();
        $('#eliminar-' + item.idaerolinea).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea eliminar a <b>' + item.aerolinea + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                eliminar(item.idaerolinea);
            });
        });
        $('#estado-' + item.idaerolinea).unbind();
        $('#estado-' + item.idaerolinea).on('click', function (e) {
            $('#questTitulo').html('Advertencia');
            $('#bodyMessage').html('¿Está seguro que desea cambiar el estado a <b>' + item.aerolinea + '</b>?');
            $('#modalQuest').modal('show');
            $('#btnOK').unbind();
            $('#btnOK').on('click', function (e) {
                var estado = 1 - item.estado;
                modificar_estado(item.idaerolinea, estado);
            });
        });
        $('#preview-' + item.idaerolinea).unbind();
        $('#preview-' + item.idaerolinea).on('click', function (e) {
            $('#imageTitulo').html('LOGO ' + item.aerolinea);
            $('#viewImage').modal('show');
            $('#pbPreview').attr('src', '../uploads/aerolineas/' + item.icon_max);
        });
    });
}

function insertar() {
    var reader = new FileReader();  
    reader.onload = function () {
        var binaryString = this.result;
        var formData = $('#frmInsertar').serializeJSON();
        formData["logo_aerolinea"] = binaryString;
        $.ajax({
            url: 'aerolineas_mantenimiento.aspx/insertar',
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
    reader.readAsDataURL($('#txtImagen')[0].files[0]);
   
}

function modificar(ID) {
    var reader = new FileReader();  
    reader.onload = function () {
        var binaryString = this.result;
        var formData = $('#frmInsertar').serializeJSON();
        formData["logo_aerolinea"] = binaryString;
        formData["ID"] = ID;
        $.ajax({
            url: 'aerolineas_mantenimiento.aspx/modificar',
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
    reader.readAsDataURL($('#txtImagen')[0].files[0]);
}

function modificar_estado(ID, ESTADO) {
    $.ajax({
        url: 'aerolineas_mantenimiento.aspx/modificar_estado',
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
        url: 'aerolineas_mantenimiento.aspx/eliminar',
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