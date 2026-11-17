// Tutor local (sin claves API en el navegador). Si más adelante usas IA, llámala desde un backend propio.
const KB=[[/qu[eé] es.*derivada|derivada\b.*concepto/i,"La derivada mide qué tan rápido cambia f(x): es la pendiente de la recta tangente en un punto. Mueve el punto de tangencia y observa la pendiente."],
[/secante|tangente/i,"La secante une dos puntos de la curva (tasa promedio). Si acercas un punto al otro, queda la tangente: tasa instantánea, o sea f'(x)."],
[/constante/i,"Si f(x)=c, f'(x)=0: la gráfica es horizontal."],[/identica|f\(x\)=x\b/i,"Si f(x)=x, f'(x)=1."],[/lineal|mx/i,"Si f(x)=mx+b, f'(x)=m. La b solo desplaza la recta."],
[/cuadr[aá]tica|x\^?2|x²|v[eé]rtice/i,"Si f(x)=ax²+bx+c, f'(x)=2ax+b. Al resolver 2ax+b=0 obtienes x del vértice."],
[/producto/i,"Producto: (uv)'=u'v+uv'. Ejemplo: (x−1)(x+2) → 1(x+2)+(x−1)1=2x+1."],[/cociente|racional/i,"Cociente: (u/v)'=(u'v−uv')/v², con v≠0. Ejemplo: x/(x²+1) → (1−x²)/(x²+1)²."],
[/ejercicio|practic/i,"Prueba: deriva f(x)=3x²−6x. Respuesta guiada: 6x−6; vale 0 en x=1."],[/gr[aá]fic|interpret/i,"Si f'>0, f crece; si f'<0, decrece; si f'=0, la tangente es horizontal."]];
function ask(t){const m=KB.find(([r])=>r.test(t));return m?m[1]:"Solo puedo ayudarte con derivadas de funciones. Pregunta por la derivada, la tangente, o las reglas de constante, potencia, producto o cociente."}
