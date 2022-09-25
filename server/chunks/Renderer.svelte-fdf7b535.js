import { c as create_ssr_component } from './index-3e01a4ca-33e7ad26.js';

const css = {
  code: "body.svelte-1g6x54r{padding-top:0;margin:0}#main-canvas.svelte-1g6x54r{max-height:600px;width:100%;max-width:none;z-index:-1}",
  map: null
};
function initBuffers(gl) {
  const posBuffer = gl.createBuffer();
  resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  const positions = [2, 2, -2, 2, 2, -2, -2, -2];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  const colors = [1, 0, 1, 1, 0.6, 1, 0.5, 0, 0.7, 0.5, 0, 0.7];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  return { pos: posBuffer, color: colorBuffer };
}
function resizeCanvasToDisplaySize(canvas) {
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
  if (needResize) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
  return needResize;
}
const Renderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const vertexShader = `
		precision mediump float;

		attribute vec3 pos;
		attribute vec3 color;
		varying vec4 v_color;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;
		uniform vec2 cursorPos;

		// https://gist.github.com/yiwenl/745bfea7f04c456e0101
		vec3 hsl(vec3 c) {
    	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
		}

		void main() {
		  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.x, pos.y, pos.z, 2.0);
		  v_color = vec4(hsl(vec3(cursorPos.x *  2.0, 0.7, 1.0)), 1.0);
		}
		`;
  const fragmentShader = `
		precision mediump float;

	  varying vec4 v_color;
    void main() {
			gl_FragColor = v_color;
    }
	`;
  let gl;
  let shaderProgram;
  let programInfo;
  function main() {
    const canvas = document.getElementById("main-canvas");
    gl = canvas.getContext("webgl2", { antialias: true });
    if (gl === null) {
      alert("Unable to initialize WebGL");
      return;
    }
    shaderProgram = loadShaderProgram(vertexShader, fragmentShader);
    programInfo = {
      program: shaderProgram,
      attribLocations: {
        pos: gl.getAttribLocation(shaderProgram, "pos"),
        color: gl.getAttribLocation(shaderProgram, "color")
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "projectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "modelViewMatrix"),
        cursorPos: gl.getUniformLocation(shaderProgram, "cursorPos")
      }
    };
    console.log(programInfo);
    initBuffers(gl);
  }
  function loadShaderProgram(vertexSource, fragmentSource) {
    const vertexShader2 = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader2 = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader2);
    gl.attachShader(program, fragmentShader2);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      alert(`Unable to initialize shader program: 
${gl.getProgramInfoLog(program)}`);
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }
  function compileShader(shaderType, source) {
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(`An error occurred compiling the shaders: 
${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
  if ($$props.main === void 0 && $$bindings.main && main !== void 0)
    $$bindings.main(main);
  $$result.css.add(css);
  return `<body class="${"svelte-1g6x54r"}"><canvas id="${"main-canvas"}" class="${"svelte-1g6x54r"}"></canvas>
</body>`;
});

var Renderer_svelte = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Renderer
});

export { Renderer as R, Renderer_svelte as a };
//# sourceMappingURL=Renderer.svelte-fdf7b535.js.map
