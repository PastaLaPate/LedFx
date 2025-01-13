(()=>{"use strict";self.onmessage=e=>{if(self.postMessage("worker-ready"),e.data.canvas){if(self.canvas=e.data.canvas,self.gl=self.canvas.getContext("webgl")||self.canvas.getContext("experimental-webgl"),!self.gl)return void console.error("WebGL not supported");self.initWebGL()}else if(e.data.pixels){const{pixels:l,rows:r,cols:s}=e.data;self.canvas.width=s,self.canvas.height=r,self.gl.viewport(0,0,s,r),self.updateTexture(l,r,s)}},self.initWebGL=()=>{const e=self.createShader(self.gl.VERTEX_SHADER,"\n    attribute vec2 a_position;\n    attribute vec2 a_texCoord;\n    varying vec2 v_texCoord;\n    void main() {\n      gl_Position = vec4(a_position, 0.0, 1.0);\n      v_texCoord = a_texCoord;\n    }\n  "),l=self.createShader(self.gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    varying vec2 v_texCoord;\n    uniform sampler2D u_texture;\n    void main() {\n      gl_FragColor = texture2D(u_texture, v_texCoord);\n    }\n  "),r=self.createProgram(e,l);self.gl.useProgram(r);const s=self.gl.getAttribLocation(r,"a_position"),t=self.gl.getAttribLocation(r,"a_texCoord"),f=self.gl.createBuffer();self.gl.bindBuffer(self.gl.ARRAY_BUFFER,f),self.gl.bufferData(self.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),self.gl.STATIC_DRAW);const a=self.gl.createBuffer();self.gl.bindBuffer(self.gl.ARRAY_BUFFER,a),self.gl.bufferData(self.gl.ARRAY_BUFFER,new Float32Array([0,1,1,1,0,0,0,0,1,1,1,0]),self.gl.STATIC_DRAW),self.texture=self.gl.createTexture(),self.gl.bindTexture(self.gl.TEXTURE_2D,self.texture),self.gl.texParameteri(self.gl.TEXTURE_2D,self.gl.TEXTURE_WRAP_S,self.gl.CLAMP_TO_EDGE),self.gl.texParameteri(self.gl.TEXTURE_2D,self.gl.TEXTURE_WRAP_T,self.gl.CLAMP_TO_EDGE),self.gl.texParameteri(self.gl.TEXTURE_2D,self.gl.TEXTURE_MIN_FILTER,self.gl.NEAREST),self.gl.texParameteri(self.gl.TEXTURE_2D,self.gl.TEXTURE_MAG_FILTER,self.gl.NEAREST),self.gl.bindBuffer(self.gl.ARRAY_BUFFER,f),self.gl.enableVertexAttribArray(s),self.gl.vertexAttribPointer(s,2,self.gl.FLOAT,!1,0,0),self.gl.bindBuffer(self.gl.ARRAY_BUFFER,a),self.gl.enableVertexAttribArray(t),self.gl.vertexAttribPointer(t,2,self.gl.FLOAT,!1,0,0)},self.createShader=(e,l)=>{const r=self.gl.createShader(e);return self.gl.shaderSource(r,l),self.gl.compileShader(r),self.gl.getShaderParameter(r,self.gl.COMPILE_STATUS)?r:(console.error("Error compiling shader:",self.gl.getShaderInfoLog(r)),self.gl.deleteShader(r),null)},self.createProgram=(e,l)=>{const r=self.gl.createProgram();return self.gl.attachShader(r,e),self.gl.attachShader(r,l),self.gl.linkProgram(r),self.gl.getProgramParameter(r,self.gl.LINK_STATUS)?r:(console.error("Error linking program:",self.gl.getProgramInfoLog(r)),self.gl.deleteProgram(r),null)},self.updateTexture=(e,l,r)=>{self.gl.bindTexture(self.gl.TEXTURE_2D,self.texture),self.gl.texImage2D(self.gl.TEXTURE_2D,0,self.gl.RGBA,r,l,0,self.gl.RGBA,self.gl.UNSIGNED_BYTE,new Uint8Array(e.flatMap((e=>[e.r,e.g,e.b,255])))),self.gl.clear(self.gl.COLOR_BUFFER_BIT),self.gl.drawArrays(self.gl.TRIANGLES,0,6)}})();