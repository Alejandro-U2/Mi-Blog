# Mi Blog - Versión HTML/CSS

Un blog simple y elegante creado con HTML, CSS y JavaScript vanilla. Diseño responsivo y moderno.

## 🚀 Características

- **Diseño Responsivo**: Se adapta a todos los dispositivos
- **Navegación Suave**: Scroll suave entre secciones
- **Artículos Individuales**: Páginas dedicadas para cada artículo
- **Formulario de Contacto**: Funcional con validación JavaScript
- **Animaciones CSS**: Efectos visuales atractivos
- **SEO Friendly**: Estructura semántica HTML5

## 📁 Estructura del Proyecto

```
Mi-Blog/
├── index.html          # Página principal
├── styles.css          # Estilos principales
├── script.js           # JavaScript funcional
├── articulo1.html      # Artículo: Introducción al Desarrollo Web
├── articulo2.html      # Artículo: CSS Grid vs Flexbox
├── articulo3.html      # Artículo: JavaScript ES6+
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Grid y Flexbox
- **JavaScript ES6+**: Funcionalidad interactiva
- **CSS Animations**: Transiciones y efectos

## 🎨 Características de Diseño

### Colores Principales
- **Primario**: #2c3e50 (Azul oscuro)
- **Secundario**: #3498db (Azul)
- **Gradiente**: #667eea → #764ba2
- **Texto**: #333 / #5a6c7d
- **Fondo**: #f8f9fa

### Tipografía
- **Fuente Principal**: Arial, sans-serif
- **Tamaños**: Responsive con rem/em
- **Peso**: Variable según jerarquía

## 🚀 Cómo Usar

### Opción 1: Abrir Directamente
1. Descargar todos los archivos
2. Abrir `index.html` en cualquier navegador web moderno

### Opción 2: Servidor Local (Recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con Live Server (VS Code)
# Instalar extensión Live Server y hacer clic derecho > "Open with Live Server"
```

### Opción 3: GitHub Pages
1. Subir archivos a un repositorio de GitHub
2. Activar GitHub Pages en la configuración del repositorio
3. Tu blog estará disponible en: `https://tu-usuario.github.io/tu-repositorio`

## 📱 Responsive Design

El blog es completamente responsivo y se adapta a:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### Breakpoints CSS
```css
/* Tablet y móvil */
@media (max-width: 768px) {
    /* Estilos responsivos */
}
```

## ⚡ Funcionalidades JavaScript

### Navegación Suave
```javascript
// Scroll suave entre secciones
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', smoothScroll);
});
```

### Formulario de Contacto
- Validación de campos requeridos
- Mensaje de confirmación
- Reset automático del formulario

### Efectos de Scroll
- Navbar con transparencia dinámica
- Animaciones de aparición en scroll
- Intersection Observer API

## 🎯 Secciones del Blog

### 1. Hero Section
- Mensaje de bienvenida
- Call-to-action hacia artículos
- Fondo con gradiente atractivo

### 2. Artículos
- Grid responsivo de tarjetas
- Imágenes placeholder
- Metadata (fecha, tiempo de lectura)
- Enlaces a artículos completos

### 3. Sobre Mí
- Información personal
- Imagen de perfil
- Descripción profesional

### 4. Contacto
- Formulario funcional
- Validación JavaScript
- Diseño limpio y accesible

## 📝 Artículos Incluidos

1. **Introducción al Desarrollo Web**
   - Conceptos fundamentales
   - HTML, CSS, JavaScript
   - Front-end vs Back-end

2. **CSS Grid vs Flexbox**
   - Comparación detallada
   - Casos de uso
   - Ejemplos prácticos

3. **JavaScript ES6+ Características**
   - Arrow functions
   - Destructuring
   - Promises/Async-Await
   - Módulos ES6

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --text-color: #333;
}
```

### Agregar Nuevos Artículos
1. Crea un nuevo archivo HTML (ej: `articulo4.html`)
2. Copia la estructura de un artículo existente
3. Actualiza el contenido
4. Añade la tarjeta en `index.html`

### Cambiar Imágenes
- Reemplaza las URLs de placeholder con tus imágenes
- Mantén las dimensiones recomendadas
- Optimiza las imágenes para web

## 🌐 Optimización SEO

- **Meta tags** apropiados
- **Estructura semántica** HTML5
- **Títulos jerárquicos** (H1, H2, H3)
- **Alt text** en imágenes
- **URLs amigables**

## 📈 Próximas Mejoras

- [ ] Sistema de comentarios
- [ ] Buscador de artículos
- [ ] Categorías y tags
- [ ] Modo oscuro
- [ ] RSS Feed
- [ ] Compartir en redes sociales
- [ ] Análisis con Google Analytics

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

---

⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub!

## 🆘 Soporte

Si tienes problemas o preguntas:
1. Revisa este README
2. Busca en los Issues existentes
3. Crea un nuevo Issue con detalles del problema

¡Disfruta creando tu blog! 🎉
