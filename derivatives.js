// Cada módulo define la función como texto; Math.js la compila y la deriva (sin eval).
const MODS={
constante:{n:'Función constante',i:'▬',d:'f(x)=c',c:'Una constante no cambia: su gráfica es horizontal y su pendiente es 0.',p:{c:[-5,5,2,.5]},expr:p=>`(${p.c})`,tex:p=>`f(x)=${p.c}`,dtex:p=>`f'(x)=0`,rule:'Derivada de una constante',
 steps:p=>[`f(x)=${p.c}`,`(c)'=0`,`f'(x)=0`],read:'La recta horizontal tiene pendiente 0 en todos sus puntos; la derivada es la recta y=0.',q:'¿Qué pendiente tiene la tangente en cualquier x?'},
identica:{n:'Función idéntica',i:'╱',d:'f(x)=x',c:'La función idéntica devuelve el mismo valor de x; su pendiente es 1.',p:{},expr:p=>'x',tex:p=>'f(x)=x',dtex:p=>"f'(x)=1",rule:'Derivada de x',
 steps:p=>['f(x)=x',"(x)'=1","f'(x)=1"],read:'Por cada unidad que avanza x, y avanza una unidad: pendiente constante 1.',q:'¿Por qué la tangente coincide con la propia recta?'},
lineal:{n:'Función lineal',i:'📈',d:'f(x)=mx+b',c:'La derivada de una recta es su pendiente m, sin importar x.',p:{m:[-4,4,2,.5],b:[-5,5,1,.5]},expr:p=>`(${p.m})*x+(${p.b})`,tex:p=>`f(x)=${p.m}x+${p.b}`,dtex:p=>`f'(x)=${p.m}`,rule:'Regla de la constante por x y de la suma',
 steps:p=>[`f(x)=${p.m}x+${p.b}`,`(mx)'=m,\\quad (b)'=0`,`f'(x)=${p.m}`],read:'El parámetro b desplaza la recta, pero no cambia la derivada.',q:"Cambia b: ¿cambia f'(x)? ¿Por qué?"},
cuadratica:{n:'Función cuadrática',i:'∪',d:'f(x)=ax²+bx+c',c:"La pendiente cambia con x. Donde f'(x)=0 está el vértice.",p:{a:[-3,3,1,.5],b:[-4,4,0,.5],c:[-4,4,0,.5]},expr:p=>`(${p.a})*x^2+(${p.b})*x+(${p.c})`,tex:p=>`f(x)=${p.a}x^2+${p.b}x+${p.c}`,dtex:p=>`f'(x)=${2*p.a}x+${p.b}`,rule:'Regla de la potencia y de la suma',
 steps:p=>[`f(x)=${p.a}x^2+${p.b}x+${p.c}`,`(ax^2)'=2ax,\\quad (bx)'=b,\\quad (c)'=0`,`f'(x)=${2*p.a}x+${p.b}`],read:"Si f'>0 la función crece; si f'<0 decrece; si f'=0 la tangente es horizontal (vértice).",q:'¿En qué x la derivada vale 0 y qué significa en la parábola?'},
racional:{n:'Funciones racionales',i:'÷',d:'Producto y cociente',c:'Ej. 1: regla del producto. Ej. 2: regla del cociente (v≠0).',p:{ej:[1,2,1,1],a:[1,3,1,.5]},
 expr:p=>p.ej==1?`(${p.a})*(x-1)*(x+2)`:`(${p.a})*x/(x^2+1)`,
 tex:p=>p.ej==1?`f(x)=${p.a}(x-1)(x+2)`:`f(x)=\\dfrac{${p.a}x}{x^2+1}`,
 dtex:p=>p.ej==1?`f'(x)=${p.a}(2x+1)`:`f'(x)=\\dfrac{${p.a}(1-x^2)}{(x^2+1)^2}`,
 rule:"Ej.1 producto: (uv)'=u'v+uv' · Ej.2 cociente",
 steps:p=>p.ej==1?[`u=x-1,\\ v=x+2`,`u'=1,\\ v'=1`,`(uv)'=1(x+2)+(x-1)1=2x+1`,`f'(x)=${p.a}(2x+1)`]:[`u=${p.a}x,\\ v=x^2+1`,`u'=${p.a},\\ v'=2x`,`\\left(\\tfrac uv\\right)'=\\dfrac{${p.a}(x^2+1)-${p.a}x\\cdot2x}{(x^2+1)^2}`,`f'(x)=\\dfrac{${p.a}(1-x^2)}{(x^2+1)^2}`],
 read:'Cambia ej (1 o 2) y compara dónde la derivada se anula con los puntos altos o bajos de f.',q:'¿Dónde es horizontal la tangente en el ejemplo 2?'}};
function build(k,p){const e=MODS[k].expr(p),fn=math.compile(e),dn=math.derivative(e,'x'),dc=dn.compile(),ok=v=>Number.isFinite(v)?v:null;
 return{e,dn,F:x=>ok(fn.evaluate({x})),D:x=>ok(dc.evaluate({x}))}}
