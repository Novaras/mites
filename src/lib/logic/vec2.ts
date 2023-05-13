export type Vec2Like = Vec2|[number, number]|{ x: number, y: number }

export default class Vec2 {
	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	add(other: Vec2Like) {
		const vec2 = Vec2.toVec2(other);
		
		this.x += vec2.x;
		this.y += vec2.y;
	}

	subtract(other: Vec2Like) {
		const vec2 = Vec2.toVec2(other);

		this.x -= vec2.x;
		this.y -= vec2.y;
	}

	// ===

	static toVec2(vec_like: Vec2Like) {
		return (vec_like instanceof Vec2) ? vec_like : Vec2.from(vec_like);
	}

	from(vec_like: Vec2Like) {
		const pos = Vec2.from(vec_like);
		this.x = pos.x;
		this.y = pos.y;
	}

	static from(vec_like: Vec2Like) {
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
		return Vec2.from(this);
	}
}