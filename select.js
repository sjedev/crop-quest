// Tile selected
let selected_x;
let selected_y;

function outline(x, y) {
	fill(0);
	// Check if mouse is hovering over the tiles
	if (mouseX >= margin_x &&
	   mouseX <= margin_x + (tile_size * tiles_x) &&
	   mouseY >= margin_y &&
	   mouseY <= margin_y + (tile_size * tiles_y)) {
		// Map exact mouse position to a tile
		selected_x = Math.floor((mouseX - margin_x) / tile_size);
		selected_y = Math.floor((mouseY - margin_y) / tile_size);
		// Display outline over appropriate tile
		if (selected_x >= user.x - 1 &&
		   selected_x <= user.x + 1 &&
		   selected_y >= user.y - 1 &&
		   selected_y <= user.y + 1) {
			stroke(101, 165, 86);
			strokeWeight(4);
			noFill();
			rect(margin_x + (selected_x * tile_size), margin_y + (selected_y * tile_size), tile_size, tile_size);
		}
	}
}