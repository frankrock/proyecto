$(window).load(function(){
var Editando=false;
  console.log("cargando el script de cuentas");

  $("#ObtenerClientes").click(function(){
	deshabilitar();
	$("#tablaClientes").css("display",'block');
	$("#contenidoCuentas").css("opacity", 0.6);
	crearTablaCliente();
  });

  $("#ObtenerCuenta").click(function(){
	deshabilitar();
	$("#tablaMateria").css("display",'block');
	$("#contenidoNotas").css("opacity", 0.6);
	crearTablaMaterias();
  });

  $("#CancelarEleccion").click(cerrarTabla);
  $("#CancelarEleccion2").click(cerrarTabla);

function cerrarTabla(){
	habilitar();
	$(".mostrarTabla").css("display",'none');
	$("#contenidoNotas").css("opacity", 1);
  }

///// Funciones de  Cliente//////////////////////
  function crearTablaCliente(){
  	var Cliente = obtenerCliente();
  	$("#tablaE").html("");
    var tabla='<table style="width:100%" id="tabla">'+
    '<tr><td colspan="6"><h1>Lista de Clientes ingresados</h1></td></tr><tr>'+
        '<th>Cedula</th>'+
        '<th>Nombre</th>'+
        '<th>Correo Electronico</th>'+
        '<th>Edad</th>'+
        '<th>Sexo</th><th>Seleccionar</th><tr>';

    $.each(Cliente, function(index, value) {
        tabla = tabla +'<tr>'+
        '<td>'+value.id+'</td>'+
        '<td>'+value.nombre+'</td>'+
        '<td>'+value.correo+'</td>'+
        '<td>'+value.fecha+'</td>'+
        '<td>'+value.sexo+'</td>'+
        '<td><button><img class="AgregarEstu" id="'+value.id+'"src="img/mas.png"></button></td>'+
        '</tr>';
      });
    tabla= tabla +'</table>';
    $("#tablaC").html($("#tablaE").html()+tabla);
    $( ".AgregarCliente" ).each(function() {
      $(this).click(LlenarCliente);
    });
  }

function LlenarCliente(){
  var Cliente = obtenerCliente();
  var estu = this.id;
  $("#NCliente").val(Cliente[client].nombre);
  $("#CedCliente").val(Cliente[client].id);
  $("#CorreoCliente").val(Cliente[client].correo);
  $("#selectSexo").val(Cliente[client].sexo);
  $("#Fnacimiento").val(Cliente[client].fecha);
  cerrarTabla();
}

//////Funciones de Cuenta ///////
function crearTablaCuenta(){
  	var Cuenta= obtenerCuenta();
  	$("#tablaM").html("");
    var tabla='<table style="width:100%" id="tabla">'+
        '<tr><td colspan="4"><h1>Lista de Cuentas Ingresadas</h1></td></tr>'+
        '<tr><th>Código</th><th>Nombre</th><th>Número Credito</th>'+
        '<th>Editar</th></tr>';

    $.each(Cuenta, function(index, value) {
      tabla = tabla +'<tr>'+
      '<td>'+value.Codigo+'</td>'+
      '<td>'+value.Nombre+'</td>'+
      '<td>'+value.Numero_Credito+'</td>'+
      '<td><button><img class="AgregarMate" id="'+value.Codigo+'"src="img/mas.png"></button></td>'+
      '</tr>';
    });
    tabla= tabla +'</table>';
    $("#tablaM").html($("#tablaM").html()+tabla);
    $( ".AgregarCuenta" ).each(function() {
      $(this).click(LlenarCuenta);
    });
  }

function LlenarCuenta(){
  var Cuenta = obtenerCuenta();
  var id = this.id;
  $("#Codigo").val(Cuenta[id].Codigo);
  $("#Nombre").val(Cuenta[id].Nombre);
  $("#Numero_Credito").val(Cuenta[id].Numero_Credito);
  cerrarTabla();
}

/////funcion para calcular la Cuenta //
$( "input" )
  .keyup(function() {
	if ( this.id!="PParcial" && this.id!="SParcial" && this.id!="Recupera"){return false}
		actualizarNotas();
	})
function actualizarNotas(){
	var num1 = $( '#PParcial' ).val()||0;
		var num2 = $( '#SParcial' ).val()||0;
		var value = (parseFloat(num1) + parseFloat(num2));
		var promedio = value/2;
		var num3 = 0
		var value2 = 0
		var promediofinal =0
		if(promedio < 7 && ($('#SParcial').val() != "") && ($( '#PParcial' ).val() != "") )
		{
			$('#Recupera').removeAttr('disabled');
			num3 = $( '#Recupera' ).val()||0;
			value2 = (parseFloat(num3) + parseFloat(promedio));
			promediofinal = value2/2;
		}
		else{
			$('#Recupera').attr('disabled', 'disabled');
			$( '#Recupera' ).val(0);
		}
		$("#Sumatoria").val(value);
		$("#Promedio").val(promedio);
		$("#RecuSuma").val(value2);
		$("#RecuPro").val(promediofinal);
		if(promedio >= 7 || promediofinal>=7) {$("#textoN").html("Aprobado")};
		if(promedio <7 && promediofinal<7){$("#textoN").html("Reprobado")}
}


/// Funciones para enviar y obtener las cuenta por cobrar de cada cliente//
$("#EnviarCuentas").click(function(){
	var nopasar = false;
	$( 'input' ).each(function(){
		if (this.value == "" || this.value == null || this.value == undefined ) {
			nopasar = true
		}
	});
	if (nopasar){return alert("Por favor asegurese que todos los datos estén ingresados")}
    location.reload();
	guardarDatos();
})

function guardarDatos(){
var tablanotas = obtenerNotas();
 var ID = $("#Nombre").val()+" "+$("#CedCliente").val();
 if (Editando == false) {
  if ( tablanotas[ID] != null && tablanotas[ID] != undefined) { 
    return alert("Estos datos ya han sido ingresados puedes editarlo desde la tabla de abajo")
  }
}
 var notafinal = obtenerNotaFinal();

tablanotas[ID]={
	  CeduE:$("#CedCliente").val(),
	  CorreoE:$("#CorreoCliente").val(),
	  Sexo:$("#selectCliente").val(),
	  Edad:$("#Fnacimiento").val(),
	  MateriaC:$("#Codigo").val(),
	  MateriaN:$("#Nombre").val(),
	  CreditoM:$("#Numero_Credito").val(),
	  PrimerP:$( '#PParcial' ).val(),
	  SegundoP:$( '#SParcial' ).val(),
	  Suma:$("#Sumatoria").val(),
	  Promedio:$("#Promedio").val(),
	  Recuperacion:$( '#Recupera' ).val(),
	  SumaRecu:$("#RecuSuma").val(),
	  NotaFinal:Resultadofinal,
	  Estado:$("#textoN").html(),
  }
 ingresarNotas(tablaCuenta,Editando,false);
}

function obtenerNotaFinal(){ 
 	if(parseFloat($("#Promedio").val())<7){
 		return $("#RecuPro").val()
 	}
 	else{
 		return $("#Promedio").val();
 	}
}
LlenarTabla();
function LlenarTabla(){
	var tablanotas = obtenerNotas();
	var tabla;
	  $.each(tablanotas, function(index, value) {
	      tabla = tabla +'<tr>'+
	      '<td>'+value.CeduE+'</td>'+
	      '<td>'+value.NombreE+'</td>'+
	      '<td>'+value.CorreoE+'</td>'+
	      '<td>'+value.MateriaN+'</td>'+
	      '<td>'+value.CreditoM+'</td>'+
	      '<td>'+value.PrimerP+'</td>'+
	      '<td>'+value.SegundoP+'</td>'+
	      '<td>'+value.Suma+'</td>'+
	      '<td>'+value.Promedio+'</td>'+
	      '<td>'+value.Recuperacion+'</td>'+
	      '<td>'+value.SumaRecu+'</td>'+
	      '<td>'+value.ResultadoFinal+'</td>'+
	      '<td>'+value.Estado+'</td>'+
	      '<td><button><img class="imgEditar" id="'+value.MateriaN+" "+value.CeduE+'"src="img/editar.png"></button></td>'+
	      '<td><button><img class="imgBorrar" id="'+value.MateriaN+" "+value.CeduE+'" src="img/eliminar.png"></button></td>'+
	      '</tr>';
	    });
	  $("#tablaNotas").html($("#tablaNotas").html()+tabla);
  clickImagen();
}

function clickImagen(){
    $( ".imgEditar" ).each(function() {
      $(this).click(Editar);
    });
    $( ".imgBorrar" ).each(function() {
      $(this).click(Borrar);
    });
}

function Editar(){
  var notas = obtenerNotas();
  var estu = this.id;
	$("#CedCliente").val(cuenta[client].CeduC),
	$("#NCliente").val(cuenta[client].NombreC),
	$("#CorreoCliente").val(cuenta[client].CorreoC),
	$("#selectSexo").val(cuenta[client].Sexo),
	$("#Fnacimiento").val(cuenta[client].Edad),
	$("#Codigo").val(cuenta[client].CuentaC),
	$("#Nombre").val(cuenta[client].CuentaN),
	$("#Numero_Credito").val(cuenta[client].CreditoM),
	$( '#PParcial' ).val(cuenta[client].PrimerP),
	$( '#SParcial' ).val(cuenta[client].SegundoP),
	$("#Sumatoria").val(cuenta[client].Suma),
	$("#Promedio").val(cuenta[client].Promedio),
	$( '#Recupera' ).val(cuenta[client].Recuperacion),
	$("#RecuSuma").val(cuenta[client].SumaRecu),
	$("#textoN").html(cuenta[client].Estado),
	 $("#PParcial").focus();
  Editando = true;
  actualizarNotas();
}

function Borrar(){
  var result = confirm("Seguro de eliminar el Item seleccionado?");
  if (result == true) {
  var notas = obtenerCuentaas();
  var estu = this.id;
      delete cuenta[client];
      ingresarNotas(notas,false,true);
      location.reload();
  }
}

});