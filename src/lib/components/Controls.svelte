<script lang="ts">
    import type MainCanvas from "./MainCanvas.svelte";

	export let canvas: MainCanvas;
	export let mite_count: number | undefined;
	export let paused: boolean | undefined;
	export let show_labels: boolean | undefined;
</script>

<div id="controls-or-something" class="flex flex-col items-start gap-4">
	{#if paused !== undefined}
		<label for="paused">Paused? <input type="checkbox" id="paused" bind:checked={paused}>
			{#if paused}
				<button class="btn" id="advance-simulation" on:click={canvas.advanceSim}>
					Advance
				</button>
			{/if}
		</label>
	{/if}
	{#if show_labels !== undefined}
		<label for="show-labels" title="Enable to show Mite info in the simulation window.">
			Show Labels? <input type="checkbox" id="show-labels" bind:checked={show_labels}>
		</label>
	{/if}
	{#if mite_count !== undefined}
		<label for="mite-count">
			Mite Count <input type="number" id="mite-count" min="0" max="1000" step="1" bind:value={mite_count}>
		</label>
	{/if}
</div>
