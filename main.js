// ==========================
// CROP QUEST
// A game by Sebastien Jensen
// Version 0.1
// ==========================

// Objects (contain data from JSON files)
let tile, level;

// Player metadata
let user;
let current_level = "menu";
let user_onscreen = false;

// Tile metadata
let tile_size;
let tiles_x = 24;
let tiles_y = 12;
let tiles_background = new Array;
let tiles_foreground = new Array;

// User interface
let title_font, label_font;
let logged_in = false;
let replit_user;
let ui_fullscreen;
let ui_non_interact = new Array;
let ui_interactable = new Array;

// Spritesheet locations
let spritesheet_tiles;
let spritesheet_avatars;

// Margins in pixels to centre the graphics
let margin_x;
let margin_y;

// Preload assets before setup
function preload() {
	title_font = loadFont("resources/fonts/blocks.ttf");
  	button_font = loadFont("resources/fonts/minisquare.ttf");
    spritesheet_tiles = loadImage("resources/spritesheets/tiles_v3.png");
    spritesheet_avatars = loadImage("resources/spritesheets/avatars_v1.png");
}

// Create canvas, fetch JSON, push tiles
async function setup() {
    createCanvas(windowWidth, windowHeight);
    tile_size_setup();

    background(255);

    // Create player
    user = new Avatar(9, 4);
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
	if (!ui_fullscreen) {
		if (keyCode === LEFT_ARROW) {
			user.move("LEFT");
		} else if (keyCode === RIGHT_ARROW) {
			user.move("RIGHT");
		} else if (keyCode === UP_ARROW) {
			user.move("UP");
		} else if (keyCode === DOWN_ARROW) {
			user.move("DOWN");
		}
	}
}	

function mousePressed() {
	for (i in ui_interactable) {
		ui_interactable[i].click();
	}
}