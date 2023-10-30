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
		// Display outline over appropriate tile within 1-tile radius
		if (selected_x >= user.x - 1 &&
		   selected_x <= user.x + 1 &&
		   selected_y >= user.y - 1 &&
		   selected_y <= user.y + 1) {
			in_range = true; // Mouse pointer is within 1-tile radius
			stroke(101, 165, 86);
			strokeWeight(4);
			noFill();
			rect(margin_x + (selected_x * tile_size), margin_y + (selected_y * tile_size), tile_size, tile_size);
		} else {
			in_range = false; // Mouse pointer not within 1-tile radius
		}
	}
}

function interaction(hand) {
	// Check tile selected if within range
	if (in_range) {
		tile_selection = (selected_y * 24) + selected_x;
		// If the hoe is selected
		if (hand === "HOE"){
			// If the crop can be cultivated
			if (tiles_background[tile_selection].cultivatable){
				// Set the tile graphic to a crop
				tiles_background[tile_selection].id = 50;
				tiles_background[tile_selection].update();
				// Update in level tiles array
				level[current_level].tiles[selected_y][selected_x] = 50;
			}
		// If the water bucket is selected
		} else if (hand === "BUCKET") {
			// If re-filling the bucket at a well
			if (tiles_background[tile_selection].id === 396) {
				bucket_filled = true;
			// If using the bucket on a waterable tile
			} else if (tiles_background[tile_selection].waterable && bucket_filled) {
				// Advance growth stage
				console.log("watered");
				tiles_background[tile_selection].id += 1;
				tiles_background[tile_selection].update();
				// Trigger crop growth
				growth(tile_selection);
				// Update in level tiles array
				level[current_level].tiles[selected_y][selected_x] += 2;
				// Empty the bucket after use
				bucket_filled = false;
			}
		// If seed type 1 is being held and there is some of seed 1
		} else if (hand === "SEED" && seed_selected === 1 && seeds_1 > 0) {
			// If it is a empty cultivated tile
			if (tiles_background[tile_selection].id === 50) {
				// Set the tile graphic to a crop
				tiles_background[tile_selection].id = 60;
				tiles_background[tile_selection].update();
				// Update in level tiles array
				level[current_level].tiles[selected_y][selected_x] = 60;
				// Use a seed
				seeds_1 -= 1;
			}
		}
	}
}