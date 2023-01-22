const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const btnCopiar = document.getElementById("btnCopiar");
const inputTextoTarea = document.getElementById("texto");
const textoEncriptado = document.getElementsByClassName("textoEncriptado");
const textAdvertencia = document.getElementsByClassName("textAdvertencia");
/* La funcion validar lo que hace es verificar que si el texto del texttarea es minuscula nos devolvera true caso contrario sera falso */
function validarTexto(text) {
  if (!text) {
    return false;
  }
  const pattern = /^[a-z\s]+$/;
  if (!pattern.test(text)) {
    return false;
  }
  return true;
}

var textoOriginal = "";
var clicks = 0;
/* La funcion btnEncriptar nos cambiara los caracteres  [a,e,i,o,u] por su respectivo texto para el encriptamiento */
btnEncriptar.addEventListener("click", function () {
  if (validarTexto(inputTextoTarea.value)) {
    if (clicks == 0) {
      if (inputTextoTarea.value !== "") {
        let texto = inputTextoTarea.value;
        if (textoOriginal !== texto) {
          textoOriginal = texto;
          texto = texto.replace(/e/g, "enter");
          texto = texto.replace(/i/g, "imes");
          texto = texto.replace(/a/g, "ai");
          texto = texto.replace(/o/g, "ober");
          texto = texto.replace(/u/g, "ufat");
          let elementos = document.getElementsByClassName("ocultar");
          for (let i = 0; i < elementos.length; i++) {
            elementos[i].style.display = "none";
          }
          textoEncriptado[0].innerHTML = texto;
          textAdvertencia[0].style.color = "#495057";
        }
        btnCopiar.style.visibility = "visible";
      }
      clicks++;
    } else {
      btnEncriptar.disabled = true;
    }
  } else {
    if(inputTextoTarea.value == ""){
      textAdvertencia[0].style.color = "#495057";
      textAdvertencia[0].innerHTML = "Ingrese texto para el encriptado";
    }else{
      textAdvertencia[0].innerHTML = "Solo letras minúsculas y sin acentos";
      textAdvertencia[0].style.color = "red";
    }
  }
});

/* La funcion btnDesencriptar nos cambiara los caracteres  [enter,imes,ai,ober,ufat] por su respectivo texto para el desencriptamiento */
btnDesencriptar.addEventListener("click", function () {
  if (inputTextoTarea.value !== "") {
    let texto = inputTextoTarea.value;
    texto = texto.replace(/enter/g, "e");
    texto = texto.replace(/imes/g, "i");
    texto = texto.replace(/ai/g, "a");
    texto = texto.replace(/ober/g, "o");
    texto = texto.replace(/ufat/g, "u");
    inputTextoTarea.value = texto;
  } else {
    textAdvertencia[0].style.color = "#495057";
    textAdvertencia[0].innerHTML = "Ingrese texto para el desencriptado";
  }
});

/* La funcion btnCopiar copiara todo el texto que este en el textotarea, incluso los espacios de este */
btnCopiar.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(textoEncriptado[0].innerHTML);
    alert("Texto copiado al portapapeles");
  } catch (err) {
    console.error("No se pudo copiar el texto: ", err);
  }
  clicks = 0;
  inputTextoTarea.value = "";
});
