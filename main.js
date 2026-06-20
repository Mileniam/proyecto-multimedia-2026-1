// hay que esperar que el documento este cargado antes de comenzar el script
document.addEventListener('DOMContentLoaded', () => {
    
    /* constante del menu plegable*/
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');
    /* const de menu sin recargar pagina */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    /* const del boton de galeria */
    const toggleBtn = document.getElementById('toggle-btn');
    const infoPanel = document.getElementById('info-panel');
    /* constante del formulario de contactos */
      const form = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const mensajeInput = document.getElementById('mensaje');

    /* abre y cierra el menu colapsado */
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
        });
    }

    /* el evento escuchador del boton de galeria */
if (toggleBtn && infoPanel) {
        toggleBtn.addEventListener('click', () => {
            // Evaluamos si el panel está oculto o visible usando style.display
            if (infoPanel.style.display === 'block') {
                infoPanel.style.display = 'none';
                toggleBtn.textContent = 'Mostrar Descripción Avanzada';
                toggleBtn.style.backgroundColor = 'var(--primary-color)';
            } else {
                infoPanel.style.display = 'block';
                toggleBtn.textContent = 'Ocultar Descripción Avanzada';
                toggleBtn.style.backgroundColor = 'var(--accent-color)'; // Cambio visual interactivo
            }
        });
    }


/* navegacion sin recargar la pagina */
    function navigateToSection(targetSectionId) {
        
        // Desactiva todas las secciones y remueve la clase activa de los enlaces
        sections.forEach(section => {
            section.classList.remove('active-section');
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
        });

        // Activa la sección que es
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }

        // Resalta el nombre del lugar de la pagina en que se esta
        const activeLink = document.querySelector(`.nav-link[data-section="${targetSectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active-link');
        }
        //  Cierra el menú tras hacer clic en una sección
        if (navMenu) {
            navMenu.classList.remove('show-menu');
        }
    }

    /* el escuchador cuando se hace click*/
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // evita la recarga o el salto brusco entre paginas
            event.preventDefault();

            // Obtiene el id de la seccion 
            const targetSectionId = link.getAttribute('data-section');

            // Ejecutar la transición de la SPA que pidio el profe
            navigateToSection(targetSectionId);
        });
    });

    // asegura que la sección de Inicio esté marcada en el menú al cargar la página por primera vez
    navigateToSection('inicio');

    /* validacion en tiempor real del formulario de contactos  */
  

    // Función auxiliar para pintar errores en el DOM
    function setFeedback(inputElement, isValid, errorMessage) {
        const formControl = inputElement.parentElement;
        const errorSpan = formControl.querySelector('.error-message');

        if (isValid) {
            formControl.classList.remove('error');
            formControl.classList.add('success');
            errorSpan.textContent = '';
        } else {
            formControl.classList.remove('success');
            formControl.classList.add('error');
            errorSpan.textContent = errorMessage;
        }
    }

    // Escuchadores en tiempo real cada que se presiona una tecla
    if (nombreInput) {
        nombreInput.addEventListener('input', () => {
            const esValido = validarNombre(nombreInput.value);
            setFeedback(nombreInput, esValido, 'El nombre debe tener al menos 3 caracteres.');
        });
    }

    if (correoInput) {
        correoInput.addEventListener('input', () => {
            const esValido = validarEmail(correoInput.value);
            setFeedback(correoInput, esValido, 'Por favor, introduce un correo electrónico válido.');
        });
    }

    if (mensajeInput) {
        mensajeInput.addEventListener('input', () => {
            const esValido = validarMensaje(mensajeInput.value);
            setFeedback(mensajeInput, esValido, 'El mensaje debe contener mínimo 10 caracteres.');
        });
    }

    // Controlar el envío final del formulario 
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que la SPA intente recargar la página con cada movimiento

            // Validación que todos campos esten bien 
            const nombreValido = validarNombre(nombreInput.value);
            const correoValido = validarEmail(correoInput.value);
            const mensajeValido = validarMensaje(mensajeInput.value);

            /* mensaje si falto algo en algun input */
            setFeedback(nombreInput, nombreValido, 'El nombre debe tener al menos 3 caracteres.');
            setFeedback(correoInput, correoValido, 'Por favor, introduce un correo electrónico válido.');
            setFeedback(mensajeInput, mensajeValido, 'El mensaje debe contener mínimo 10 caracteres.');

            if (nombreValido && correoValido && mensajeValido) {
                alert('¡Formulario enviado con éxito! (esto es un ejemplo de si de verdad se hubiera creado el mesaje)');
                form.reset();
                // limpieza de los formiularios 
                [nombreInput, correoInput, mensajeInput].forEach(input => {
                    input.parentElement.classList.remove('success');
                });
            }
        });
    }

// --- el proceso de la barra de scroll---

    const progressBar = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        // Calculo de cuánto ha bajado el usuario
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (height > 0) {
            const scrolled = (winScroll / height) * 100;
            if (progressBar) {
                progressBar.style.width = scrolled + '%';
            }
        } else {
            if (progressBar) progressBar.style.width = '0%';
        }
    });




});