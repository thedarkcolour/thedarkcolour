import { c as create_ssr_component, v as validate_component } from './index-3e01a4ca-33e7ad26.js';
import { R as Renderer } from './Renderer.svelte-fdf7b535.js';

const css = {
  code: 'header.svelte-1c3qa18.svelte-1c3qa18{max-width:1440px}header.svelte-1c3qa18 ul.svelte-1c3qa18{display:flex;column-gap:20px}header.svelte-1c3qa18 ul li.svelte-1c3qa18{list-style:none;font-family:"Rubik", serif}.main-text.svelte-1c3qa18.svelte-1c3qa18{max-height:600px;z-index:1;margin-top:-300px}.main-text.svelte-1c3qa18 h1.svelte-1c3qa18{margin-top:auto;margin-bottom:auto}body.svelte-1c3qa18.svelte-1c3qa18{margin:0}h1.svelte-1c3qa18.svelte-1c3qa18{text-align:center;font-family:"Rubik", serif}.hero-bg.svelte-1c3qa18.svelte-1c3qa18{background-size:cover;background-repeat:no-repeat;background-position-y:40%;background-color:transparent}.hero-bg.svelte-1c3qa18 h1.svelte-1c3qa18{color:white;font-size:48px}',
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<link rel="${"stylesheet"}" href="${"https://fonts.googleapis.com/css?family=Rubik"}">
<head><title class="${"title"}">thedarkcolour</title></head>
<header class="${"svelte-1c3qa18"}"><ul class="${"svelte-1c3qa18"}"><li class="${"svelte-1c3qa18"}">My Mods</li>
		<li class="${"svelte-1c3qa18"}">My Projects</li>
		<li class="${"svelte-1c3qa18"}">My Languages</li>
		<li class="${"svelte-1c3qa18"}">About Me</li></ul></header>

<body class="${"svelte-1c3qa18"}"><div class="${"hero-bg svelte-1c3qa18"}">
	${validate_component(Renderer, "Renderer").$$render($$result, {}, {}, {})}
	<div class="${"main-text svelte-1c3qa18"}"><h1 class="${"svelte-1c3qa18"}">thedarkcolour</h1></div></div>
</body>`;
});

var index_svelte = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': Routes
});

const index = 3;
const file = '_app/immutable/pages/index.svelte-ad345207.js';
const imports = ["_app/immutable/pages/index.svelte-ad345207.js","_app/immutable/chunks/index-03969575.js","_app/immutable/pages/Renderer.svelte-66b5adf2.js"];
const stylesheets = ["_app/immutable/assets/index-99e04483.css","_app/immutable/assets/Renderer-34687d04.css"];

export { file, imports, index, index_svelte as module, stylesheets };
//# sourceMappingURL=3-1c3ee411.js.map
