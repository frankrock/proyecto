console.log("script de validaciones cargado");

function deshabilitar(){
  $( 'input' ).each(function(){
    if (this.type == "button" && (this.id != "CancelarEleccion" && this.id != "CancelarEleccion2")) {
      $(this).attr("disabled", true);
    }
  });
  $( 'button' ).each(function(){
      $(this).attr("disabled", true);
  });
}

function habilitar(){
  $( 'input' ).each(function(){
    if (this.type == "button") {
      $(this).attr("disabled", false);
    }
  });

  $( 'button' ).each(function(){
    $(this).attr("disabled", true);
  });
}

function NumCheck(e, field) {
    var keynum = window.event ? window.event.keyCode : e.which;
        if ((keynum == 8))
        return true;
         
        return /\d/.test(String.fromCharCode(keynum));
  }

  function soloLetras(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
       especiales = "8-37-39-46";

       tecla_especial = false;
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
    }

/// funcion para deshabilitar botones en el ingreso de notas//
