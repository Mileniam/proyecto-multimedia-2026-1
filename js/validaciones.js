/**
validaciones del formulario de contacto 
 */

// Mínimo 3 caracteres y que no sean solo espacios en blancos
function validarNombre(valor) {
    const textoLimpio = valor.trim();
    return textoLimpio.length >= 3;
}

/* validadndo que el email sea valido con el arroba */
function validarEmail(valor) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(valor.trim());
}

// minimo 10 caracteres
function validarMensaje(valor) {
    const textoLimpio = valor.trim();
    return textoLimpio.length >= 10;
}