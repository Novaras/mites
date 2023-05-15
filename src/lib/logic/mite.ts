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
		// incr age
		this.age += 1;
		// update pos based on vel
		this.position.add(this.velocity);
	}
}

export class Drone extends Mite {
	constructor(mite_like?: MiteLike) {
		super(mite_like);
	}

	update() {
		super.update();

		const negative_threshold = 0.5;
		const sign = () => Math.random() < negative_threshold ? -1 : 1;
		const velocity_delta = Vec2.from([
			Math.random() * 2 * sign(),
			Math.random() * 2 * sign()
		]);

		this.velocity.add(velocity_delta);
		this.velocity.modulo(MITE_MAX_SPEED);
	}
}
