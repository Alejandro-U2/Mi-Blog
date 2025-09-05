// Smooth scrolling para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validación simple
            if (nombre && email && mensaje) {
                alert('¡Gracias por tu mensaje! Te contactaré pronto.');
                this.reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }

    // Efecto de scroll en navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        } else {
            navbar.style.background = '#2c3e50';
        }
    });

    // Animación de aparición en scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const elementsToAnimate = document.querySelectorAll('.article-card, .about-content, .contact-form');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Función para cambiar tema (modo oscuro/claro)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Guardar preferencia en localStorage
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
});

// Función para mostrar más artículos (simulado)
function loadMoreArticles() {
    const articlesGrid = document.querySelector('.articles-grid');
    
    // Simular carga de más artículos
    const newArticle = document.createElement('article');
    newArticle.className = 'article-card';
    newArticle.innerHTML = `
        <img src="https://via.placeholder.com/300x200" alt="Nuevo Artículo" class="article-image">
        <div class="article-content">
            <h3>Nuevo Artículo Cargado</h3>
            <p class="article-date">${new Date().toLocaleDateString('es-ES')}</p>
            <p>Este es un nuevo artículo cargado dinámicamente...</p>
            <a href="#" class="read-more">Leer más</a>
        </div>
    `;
    
    articlesGrid.appendChild(newArticle);
}

// Función de búsqueda simple
function searchArticles(query) {
    const articles = document.querySelectorAll('.article-card');
    const searchQuery = query.toLowerCase();
    
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const content = article.querySelector('p:last-of-type').textContent.toLowerCase();
        
        if (title.includes(searchQuery) || content.includes(searchQuery)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// Utilidades para el blog
const BlogUtils = {
    // Formatear fecha
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Generar slug para URLs
    generateSlug: function(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    },
    
    // Calcular tiempo de lectura
    calculateReadTime: function(text) {
        const wordsPerMinute = 200;
        const words = text.split(' ').length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min de lectura`;
    }
};
