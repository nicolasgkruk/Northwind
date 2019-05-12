var site =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/es6.js":
/*!********************!*\
  !*** ./src/es6.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("﻿\r\nmodule.exports = {\r\n        Init: {\r\n            Clientes: {\r\n                Listado: () => {\r\n                    $.ajax({\r\n                        url: 'https://localhost:44394/api/customers/',\r\n                        type: 'get',\r\n                        contentType: 'application/json',\r\n                        beforeSend: () => {\r\n                            $('.ajax-loader').show();                         \r\n                        },\r\n                        success: function (res) {\r\n                            let html = \"\";\r\n                            for (var i = 0; i < res.length; i++) {\r\n                                html += `<tr data-fila=\"${res[i].customerID}\">\r\n                                <td><a href=\"/clientes/ficha/${res[i].customerID}\">${res[i].customerID}</a></td>\r\n                                <td>${res[i].companyName}</td>\r\n                                <td>\r\n                                    ${res[i].companyName}<br />\r\n                                    <small>${res[i].contactTitle}</small>\r\n                                </td>\r\n                                <td>${res[i].phone}</td>\r\n                                <td>\r\n                                    <small>${res[i].address}</small><br />\r\n                                    <small>${res[i].city} (${res[i].country})</small>\r\n                                </td>\r\n                                <td>\r\n                                    <a class=\"btn btn-success btn-sm\" href=\"/clientes/editar/${res[i].customerID}\">Editar</a>\r\n                                    <button data-nombre=\"${res[i].companyName}\" data-id=\"${res[i].customerID}\" type=\"button\" class=\"btn btn-danger btn-sm boton-eliminar\">Borrar</button>\r\n                                    <button data-id=\"${res[i].customerID}\" class=\"btn btn-primary btn-sm boton-pedidos\">Pedidos</button></td>\r\n                            </tr>`;\r\n                            };\r\n\r\n                            $('tbody').html(html);\r\n                            module.exports.Process.Clientes.Listado.MostrarPedidos();                      \r\n                            const tabla = module.exports.Init.DataTable();\r\n                            $('.ajax-loader').hide();\r\n                            $('.tabla-clientes').show();\r\n\r\n                        },\r\n                        error: (e) => {\r\n                            alert(\"Ha habido un problema y hemos sido incapaces de recuperar la lista de clientes. Por favor vuelva a intentarlo nuevamente o contactese con el administrador del sitio.\");\r\n                            $('.ajax-loader').hide();\r\n                        },\r\n                        complete: (e) => {\r\n                            $('.ajax-loader').hide();\r\n                            $('.tabla-clientes').show();\r\n                        }\r\n                    });\r\n                }\r\n            },\r\n            DataTable: \r\n                () => {\r\n                     $('table').DataTable({\r\n                        language: { url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json' },\r\n                        columnDefs: [\r\n                            { orderable: false, targets: [5] },\r\n                        ]\r\n                    });\r\n                }\r\n        },\r\n        Process: {\r\n                Clientes: {\r\n                    Listado: {\r\n                        MostrarPedidos:\r\n                            () => {\r\n                                // Click listener de botón que lleva a modal con pedidos por cliente.\r\n                                $('.boton-pedidos').click((e) => {\r\n                                    const id = $(e.target).data('id');\r\n                                    $.ajax({\r\n                                        url: \"https://localhost:44394/api/Customers/\" + id + \"/Orders/\",\r\n                                        type: 'get',\r\n                                        contentType: 'application/json',\r\n                                        success: (res) => {\r\n                                            let htmlTablaPedidos = \"\";\r\n                                            htmlTablaPedidos += `<table class=\"table table-striped tabla-pedidos\">\r\n                                            <thead>\r\n                                                <tr>\r\n                                                    <td><b>ID Pedido</b></td>\r\n                                                    <td><b>Fecha Pedido</b></td>\r\n                                                    <td><b>Fecha Envio</b></td>\r\n                                                    <td><b>Destinatario</b></td>\r\n                                                    <td><b>Empresa Transporte</b></td>\r\n                                                </tr>\r\n                                            </thead>\r\n                                            <tbody>\r\n                                            </tbody>\r\n                                        </table>`;\r\n                                            $('.modal-body').html(htmlTablaPedidos);\r\n                                            let htmlBodyTablaPedidos = \"\";\r\n\r\n                                            for (var i = 0; i < res.length; i++) {\r\n                                                htmlBodyTablaPedidos += `<tr>\r\n                                                <td><a href=\"/pedidos/ficha/${res[i].orderID}\">${res[i].orderID}</a></td>\r\n                                                <td>${res[i].orderDate}</td>\r\n                                                <td>${res[i].shippedDate}</td>\r\n                                                <td>\r\n                                                    ${res[i].customer.companyName}<br />\r\n                                                    <small>${res[i].shipAddress}</small><br />\r\n                                                    <small>${res[i].shipCity} (${res[i].shipCountry})</small>\r\n                                                </td>\r\n                                                <td>${res[i].shipViaNavigation.companyName}</td>\r\n                                                </tr>`;\r\n                                            }\r\n\r\n                                            $('.tabla-pedidos tbody').html(htmlBodyTablaPedidos);\r\n                                        },\r\n                                        error: (err) => {\r\n                                            $('.modal-body').html(\"Ha habido un problema y no hemos podido recuperar los pedidos de este cliente. Disculpe las molestias. Por favor: intentelo nuevamente o bien contacte al administrador del sitio.\")\r\n                                        },\r\n                                        complete: () => {\r\n                                            $('.modal-title').html('Listado de Pedidos');\r\n                                            $('#md100').html('Cerrar');\r\n                                            $('#md200').hide();\r\n                                            $('#modal').on('hidden.bs.modal', (e) => {\r\n                                                $('#md200').show();\r\n                                            });\r\n                                            $('#modal').modal('show');\r\n                                        }\r\n                                    })\r\n                                })\r\n                            }\r\n                    }\r\n                }\r\n        }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://site/./src/es6.js?");

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./src/es6.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/es6.js */\"./src/es6.js\");\n\n\n//# sourceURL=webpack://site/multi_./src/es6.js?");

/***/ })

/******/ });