// Configuración de la API
const API_BASE_URL = 'http://localhost:3900/api';

// Referencias a elementos del DOM
let currentArticleId = null;

// Funciones utilitarias
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Buscar un contenedor apropiado para el mensaje
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(messageDiv, container.firstChild);
        
        // Remover el mensaje después de 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    }
}

function showLoading(container) {
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            Cargando...
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Funciones de API
async function verificarEstadoAPI() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('status-text');
    
    try {
        const response = await fetch(`${API_BASE_URL}/ruta-de-prueba`);
        if (response.ok) {
            statusDot.classList.add('online');
            statusText.textContent = 'API en línea';
        } else {
            throw new Error('API no responde correctamente');
        }
    } catch (error) {
        statusDot.classList.add('offline');
        statusText.textContent = 'API fuera de línea';
        console.error('Error al verificar API:', error);
    }
}

async function crearArticulo(titulo, contenido) {
    try {
        const response = await fetch(`${API_BASE_URL}/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: titulo,
                contenido: contenido
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            showMessage('Artículo creado exitosamente', 'success');
            return data.articulo;
        } else {
            throw new Error(data.mensaje || 'Error al crear artículo');
        }
    } catch (error) {
        showMessage(`Error al crear artículo: ${error.message}`, 'error');
        throw error;
    }
}

async function listarArticulos() {
    try {
        const response = await fetch(`${API_BASE_URL}/listar`);
        const data = await response.json();
        
        if (data.status === 'success') {
            return data.consulta;
        } else {
            throw new Error(data.mensaje || 'Error al cargar artículos');
        }
    } catch (error) {
        showMessage(`Error al cargar artículos: ${error.message}`, 'error');
        throw error;
    }
}

async function obtenerArticulo(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/articulo/${id}`);
        const data = await response.json();
        
        if (data.status === 'Success') {
            return data.articulo;
        } else {
            throw new Error(data.mensaje || 'Artículo no encontrado');
        }
    } catch (error) {
        showMessage(`Error al obtener artículo: ${error.message}`, 'error');
        throw error;
    }
}

async function actualizarArticulo(id, titulo, contenido) {
    try {
        const response = await fetch(`${API_BASE_URL}/actualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: titulo,
                contenido: contenido
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            showMessage('Artículo actualizado exitosamente', 'success');
            return data.articulo;
        } else {
            throw new Error(data.mensaje || 'Error al actualizar artículo');
        }
    } catch (error) {
        showMessage(`Error al actualizar artículo: ${error.message}`, 'error');
        throw error;
    }
}

async function eliminarArticulo(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/borrar/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        
        if (data.status === 'Success') {
            showMessage('Artículo eliminado exitosamente', 'success');
            return true;
        } else {
            throw new Error(data.mensaje || 'Error al eliminar artículo');
        }
    } catch (error) {
        showMessage(`Error al eliminar artículo: ${error.message}`, 'error');
        throw error;
    }
}

async function subirImagen(id, archivo) {
    try {
        const formData = new FormData();
        formData.append('file0', archivo);

        const response = await fetch(`${API_BASE_URL}/subir-imagen/${id}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            showMessage('Imagen subida exitosamente', 'success');
            return data;
        } else {
            throw new Error(data.mensaje || 'Error al subir imagen');
        }
    } catch (error) {
        showMessage(`Error al subir imagen: ${error.message}`, 'error');
        throw error;
    }
}

// Funciones de UI
function renderizarArticulos(articulos) {
    const container = document.getElementById('articulos-lista');
    
    if (!articulos || articulos.length === 0) {
        container.innerHTML = `
            <div class="loading">
                No hay artículos disponibles
            </div>
        `;
        return;
    }

    container.innerHTML = articulos.map(articulo => `
        <div class="article-card" data-id="${articulo._id}">
            <div class="article-header">
                <h3 class="article-title">${articulo.titulo}</h3>
                <img src="${articulo.imagen}" alt="${articulo.titulo}" class="article-image">

                <div class="article-meta">
                    <small>ID: ${articulo._id}</small><br>
                    <small>Fecha: ${formatDate(articulo.fecha)}</small>
                </div>
            </div>
            <div class="article-body">
                <div class="article-content-preview">
                    ${truncateText(articulo.contenido)}
                </div>
            </div>
            <div class="article-actions">
                <button class="btn-small btn-view" onclick="verArticulo('${articulo._id}')">Ver</button>
                <button class="btn-small btn-edit" onclick="editarArticulo('${articulo._id}')">Editar</button>
                <button class="btn-small btn-delete" onclick="confirmarEliminar('${articulo._id}')">Eliminar</button>
            </div>
        </div>
    `).join('');
}

async function cargarArticulos() {
    const container = document.getElementById('articulos-lista');
    showLoading(container);
    
    try {
        const articulos = await listarArticulos();
        renderizarArticulos(articulos);
    } catch (error) {
        container.innerHTML = `
            <div class="loading">
                Error al cargar artículos: ${error.message}
            </div>
        `;
    }
}

async function buscarArticuloPorId() {
    const input = document.getElementById('buscar-articulo');
    const id = input.value.trim();
    
    if (!id) {
        showMessage('Por favor ingresa un ID de artículo', 'error');
        return;
    }

    const container = document.getElementById('articulos-lista');
    showLoading(container);
    
    try {
        const articulo = await obtenerArticulo(id);
        renderizarArticulos([articulo]);
    } catch (error) {
        container.innerHTML = `
            <div class="loading">
                Artículo no encontrado
            </div>
        `;
    }
}

async function verArticulo(id) {
    try {
        const articulo = await obtenerArticulo(id);
        
        // Crear ventana modal para mostrar el artículo completo
        const modal = document.createElement('div');
        modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${articulo.titulo}</h2>
                    <div class="article-meta">
                        <p><strong>ID:</strong> ${articulo._id}</p>
                        <p><strong>Nombre de imagen:</strong> ${articulo.imagen ? articulo.imagen : 'Sin imagen'}</p>
                        <p><strong>Fecha:</strong> ${formatDate(articulo.fecha)}</p>
                    </div>
                    <div class="article-full-content">
                        <p style="white-space: pre-wrap; line-height: 1.8;">${articulo.contenido}</p>
                        ${articulo.imagen && articulo.imagen !== 'default.png' ? `<div style='margin-top:1rem;'><img src='/imagenes/articulos/${articulo.imagen}' alt='Imagen del artículo' style='max-width:100%;border-radius:8px;'></div>` : ''}
                    </div>
                </div>
            `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        // Cerrar modal
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => {
            document.body.removeChild(modal);
        };
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        };
        
    } catch (error) {
        console.error('Error al ver artículo:', error);
    }
}

async function editarArticulo(id) {
    try {
        const articulo = await obtenerArticulo(id);
        
        // Llenar el formulario de edición
        document.getElementById('edit-id').value = articulo._id;
        document.getElementById('edit-titulo').value = articulo.titulo;
        document.getElementById('edit-contenido').value = articulo.contenido;
        
        // Mostrar modal
        const modal = document.getElementById('modal-editar');
        modal.style.display = 'block';
        
        currentArticleId = id;
        
    } catch (error) {
        console.error('Error al cargar artículo para editar:', error);
    }
}

function confirmarEliminar(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
        eliminarArticuloUI(id);
    }
}

async function eliminarArticuloUI(id) {
    try {
        await eliminarArticulo(id);
        // Recargar la lista de artículos
        await cargarArticulos();
    } catch (error) {
        console.error('Error al eliminar artículo:', error);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Verificar estado de la API
    verificarEstadoAPI();
    
    // Cargar artículos automáticamente
    cargarArticulos();
    
    // Formulario de crear artículo
    const formCrear = document.getElementById('form-crear-articulo');
    if (formCrear) {
        formCrear.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const titulo = document.getElementById('titulo').value.trim();
            const contenido = document.getElementById('contenido').value.trim();
            const imagen = document.getElementById('imagen').files[0];
            
            if (!titulo || !contenido) {
                showMessage('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            try {
                const articulo = await crearArticulo(titulo, contenido);
                
                // Si hay imagen, subirla
                if (imagen && articulo._id) {
                    await subirImagen(articulo._id, imagen);
                }
                
                // Limpiar formulario
                formCrear.reset();
                
                // Recargar artículos
                await cargarArticulos();
                
            } catch (error) {
                console.error('Error al crear artículo:', error);
            }
        });
    }
    
    // Formulario de editar artículo
    const formEditar = document.getElementById('form-editar-articulo');
    if (formEditar) {
        formEditar.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const id = document.getElementById('edit-id').value;
            const titulo = document.getElementById('edit-titulo').value.trim();
            const contenido = document.getElementById('edit-contenido').value.trim();
            const imagen = document.getElementById('edit-imagen').files[0];
            
            if (!titulo || !contenido) {
                showMessage('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            try {
                await actualizarArticulo(id, titulo, contenido);
                
                // Si hay imagen nueva, subirla
                if (imagen) {
                    await subirImagen(id, imagen);
                }
                
                // Cerrar modal
                const modal = document.getElementById('modal-editar');
                modal.style.display = 'none';
                
                // Recargar artículos
                await cargarArticulos();
                
            } catch (error) {
                console.error('Error al actualizar artículo:', error);
            }
        });
    }
    
    // Botón cargar artículos
    const btnCargar = document.getElementById('btn-cargar-articulos');
    if (btnCargar) {
        btnCargar.addEventListener('click', cargarArticulos);
    }
    
    // Botón buscar
    const btnBuscar = document.getElementById('btn-buscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarArticuloPorId);
    }
    
    // Input de búsqueda con Enter
    const inputBuscar = document.getElementById('buscar-articulo');
    if (inputBuscar) {
        inputBuscar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarArticuloPorId();
            }
        });
    }
    
    // Cerrar modal de edición
    const modal = document.getElementById('modal-editar');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
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
});

// Actualizar estado de API cada 30 segundos
setInterval(verificarEstadoAPI, 30000);
