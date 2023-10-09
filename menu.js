function push_ui(state) {
	switch (state) {
		case "MAINMENU":
			ui_fullscreen = true;
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