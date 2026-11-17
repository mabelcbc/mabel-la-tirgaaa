// MediaPipe solo detecta la mano (21 puntos). La lógica de gestos y las gráficas son de la aplicación.
const Hand={on:0,prev:null,pd:null,t:0,
async start(video,G){if(!navigator.mediaDevices||typeof Hands==='undefined')throw Error('Cámara o MediaPipe no disponibles. Usa HTTPS o localhost.');this.G=G;
 const h=new Hands({locateFile:f=>`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`});h.setOptions({maxNumHands:2,modelComplexity:0,minDetectionConfidence:.6,minTrackingConfidence:.5});h.onResults(r=>this.res(r));
 this.cam=new Camera(video,{onFrame:async()=>{await h.send({image:video})},width:640,height:480});await this.cam.start();this.on=1},
stop(){this.cam&&this.cam.stop();this.on=0;this.G.cursor(null)},
res(r){const L=r.multiHandLandmarks||[],G=this.G;
 if(L.length==2){const d=Math.hypot(L[0][0].x-L[1][0].x,L[0][0].y-L[1][0].y);if(this.pd)G.zoom(this.pd/d);this.pd=d;G.cursor(null);return G.msg('✋✋ Dos manos: zoom')}this.pd=null;
 if(!L.length){this.prev=null;G.cursor(null);return G.msg('Sin manos detectadas')}
 const l=L[0],up=[8,12,16,20].map(t=>l[t].y<l[t-2].y),n=up.filter(Boolean).length,px=1-l[8].x,py=l[8].y;
 if(Math.hypot(l[4].x-l[8].x,l[4].y-l[8].y)<.05){this.prev=null;G.cursor(null);G.setNorm(px);return G.msg('🤏 Pinza: moviendo el punto de tangencia')}
 if(n==4){const c={x:1-l[9].x,y:l[9].y};if(this.prev)G.pan(c.x-this.prev.x,c.y-this.prev.y);this.prev=c;G.cursor(null);return G.msg('🖐 Palma abierta: desplazar la vista')}
 this.prev=null;
 if(n==0){G.cursor(null);if(Date.now()-this.t>1200){this.t=Date.now();G.reset()}return G.msg('✊ Puño: vista restablecida')}
 if(up[0]&&n==1){G.cursor(px,py);return G.msg('☝ Índice: mantén sobre un botón para seleccionarlo')}
 G.cursor(null);G.msg('Mano detectada')}};
