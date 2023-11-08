// ==========================
// CROP QUEST
// A game by Sebastien Jensen
// Version 0.1
// ==========================

// Objects (contain data from JSON files)
let tile, level;

// Player metadata
let user;
let current_level = "farm";
let user_onscreen = false;
let tool = "HOE";
let in_range = false;
let bucket_filled = false;
let seed_selected = 1;
let seeds_1 = 15;
let crops_1 = 0;
let health = 99;
let coins = 30;
let wood = 0;
let stone = 0;
let tools = ["PICKAXE", "AXE", "SCYTHE", "HOE", "SEED", "BUCKET"];
let tool_selected = 3;

// Tile metadata
let tile_size;
let tiles_x = 24;
let tiles_y = 12;
let tile_selection;
let tiles_background = new Array;
let tiles_foreground = new Array;
let crops = new Array;

// User interface
let title_font, label_font;
let logged_in = false;
let replit_user;
let ui_fullscreen;
let shop_open = false;
let ui_non_interact = new Array;
let ui_interactable = new Array;

// Spritesheet locations
let spritesheet_tiles;
let spritesheet_avatars;

// Margins in pixels to centre the graphics
let margin_x;
let margin_y;

// Delay for crop growth timer
const async_delay = (msDelay) => {
  return new Promise(resolve => setTimeout(resolve, msDelay));
};

// Preload assets before setup
function preload() {
	title_font = loadFont("resources/fonts/blocks.ttf");
  	button_font = loadFont("resources/fonts/minisquare.ttf");
    spritesheet_tiles = loadImage("resources/spritesheets/tiles_v6.png");
    spritesheet_avatars = loadImage("resources/spritesheets/avatars_v1.png");
}

// Create canvas, fetch JSON, push tiles
async function setup() {
    createCanvas(windowWidth, windowHeight);
    tile_size_setup();

    background(255);

    // Create player
    user = new Avatar(19, 5);
	user_onscreen = true;

	// Check if the user is already logged in
	replit_user = await getUserInfo();
	try {
		if (replit_user.id) {
			logged_in = true;
		} else {logged_in = false;}
	} catch(error) {
		console.error(error);
	}

    // Waits for these files to be loaded before proceeding
    await fetch_JSON("resources/json/level.json").then(data => {level = data});
    await fetch_JSON("resources/json/tile.json").then(data => {tile = data});

    push_tiles(current_level);
	push_ui("MAINMENU");
}

// Draw tiles and graphics on canvas
function draw() {
	background(255);
	
    // Draw background tiles
    for (i in tiles_background) {
        tiles_background[i].show();
    }

    // Draw player and full-screen UI is not displayed
	if (user_onscreen && !ui_fullscreen) {
		user.show();
	}

    // Draw foreground tiles
    for (i in tiles_foreground) {
        tiles_foreground[i].show();
    }

	// Draw non-interactable UI elements
	for (i in ui_non_interact) {
  		ui_non_interact[i].show();
  	}

	// Draw interactable UI elements
	cursor("default");
	for (i in ui_interactable) {
		ui_interactable[i].show();
	}

	if (user_onscreen && !ui_fullscreen) {
		outline(mouseX, mouseY);
	}
}

function keyPressed() {
	// Player movement, only when there is no fullscreen UI
	if (!ui_fullscreen) {
		switch (keyCode) {
			case 65:
				user.move("LEFT");
				break;
			case 68:
				user.move("RIGHT");
				break;
			case 87:
				user.move("UP");
				break;
			case 83:
				user.move("DOWN");
				break;
		}
	} else if (shop_open) {
		push_ui("HUD");
		shop_open = false;
	}

	// Change tool selection
	switch (keyCode) {
		case 81:
			// q pressed
			if (tool_selected > 0) {
				tool_selected -= 1;
			}
			break;
		case 69:
			// e pressed
			if (tool_selected < 5) {
				tool_selected += 1;
			}
			break;
	}
	// Update tool
	tool = tools[tool_selected];
}	

function mousePressed() {
	// Check mouse position for button presses
	if (ui_interactable.length != 0) {
		for (i in ui_interactable) {
			ui_interactable[i].click();
		}
	}

	interaction(tool);
}