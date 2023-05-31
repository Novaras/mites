<script lang="ts">
	import { onMount } from "svelte"

	import MainCanvas from "$lib/components/MainCanvas.svelte";
	import Controls from '$lib/components/Controls.svelte';

	import { Queen } from "$lib/logic/mite";
	import { mite_manager } from "$lib/stores/mite-manager";

	let paused = true;
	let show_labels = false;

	let main_canvas: MainCanvas;
	const canvas_dim = {
		width: 1600,
		height: 900,
	};

	let show_dead = true;

	onMount(() => {
		mite_manager.add(new Queen({
			position: { x: canvas_dim.width / 2, y: canvas_dim.height / 2 },
		}));
	})

	const updateMites = () => {
		!paused && mite_manager.update();
	}

	console.log(mite_manager);

</script>

<main class="mx-8 my-4 grid grid-rows-2 grid-cols-2 justify-items-center gap-4">
	<div class="col-span-2">
		<MainCanvas bind:this={main_canvas}
					refreshIntervalMS={100}
					draw_options={{ show_dead, show_labels }}
					{...canvas_dim}
					on:frameRendered={updateMites} />
	</div>
	<div id="info-etc">Probably put info down here like tables or graphs etc.</div>
	<Controls bind:paused={paused}
			  bind:show_labels={show_labels}
			  bind:show_dead={show_dead}
			  advanceSim={() => mite_manager.update()} />
</main>