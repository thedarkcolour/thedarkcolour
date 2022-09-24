<script lang='ts'>
	import Renderer from './Renderer.svelte'
	import { onMount } from 'svelte';

	let useWebp = true;

	// Figure out why this doesn't work on Internet Explorer
	// Perhaps Babel will make everything work?
	// Probably will ignore IE support unless someone requests it
	onMount(() => {
		if (!isWebPSupported()) {
			useWebp = false;
			console.log("WebP is not supported!");
		}
	});

	// https://stackoverflow.com/a/27232658/10860617
	function isWebPSupported() {
		const elem = document.createElement('canvas');

		if (!!(elem.getContext && elem.getContext('2d'))) {
			// was able or not to get WebP representation
			return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
		} else {
			// very old browser like IE 8, canvas not supported
			return false;
		}
	}
</script>

<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Rubik'>
<head>
	<title class='title'>thedarkcolour</title>
</head>
<header>
	<ul>
		<li>My Mods</li>
		<li>My Projects</li>
		<li>My Languages</li>
		<li>About Me</li>
	</ul>
</header>

<body>
<div class="hero-bg"> <!--class:webp={useWebp} class:no-webp={!useWebp}-->
	<Renderer/>
	<div class='main-text'>
		<h1>thedarkcolour</h1>
	</div>
</div>
</body>

<style lang='scss'>
	$font-families: "Rubik", serif;

	header {
		max-width: 1440px;

		ul {
			display: flex;
			column-gap: 20px;

      li {
				list-style: none;
        font-family: $font-families;
      }
		}
	}

	.main-text {
		max-height: 600px;
		z-index: 1;
		margin-top: -300px;

		h1 {
			margin-top: auto;
			margin-bottom: auto;
		}
	}

  body {
		margin: 0;
  }

  h1 {
    text-align: center;
    font-family: "Rubik", serif;
  }

  .hero-bg {
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 40%;
    background-color: transparent;

    $gradient: linear-gradient(180deg, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.5) 100%);

    &.webp {
      background-image: $gradient, url("/background.webp");
    }

    &.no-webp {
      background-image: $gradient, url("/background.jpg");
    }

    h1 {
      color: white;
      font-size: 48px;
    }
  }
</style>
