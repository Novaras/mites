import { nanoid } from "nanoid";
import Vec2, { type Vec2Like } from "./vec2";
import { MITE_BEHAVIORS, type MiteBehavior } from "./mite-behavior";
import { DEFAULT_ID_LENGTH, type Manager } from "./manager";

export type MiteLike = Mite | {
	id?: string,
	position?: Vec2Like,
	velocity?: Vec2Like,
	age?: number,
	velocity_delta_multiplier?: number,
	energy?: number,
	behaviors?: { weight: number, behavior: MiteBehavior }[]
};

export const MITE_MAX_SPEED = 3;
export const MITE_DEFAULT_ENERGY = 100;

export abstract class Mite {
	readonly id: string;
	position: Vec2;
	velocity: Vec2;
	age: number;
	velocity_delta_multiplier: number;

	energy: number;

	behaviors: { weight: number, behavior: MiteBehavior }[];

	get is_dead() {
		return this.energy <= 0;
	}

	constructor(mite_like?: MiteLike) {
		this.id = mite_like?.id ?? nanoid(DEFAULT_ID_LENGTH);
		this.position = Vec2.from(mite_like?.position ?? { x: 0, y: 0 });
		this.velocity = Vec2.from(mite_like?.velocity ?? { x: 0, y: 0 });
		this.age = mite_like?.age ?? 0;
		this.velocity_delta_multiplier = mite_like?.velocity_delta_multiplier ?? 1;
		this.energy = mite_like?.energy ?? MITE_DEFAULT_ENERGY;
		this.behaviors = mite_like?.behaviors ?? [];

		this.behaviors.sort((a, b) => a.weight - b.weight);
	}

	clone() {
		console.log(`cloning`);
		return new (this.constructor as any)(nanoid(DEFAULT_ID_LENGTH), this.position.clone(), this.velocity.clone(), this.age);
	}

	update(manager: Manager<Mite>) {
		if (this.energy > 0) {

			// some fraction of the total weight
			const pick = Math.random() * this.behaviors.reduce((total, behavior) => {
				return total + behavior.weight;
			}, 0);

			const chosen_behavior = (() => {
				let total = 0;
				// we have a random number between 0 and weight total, so we can select the first weight
				// which tips a running total over this threshold
				// console.group(`picking behavior, pick is ${pick}...`);
				for (const behavior of this.behaviors.filter(behavior => behavior.behavior.cost <= this.energy)) {
					// console.log(`behavior: ${behavior}`);
					// console.log(`total is ${total}, check less than ${pick} and ${(total + behavior.weight)} > ${pick}`);
					// interval between last threshold and new one
					if (total <= pick && (total + behavior.weight) > pick) {
						// console.log(`chosen!`);
						// console.groupEnd();
						return behavior;
					}

					total += behavior.weight;
				}

				// console.log(`default`);
				// console.groupEnd();
				// somehow we didnt select anything, so return the heaviest behavior (behaviors sorted by weight in ctor)
				return this.behaviors[this.behaviors.length - 1];
			})();

			chosen_behavior.behavior.exec(this, manager);
			this.energy = Math.max(0, this.energy - chosen_behavior.behavior.cost);
		}

		// update pos based on vel 
		this.velocity.modulo(MITE_MAX_SPEED);

		if (this.velocity.magnitude > 0.5) {
			this.velocity.multiply(0.95);
		}

		if (this.is_dead && this.velocity.magnitude <= 0.5) {
			this.velocity.set(0);
		}

		this.position.add(this.velocity);

		this.age += 1;
	}
}

export class Drone extends Mite {
	constructor(mite_like?: MiteLike) {
		super({
			velocity_delta_multiplier: 2,
			...mite_like
		});

		this.behaviors = [
			{
				weight: 1,
				behavior: MITE_BEHAVIORS.randomly_move
			}
		];
	}
}

export class Queen extends Mite {
	constructor(mite_like?: MiteLike) {
		super({
			energy: 1000,
			...mite_like,
		});

		this.behaviors = [
			{
				weight: 5,
				behavior: MITE_BEHAVIORS.randomly_move
			},
			{
				weight: 1,
				behavior: MITE_BEHAVIORS.spawn_drone
			}
		]
	}
}
