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
let ui_fullscreen = false;
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

    // Waits for these files to be loaded before proceeding
    await fetch_JSON("resources/json/level.json").then(data => {level = data});
    await fetch_JSON("resources/json/tile.json").then(data => {tile = data});

    push_tiles(current_level);
}

// Draw tiles and graphics on canvas
function draw() {
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