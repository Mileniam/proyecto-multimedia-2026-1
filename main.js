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
});