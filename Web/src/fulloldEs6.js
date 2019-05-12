import _ from 'lodash';

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());

var site = {
    Init: {
        Cliente: {
            Listado: () => {

                site.Temp.Tabla = $('table').DataTable({
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
                        if (site.Temp.Tabla !== null) site.Temp.Tabla.destroy();
                        var html = "";
                        for (var i = 0; i < res.length; i++) {
                            html += `<tr data-fila="${res[i].CustomerID}">
                                <td><a href="/clientes/ficha/${res[i].CustomerID}>${res[i].CustomerID}</a></td>
                                <td>${res[i].CompanyName}</td>
                                <td>
                                    ${res[i].CompanyName}<br />
                                    <small>${res[i].CompanyTitle}</small>
                                </td>
                                <td>${res[i].Phone}</td>
                                <td>
                                    <small>${res[i].Address}</small><br />
                                    <small>${res[i].City} (${res[i].Country})</small>
                                </td>
                                <td>
                                    <a class="btn btn-success btn-sm" href="/clientes/editar/${res[i].CustomerID}">Editar</a>
                                    <button data-nombre="${res[i].CompanyName}" data-id="${res[i].CustomerID}" type="button" class="btn btn-danger btn-sm boton-eliminar">Borrar</button>
                                    <button data-id="${res[i].CustomerID}" class="btn btn-success btn-sm boton-pedidos">Pedidos</button></td>
                            </tr>`;
                        };
                        $('tbody').html(html);
                        $('table').DataTable({
                            language: {
                                url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                            }
                        });

                        //            @Ajax.ActionLink("Pedidos",
                        //                "PedidosPorCliente",
                        //new AjaxOptions() {
                        //            InsertionMode = InsertionMode.Replace,
                        //            UpdateTargetId = "modal-body",
                        //            OnSuccess = "demo.Process.Clientes.Listado.MostrarPedidos()"
                        
                    },
                    error: function (e) { }
                });



                //            $('.boton-eliminar').click((e) => {
                //                var id = $(this).data('id');
                //                var nombre = $(this).data('nombre');

                //                $('.modal-title').html('Eliminar Cliente');
                //                $('.modal-body').html('<br /><h4><b>Nombre:</b> ' + nombre + '</h4><p style="font-size:120%">¿ Desea eliminar el cliente ?</p>');
                //                $('#md100').html('No');
                //                $('#md200').html('Si');
                //                $('#md200').off();
                //                $('#md200').click(function (e) {
                //                    $.ajax({
                //                        url: '/clientes/eliminar',
                //                        type: 'post',
                //                        data: { id: id },
                //                        success: function (e) {
                //                            site.Temp.Tabla.row($('tr[data-fila="' + id + '"]')).remove().draw(false);
                //                        },
                //                        error: function (e) {
                //                            alert('Error al eliminar el cliente');
                //                        }
                //                    }).always(function (e) {
                //                        $('#modal').modal('hide');
                //                        $('#md200').off();
                //                    });
                //                });
                //                $('#modal').modal('show');
                //            });
                //        },
                //        Ficha: function () {
                //            site.Temp.Tabla = $('table').DataTable({
                //                language: {
                //                    url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                //                }
                //            });
                //        }
                //    },
                //    Pedidos: {
                //        Listado: function () {
                //            site.Temp.Tabla = $('table').DataTable({
                //                language: {
                //                    url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                //                }
                //            });
                //        },
                //        Buscar: function () {
                //            site.Temp.Tabla = $('table').DataTable({
                //                language: {
                //                    url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                //                }
                //            });

                //            $('#b1').click(function (e) {
                //                $.ajax({
                //                    url: '/pedidos/buscar',
                //                    type: 'post',
                //                    data: {
                //                        id: $('#id').val(),
                //                        producto: $('#producto').val(),
                //                        pais: $('#pais').val()
                //                    },
                //                    success: function (html) {
                //                        if (site.Temp.Tabla !== null) site.Temp.Tabla.destroy();
                //                        $('tbody').html(html);
                //                        site.Temp.Tabla = $('table').DataTable({
                //                            language: {
                //                                url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                //                            }
                //                        });
                //                    },
                //                    error: function (e) { }
                //                });
                //            });
                //        }
                //    },

                //    Productos: {
                //        Buscar: function () {
                //            $('#busqueda-productos').click(function (e) {
                //                $.ajax({
                //                    url: '/productos/buscar',
                //                    type: 'post',
                //                    data: {
                //                        nombre: $('#producto').val(),
                //                        categoria: $('#categoria').val()
                //                    },
                //                    success: function (html) {
                //                        if (site.Temp.Tabla !== null) site.Temp.Tabla.destroy();
                //                        $('tbody').html(html);
                //                        site.Temp.Tabla = $('table').DataTable({
                //                            language: {
                //                                url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                //                            }
                //                        });
                //                    },
                //                    error: function (e) { }
                //                });
                //            });
                //        }
                //    }


                //},
                //Process: {

                //    Home: {
                //        Login: function () {
                //            $('#b1').click(function (e) {
                //                $('#wait').fadeIn();
                //                $('.alert').fadeOut();

                //                $.ajax({
                //                    url: '/home/validarusuario',
                //                    type: 'post',
                //                    data: {
                //                        usuario: $('#user').val(),
                //                        password: $('#password').val()
                //                    },
                //                    success: function (r) {
                //                        if (r === 'OK') window.location.href = '/';
                //                        else {
                //                            $('#s1').html('Usuario y/o contraseña no validos');
                //                            $('.alert').fadeIn();
                //                        }
                //                        $('#wait').fadeOut();
                //                    },
                //                    error: function (e) {
                //                        $('#wait').fadeOut();
                //                    }
                //                });
                //            });
                //        }
                //    },


                //    Clientes: {
                //        Listado: {
                //            MostrarPedidos: function () {
                //                $('.modal-title').html('Listado de Pedidos');
                //                $('#md100').html('Cerrar');
                //                $('#md200').hide();
                //                $('#modal').on('hidden.bs.modal', function (e) {
                //                    $('#md200').show();
                //                });
                //                $('#modal').modal('show');
                //            }
                //        },
                //        Ficha: {
                //            MostrarPedidos: function () {
                //                site.Temp.Tabla = $('table').DataTable({
                //                    language: {
                //                        url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                //                    }
                //                });

                //                $('.boton-pedidos').hide();
                //            }
                //        }
                //    },
                //    Productos: {
                //        Listado: {
                //            Cargar: function () {
                //                var href = $('.boton-productos').attr('href');
                //                var valor = href.split('/')[3];
                //                var pagina = parseInt(valor);
                //                $('.boton-productos').attr('href', '/productos/listado/' + (pagina + 1));
                //            }
                //        }
                //    },
                //},
                Temp: {
                    Tabla: null
                }
            };