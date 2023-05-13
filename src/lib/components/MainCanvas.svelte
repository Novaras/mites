<script lang="ts">
	import { onMount } from "svelte";
	import { clearContext } from "$lib/logic/drawing";
    import type { LiveMite } from "$lib/logic/mite";

	export let mites: LiveMite[];

	// === canvas options ===
	export let refreshIntervalMS = 50;
	export let width = 700;
	export let height = 700;
	let canvas: HTMLCanvasElement;
	export const getCanvas = () => canvas;

	// === execution; main (logic), rendering... ===
	const main = () => {
		for (const mite of mites) {
			mite.update();
		}
	};
	const render: FrameRequestCallback = () => {
		// draw
		const ctx = canvas.getContext(`2d`)!;
		clearContext(ctx);

		ctx.strokeStyle = 'white';
		for (const mite of mites) {
			ctx.beginPath();
			ctx.arc(mite.position.x, mite.position.y, 3, 0, Math.PI * 2);
			ctx.stroke();
		}
	};

	// === pausing ===
	export let paused: boolean;
	export const advanceSim = main;

	// === lifecycle ===
	onMount(() => {
		setInterval(() => {
			if (!paused) {
				main();
			}
			requestAnimationFrame(render);
		}, refreshIntervalMS);
	});
</script>

<canvas bind:this={canvas}
		id="main-canvas"
		width="{width}"
		height="{height}"
		class="border border-red-500 rounded-sm z-50">
	Your browser does not support the required <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas API</a>.
</canvas>
