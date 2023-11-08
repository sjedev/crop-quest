function push_ui(state) {
	// Remove pre-existing UI elements
	ui_non_interact = [];
	ui_interactable = [];
	ui_fullscreen = false;
	switch (state) {
		case "CLEAR":
			break;
		case "MAINMENU":
			// Lower third overlay with title and buttons
			ui_fullscreen = true;
			ui_non_interact.push(new Overlay("LTHIRD"));
			// "Crop Quest" logo
			ui_non_interact.push(new Title());
			// Buttons
			ui_interactable.push(new Button("START", 11, 10, 5));
			ui_interactable.push(new Button("LOAD", 16.5, 10, 3));
			ui_interactable.push(new Button("OPTIONS", 20, 10, 3));
			break;
		case "HUD":
			ui_non_interact.push(new Overlay("HUD"));
			// Currently selected tool
			ui_non_interact.push(new Label(tool, 0, 11, "SELECTED"));
			// HP
			ui_non_interact.push(new Label("HP", 22, 0));
			ui_non_interact.push(new Label("0", 23, 0, "HP"));
			// Coins
			ui_non_interact.push(new Label(" ", 0, 0, "ICON", 320, 448));
			ui_non_interact.push(new Label(String(coins), 1, 0, "COINS"));
			// Wood
			ui_non_interact.push(new Label(" ", 3, 0, "ICON", 384, 448));
			ui_non_interact.push(new Label(String(wood), 4, 0, "WOOD"));
			// Stone
			ui_non_interact.push(new Label(" ", 6, 0, "ICON", 448, 448));
			ui_non_interact.push(new Label(String(stone), 7, 0, "STONE"));
			// Seeds
			ui_non_interact.push(new Label(" ", 9, 0, "ICON", 192, 576));
			ui_non_interact.push(new Label(String(seeds_1), 10, 0, "SEEDS"));
			// Produce
			ui_non_interact.push(new Label(" ", 12, 0, "ICON", 128, 576));
			ui_non_interact.push(new Label(String(crops_1), 13, 0, "PRODUCE"));
			// Tools
			ui_non_interact.push(new Label(" ", 0, 0, "TOOLS"));
			ui_non_interact.push(new Label(" ", 0, 0, "SELECTION"))
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
		// Display the title in the bottom left
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
				rect(margin_x, margin_y, (tile_size * tiles_x), ((tile_size * tiles_y) - (tile_size * 3)));
				fill(0, 0, 0, 150);
				rect(margin_x, (margin_y + (tile_size * 9)), (tile_size * tiles_x), (tile_size * 3));
				break;
			case "HUD":
				// In-game backgrounds for stats and toolbar
				fill(0, 0, 0, 100);
				// Top left for coins, crops, etc.
				rect(margin_x, margin_y, (tile_size * 15), (tile_size * 1));
				// Top right for HP
				rect(margin_x + (22 * tile_size), margin_y, (tile_size * 2), (tile_size * 1));
				// Bottom left for selected tool
				rect(margin_x, margin_y + ((tiles_y - 1) * tile_size), tile_size * 3, tile_size);
				// Bottom right for tool bar
				rect(margin_x + (tile_size * 14.5), margin_y + ((tiles_y - 1) * tile_size), tile_size * 9.5, tile_size);
				break;
		}
	}
}

class Button {
	constructor(action, x, y, length) {
		this.action = action;
		this.x = margin_x + (x * tile_size);
		this.y = margin_y + (y * tile_size);
		this.length = length * tile_size;
	}

	show() {
		// If mouse pointer is hovering over the button
		if (mouseX >= this.x &&
			mouseX <= (this.x + this.length) &&
			mouseY >= this.y &&
			mouseY <= (this.y + tile_size)) {
			fill(132, 198, 105);
			cursor("pointer");
		} else {
			fill(255);
		}
		rect(this.x, this.y, this.length, tile_size);
		textSize(Math.floor(0.65 * tile_size));
		textFont(button_font);
		fill(63, 38, 49);
		textAlign(CENTER, TOP);
		switch (this.action) {
			case "START":
				text("New game", (this.x + (this.length / 2)), this.y + 0.04 * tile_size);
				break;
			case "OPTIONS":
				text("More", (this.x + (this.length / 2)), this.y + 0.04 * tile_size);
				break;
			case "LOAD":
				if (logged_in) {
					text("Load", (this.x + (this.length / 2)), this.y + 0.04 * tile_size);
				} else {
					text("Log in", (this.x + (this.length / 2)), this.y + 0.04 * tile_size);
				}
				break;
		}
	}

	click() {
		// If mouse pointer is above the buton at the time of the click
		if (mouseX >= this.x &&
			mouseX <= (this.x + this.length) &&
			mouseY >= this.y &&
			mouseY <= (this.y + tile_size)) {
			switch (this.action) {
				case "LOAD":
					if (logged_in) {
						// Load the save from the server
						push_ui("CLEAR");
						break;
					} else {
						// Bring up log-in prompt if not logged in already
						LoginWithReplit();
						logged_in = true;
						break;
					}
					break;
				case "START":
					// Initialise new game
					// push_ui("CLEAR");
					push_ui("HUD");
					break;
			}
		}
	}
}

class Label {
	constructor(message, x, y, special, spritesheet_x, spritesheet_y) {
		this.message = message;
		// A slight off-set is added to account for the font's padding
		this.x = margin_x + (x * tile_size) + (0.2 * tile_size);
		this.y = margin_y + (y * tile_size) + (0.05 * tile_size);
		// For labels that need extra colouring/specific positioning
		this.special = special; 
		// Spritesheet location of icons
		this.spritesheet_x = spritesheet_x;
		this.spritesheet_y = spritesheet_y;
	}

	show() {
		textSize(Math.floor(0.65 * tile_size));
		textFont(button_font);
		fill(255, 255, 255);
		textAlign(LEFT, TOP);

		// Specific instructions for displaying HP
		if (this.special === "HP") {
			if (health > 60) {
				// Green text if health is above 60
				fill(132, 198, 105);
			} else {
				fill(0, 0, 0);
			}
			text(String(health), this.x - (0.1 * tile_size), this.y);

		// Specific instructions for displaying icons
		} else if (this.special === "ICON") {
			image(spritesheet_tiles, this.x - (0.2 * tile_size), this.y - (0.06 * tile_size), tile_size, tile_size, this.spritesheet_x, this.spritesheet_y, 64, 64);

		// Specific instruction for displaying the toolbar
		} else if (this.special === "TOOLS") {
			// Bucket icon
			if (bucket_filled) {
				image(spritesheet_tiles, margin_x + (22.5 * tile_size), ((tiles_y - 1.5) * tile_size) + margin_y, tile_size, tile_size, 576, 448, 64, 64);
			} else {
				image(spritesheet_tiles, margin_x + (22.5 * tile_size), ((tiles_y - 1.5) * tile_size) + margin_y, tile_size, tile_size, 512, 448, 64, 64);
			}

			// Seeds icon
			image(spritesheet_tiles, margin_x + (21 * tile_size), ((tiles_y - 1.5) * tile_size) + margin_y, tile_size, tile_size, 192, 576, 64, 64);

			// Hoe icon
			image(spritesheet_tiles, margin_x + (19.5 * tile_size), ((tiles_y - 1.5) * tile_size) + margin_y, tile_size, tile_size, 320, 512, 64, 64);

			// Scythe icon
			image(spritesheet_tiles, margin_x + (18 * tile_size), ((tiles_y - 1.5) * tile_size) + margin_y, tile_size, tile_size, 0, 512, 64, 64);

			// Axe icon
			image(spritesheet_tiles, margin_x + (16.5 * tile_size), ((tiles_y - 1.5) * tile_size) + margin_y, tile_size, tile_size, 128, 512, 64, 64);

			// Pickaxe icon
			image(spritesheet_tiles, margin_x + (15 * tile_size), ((tiles_y - 1.5) * tile_size) + margin_y, tile_size, tile_size, 256, 512, 64, 64);

		} else if (this.special === "COINS") {
			text(String(coins), this.x, this.y);

		} else if (this.special === "STONE") {
			text(String(stone), this.x, this.y);

		} else if (this.special === "WOOD") {
			text(String(wood), this.x, this.y);

		} else if (this.special === "SEEDS") {
			text(String(seeds_1), this.x, this.y);

		} else if (this.special === "PRODUCE") {
			text(String(crops_1), this.x, this.y);

		} else if (this.special === "SELECTED") {
			text(String(tool), this.x, this.y);

		} else if (this.special === "SELECTION") {
			fill(132, 198, 105);
			rect(margin_x + (tool_selected * ((tile_size / 2) + tile_size)) + (tile_size * 15), (margin_y + (tile_size * tiles_y)) - (tile_size / 4), tile_size, tile_size / 4);

		} else {
			// Draw text
			text(this.message, this.x, this.y);
		}
	}
}