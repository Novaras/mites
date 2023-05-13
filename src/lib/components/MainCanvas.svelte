<script lang="ts">
	import { onMount } from "svelte";
	import { clearContext } from "$lib/logic/drawing";
    import { MITE_ID_LENGTH, type LiveMite } from "$lib/logic/mite";

	export const MITE_DRAW_RADIUS = 2;
	export const font_size = 14;
	export const font_family = 'consolas sans-serif';

	export let mites: LiveMite[];

	// === execution; main (logic), rendering... ===
	const main = () => {
		for (const mite of mites) {
			mite.update();
		}
	};
	const render: FrameRequestCallback = () => {
		// draw
		const ctx = canvas.getContext(`2d`);

		if (ctx) {
			clearContext(ctx);
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'white';
			ctx.font = `${font_size}px ${font_family}`;
			for (const mite of mites) {
				const {x, y} = mite.position;
				ctx.beginPath();
				ctx.arc(x, y, 3, 0, Math.PI * 2);
				ctx.stroke();

				if (show_labels) {
					const [dx, dy] = [x - ((MITE_ID_LENGTH / 2) * (font_size / 2)), y - 8];
					ctx.fillText(mite.id, dx, dy);
				}
			}
		}
	};

	// === pausing ===
	export let paused: boolean;
	export const advanceSim = main;

	// === labels ===
	export let show_labels: boolean;

	// === canvas options ===
	export let refreshIntervalMS = 50;
	export let width = 700;
	export let height = 700;
	let canvas: HTMLCanvasElement;
	export const getCanvas = () => canvas;

	// === lifecycle ===
	onMount(() => {
		setInterval(() => {
			if (!paused) {
				main();
			}
			if (canvas) {
				requestAnimationFrame(render);
			}
		}, refreshIntervalMS);
	});
</script>

<canvas bind:this={canvas}
		id="main-canvas"
		class="border border-red-500 rounded-sm z-50"
		width="{width}"
		height="{height}">
	Your browser does not support the required <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas API</a>.
</canvas>
