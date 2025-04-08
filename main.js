//Codigo no necesario para el ejercicio, realizado con la documentacion de bootstrap,
//  developerMozilla,w3schools,stackoverflow y Chatgpt.

document.addEventListener("DOMContentLoaded", () => {
    //guardamos el formulario
    const form = document.getElementById("myForm");
    //guardamos el div del alert
    const alertBox = document.getElementById("formAlert");
    //guardamos el boton
    const submitBtn = document.getElementById("submitBtn");
    //si falta alguno no continua el script
    if (!form || !alertBox || !submitBtn) return;
    //seleccionamos todos los inputs, menos los radios
    const inputs = form.querySelectorAll("input, textarea, select");

    //tooltip al inicio, codigo similar al del ejercicio pasado
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    const tooltip = bootstrap.Tooltip.getInstance(submitBtn);
    const alertTooltip = bootstrap.Tooltip.getInstance(formAlert);
    alertTooltip.show();
    tooltip.show();
    //time out para que desaparezcan 
    setTimeout(() => {
        tooltip.hide();
        alertTooltip.hide();
    }, 4000);

    //funcion que verifica si todos los campos (excepto radios) están llenos
    function verifyFields() {
        //el .every es una funcion que le pasamos un valor y un callback que se ejecuta por cada uno de los
        //elemento dentro de un array
        let allFilled = Array.from(inputs).every((input) => {
            const tipo = input.type;
            if (tipo === "radio") return true; // ignorar radios por ahora
            if (tipo === "checkbox") return input.checked;
            return input.value.trim() !== "";
        });

        // Verificar que todos los grupos de radios tengan al menos uno marcado
        const radios = form.querySelectorAll('input[type="radio"]');
        const radiosName = [...new Set(Array.from(radios).map(r => r.name))];
        //en el ejercicio hay solo un grupo de radios, este codigo funciona para verificar que al menos una opcion de
        //cada grupo que exista en el DOM este marcada.
        for (const names of radiosName) {
            //tomamos todos los valores dentro de cada grupo
            const group = form.querySelectorAll(`input[type="radio"][name="${names}"]`);
            //La r es el valor actual que estamos verificando, verificamos si alguno de los valores tiene la property checked 
            const algunoSeleccionado = Array.from(group).some(r => r.checked);
            //si no hay ninguno avisar al codigo que falta alguno
            if (!algunoSeleccionado) {
                allFilled = false;
                break;
            }
        }

        // Mostrar estado
        if (allFilled) {
            alertBox.classList.remove("alert-danger");
            alertBox.classList.add("alert-success");
            alertBox.textContent = "¡Lets send the form!";
            submitBtn.removeAttribute("disabled");
        } else {
            alertBox.classList.remove("alert-success");
            alertBox.classList.add("alert-danger");
            alertBox.textContent = "Some fields are missing";
            submitBtn.setAttribute("disabled", true);
        }
    }

    // Escuchamos cambios
    inputs.forEach((input) => {
        input.addEventListener("input", verifyFields);
        input.addEventListener("change", verifyFields);
    });

    // Llamamos una vez al inicio para validar el estado inicial
    verifyFields();
});