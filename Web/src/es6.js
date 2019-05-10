var site = {
    Init: {
        Cliente: {
            Listado: function () {

                demo.Temp.Tabla = $('table').DataTable({
                    language: { url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json' },
                    columnDefs: [
                        { orderable: false, targets: [5] },
                        { visible: false, targets: [] }]
                });

                $.ajax({
                    url: 'https://localhost:44394/api/customers/',
                    type: 'get',
                    contentType: 'application/json',
                    success: function (res) {
                        if (demo.Temp.Tabla !== null) demo.Temp.Tabla.destroy();
                        var html = "";
                        for (var i = 0; i < res.length; i++) {


                            html += `<tr data-fila="@item.CustomerID">
                                <td><a href="/clientes/ficha/@item.CustomerID">@item.CustomerID</a></td>
                                <td>@item.CompanyName</td>
                                <td>
                                    @item.ContactName<br />
                                    <small>@item.ContactTitle</small>
                                </td>
                                <td>@item.Phone</td>
                                <td>
                                    <small>@item.Address</small><br />
                                    <small>@item.City (@item.Country)</small>
                                </td>
                                <td>
                                    <a class="btn btn-success btn-sm" href="/clientes/editar/@item.CustomerID">Editar</a>
                                    <button data-nombre="@item.CompanyName" data-id="@item.CustomerID" type="button" class="btn btn-danger btn-sm boton-eliminar">Borrar</button>
                                    @Ajax.ActionLink("Pedidos",
                                        "PedidosPorCliente",
                                        "Pedidos",
                        new {id = item.CustomerID},
                        new AjaxOptions() {
                                        HttpMethod = "GET",
                                    InsertionMode = InsertionMode.Replace,
                                    UpdateTargetId = "modal-body",
                                    OnSuccess = "demo.Process.Clientes.Listado.MostrarPedidos()"
                                },
                        new { @class = "btn btn-success btn-sm" })
                </td>
                            </tr>`
                        };
                        $('tbody').html(html);
                        $('table').DataTable({
                            language: {
                                url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                            }
                        });
                    },
                    error: function (e) { }
                });



                $('.boton-eliminar').click(function (e) {
                    var id = $(this).data('id');
                    var nombre = $(this).data('nombre');

                    $('.modal-title').html('Eliminar Cliente');
                    $('.modal-body').html('<br /><h4><b>Nombre:</b> ' + nombre + '</h4><p style="font-size:120%">¿ Desea eliminar el cliente ?</p>');
                    $('#md100').html('No');
                    $('#md200').html('Si');
                    $('#md200').off();
                    $('#md200').click(function (e) {
                        $.ajax({
                            url: '/clientes/eliminar',
                            type: 'post',
                            data: { id: id },
                            success: function (e) {
                                demo.Temp.Tabla.row($('tr[data-fila="' + id + '"]')).remove().draw(false);
                            },
                            error: function (e) {
                                alert('Error al eliminar el cliente');
                            }
                        }).always(function (e) {
                            $('#modal').modal('hide');
                            $('#md200').off();
                        });
                    });
                    $('#modal').modal('show');
                });
            },
            Ficha: function () {
                demo.Temp.Tabla = $('table').DataTable({
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                    }
                });
            }
        },
        Pedidos: {
            Listado: function () {
                demo.Temp.Tabla = $('table').DataTable({
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                    }
                });
            },
            Buscar: function () {
                demo.Temp.Tabla = $('table').DataTable({
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                    }
                });

                $('#b1').click(function (e) {
                    $.ajax({
                        url: '/pedidos/buscar',
                        type: 'post',
                        data: {
                            id: $('#id').val(),
                            producto: $('#producto').val(),
                            pais: $('#pais').val()
                        },
                        success: function (html) {
                            if (demo.Temp.Tabla !== null) demo.Temp.Tabla.destroy();
                            $('tbody').html(html);
                            demo.Temp.Tabla = $('table').DataTable({
                                language: {
                                    url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                                }
                            });
                        },
                        error: function (e) { }
                    });
                });
            }
        },

        Productos: {
            Buscar: function () {
                $('#busqueda-productos').click(function (e) {
                    $.ajax({
                        url: '/productos/buscar',
                        type: 'post',
                        data: {
                            nombre: $('#producto').val(),
                            categoria: $('#categoria').val()
                        },
                        success: function (html) {
                            if (demo.Temp.Tabla !== null) demo.Temp.Tabla.destroy();
                            $('tbody').html(html);
                            demo.Temp.Tabla = $('table').DataTable({
                                language: {
                                    url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                                }
                            });
                        },
                        error: function (e) { }
                    });
                });
            }
        }


    },
    Process: {

        Home: {
            Login: function () {
                $('#b1').click(function (e) {
                    $('#wait').fadeIn();
                    $('.alert').fadeOut();

                    $.ajax({
                        url: '/home/validarusuario',
                        type: 'post',
                        data: {
                            usuario: $('#user').val(),
                            password: $('#password').val()
                        },
                        success: function (r) {
                            if (r === 'OK') window.location.href = '/';
                            else {
                                $('#s1').html('Usuario y/o contraseña no validos');
                                $('.alert').fadeIn();
                            }
                            $('#wait').fadeOut();
                        },
                        error: function (e) {
                            $('#wait').fadeOut();
                        }
                    });
                });
            }
        },


        Clientes: {
            Listado: {
                MostrarPedidos: function () {
                    $('.modal-title').html('Listado de Pedidos');
                    $('#md100').html('Cerrar');
                    $('#md200').hide();
                    $('#modal').on('hidden.bs.modal', function (e) {
                        $('#md200').show();
                    });
                    $('#modal').modal('show');
                }
            },
            Ficha: {
                MostrarPedidos: function () {
                    demo.Temp.Tabla = $('table').DataTable({
                        language: {
                            url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                        }
                    });

                    $('.boton-pedidos').hide();
                }
            }
        },
        Productos: {
            Listado: {
                Cargar: function () {
                    var href = $('.boton-productos').attr('href');
                    var valor = href.split('/')[3];
                    var pagina = parseInt(valor);
                    $('.boton-productos').attr('href', '/productos/listado/' + (pagina + 1));
                }
            }
        },
    },
    Temp: {
        Tabla: null
    }
};