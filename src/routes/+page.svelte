<script lang="ts">
	import { nanoid } from "nanoid";

	import MainCanvas from "$lib/components/MainCanvas.svelte";
	import Controls from '$lib/components/Controls.svelte';

	import { LiveMite, MITE_ID_LENGTH } from "$lib/logic/mite";
    import { randIntBetween } from "$lib/logic/util";

	let paused = false;
	let show_labels = false;

	let main_canvas: MainCanvas;
	const canvas_dim = {
		width: 900,
		height: 700,
	};

	const some_mites = Array.from(
		{ length: 3 },
		() => LiveMite.from({
			id: nanoid(MITE_ID_LENGTH),
			position: { x: randIntBetween(0, canvas_dim.width), y: randIntBetween(0, canvas_dim.height) },
			velocity: { x: Math.random() * 5, y: Math.random() * 5 },
		})
	);
	console.log(some_mites);

</script>

<main class="grid grid-rows-2 grid-cols-2 justify-items-center">
	<MainCanvas bind:this={main_canvas}
				mites={some_mites}
				refreshIntervalMS={200}
				paused={paused}
				show_labels={show_labels}
				{...canvas_dim} />
	<Controls bind:paused={paused}
			  bind:show_labels={show_labels}
			  canvas={main_canvas} />
	<div id="info-etc" class="col-span-2">Probably put info down here like tables or graphs etc.</div>
</main>