<script lang="ts">
  import { onMount } from "svelte";
  import { DRAW_FNS, clearContext, CANVAS_DRAW_OPTION_DEFAULTS, type CanvasDrawOptions } from "$lib/logic/drawing";
  import { Mite } from "$lib/logic/mite";

  import { mite_manager } from "$lib/stores/mite-manager";
  // import { resource_manager } from "$lib/stores/resource-manager";

  export let draw_options = CANVAS_DRAW_OPTION_DEFAULTS as CanvasDrawOptions;

  // === canvas options ===
  export let width = 700;
  export let height = 700;
  let canvas: HTMLCanvasElement;
  export const getCanvas = () => canvas;

  let draw_lib: ReturnType<typeof DRAW_FNS>|null = null;
  const render: FrameRequestCallback = () => {
		// draw
		const ctx = canvas.getContext(`2d`);

		if (ctx) {
			draw_lib = draw_lib ?? DRAW_FNS(ctx);
			clearContext(ctx);
			ctx.fillStyle = "white";
			ctx.strokeStyle = "white";
			ctx.font = `${draw_options.font_size}px ${draw_options.font_family}`;
			for (const mite of mite_manager.entities) {
				draw_lib[typeof Mite](mite, draw_options);
			}

			requestAnimationFrame(render);
    }
  };

  // === lifecycle ===
  onMount(async () => {
    if (canvas) {
      requestAnimationFrame(render);
    }

    const Vec2 = (await import("$lib/logic/vec2")).default;
    (window as any).Vec2 = Vec2;

    const mite_lib = await import("$lib/logic/mite");
    for (const [name, exported] of Object.entries(mite_lib)) {
      if (typeof exported === "function") {
        (window as any)[name] = exported;
      }
    }
  });
</script>

<canvas
  bind:this={canvas}
  id="main-canvas"
  class="border border-red-500 rounded-sm z-50 max-h-[80vh]"
  {width}
  {height}
>
  Your browser does not support the required <a
    href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
    >Canvas API</a
  >.
</canvas>
