import { Drone, Mite, Queen } from "./mite";

export const clearContext = (ctx: CanvasRenderingContext2D) => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

export type CanvasDrawOptions = {
    show_labels?: boolean,
    show_dead?: boolean,
    font_size?: number,
    font_family?: string
};
export const CANVAS_DRAW_OPTION_DEFAULTS: Required<CanvasDrawOptions> = {
    font_family: 'consolas sans-serif',
    font_size: 18,
    show_labels: false,
    show_dead: false
};

export const DRAW_FNS = (ctx: CanvasRenderingContext2D) => ({
    [typeof Mite]: (mite: Mite, draw_options?: CanvasDrawOptions) => {
        const canvas_options = { ...CANVAS_DRAW_OPTION_DEFAULTS, ...draw_options };
        const miteTypeDrawInfo = (mite: Mite) => {
            const info = (() => {
                switch (mite.constructor) {
                    case Drone:
                        return {
                            style: 'white',
                            radius: 1
                        };
                    case Queen:
                        return {
                            style: 'magenta',
                            radius: 7,
                            thickness: 3
                        };
                }
            })();

            return {
                style: 'white',
                thickness: 1,
                radius: 1,
                ...info
            };
        }

        const draw_info = miteTypeDrawInfo(mite);
        const { x, y } = mite.position;
        ctx.lineWidth = draw_info.thickness;
        ctx.strokeStyle = draw_info.style;
        ctx.beginPath();
        ctx.arc(x, y, draw_info.radius, 0, Math.PI * 2);
        ctx.stroke();

        const { show_labels, show_dead, font_size } = canvas_options;

        if (show_labels) {
            if (!mite.is_dead || show_dead) {
                const parts = [
                    `${mite.id}`,
                    "//",
                    `${mite.is_dead ? "DEAD" : "ALIVE"}`,
                ];
                const len = parts.reduce((acc, part) => acc + part.length, 0);
                const x_offset = (len / 2) * (font_size / 2);

                let x_onset = 0;
                for (const [idx, part] of parts.entries()) {
                    const [dx, dy] = [x - x_offset + x_onset, y - (8 + draw_info.radius)];

                    ctx.fillStyle = (() => {
                        switch (idx) {
                            case 0:
                                return mite instanceof Queen ? 'magenta' : 'white';
                            case 2:
                                return mite.is_dead ? 'red' : 'white';
                            default:
                                return 'white';
                        }
                    })();

                    ctx.fillText(part, dx, dy);
                    x_onset += ctx.measureText(part).width + (font_size / 2);
                }
            }
        }
    },
} as const);
