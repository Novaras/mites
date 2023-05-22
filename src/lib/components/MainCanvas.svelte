<script lang="ts">
  import { onMount } from "svelte";
  import { clearContext } from "$lib/logic/drawing";
  import { MITE_ID_LENGTH, type Mite } from "$lib/logic/mite";

  export const MITE_DRAW_RADIUS = 1;
  export let font_size = 14;
  export let font_family = "consolas sans-serif";

  export let mites: Mite[];

  // === execution; main (logic), rendering... ===
  const main = () => {
    for (const mite of mites) {
      mite.update();

      // here we wrap the position around for a pacman-like effect
      mite.position.add({ x: width, y: height });
      mite.position.modulo({ x: width, y: height });
    }
  };
  const render: FrameRequestCallback = () => {
    // draw
    const ctx = canvas.getContext(`2d`);

    if (ctx) {
      clearContext(ctx);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
      ctx.font = `${font_size}px ${font_family}`;
      for (const mite of mites) {
        const { x, y } = mite.position;
        ctx.beginPath();
        ctx.arc(x, y, MITE_DRAW_RADIUS, 0, Math.PI * 2);
        ctx.stroke();

        if (show_labels) {
          const [dx, dy] = [x - (MITE_ID_LENGTH / 2) * (font_size / 2), y - 8];
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
  onMount(async () => {
    setInterval(() => {
      if (!paused) {
        main();
      }
      if (canvas) {
        requestAnimationFrame(render);
      }
    }, refreshIntervalMS);

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
