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
                    url: 'http://kruk.works/api/customers/',
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
                                    ${res[i].contactName}<br />
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
                        module.exports.Process.Clientes.Listado.MostrarPedidos();
                        module.exports.Process.Clientes.Listado.Borrar();
                        module.exports.Init.DataTable(5);
                    },
                    error: (e) => {
                        alert("Ha habido un problema y hemos sido incapaces de recuperar la lista de clientes. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                        $('.ajax-loader').hide();
                        window.location.assign(`https://${window.location.host}/`);
                    },
                    complete: () => {
                        $('.ajax-loader').hide();
                        $('.tabla-clientes').show();
                    }
                });
            },
            Nuevo: () => {
                const regx = /^[A-Za-z0-9 _.-]+$/;


                $("input.CustomerID").keyup((e) => {
                    const customerID = $.trim($("input.CustomerID").val());
                    if (customerID !== "" && customerID.length === 5 && regx.test(customerID)) {
                        $("span.CustomerID").html("");
                    } else {
                        $("span.CustomerID").html("Este campo no se puede dejar vacío y además debe tener una longitud exacta de 5 caracteres, sin incluir espacios ni símbolos (solo se permiten números o letras).");
                    }
                })

                $("input.CompanyName").keyup((e) => {
                    if ($.trim($("input.CompanyName").val()) !== "") {
                        $("span.CompanyName").html("");
                    } else {
                        $("span.CompanyName").html("Este campo es obligatorio. Por favor no lo dejes vacío.");
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
                        const country = $("select.Country").val();
                        const phone = $.trim($("input.Phone").val());
                        const fax = $.trim($("input.Fax").val());

                        let invalidFields = 0;

                        if (customerID === "" || customerID.length !== 5 || !regx.test(customerID)) {
                            invalidFields++;
                            $("span.CustomerID").html("Este campo no se puede dejar vacío y además debe tener una longitud exacta de 5 caracteres, sin incluir espacios ni símbolos (solo se permiten números o letras).");
                        } else {
                            $("span.CustomerID").html("");
                        }

                        if (companyName === "") {
                            invalidFields++;
                            $("span.CompanyName").html("Este campo es obligatorio. Por favor no lo dejes vacío.");
                        } else {
                            $("span.CompanyName").html("");
                        }


                        if (invalidFields > 0) {
                            alert("Por favor revisa los textos en rojo debajo de algunos campos que has ingresado. Hay por lo menos uno de ellos que debe ser modificado para poder enviar su solicitud.");
                            $("html, body").animate({
                                scrollTop: 0
                            }, 1000);
                            return;
                        }


                        $.ajax({
                            url: 'http://kruk.works/api/customers/',
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
                                console.log(e);
                                if (e.status === 409) {
                                    alert("Has ingresado un identificador de cliente que ya existe en nuestra base de datos. Por favor intenta con otra cadena de caracteres.");
                                } else {
                                    alert("Ha habido un problema y hemos sido incapaces de agregar tu nuevo cliente. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                                }    
                            },
                            complete: () => {
                                $('.ajax-loader').hide();
                            }
                        });
                    })
            }
        },

        Pedidos: {
            Listado: () => {
                $.ajax({
                    url: 'http://kruk.works/api/orders/',
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

                    },
                    error: (e) => {
                        alert("Ha habido un problema y hemos sido incapaces de recuperar la lista de pedidos. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                        window.location.assign(`https://${window.location.host}/`);
                    },
                    complete: () => {
                        $('.ajax-loader').hide();
                        $('#pedidos').show();
                    }
                });
            },
            Buscar: () => {
                let htmlSelectPaises = "";
                $.ajax({
                    url: 'http://kruk.works/api/orders/countries',
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
                    },
                    error: () => {
                        alert("Ha habido un problema y hemos sido incapaces de generar el formulario de búsqueda. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
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
                    url: 'http://kruk.works/api/products/',
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
                    },
                    error: (e) => {
                        alert("Ha habido un problema y hemos sido incapaces de recuperar la lista de productos. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
                        window.location.assign(`https://${window.location.host}/`);
                    },
                    complete: () => {
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
                                url: "http://kruk.works/api/Customers/" + id + "/Orders/",
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
                    },
                Borrar: () => {
                    // Click listener de botón borrar cliente en el listado.
                    $('.boton-eliminar').click((e) => {
                        const id = $(e.target).data('id');
                        const nombre = $(e.target).data('nombre');                

                        $('.modal-title').html('Eliminar Cliente');
                        $('.modal-body').html(`<br /><h4><b>Nombre: </b>${nombre}</h4><p style="font-size:120%">¿Desea eliminar el cliente?</p>`);
                        $('#md100').html('No');
                        $('#md200').html('Si');

                        //Quitar el evento click antes del agregado del evento click.
                        $('#md200').off();
                        $('#md200').click((e) => {

                            $('.modal-body').html(`<div class="text-center"><img src="https://${window.location.host}/img/ajax-loader.gif" /> Eliminando cliente, por favor espere un momento.</div>`);

                            $.ajax({
                                url: "http://kruk.works/api/Customers/" + id,
                                type: 'delete',
                                contentType: 'application/json',
                                success: (res) => {                                  
                                    $("table").DataTable().row($('tr[data-fila="' + id + '"]')).remove().draw(false);
                                    $('#modal').modal('hide');
                                },
                                error: (err) => {
                                    alert("Ha habido un problema y no hemos podido eliminar este cliente. Disculpe las molestias. Por favor: intentelo nuevamente o bien contacte al administrador del sitio.");
                                    console.log(err);
                                },
                                complete: (e) => {
                                    $('#modal').modal('hide');
                                    // Y también quitar el evento luego del click.
                                    $('#md200').off();
                                }
                            });
                        });
                        $('#modal').modal('show');
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
                                url: "http://kruk.works/api/Orders/" + id + "/OrderDetails/",
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
                        url: "http://kruk.works/api/Orders?" + queryParams.join("&"),
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

                            $("#pedidos").show();
                            module.exports.Init.DataTable(5);
                        },
                        error: () => {
                            alert("Ha habido un problema y hemos sido incapaces de generar la búsqueda de pedidos indicada. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.");
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