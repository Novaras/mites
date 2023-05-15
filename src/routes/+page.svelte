<script lang="ts">
	import { nanoid } from "nanoid";

	import MainCanvas from "$lib/components/MainCanvas.svelte";
	import Controls from '$lib/components/Controls.svelte';

	import { Drone, MITE_ID_LENGTH } from "$lib/logic/mite";
    import { randIntBetween } from "$lib/logic/util";

	let paused = true;
	let show_labels = false;

	let main_canvas: MainCanvas;
	const canvas_dim = {
		width: 1400,
		height: 900,
	};

	let mite_count = 1;

	$: some_mites = Array.from(
		{ length: mite_count },
		() => new Drone({
			id: nanoid(MITE_ID_LENGTH),
			position: { x: randIntBetween(0, canvas_dim.width), y: randIntBetween(0, canvas_dim.height) },
			velocity: { x: Math.random() * 5, y: Math.random() * 5 },
		})
	);

</script>

<main class="mx-8 my-4 grid grid-rows-2 grid-cols-2 justify-items-center gap-4">
	<div class="col-span-2">
		<MainCanvas bind:this={main_canvas}
				mites={some_mites}
				refreshIntervalMS={100}
				paused={paused}
				show_labels={show_labels}
				{...canvas_dim} />
	</div>
	<div id="info-etc">Probably put info down here like tables or graphs etc.</div>
	<Controls bind:paused={paused}
			  bind:show_labels={show_labels}
			  bind:mite_count={mite_count}
			  canvas={main_canvas} />
</main>