class Avatar {
    constructor(initial_x, initial_y){
		// x and y refer to the tile that the player is occupying
		this.x = initial_x;
		this.y = initial_y;
		// draw_x and draw_y refer to the co-ordinates at which the graphic should be shown
		this.draw_x = 0;
		this.draw_y = 0;
		// The graphic should be the same size as the tile beneath it
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
				// Checks tile to the left for collisions
				if (tile[level[current_level].tiles[this.y][this.x - 1]].collisions === false) {
					this.x -= 1;
				}
				break;
			case "RIGHT":
				// Checks tile to the right for collisions
				if (tile[level[current_level].tiles[this.y][this.x + 1]].collisions === false) {
					this.x += 1;
				}
				break;
			case "UP":
				// Checks above tile for collisions
				if (tile[level[current_level].tiles[this.y - 1][this.x]].collisions === false) {
					this.y -= 1;
				}
				break;
			case "DOWN":
				// Checks below tile for collisions
				if (tile[level[current_level].tiles[this.y + 1][this.x]].collisions === false) {
					this.y += 1;
				}
				break;
		}
	}
}