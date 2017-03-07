  $(window).load(function(){
  console.log("cargando el script de asignaturas");
  var Editando = false;

function AgregarATabla(){
  var Asignaturas = obtenerAsignaturas();
  var tabla;
  $.each(Asignaturas, function(index, value) {
      tabla = tabla +'<tr>'+
      '<td>'+value.Codigo+'</td>'+
      '<td>'+value.Nombre+'</td>'+
      '<td>'+value.Numero_Credito+'</td>'+
      '<td><button><img class="imgEditar" id="'+value.Codigo+'"src="img/editar.png"></button></td>'+
      '<td><button><img class="imgBorrar" id="'+value.Codigo+'" src="img/eliminar.png"></button></td>'+
      '</tr>';
    });
  $("#tabla").html($("#tabla").html()+tabla);
  clickImagen();
}
AgregarATabla()

function clickImagen(){
    $( ".imgEditar" ).each(function() {
      $(this).click(Editar);
    });
    $( ".imgBorrar" ).each(function() {
      $(this).click(Borrar);
    });
}

function Editar(){
  var asignaturas = obtenerAsignaturas();
  var id = this.id;
  $("#Codigo").val(asignaturas[id].Codigo);
  $("#Nombre").val(asignaturas[id].Nombre);
  $("#Numero_Credito").val(asignaturas[id].Numero_Credito);
  $("#Codigo").attr("readonly", "readonly");
  $("#Nombre").focus();
  Editando = true;
}

function Borrar(){
  var result = confirm("Seguro de eliminar el Item seleccionado?");
  if (result == true) {
      var asignaturas = obtenerAsignaturas();
      var codigo = this.id;
      delete asignaturas[codigo];
      nuevosAsignaturas(asignaturas,false,true);
      location.reload();
  }
}

function Agregar(){
  var Codigo=  $("#Codigo").val();
  var nombre = $("#Nombre").val();
  var Credito = $("#Numero_Credito").val();
  var asignaturas = obtenerAsignaturas();

  if ((Codigo == "" || Codigo == null||Codigo == undefined) ||
      (nombre == "" || nombre == null|| nombre == undefined)||
      (Credito == "" || Credito == null|| Credito == undefined)
      ) {
      return alert("Por favor ingrese todos los campos")
    }

  if (Editando == false) {
    if ( asignaturas[Codigo] != null && asignaturas[Codigo] != undefined) { 
      return alert("El codigo ya está siendo usado")
    }
    else{
        var elemento = false;
        $.each(asignaturas, function(index, value){
          if(value.Nombre == nombre){
            elemento = value;
          }
        });
        if(elemento!= false){
        return alert("La materia ya está registrada y su codigo es "+elemento.Codigo)
      }
    }
  }


  asignaturas[Codigo] = {Codigo: Codigo,Nombre: nombre, Numero_Credito: Credito}
  nuevosAsignaturas(asignaturas,Editando,false)
  location.reload();
}



$("#enviarMateria").click(Agregar);

});