function push_ui(state) {
	// Remove pre-existing UI elements
	ui_non_interact = [];
	ui_interactable = [];
	ui_fullscreen = false;
	switch (state) {
		case "MAINMENU":
			// Lower third overlay with title and buttons
			ui_fullscreen = true;
			ui_non_interact.push(new Overlay("LTHIRD"));
			ui_non_interact.push(new Title());
			break;
	}
}

class Title {
	show() {
		textSize(tile_size);
    	textFont(title_font);
    	textAlign(LEFT, BOTTOM);
    	// If mouse pointer is hovering over the title
    	if (mouseX > (margin_x + tile_size) && 
        	mouseX < ((margin_x + tile_size) + (tile_size * 7) - 5) && 
        	mouseY > (margin_y + (tile_size * 10) + 1) && 
        	mouseY < (margin_y + (tile_size * 10) + tile_size - 2)) {
      		fill(132, 198, 105);
    	} else {
      		fill(255);
    	}
    	text("Crop Quest", (margin_x + tile_size), (margin_y + (tile_size * 11) + 12));
	}
}

class Overlay {
	constructor(type) {
		this.type = type;
	}

	show() {
    	noStroke();
    	switch (this.type) {
      		case "LTHIRD":
        		// Lower third tinted overlay
		        fill(0, 0, 0, 150);
		        rect(margin_x, (margin_y + (tile_size * 9)), (tile_size * tiles_x), (tile_size * 3));
		        break;
      		case "ALL_LTHIRD":
		        // Full screen with darker lower third
		        fill(0, 0, 0, 100);
		        rect(margin_x, margin_y, (tile_size * tiles_x), ((tile_size * tiles_y) - (tile_size * 3)))
		        fill(0, 0, 0, 150);
		        rect(margin_x, (margin_y + (tile_size * 9)), (tile_size * tiles_x), (tile_size * 3));
		        break;
    	}
  	}
}