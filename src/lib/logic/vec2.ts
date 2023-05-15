export type Vec2Like = Vec2|[number, number]|{ x: number, y: number }

export default class Vec2 {
	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	add(other: Vec2Like) {
		const vec2 = Vec2.from(other);
		
		this.x += vec2.x;
		this.y += vec2.y;
	}

	subtract(other: Vec2Like) {
		const vec2 = Vec2.from(other);

		this.x -= vec2.x;
		this.y -= vec2.y;
	}

	modulo(value: Vec2Like | number) {
		const mod_vec = Vec2.from(typeof value === `number` ? { x: value, y: value } : value);

		this.x = this.x % mod_vec.x;
		this.y = this.y % mod_vec.y;
	}

	map(map_fn: (v: number, k: 'x'|'y', inst: Vec2) => number) {
		this.x = map_fn(this.x, 'x', this);
		this.y = map_fn(this.y, 'y', this);
	}

	forEach(callback: (v: number, k: 'x'|'y', inst: Vec2) => void) {
		for (const axis of ['x', 'y'] as const) {
			callback(this[axis], axis, this);
		}
	}

	set(value: Vec2Like) {
		const vec2 = Vec2.from(value);
		this.x = vec2.x;
		this.y = vec2.y;
	}

	// ===

	from(vec_like: Vec2Like) {
		const pos = Vec2.from(vec_like);
		this.x = pos.x;
		this.y = pos.y;
	}

	static from(vec_like: Vec2Like) {
		if (vec_like instanceof Vec2) {
			return vec_like.clone();
		}

		const xy = { x: 0, y: 0 };
		if (vec_like instanceof Array) {
			xy.x = vec_like[0];
			xy.y = vec_like[1];
		} else {
			xy.x = vec_like.x;
			xy.y = vec_like.y;
		}

		return new Vec2(xy.x, xy.y);
	}

	toArray() {
		return [this.x, this.y];
	}

	toString() {
		return `{ x: ${this.x}, y: ${this.y} }`;
	}

	clone() {
		return new Vec2(this.x, this.y);
	}
}
