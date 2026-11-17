# Eduquest · Laboratorio Matemático Inmersivo (derivadas)
Aplicación web para grado décimo: derivadas de función constante, idéntica, lineal, cuadrática y racional (reglas del producto y del cociente).
**Objetivo pedagógico:** relacionar la función, su derivada y la pendiente de la tangente mediante exploración en tiempo real.
**Tecnologías:** HTML5, CSS3, JavaScript, Plotly.js, Math.js (compila y deriva sin `eval`), KaTeX, Three.js, MediaPipe Hands (CDN).
## Ejecutar
- **XAMPP:** copia la carpeta `Eduquest` en `htdocs` y abre `http://localhost/Eduquest/`.
- **GitHub Pages:** sube el proyecto, activa Pages en Settings → Pages (HTTPS incluido).
## Cámara y gestos
La cámara se pide solo al pulsar «Cámara + gestos» y requiere HTTPS o localhost. MediaPipe únicamente detecta las manos; los gestos, cálculos y gráficas los resuelve la aplicación en JavaScript. Gestos: palma abierta (desplazar), índice mantenido (seleccionar), pinza (mover x₀), dos manos (zoom), puño (restablecer). Sin cámara: mouse y flechas ← →. El modo cámara es visualización aumentada educativa, sin anclaje espacial.
## Estructura
`index.html`, `css/style.css`, `js/` (app, derivatives, graph, three-scene, hand-tracking, chatbot, exercises), `assets/`.
## Chatbot
Tutor local con respuestas predefinidas, visible solo tras iniciar sesión. No hay claves API en el navegador; para usar IA, conéctala desde un backend propio.
