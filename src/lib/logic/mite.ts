import { nanoid } from "nanoid";
import Vec2, { type Vec2Like } from "./vec2";

export type MiteLike = LiveMite | { id?: string, position?: Vec2Like, velocity: Vec2Like, age?: number };

export const MITE_ID_LENGTH = 10;
export const MITE_MAX_SPEED = 3;

export class LiveMite {
	position: Vec2;
	velocity: Vec2;
	age: number;

	constructor(
		readonly id: string,
		position: Vec2Like = new Vec2(),
		velocity: Vec2Like = new Vec2(),
		age: number = 0
	) {
		this.position = Vec2.from(position);
		this.velocity = Vec2.from(velocity);
		this.age = age;
	}

	clone() {
		console.log(`cloning`);
		return new LiveMite(
			this.id,
			this.position.clone(),
			this.velocity.clone(),
			this.age
		);
	}

	static from(mite_like: MiteLike) {
		if (mite_like instanceof LiveMite) {
			return mite_like.clone();
		} else {
			return new LiveMite(
				mite_like.id ?? nanoid(MITE_ID_LENGTH),
				mite_like.position ?? new Vec2(),
				mite_like.velocity ?? new Vec2(),
				mite_like.age ?? 0,
			);
		}
	}

	from(mite_like: MiteLike) {
		const mite = LiveMite.from(mite_like);
		this.velocity = mite.velocity.clone();
		this.position = mite.position.clone();
		this.age = mite.age;
	}

	update() {
		// console.group(`update from mite ${this.id}`);
		// console.log(this);
		
		// incr age
		this.age += 1;
		// update pos based on vel
		this.position.add(this.velocity);

		const negative_threshold = 0.5;
		const sign = () => Math.random() < negative_threshold ? -1 : 1;
		const velocity_delta = Vec2.from([
			Math.random() * 2 * sign(),
			Math.random() * 2 * sign()
		]);

		// console.group(`vdelta`);
		// console.log(velocity_delta);
		// console.log(this.velocity);
		// console.groupEnd();


		this.velocity.add(velocity_delta);
		this.velocity.modulo(MITE_MAX_SPEED);
		// console.groupEnd();
	}
}
