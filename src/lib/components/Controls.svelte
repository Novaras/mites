<script lang="ts">
	export let paused: boolean | undefined;
	export let show_labels: boolean | undefined;
	export let show_dead: boolean | undefined;

	export let advanceSim: Function;
</script>

<div id="controls-or-something" class="flex flex-col items-start gap-4 justify-self-start mx-4">
	{#if paused !== undefined}
		<label for="paused">
			Paused? <input type="checkbox" id="paused" bind:checked={paused}>
		</label>
		{#if paused}
			<button class="btn" id="advance-simulation" on:click={() => advanceSim()}>
				Advance
			</button>
		{/if}
	{/if}
	{#if show_labels !== undefined}
		<label for="show-labels" title="Enable to show Mite info in the simulation window.">
			Show Labels? <input type="checkbox" id="show-labels" bind:checked={show_labels}>
		</label>
		{#if show_labels}
			<label for="show-dead" class="ml-4">
				Show Dead Mite Labels? <input type="checkbox" id="show-dead" bind:checked={show_dead}>
			</label>
		{/if}
	{/if}
	<!-- {#if mite_count !== undefined}
		<label for="mite-count">
			Mite Count <input type="number" id="mite-count" min="0" max="1000" step="1" bind:value={mite_count}>
		</label>
	{/if} -->
</div>
