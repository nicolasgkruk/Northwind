let tabla = null;

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
                        success: function (res) {
                            console.log(res);
                            if (tabla !== null) tabla.destroy();
                            var html = "";
                            for (var i = 0; i < res.length; i++) {
                                html += `<tr data-fila="${res[i].customerID}">
                                <td><a href="/clientes/ficha/${res[i].customerID}">${res[i].customerID}</a></td>
                                <td>${res[i].companyName}</td>
                                <td>
                                    ${res[i].companyName}<br />
                                    <small>${res[i].companyTitle}</small>
                                </td>
                                <td>${res[i].phone}</td>
                                <td>
                                    <small>${res[i].address}</small><br />
                                    <small>${res[i].city} (${res[i].country})</small>
                                </td>
                                <td>
                                    <a class="btn btn-success btn-sm" href="/clientes/editar/${res[i].customerID}">Editar</a>
                                    <button data-nombre="${res[i].companyName}" data-id="${res[i].customerID}" type="button" class="btn btn-danger btn-sm boton-eliminar">Borrar</button>
                                    <button data-id="${res[i].customerID}" class="btn btn-success btn-sm boton-pedidos">Pedidos</button></td>
                            </tr>`;
                            };
                            $('tbody').html(html);
                            $('table').DataTable({
                                language: {
                                    url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                                },
                                columnDefs: [
                                    { orderable: false, targets: [5] },
                                ]
                            });
                        },
                        error: function (e) { }
                    });
                }
            }
        },

}

