(()=>{"use strict";self.onmessage=a=>{if(a.data.canvas)self.canvas=a.data.canvas,self.ctx=self.canvas.getContext("2d"),self.ctx.imageSmoothingEnabled=!1;else if(a.data.pixels){const{pixels:t,rows:e,cols:s}=a.data;self.canvas.width=s,self.canvas.height=e;const l=self.ctx.createImageData(s,e);for(let a=0;a<t.length;a++){const e=a%s,c=4*(Math.floor(a/s)*s+e),n=t[a];l.data[c]=n.r,l.data[c+1]=n.g,l.data[c+2]=n.b,l.data[c+3]=255}self.ctx.putImageData(l,0,0)}}})();