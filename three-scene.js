// Vista 3D complementaria: cinta de f(x), derivada en otro plano y tangente.
const T3={ready:0,init(){const el=document.getElementById('three'),w=el.clientWidth,h=el.clientHeight;this.r=new THREE.WebGLRenderer({antialias:true,alpha:true});this.r.setSize(w,h);el.append(this.r.domElement);
 this.s=new THREE.Scene();this.c=new THREE.PerspectiveCamera(50,w/h,.1,100);this.c.position.set(8,6,14);this.o=new THREE.OrbitControls(this.c,this.r.domElement);
 this.s.add(new THREE.GridHelper(24,24,0x2f6bff,0x16316f));this.g=new THREE.Group();this.s.add(this.g);const loop=()=>{requestAnimationFrame(loop);this.o.update();this.r.render(this.s,this.c)};loop();this.ready=1},
update(B,S){if(!this.ready)this.init();const g=this.g;while(g.children.length)g.remove(g.children[0]);const cl=y=>Math.max(-8,Math.min(8,y));
 const P=[],I=[],L=[],D=[];let n=0;for(let x=-8;x<=8.01;x+=.25){const y=cl(B.F(x)??0);P.push(x,y,-1,x,y,1);L.push(new THREE.Vector3(x,y,0));D.push(new THREE.Vector3(x,cl(B.D(x)??0),-2.5));if(n){const a=2*(n-1);I.push(a,a+1,a+2,a+1,a+3,a+2)}n++}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));geo.setIndex(I);g.add(new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0x22d3ee,transparent:true,opacity:.4,side:THREE.DoubleSide})));
 g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(L),new THREE.LineBasicMaterial({color:0x22d3ee})));
 g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(D),new THREE.LineBasicMaterial({color:0xa3e635})));
 const y0=B.F(S.x0)??0,m=B.D(S.x0)??0;g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([-3,3].map(t=>new THREE.Vector3(S.x0+t,cl(y0+m*t),0))),new THREE.LineBasicMaterial({color:0xfb923c})));
 const sp=new THREE.Mesh(new THREE.SphereGeometry(.2),new THREE.MeshBasicMaterial({color:0xfb923c}));sp.position.set(S.x0,cl(y0),0);g.add(sp)}};
