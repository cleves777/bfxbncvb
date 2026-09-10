function mostrarInformacion(nombre, prestamo, interes, meses, cuota) {
    return nombre + " debe pagar $ " + cuota.toFixed(2) + " cada mes por el prestamo de $ " + prestamo + " a " + 
           meses + " meses con el interés del " + interes + "%";
}

const form = document.getElementById('formularioPrestamo');
const textArea = document.getElementById('resultadoPrestamo');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('elNombre').value;
    const prestamo = parseFloat(document.getElementById('elPrestamo').value);
    const meses = parseInt(document.getElementById('losMeses').value);
    const interes = parseFloat(document.getElementById('elInteres').value);

    try {
        const resp = await fetch('/calculadoraUAO', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, prestamo, meses, interes })
        });

        if (!resp.ok) {
            textArea.value = 'Error al procesar la solicitud en el servidor';
            return;
        }

        const data = await resp.json();

        textArea.value = mostrarInformacion(data.nombre, prestamo, interes, meses, data.cuota);

    } catch (error) {
        console.error('Error en la petición:', error);
        textArea.value = 'Error de conexión con el servidor';
    }
});