function verifica_input() {
    let input_error = document.getElementById('input_error');
    let valor_input = input_error.value;

    if (valor_input == 1) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No hay productos seleccionados",
            width: "50%",
            height: "20%",
            showConfirmButton: true
        });
    } else if (valor_input == 2) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Identificacion del operador invalida",
            width: "50%",
            height: "20%",
            showConfirmButton: true
        });
    } else if (valor_input == 3) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El cliente no existe en la base de datos",
            width: "50%",
            height: "20%",
            showConfirmButton: true
        });
    } else if (valor_input == "listo_credito") {
        Swal.fire({
            icon: "success",
            text: "Venta a credito realizada",
            width: "42%",
            height: "20%",
            timer: 1500,
            showConfirmButton: false
        });
    } else if (valor_input == "Venta_realizada_normal") {
        Swal.fire({
            icon: "success",
            text: "Venta realizada",
            width: "42%",
            height: "20%",
            timer: 1500,
            showConfirmButton: false
        });
    } else if (valor_input == "No_hay_productos_seleccionados_para_eliminar") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No hay productos seleccionados para eliminar",
            width: "50%",
            height: "20%",
            showConfirmButton: true
        });
    }
}




function verifica_input_2() {
    let input_error_2 = document.getElementById('input_error_2');
    let valor_input = input_error_2.value;

    if (valor_input == "La_cantidad_solicitada_es_menor_a_la_disponible") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La cantidad solicitada del producto es mayor a la disponible",
            width: "50%",
            height: "20%",
            showConfirmButton: true
        });
    }  else if (valor_input == "La_cantidad_solicitada_es_menor_o_igual_a_cero") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La cantidad solicitada es menor o igual a cero",
            width: "50%",
            height: "20%",
            showConfirmButton: true
        });
    } else if (valor_input == "El_cliente_ya_existe_en_la_base_de_datos") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El cliente ya existe en la base de datos",
            width: "50%",
            height: "20%",
            showConfirmButton: true
        });
    } else if (valor_input == "Se_vaciaron_todos_los_productos_seleccionados") {
        Swal.fire({
            icon: "success",
            text: "Se vaciaron todos los productos seleccionados",
            width: "42%",
            height: "20%",
            timer: 1500,
            showConfirmButton: false
        });
    }
}

function valida_rol_ventas() {
    let Muestra_ventas = document.getElementById('Muestra_ventas');
    let input_validador = document.getElementById('input_valida_ventas');
    valor_input = input_validador.value;

    if (valor_input == "vendedor") {
        Muestra_ventas.href = "/muestra_ventas_vendedor"
    }
}



document.addEventListener("DOMContentLoaded", function() {
    // Llama a la función para realizar la verificación inicial
    verifica_input();
    verifica_input_2();
    valida_rol_ventas();
});



function verifica_tipo_venta() {
    let venta_tipo = document.getElementById('venta_tipo');
    let valor_venta_tipo = venta_tipo.value;
    

    if (valor_venta_tipo == "venta_normal") {

        let forma_pago = document.getElementById('forma_pago');
        forma_pago.style.display = "block"

        let conten_input_2 = document.getElementById('conten_input_2');
        conten_input_2.style.width = "50%"

        let conten_input_1 = document.getElementById('conten_input_1');
        conten_input_1.style.width = "50%"

    } else {
        let forma_pago = document.getElementById('forma_pago');
        forma_pago.style.display = "none"

        let conten_input_2 = document.getElementById('conten_input_2');
        conten_input_2.style.width = "100%"

        let conten_input_1 = document.getElementById('conten_input_1');
        conten_input_1.style.width = "0%"

    }
}



function valida_campos() {
    let doc_operador = document.getElementById('doc_operador').value;
    let doc_cliente = document.getElementById('doc_cliente').value;
    let form = document.querySelector("form");

    form.addEventListener('submit', function(event) {
        event.preventDefault()
    });

    if (doc_operador && doc_cliente) {
        form.submit()
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Faltan campos por completar",
            width: "50%",
            height: "20%",
            timer: 1500,
            showConfirmButton: false
        });
    }
    
}


/* BUSCADOR */
var tablaOriginal;  // Variable para almacenar la tabla original antes de realizar la búsqueda

    $(document).ready(function() {
        // Guardar la tabla original cuando se carga el documento
        tablaOriginal = $('#tabla tbody').html();

        $('#buscador').on('input', function() {
            var busqueda = $(this).val().trim();
            if (busqueda.length > 1) {
                buscarEnTiempoReal(busqueda);
            } else {
                restaurarTabla();
            }
        });
    });

    function buscarEnTiempoReal(busqueda) {
        $.ajax({
            type: 'POST',
            url: '/buscarProductosVentas',
            data: { 'Busqueda': busqueda },
            success: function(response) {
                actualizarTabla(response.result);
            },
            error: function(xhr, status, error) {
                console.error('Error al realizar la búsqueda:', error);
            }
        });
    }

    function restaurarTabla() {
        // Restaurar la tabla a su estado original
        $('#tabla tbody').html(tablaOriginal);
    }

    function actualizarTabla(data) {
        var tabla = $('#tabla tbody');
        tabla.empty();  // Limpiamos la tabla completamente antes de añadir nuevo contenido.
    
        if (data.length > 1) {
            $.each(data, function(index, row) {
                var tr = $('<tr>');  // Creamos una nueva fila para cada elemento de los datos.
    
                for (var i = 1; i < row.length; i++) {
                    var value = row[i];
                    var td = $('<td>').text(value);  // Creamos una nueva celda y le asignamos el valor.
    
                    // Aplicamos estilos específicos a la columna 2.
                    if (i === 3) {
                        td.css({'color': '#6ad46a'});  
                    }
    
                    tr.append(td);  // Añadimos la celda ya configurada a la fila.
                }
    
                // Agregamos los enlaces y botones correspondientes a las últimas columnas de la fila.
                $('<td>').html('<a href="#" class="abrir-modal" data-id="' + row[0] + '"><i id="icono_select_2" class="lni lni-layers"></i></a>').appendTo(tr);
                $('<td>').html('<a href="/selector_una_cantidad/' + row[0] + '"><i id="icono_select_1" class="lni lni-select-cursor"></i></a>').appendTo(tr);
                tabla.append(tr);  // Finalmente, añadimos la fila completa a la tabla.
            });
        } else {
            // Si no hay suficientes datos, mostramos un mensaje indicativo.
            tabla.append('<tr><td colspan="6">No se encontraron resultados</td></tr>');
        }
    
    

        // Vincular eventos click a los enlaces con clase "abrir-modal"
        $('.abrir-modal').off('click').on('click', function(e) {
            e.preventDefault();
            var idProducto = $(this).data('id');
            abrirModal_2(idProducto);
        });
    }

    $(document).ready(function() {
        // Guardar el valor cuando cambie
        $('#doc_cliente').change(function() {
            localStorage.setItem('docCliente', $(this).val());
        });
    
        // Recuperar y establecer el valor cuando la página se carga
        if (localStorage.getItem('docCliente')) {
            $('#doc_cliente').val(localStorage.getItem('docCliente'));
        }
    });








function abrirModal_2(idProducto) {
    // Cargar el contenido de editar_cantidad.html en el modalContenedor

    var btn_enviar = document.getElementById('btn_enviar');
    btn_enviar.style.backgroundColor = "white"
    btn_enviar.style.color = "#358CB4"
    btn_enviar.style.border = "1px solid #358CB4"

    var modalContenedor = document.getElementById("modalContenedor_2");
    modalContenedor.innerHTML = "";

    var conten_registra_pago = document.getElementById("conten_registra_pago");
    conten_registra_pago.style.display = "block"


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            modalContenedor.innerHTML = this.responseText;

            // Mostrar el modal
            modalContenedor.style.display = "block";
            setTimeout( function() {
                conten_registra_pago.style.background = "rgba(36, 36, 36, 0.4)";
            }, 400);
            setTimeout( function() {
                modalContenedor.style.opacity = "1";
            }, 255);
        }
    };

    xhttp.open("GET", "/m_selector_cantidad_p/" + idProducto, true);
    xhttp.send();
}




function cerrarModal_2() {
    /* var modalContenedor = document.getElementById("modalContenedor");
    modalContenedor.style.display = "none"; */

    var conten_registra_pago = document.getElementById("conten_registra_pago");
        var modalContenedor = window.parent.document.getElementById("modalContenedor_2");
            

        setTimeout( function() {
            modalContenedor.style.opacity = "0";
        }, 15);

        setTimeout( function() {
            modalContenedor.style.display = "none";
        }, 215);
        

        setTimeout( function() {
            conten_registra_pago.style.background = "rgba(36, 36, 36, 0.0)";
        }, 80);

        setTimeout( function() {
            conten_registra_pago.style.display = "none";
        }, 400);


        var btn_enviar = document.getElementById('btn_enviar');
        btn_enviar.style.backgroundColor = "#358CB4"
        btn_enviar.style.color = "white"
        btn_enviar.style.border = "none"
}



function abrirModal_3() {
    // Cargar el contenido de editar_cantidad.html en el modalContenedor

    var btn_enviar = document.getElementById('btn_enviar');
    btn_enviar.style.backgroundColor = "white"
    btn_enviar.style.color = "#358CB4"
    btn_enviar.style.border = "1px solid #358CB4"

    var icono_cedula = document.getElementById('icono_cedula')
    icono_cedula.style.display = "none"

    var modalContenedor = document.getElementById("modalContenedor_3");
    modalContenedor.innerHTML = "";

    var conten_registra_pago = document.getElementById("conten_registra_pago");
    conten_registra_pago.style.display = "block"


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            modalContenedor.innerHTML = this.responseText;

            // Mostrar el modal
            modalContenedor.style.display = "block";
            setTimeout( function() {
                conten_registra_pago.style.background = "rgba(36, 36, 36, 0.4)";
            }, 400);
            setTimeout( function() {
                modalContenedor.style.opacity = "1";
            }, 255);
        }
    };

    xhttp.open("GET", "/crearClientes_2", true);
    xhttp.send();
}



function cerrarModal_3() {
    /* var modalContenedor = document.getElementById("modalContenedor");
    modalContenedor.style.display = "none"; */

    var conten_registra_pago = document.getElementById("conten_registra_pago");
    var modalContenedor = window.parent.document.getElementById("modalContenedor_3");
            
    var icono_cedula = document.getElementById('icono_cedula')
    icono_cedula.style.display = "block"

        setTimeout( function() {
            modalContenedor.style.opacity = "0";
        }, 15);

        setTimeout( function() {
            modalContenedor.style.display = "none";
        }, 215);
        

        setTimeout( function() {
            conten_registra_pago.style.background = "rgba(36, 36, 36, 0.0)";
        }, 80);

        setTimeout( function() {
            conten_registra_pago.style.display = "none";
        }, 400);


        var btn_enviar = document.getElementById('btn_enviar');
        btn_enviar.style.backgroundColor = "#358CB4"
        btn_enviar.style.color = "white"
        btn_enviar.style.border = "none"
}
 

function detenerPropagacion(event) {
    event.stopPropagation();
}




/* Muestra el nav laterar */

function abrir_nav() {
    let fondo = document.getElementById('section_sombra');
    let conten_desplegable = document.getElementById('conten_desplegable');
    let icono = document.getElementById('conten_icono_u');
    let nombre = document.getElementById('conten_nombre_2');
    let lado_1 = document.getElementById('lado_1');
    let lado_2 = document.getElementById('lado_2');
    let btn_cerrar = document.getElementById('conten_btn_cerrar');

    fondo.style.display = "block";
    setTimeout(function() {
        fondo.style.backgroundColor = "rgba(36, 36, 36, 0.6)";
    },50);

    setTimeout(function() {
        conten_desplegable.style.left = "85%";
    },400);

    setTimeout(function() {
        icono.style.opacity = "1";
    },750);

    setTimeout(function() {
        nombre.style.opacity = "1";
    },850);

    setTimeout(function() {
        lado_1.style.opacity = "1";
    },950);

    setTimeout(function() {
        lado_2.style.opacity = "1";
    },1050);

    setTimeout(function() {
        btn_cerrar.style.left = "-13%";
    },1150);

}

/* Cierra el nav lateral */

function cerrar_nav() {
    let fondo = document.getElementById('section_sombra');
    let conten_desplegable = document.getElementById('conten_desplegable');
    let icono = document.getElementById('conten_icono_u');
    let nombre = document.getElementById('conten_nombre_2');
    let lado_1 = document.getElementById('lado_1');
    let lado_2 = document.getElementById('lado_2');
    let btn_cerrar = document.getElementById('conten_btn_cerrar');


    setTimeout(function() {
        btn_cerrar.style.left = "140%";
    },50);

    setTimeout(function() {
        lado_2.style.opacity = "0";
    },150);

    setTimeout(function() {
        lado_1.style.opacity = "0";
    },250);

    setTimeout(function() {
        nombre.style.opacity = "0";
    },350);

    setTimeout(function() {
        icono.style.opacity = "0";
    },450);

    setTimeout(function() {
        conten_desplegable.style.left = "100%";
    },700);

    setTimeout(function() {
        fondo.style.backgroundColor = "rgba(36, 36, 36, 0.0)";
    },1050);

    setTimeout(function() {
        fondo.style.display = "none";
    },1410);

}


function detener_Propagacion(event) {
    event.stopPropagation();
}