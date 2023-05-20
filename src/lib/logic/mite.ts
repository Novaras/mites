import { nanoid } from "nanoid";
import Vec2, { type Vec2Like } from "./vec2";

export type MiteLike = Mite | { id?: string, position?: Vec2Like, velocity: Vec2Like, age?: number };

export const MITE_ID_LENGTH = 10;
export const MITE_MAX_SPEED = 3;

export abstract class Mite {
	readonly id: string;
	position: Vec2;
	velocity: Vec2;
	age: number;

	constructor(mite_like?: MiteLike) {
		this.id = mite_like?.id ?? nanoid(MITE_ID_LENGTH);
		this.position = Vec2.from(mite_like?.position ?? { x: 0, y: 0 });
		this.velocity = Vec2.from(mite_like?.velocity ?? { x: 0, y: 0 });
		this.age = mite_like?.age ?? 0;
	}

	clone() {
		console.log(`cloning`);
		return new (this.constructor as any)(nanoid(MITE_ID_LENGTH), this.position.clone(), this.velocity.clone(), this.age);
	}

	update() {
		this.behavior();

		// update pos based on vel
		this.velocity.modulo(MITE_MAX_SPEED);
		this.position.add(this.velocity);

		this.age += 1;
	}

	abstract behavior(): void;
}

export class Drone extends Mite {
	behavior() {
		const negative_threshold = 0.5;
		const sign = () => Math.random() < negative_threshold ? -1 : 1;
		const velocity_delta = Vec2.from([
			Math.random() * 2 * sign(),
			Math.random() * 2 * sign()
		]);

		this.velocity.add(velocity_delta);
	}
}

export class Queen extends Mite {
	behavior() {
		// --
	}
}
