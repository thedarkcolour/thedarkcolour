const manifest = {
	appDir: "_app",
	assets: new Set(["background.jpg","background.webp","favicon.png"]),
	mimeTypes: {".jpg":"image/jpeg",".webp":"image/webp",".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-0b673dee.js","imports":["_app/immutable/start-0b673dee.js","_app/immutable/chunks/index-03969575.js"],"stylesheets":[]},
		nodes: [
			() => import('./chunks/0-64b5d4b2.js'),
			() => import('./chunks/1-bc956c3b.js'),
			() => import('./chunks/3-1c3ee411.js'),
			() => import('./chunks/2-cc2ba523.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "Renderer",
				pattern: /^\/Renderer\/?$/,
				names: [],
				types: [],
				path: "/Renderer",
				shadow: null,
				a: [0,3],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
