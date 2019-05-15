module.exports = {
    Init: {
        DataTable:
            (notOrderedColumn) => {
                $('table').DataTable({
                    language: { url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json' },
                    columnDefs: [
                        { orderable: false, targets: [notOrderedColumn] },
                    ]
                });
            },

        Clientes: {
            Listado: () => {
                $.ajax({
                    url: 'https://localhost:44394/api/customers/',
                    type: 'get',
                    contentType: 'application/json',
                    beforeSend: () => {
                        $('.ajax-loader').show();
                    },
                    success: (res) => {
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
                                    <button data-id="${res[i].customerID}" type="button" class="btn btn-danger btn-sm boton-eliminar">Borrar</button>
                                    <button data-id="${res[i].customerID}" class="btn btn-primary btn-sm boton-pedidos">Pedidos</button></td>
                            </tr>`;
                        };

                        $('tbody').html(html);
                        module.exports.Process.Clientes.Listado.MostrarPedidos();
                        module.exports.Init.DataTable(5);
                        $('.ajax-loader').hide();
                        $('.tabla-clientes').show();

                    },
                    error: (e) => {
                        alert("Ha habido un problema y hemos sido incapaces de recuperar la lista de clientes. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                        $('.ajax-loader').hide();
                        window.location.assign(`https://${window.location.host}/`);
                    },
                    complete: (e) => {
                        $('.ajax-loader').hide();
                        $('.tabla-clientes').show();
                    }
                });
            },
            Nuevo: () => {

                $("input.CustomerID").change((e) => {
                    if ($.trim($("input.CustomerID").val()) !== "") {
                        $("span.CustomerID").html("");
                    }
                })

                $("input.CompanyName").change((e) => {
                    if ($.trim($("input.CompanyName").val()) !== "") {
                        $("span.CompanyName").html("");
                    }
                })
                    ,
                    $(".nuevo-cliente").click((e) => {

                        const customerID = $.trim($("input.CustomerID").val());
                        const companyName = $.trim($("input.CompanyName").val());
                        const contactName = $.trim($("input.ContactName").val());
                        const contactTitle = $.trim($("input.ContactTitle").val());
                        const address = $.trim($("input.Address").val());
                        const city = $.trim($("input.City").val());
                        const region = $.trim($("input.Region").val());
                        const postalCode = $.trim($("input.PostalCode").val());
                        const country = $.trim($("input.Country").val());
                        const phone = $.trim($("input.Phone").val());
                        const fax = $.trim($("input.Fax").val());




                        let invalidFields = 0;

                        // Individual field validation and validation message setting.
                        if (customerID === "") {
                            invalidFields++;
                            $("span.CustomerID").html("Este campo es obligatorio. Por favor no lo dejes vacío.");
                        } else {
                            $("span.CustomerID").html("");
                        }

                        if (companyName === "") {
                            invalidFields++;
                            $("span.CompanyName").html("Este campo es obligatorio. Por favor no lo dejes vacío.");
                        } else {
                            $("span.CompanyName").html("");
                        }

                        // Overall check of presence of at least one invalid field.

                        if (invalidFields > 0) {
                            alert("Por favor revisa los textos en rojo debajo de algunos campos que has ingresado. Hay por lo menos uno de ellos que debe ser modificado para poder enviar su solicitud.");
                            $("html, body").animate({
                                scrollTop: 0
                            }, 1000);
                            return;
                        }


                        $.ajax({
                            url: 'https://localhost:44394/api/customers/',
                            type: 'post',
                            data: JSON.stringify({
                                CustomerID: customerID,
                                CompanyName: companyName,
                                ContactName: contactName,
                                ContactTitle: contactTitle,
                                Address: address,
                                City: city,
                                Region: region,
                                PostalCode: postalCode,
                                Country: country,
                                Phone: phone,
                                Fax: fax
                            }),
                            contentType: 'application/json',
                            beforeSend: () => {
                                $('.ajax-loader').show();
                            },
                            success: (res) => {
                                alert("Cliente creado exitosamente. Redireccionando al listado.")
                                window.location.assign(`https://${window.location.host}/clientes/`);
                            },
                            error: (e) => {
                                alert("Ha habido un problema y hemos sido incapaces de agregar tu nuevo cliente. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                                $('.ajax-loader').hide();
                            },
                            complete: (e) => {
                                $('.ajax-loader').hide();
                            }
                        });
                    })
            }

        },

        Pedidos: {
            Listado: () => {
                $.ajax({
                    url: 'https://localhost:44394/api/orders/',
                    type: 'get',
                    contentType: 'application/json',
                    beforeSend: () => {
                        $('.ajax-loader').show();
                    },
                    success: (res) => {
                        let html = "";
                        for (var i = 0; i < res.length; i++) {
                            html += `<tr>
                                                <td><a href="/pedidos/ficha/${res[i].orderID}">${res[i].orderID}</a></td>
                                                <td>${res[i].orderDate !== null ? res[i].orderDate.substring(0, 10) : ""}</td>
                                                <td>${res[i].shippedDate !== null ? res[i].shippedDate.substring(0, 10) : ""}</td>
                                                <td>
                                                    ${res[i].customer.companyName}<br />
                                                    <small>${res[i].shipAddress}</small><br />
                                                    <small>${res[i].shipCity} (${res[i].shipCountry})</small>
                                                </td>
                                                <td>${res[i].shipViaNavigation.companyName}</td>
                                            <td>                                  
                                    <button data-id="${res[i].orderID}" class="btn btn-primary btn-sm boton-productos">Detalle de productos</button></td>
                                                </tr>`;
                        };

                        $('tbody').html(html);
                        module.exports.Process.Pedidos.Listado.MostrarProductos();
                        module.exports.Init.DataTable(5);
                        $('.ajax-loader').hide();
                        $('.tabla-pedidos').show();

                    },
                    error: (e) => {
                        alert("Ha habido un problema y hemos sido incapaces de recuperar la lista de pedidos. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                        $('.ajax-loader').hide();
                        window.location.assign(`https://${window.location.host}/`);
                    },
                    complete: (e) => {
                        $('.ajax-loader').hide();
                        $('.tabla-pedidos').show();
                    }
                });
            },
            Buscar: () => {
                let htmlSelectPaises = "";
                $.ajax({
                    url: 'https://localhost:44394/api/orders/countries',
                    type: 'get',
                    contentType: 'application/json',
                    beforeSend: () => {
                        $('.ajax-loader').show();
                    },
                    success: (res) => {
                        htmlSelectPaises += `<option value="all">Todos los Paises</option>`;
                        for (var i = 0; i < res.length; i++) {
                            htmlSelectPaises += `<option value="${res[i]}">${res[i]}</option>`;
                        }

                        module.exports.Process.Pedidos.Buscar();

                        $(".Country").html(htmlSelectPaises);
                        $(".busqueda-pedidos").show();
                        $('.ajax-loader').hide();
                    },
                    error: () => {
                        alert("Ha habido un problema y hemos sido incapaces de generar el formulario de búsqueda. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                        $('.ajax-loader').hide();
                        window.location.assign(`https://${window.location.host}/`);
                    },
                    complete: () => {
                        $('.ajax-loader').hide();
                    }
                });          
            }
        },

        Productos: {
                Listado: () => {
                    $.ajax({
                        url: 'https://localhost:44394/api/products/',
                        type: 'get',
                        contentType: 'application/json',
                        beforeSend: () => {
                            $('.ajax-loader').show();
                        },
                        success: (res) => {
                            let html = "";
                            for (var i = 0; i < res.length; i++) {
                                html += `<tr>
                                    <td>${res[i].productID}</td>
                                    <td>${res[i].productName}</td>
                                    <td class="text-center">${res[i].category.categoryName}</td>
                                    <td class="text-right">${res[i].unitsInStock}</td>
                                    <td class="text-right">${res[i].unitsOnOrder}</td>
                                    <td class="text-right">€${res[i].unitPrice}</td>
                            </tr>`;
                            };

                            $('tbody').html(html);

                            $('table').DataTable({
                                language: { url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json' }
                            });

                            $('.ajax-loader').hide();
                            $('.tabla-productos').show();

                        },
                        error: (e) => {
                            alert("Ha habido un problema y hemos sido incapaces de recuperar la lista de productos. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                            $('.ajax-loader').hide();
                            window.location.assign(`https://${window.location.host}/`);
                        },
                        complete: (e) => {
                            $('.ajax-loader').hide();
                            $('.tabla-productos').show();
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
                        // Click listener de botón que lleva a modal con pedidos por cliente.
                        $('.boton-pedidos').click((e) => {
                            const id = $(e.target).data('id');
                            $.ajax({
                                url: "https://localhost:44394/api/Customers/" + id + "/Orders/",
                                type: 'get',
                                contentType: 'application/json',
                                success: (res) => {
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

                                    $('.tabla-pedidos tbody').html(htmlBodyTablaPedidos);
                                },
                                error: (err) => {
                                    $('.modal-body').html("Ha habido un problema y no hemos podido recuperar los pedidos de este cliente. Disculpe las molestias. Por favor: intentelo nuevamente o bien contacte al administrador del sitio.")
                                },
                                complete: () => {
                                    $('.modal-title').html('Listado de Pedidos');
                                    $('#md100').html('Cerrar');
                                    $('#md200').hide();
                                    $('#modal').on('hidden.bs.modal', (e) => {
                                        $('#md200').show();
                                    });
                                    $('#modal').modal('show');
                                }
                            })
                        })
                    }
            }
        },

        Pedidos: {
            Listado: {
                MostrarProductos:
                    () => {
                        // Click listener de botón que lleva a modal con pedidos por cliente.
                        $('.boton-productos').click((e) => {
                            const id = $(e.target).data('id');
                            $.ajax({
                                url: "https://localhost:44394/api/Orders/" + id + "/OrderDetails/",
                                type: 'get',
                                contentType: 'application/json',
                                success: (res) => {
                                    let htmlTablaProductos = "";
                                    htmlTablaProductos += `<table class="tabla-productos table table-striped">
                                        <thead>
                                            <tr>
                                                <td><b>ID Producto</b></td>
                                                <td><b>Nombre del producto</b></td>
                                                <td><b>Cantidad</b></td>
                                                <td><b>Precio unitario</b></td>
                                                <td><b>Precio total</b></td>
                                            </tr>
                                        </thead><tbody></tbody>`;
                                    $('.modal-body').html(htmlTablaProductos);
                                    let htmlBodyTablaProductos = "";
                                    let sumaTotal = 0;

                                    for (var i = 0; i < res.length; i++) {
                                        sumaTotal += res[i].unitPrice * res[i].quantity;
                                        htmlBodyTablaProductos += `<tr>
                                            <td>${res[i].productID}</td>
                                            <td>${res[i].product.productName}</td>
                                            <td>${res[i].quantity}</td>
                                            <td>€${res[i].unitPrice}</td>
                                            <td>€${res[i].unitPrice * res[i].quantity}</td>
                                        </tr>`;
                                    }

                                    htmlBodyTablaProductos += `<tr>
                                            <td>TOTAL</td>
                                            <td>€${sumaTotal}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>`;

                                    $('.tabla-productos tbody').html(htmlBodyTablaProductos);
                                },
                                error: (err) => {
                                    $('.modal-body').html("Ha habido un problema y no hemos podido recuperar los productos de este pedido. Disculpe las molestias. Por favor: intentelo nuevamente o bien contacte al administrador del sitio.")
                                },
                                complete: () => {
                                    $('.modal-title').html('Listado de Productos en este pedido');
                                    $('#md100').html('Cerrar');
                                    $('#md200').hide();
                                    $('#modal').on('hidden.bs.modal', (e) => {
                                        $('#md200').show();
                                    });
                                    $('#modal').modal('show');
                                }
                            })
                        })
                    }
            },
            Buscar: () => {
                // Click listener de botón que busca los pedidos en la api de acuerdo a los campos seleccionados y pinta la tabla con los resultados en caso de éxito.
                $('.buscar-pedidos').click((e) => {
                    $(".tabla-pedidos").hide();

                    const customerName = $.trim($('.CustomerName').val());
                    const productName = $.trim($('.ProductName').val());
                    const country = $.trim($('.Country').val());
                    const queryParams = [];
                 
                    if (customerName !== "") queryParams.push(`cliente=${customerName}`);
                    if (productName !== "") queryParams.push(`producto=${productName}`);
                    if (country !== "") queryParams.push(`pais=${country}`);
                    
                    let htmlTablaPedidos = "";
                    const tablaResultados = $("table.dataTable");
                    $.ajax({
                        url: "https://localhost:44394/api/Orders?" + queryParams.join("&"),
                        type: 'get',
                        contentType: 'application/json',
                        beforeSend: () => {
                            $('.ajax-loader').show();
                        },
                        success: (res) => {                          
                            if (tablaResultados.length !== 0) tablaResultados.DataTable().destroy();

                            if (res.length > 0) {
                                for (var i = 0; i < res.length; i++) {
                                    htmlTablaPedidos += `<tr>
                                                <td><a href="/pedidos/ficha/${res[i].orderID}">${res[i].orderID}</a></td>
                                                <td>${res[i].orderDate !== null ? res[i].orderDate.substring(0, 10) : ""}</td>
                                                <td>${res[i].shippedDate !== null ? res[i].shippedDate.substring(0, 10) : ""}</td>
                                                <td>${res[i].customer.companyName}</td>
                                                <td>${res[i].shipViaNavigation.companyName}</td>
                                                <td>
                                        <button data-id="${res[i].orderID}" class="btn btn-primary btn-sm boton-productos">Detalle de productos</button></td>
                                            </tr>`;
                                }
                                $(".tabla-pedidos tbody").html(htmlTablaPedidos);
                                module.exports.Process.Pedidos.Listado.MostrarProductos();
                            }

                            else {
                                $(".tabla-pedidos tbody").html("");
                            }
                                                     
                            $(".tabla-pedidos").show();
                            module.exports.Init.DataTable(5),                      
                            $('.ajax-loader').hide();
                        },
                        error: () => {
                            alert("Ha habido un problema y hemos sido incapaces de generar la búsqueda de pedidos indicada. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                            $('.ajax-loader').hide();
                        },
                        complete: () => {
                            $('.ajax-loader').hide();
                        }

                    })
                })
            }
        }
    }
}