
  $(window).load(function(){
  console.log("cargando el script index");
  var Editando = false;

  $('#e1').click(Agregar)

  function AgregarATabla(evento){
    var Estudiantes = obtenerEstudiantes();
    var tabla;
    $.each(Estudiantes, function(index, value) {
        tabla = tabla +'<tr>'+
        '<td>'+value.id+'</td>'+
        '<td>'+value.nombre+'</td>'+
        '<td>'+value.correo+'</td>'+
        '<td>'+value.fecha+'</td>'+
        '<td>'+value.sexo+'</td>'+
        '<td><button><img class="imgEditar" id="'+value.id+'"src="img/editar.png"></button></td>'+
        '<td><button><img class="imgBorrar" id="'+value.id+'" src="img/eliminar.png"></button></td>'+
        '</tr>';
      });
    $("#tabla").html($("#tabla").html()+tabla);
    clickImagen();
  }
AgregarATabla();

function clickImagen(){
    $( ".imgEditar" ).each(function() {
      $(this).click(Editar);
    });
    $( ".imgBorrar" ).each(function() {
      $(this).click(Borrar);
    });
}

function Editar(){
  var Estudiantes = obtenerEstudiantes();
  var estu = this.id;
  $("#NEstudiante").val(Estudiantes[estu].nombre);
  $("#CedEstudiante").val(Estudiantes[estu].id);
  $("#CorreoEstu").val(Estudiantes[estu].correo);
  $("#Selector").val(Estudiantes[estu].sexo);
  $("#Fnacimiento").val(Estudiantes[estu].fecha);
  $("#CedEstudiante").attr("readonly", "readonly");
  $("#NEstudiante").focus();
  Editando = true;
}

function Borrar(){
  var result = confirm("Seguro de eliminar el Item seleccionado?");
  if (result == true) {
      var Estudiantes = obtenerEstudiantes();
      var codigo = this.id;
      delete Estudiantes[codigo];
      nuevosEstudiantes(Estudiantes,false,true);
      location.reload();
  }
}

function Agregar(){
    var Estudiantes = obtenerEstudiantes();
    var nombre = $("#NEstudiante").val();
    var cedula = $("#CedEstudiante").val();
    var correo = $("#CorreoEstu").val();
    var a = document.getElementById("Selector");
    var sexo = a.options[a.selectedIndex].text;
    var fecha = $("#Fnacimiento").val();
      if ((nombre == "" || nombre == null||nombre == undefined)||
      (cedula == "" || cedula == null|| cedula == undefined)||
      (correo == "" || correo == null|| correo == undefined)||
      (sexo == "" || sexo == null|| sexo == undefined)||
      (fecha == "" || fecha == null|| fecha == undefined)
      ) {
      return alert("Por favor ingrese todos los campos")};
    if(cedula.length < 10){ return alert("Ingrese un numero de cedula valido")}
    if (Editando == false) {
      if ( Estudiantes[cedula] != null && Estudiantes[cedula] != undefined) { 
        return alert("Este estudiante ya a sido ingresado")
      }
    }
    Estudiantes[cedula] = {id:cedula, nombre:nombre,correo:correo,fecha:fecha,sexo:sexo}
    nuevosEstudiantes(Estudiantes,Editando,false);
    location.reload();
  }

});