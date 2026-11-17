const Graph={gd:null,draw(B,S){const xs=[],f=[],d=[];for(let x=-15;x<=15.001;x+=.05){xs.push(x);f.push(B.F(x));d.push(B.D(x))}
 const y0=B.F(S.x0),m=B.D(S.x0),tl=[-15,15].map(x=>y0+m*(x-S.x0)),v=k=>S.show[k]?true:'legendonly';
 const tr=[{x:xs,y:f,name:'f(x)',line:{color:'#22d3ee',width:3},visible:v('f')},{x:xs,y:d,name:"f'(x)",line:{color:'#a3e635',width:3},visible:v('d')},
 {x:[-15,15],y:tl,name:'tangente',line:{color:'#fb923c',dash:'dash'},visible:v('t')},{x:[S.x0],y:[y0],mode:'markers',name:'P',marker:{size:11,color:'#fb923c'},visible:v('t')}];
 const ax={gridcolor:'#1d3a85',zerolinecolor:'#fff'};
 Plotly.react('graph',tr,{uirevision:1,paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{color:'#fff'},margin:{t:8,l:36,r:8,b:30},xaxis:{range:[-6,6],...ax},yaxis:{range:[-8,8],...ax},legend:{orientation:'h',y:1.08},dragmode:'pan'},{responsive:true,scrollZoom:true,displaylogo:false});
 this.gd=document.getElementById('graph')},
rng(){const l=this.gd._fullLayout;return{x:[...l.xaxis.range],y:[...l.yaxis.range]}},
set(r){Plotly.relayout(this.gd,{'xaxis.range':r.x,'yaxis.range':r.y})},
pan(dx,dy){const r=this.rng(),w=r.x[1]-r.x[0],h=r.y[1]-r.y[0];this.set({x:[r.x[0]-dx*w,r.x[1]-dx*w],y:[r.y[0]+dy*h,r.y[1]+dy*h]})},
zoom(f){f=Math.max(.5,Math.min(2,f));const r=this.rng(),c=a=>(a[0]+a[1])/2,s=a=>(a[1]-a[0])*f/2;this.set({x:[c(r.x)-s(r.x),c(r.x)+s(r.x)],y:[c(r.y)-s(r.y),c(r.y)+s(r.y)]})},
reset(){this.set({x:[-6,6],y:[-8,8]})}};
