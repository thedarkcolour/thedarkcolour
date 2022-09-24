<script lang='ts'>
	import * as mat4 from 'gl-matrix/mat4';
	import { onMount } from 'svelte';

	const vertexShader = `
		precision mediump float;

		attribute vec4 pos;
		attribute vec3 color;
		varying vec4 v_color;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		void main() {
		  gl_Position = projectionMatrix * modelViewMatrix * pos;
		  v_color = vec4(color.x, color.y, color.z, 1.0);
		}
		`
	const fragmentShader = `
		precision mediump float;

	  varying vec4 v_color;
    void main() {
			gl_FragColor = v_color;
    }
	`

	let gl: WebGL2RenderingContext;
	let shaderProgram;
	let programInfo;
	let buffers;
	let rotation = 0.0;

	onMount(() => {
		main();
		render();
		//window.addEventListener('resize', () => render());
	});

	export function main() {
		// Initialize WebGL
		const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
		gl = canvas.getContext('webgl2', { antialias: false }) as WebGL2RenderingContext;

		if (gl === null) {
			alert("Unable to initialize WebGL");
			return;
		}

		// Load shaders
		shaderProgram = loadShaderProgram(vertexShader, fragmentShader);
		// Specify uniforms and attributes of shaders
		programInfo = {
			program: shaderProgram,
			attribLocations: {
				pos: gl.getAttribLocation(shaderProgram, 'pos'),
				color: gl.getAttribLocation(shaderProgram, 'color'),
			},
			uniformLocations: {
				projectionMatrix: gl.getUniformLocation(shaderProgram, 'projectionMatrix'),
				modelViewMatrix: gl.getUniformLocation(shaderProgram, 'modelViewMatrix'),
			}
		};
		buffers = initBuffers(gl);
	}

	function render() {

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL)

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		const fieldOfView = 45 * Math.PI / 180.0; // rads
		const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		const projectionMatrix = mat4.create();
		mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
		const modelViewMatrix = mat4.create();

		mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [0.0, 1.0, 0.0]);
		rotation = Math.max(2 * Math.PI, rotation + Math.PI / 120.0);

		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.pos);
		gl.vertexAttribPointer(programInfo.attribLocations.pos, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(programInfo.attribLocations.pos);
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
		gl.vertexAttribPointer(programInfo.attribLocations.color, 3, gl.FLOAT, false, 0.0, 0.0);
		gl.enableVertexAttribArray(programInfo.attribLocations.color);

		gl.useProgram(programInfo.program);

		gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
		gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

		{
			const vertexCount = 4; // number of vertices stored
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexCount);
		}
		requestAnimationFrame(render);
	}

	function loadShaderProgram(vertexSource: string, fragmentSource: string): WebGLProgram {
		const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
		const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

		const program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			alert(`Unable to initialize shader program: \n${gl.getProgramInfoLog(program)}`)
			gl.deleteProgram(program);

			return null;
		}

		return program;
	}

	function compileShader(shaderType: GLenum, source: string): WebGLShader {
		const shader = gl.createShader(shaderType);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert(`An error occurred compiling the shaders: \n${gl.getShaderInfoLog(shader)}`);
			gl.deleteShader(shader);

			return null;
		}

		return shader;
	}

	function initBuffers(gl) {
		const posBuffer = gl.createBuffer();
		resizeCanvasToDisplaySize(gl.canvas);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

		// center of screen is 0.0, 0.0
		const positions = [
			 2.0,  2.0,
			-2.0,  2.0,
			 2.0, -2.0,
			-2.0, -2.0,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

		const colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

		const colors = [
			1.0, 0.0, 1.0, // top right
			1.0, 0.6, 1.0, // top left
			0.5, 0.0, 0.7, // bottom right
			0.5, 0.0, 0.7, // bottom left
		]
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		return {
			pos: posBuffer,
			color: colorBuffer,
		};
	}

	function resizeCanvasToDisplaySize(canvas) {
		// Lookup the size the browser is displaying the canvas in CSS pixels.
		const displayWidth  = canvas.clientWidth;
		const displayHeight = canvas.clientHeight;

		// Check if the canvas is not the same size.
		const needResize = canvas.width  !== displayWidth ||
			canvas.height !== displayHeight;

		if (needResize) {
			// Make the canvas the same size
			canvas.width  = displayWidth;
			canvas.height = displayHeight;
		}

		return needResize;
	}
</script>

<body>
<canvas id='main-canvas'></canvas>
</body>

<style lang='scss'>
	body {
		padding-top: 0;
		margin: 0;
	}

  #main-canvas {
    max-height: 600px;
    width: 100%;
    max-width: none;
    z-index: -1;
  }
</style>
