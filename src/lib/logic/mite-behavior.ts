import { Drone, type Mite, type Queen } from "./mite";
import type { MiteManager } from "./mite-manager";
import Vec2 from "./vec2";

export type MiteBehavior = {
    cost: number,
    exec: (mite: Mite, manager: MiteManager) => void,
};

export const MITE_BEHAVIORS = {
    randomly_move: {
        cost: 1,
        exec: (mite: Mite) => {
            const negative_threshold = 0.5;
            const sign = () => Math.random() < negative_threshold ? -1 : 1;

            const delta_multiplier = mite.velocity_delta_multiplier;

            const velocity_delta = Vec2.from([
                sign() * Math.random() * delta_multiplier,
                sign() * Math.random() * delta_multiplier
            ]);

            mite.velocity.add(velocity_delta);
        }
    },
    spawn_drone: {
        cost: 20,
        exec: (queen: Mite, manager: MiteManager) => {
            console.log(`queen ${queen.id} spawning drone!`);
            const drone = new Drone({
                position: queen.position.clone()
            });

            manager.add(drone);
        },
    }
} as const;