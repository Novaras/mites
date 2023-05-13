<script lang="ts">
	import { v4 as newUuid } from 'uuid';

	import MainCanvas from "$lib/components/MainCanvas.svelte";
	import Controls from '$lib/components/Controls.svelte';

	import { LiveMite } from "$lib/logic/mite";
    import { randIntBetween } from "$lib/logic/util";

	let paused = false;
	let show_labels = false;

	let main_canvas: MainCanvas;
	const canvas_dim = {
		width: 700,
		height: 700,
	};

	const some_mites = Array.from(
		{ length: 3 },
		(_, k) => LiveMite.from({
			id: newUuid(),
			position: { x: randIntBetween(0, canvas_dim.width), y: randIntBetween(0, canvas_dim.height) },
			velocity: { x: Math.random() * 5, y: Math.random() * 5 },
		})
	);
	console.log(some_mites);

</script>

<main class="grid grid-rows-2 grid-cols-2 justify-items-center">
	<MainCanvas bind:this={main_canvas} mites="{some_mites}" refreshIntervalMS="{200}" paused="{paused}" {...canvas_dim} />
	<Controls bind:paused={paused} bind:show_labels={show_labels} canvas={main_canvas} />
	<div id="info-etc" class="col-span-2">Probably put info down here like tables or graphs etc.</div>
</main>