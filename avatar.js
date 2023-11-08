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
				// If the player is at the edge of the town and on the path
				if (this.x === 0 && this.y < 12 && this.y > 7 && current_level === "town") {
					push_tiles("farm");
					this.x = level["farm"].start_x;
					
				// Checks tile to the left for collisions
				} else if (tile[level[current_level].tiles[this.y][this.x - 1]].collisions === false) {
					this.x -= 1;
				}
				break;
			case "RIGHT":
				// If the player is at the edge of the farm and on the path
				if (this.x === 23 && this.y < 12 && this.y > 7 && current_level === "farm") {
					push_tiles("town");
					this.x = level["town"].start_x;
				
				// Checks tile to the right for collisions
				} else if (tile[level[current_level].tiles[this.y][this.x + 1]].collisions === false) {
					this.x += 1;
				}
				break;
			case "UP":
				// If player is below the entrance to the shop
				if (this.x >= 11 && this.x <= 12 && this.y === 5 && current_level === "town") {
					push_ui("SHOP")
					
				// Checks above tile for collisions
				} else if (tile[level[current_level].tiles[this.y - 1][this.x]].collisions === false) {
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