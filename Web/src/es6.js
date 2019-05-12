﻿let tabla = null;

module.exports = {

        Init: {
            Cliente: {
                Listado: () => {
                    tabla = $('table').DataTable({
                        language: { url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json' },
                        columnDefs: [
                            { orderable: false, targets: [5] },
                        ]
                    });

                    $.ajax({
                        url: 'https://localhost:44394/api/customers/',
                        type: 'get',
                        contentType: 'application/json',
                        beforeSend: () => {
                            $('.ajax-loader').show();
                        },
                        success: function (res) {
                            if (tabla !== null) tabla.destroy();
                            let html = "";
                            for (var i = 0; i < res.length; i++) {
                                html += `<tr data-fila="${res[i].customerID}">
                                <td><a href="/clientes/ficha/${res[i].customerID}">${res[i].customerID}</a></td>
                                <td>${res[i].companyName}</td>
                                <td>
                                    ${res[i].companyName}<br />
                                    <small>${res[i].contactTitle}</small>
                                </td>
                                <td>${res[i].phone}</td>
                                <td>
                                    <small>${res[i].address}</small><br />
                                    <small>${res[i].city} (${res[i].country})</small>
                                </td>
                                <td>
                                    <a class="btn btn-success btn-sm" href="/clientes/editar/${res[i].customerID}">Editar</a>
                                    <button data-nombre="${res[i].companyName}" data-id="${res[i].customerID}" type="button" class="btn btn-danger btn-sm boton-eliminar">Borrar</button>
                                    <button data-id="${res[i].customerID}" class="btn btn-primary btn-sm boton-pedidos">Pedidos</button></td>
                            </tr>`;
                            };


                            $('tbody').html(html);


                            $('.boton-pedidos').click((e) => {
                                const id = $(e.target).data('id');
                                console.log(id);
                                $.ajax({
                                    url: "https://localhost:44394/api/Customers/" + id + "/Orders/",
                                    type: 'get',
                                    contentType: 'application/json',
                                    success: (res) => {
                                        console.log(res);
                                        let htmlTablaPedidos = "";
                                        htmlTablaPedidos += `<table class="table table-striped tabla-pedidos">
                                            <thead>
                                                <tr>
                                                    <td><b>ID Pedido</b></td>
                                                    <td><b>Fecha Pedido</b></td>
                                                    <td><b>Fecha Envio</b></td>
                                                    <td><b>Destinatario</b></td>
                                                    <td><b>Empresa Transporte</b></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>`; 
                                        $('.modal-body').html(htmlTablaPedidos);
                                        let htmlBodyTablaPedidos = "";

                                        for (var i = 0; i < res.length; i++) {
                                            htmlBodyTablaPedidos += `<tr>
                                <td><a href="/pedidos/ficha/${res[i].orderID}">${res[i].orderID}</a></td>
                                <td>${res[i].orderDate}</td>
                                <td>${res[i].shippedDate}</td>
                                <td>
                                    ${res[i].customer.companyName}<br />
                                    <small>${res[i].shipAddress}</small><br />
                                    <small>${res[i].shipCity} (${res[i].shipCountry})</small>
                                </td>
                                <td>${res[i].shipViaNavigation.companyName}</td>
                            </tr>`;
                                        }

                                        console.log(htmlBodyTablaPedidos);

                                        $('.tabla-pedidos tbody').html(htmlBodyTablaPedidos);

                                        $('.modal-title').html('Listado de Pedidos');
                                        $('#md100').html('Cerrar');
                                        $('#md200').hide();
                                        $('#modal').on('hidden.bs.modal', (e) => {
                                            $('#md200').show();
                                        });
                                        $('#modal').modal('show');

                                    },
                                    error: (err) => {
                                        alert("Ha habido un problema y no hemos podido recuperar los pedidos de este cliente. Disculpe las molestias. Por favor: intentelo nuevamente o bien contacte al administrador del sitio.")
                                    },


                                })
                            })


                            $('table').DataTable({
                                language: {
                                    url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                                },
                                columnDefs: [
                                    { orderable: false, targets: [5] },
                                ]
                            });

                            $('.ajax-loader').hide();
                            $('.tabla-clientes').show();
                        },
                        error: (e) => {
                            alert("Ha habido un problema y hemos sido incapaces de recuperar la lista de clientes. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                            $('.ajax-loader').hide();
                        },
                        complete: (e) => {
                            $('.ajax-loader').hide();
                            $('.tabla-clientes').show();
                        }
                    });
                }
            }
        },
        Process: {
                Clientes: {
                    Listado: {
                        MostrarPedidos:
                            () => {
                                $('.modal-title').html('Listado de Pedidos');
                                $('#md100').html('Cerrar');
                                $('#md200').hide();
                                $('#modal').on('hidden.bs.modal', (e) => {
                                    $('#md200').show();
                                });
                                $('#modal').modal('show');
                            }
                    }
                }
        }
}
