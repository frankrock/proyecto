///Script para obtener los datos necesarios de cada pestaña
/// funciones para crear y obtener datos de estudiantes
function nuevosEstudiantes(Estudiantes,Editando,Eliminando){
  console.log(Estudiantes);
  var objetoJSON = JSON.stringify(Estudiantes);
  localStorage.setItem("Estudiantes",objetoJSON);
  if(Editando){
  alert("Datos Modificados y Guardados.");
  }
  else if(Eliminando) {
    alert("Estudiante Eliminado con exito")
  }
  else{
  alert("Estudiante registrado con exito");
  }
};


function obtenerEstudiantes(){
  var Estudiantes = localStorage.getItem("Estudiantes");
  return JSON.parse(Estudiantes)||{};
};

// funciones para crear y obtener datos de materias
function obtenerAsignaturas(){
    var Asignaturas = localStorage.getItem("Asignaturas");
    return JSON.parse(Asignaturas)||{};
  };

  function nuevosAsignaturas(Asignaturas,Editando,Eliminando){
    var objetoJSON = JSON.stringify(Asignaturas);
    localStorage.setItem("Asignaturas",objetoJSON);

    if(Editando){
    alert("Datos Modificados y Guardados.");
    }
    else if(Eliminando) {
      alert("Asignatura Eliminada con exito")
    }
    else{
    alert("Asignatura registrada");}
  };


// funciones para crear y obtener datos de calificaciones
function obtenerNotas(){
    var Notas = localStorage.getItem("Notas");
    return JSON.parse(Notas)||{};
  };

  function ingresarNotas(DatosNota,Editando,Eliminando){
    var objetoJSON = JSON.stringify(DatosNota);
    localStorage.setItem("Notas",objetoJSON);
    if(Editando){
    alert("Datos Modificados y Guardados.");
    }
    else if(Eliminando) {
      alert("Notas Eliminada con exito")
    }
    else{
    alert("Notas registrada");}
  };