<script lang="ts">
    import type MainCanvas from "./MainCanvas.svelte";

	export let canvas: MainCanvas;
	export let paused: boolean | undefined;
	export let show_labels: boolean | undefined;
</script>

<div id="controls-or-something" class="flex flex-col items-start justify-self-start gap-4">
	{#if paused !== undefined}
		<div>
			<label for="paused">Paused? <input type="checkbox" id="paused" bind:checked={paused}></label>
			{#if paused}
				<button class="btn" id="advance-simulation" on:click={canvas.advanceSim}>
					Advance
				</button>
			{/if}
		</div>
	{/if}
	{#if show_labels !== undefined}
		<div>
			<label for="show-labels" title="Enable to show Mite info in the simulation window.">Show Labels? <input type="checkbox" id="show-labels" bind:checked={show_labels}></label>
		</div>
	{/if}
</div>
