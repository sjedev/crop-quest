class Avatar {
    constructor(initial_x, initial_y){
		this.x = initial_x;
		this.y = initial_y;
		this.draw_x = 0;
		this.draw_y = 0;
		this.size = tile_size;
    }

    show(){
		this.draw_x = (this.x * tile_size) + margin_x;
        this.draw_y = (this.y * tile_size) + margin_y;
        image(spritesheet_avatars, this.draw_x, this.draw_y, this.size, this.size);
    }

	move(direction){
		switch (direction) {
			case "LEFT":
				if (tile[level[current_level].tiles[this.y][this.x - 1]].collisions === false) {
					this.x -= 1;
				}
				break;
			case "RIGHT":
				if (tile[level[current_level].tiles[this.y][this.x + 1]].collisions === false) {
					this.x += 1;
				}
				break;
			case "UP":
				if (tile[level[current_level].tiles[this.y - 1][this.x]].collisions === false) {
					this.y -= 1;
				}
				break;
			case "DOWN":
				if (tile[level[current_level].tiles[this.y + 1][this.x]].collisions === false) {
					this.y += 1;
				}
				break;
		}
	}
}