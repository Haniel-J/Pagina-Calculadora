  // Función para abrir el modal
  function openModal() {
    var funcion = document.getElementById("functionInput").value;
    var derivada = derivar(funcion);
    document.getElementById("modalResult").innerHTML = "La derivada es: " + derivada;
    document.getElementById("myModal").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Función para derivar la función
function derivar(funcion) {
    // Expresión regular para buscar términos
    var regex = /([+-]?\d*\.?\d*x(?:\^\d+)?)/g;

    // Array para almacenar los términos derivados
    var derivadas = [];

    // Iterar sobre los términos encontrados en la función
    var match;
    while (match = regex.exec(funcion)) {
        var termino = match[1];

        // Obtener el coeficiente y el exponente del término
        var partes = termino.split("x^");
        var coeficiente = partes.length > 1 ? parseFloat(partes[0]) : partes[0].includes("x") ? parseFloat(partes[0]) : 0;
        var exponente = partes.length > 1 ? parseInt(partes[1]) : partes[0].includes("x") ? 1 : 0;

        // Calcular la derivada del término
        var nuevaDerivada = "";

        // Si el exponente es cero, omitir el término
        if (exponente === 0) {
            continue;
        }

        // Calcular la derivada del término según el exponente
        if (exponente === 1) {
            // Si el exponente es 1, el término derivado es solo el coeficiente
            nuevaDerivada += coeficiente;
        } else {
            // Para exponentes mayores a 1, se multiplica el coeficiente por el exponente y se reduce el exponente en 1
            nuevaDerivada += coeficiente * exponente + "x";

            // Si el nuevo exponente es mayor a 1, agregar el término al exponente
            if (exponente - 1 > 1) {
                nuevaDerivada += "^" + (exponente - 1);
            } else if (exponente - 1 === 1) {
                // Si el nuevo exponente es igual a 1, solo agregar "x"
                nuevaDerivada += " ";
            }
        }

        // Agregar la derivada al array
        derivadas.push(nuevaDerivada);
    }

    // Combinar y formatear las derivadas en una sola cadena
    return derivadas.join(" + ").replace(/\+ -/g, "- ");
}