// ==========================
// CROP QUEST
// A game by Sebastien Jensen
// Version 0.1
// ==========================

// Objects (contain data from JSON files)
let tile, level;

// Player metadata
let player;
let player_level = "menu";

// Tile metadata
let tile_size;
let tiles_x = 24;
let tiles_y = 12;
let tiles_background = new Array;
let tiles_foreground = new Array;

// Spritesheet locations
let spritesheet_tiles;
let spritesheet_avatars;

// Margins in pixels to centre the graphics
let margin_x;
let margin_y;

// Preload assets before setup
function preload() {
    spritesheet_tiles = loadImage("resources/spritesheets/tiles_v2.png");
    spritesheet_avatars = loadImage("resources/spritesheets/avatars_v1.png");
}

// Create canvas, fetch JSON, push tiles
async function setup() {
    createCanvas(windowWidth, windowHeight);
    tile_size_setup();

    background(255);

    // Create player
    player = new Player(400, 400);

    // Waits for these files to be loaded before proceeding
    await fetch_JSON("resources/json/level.json").then(data => {level = data});
    await fetch_JSON("resources/json/tile.json").then(data => {tile = data});

    push_tiles(player_level);
}

// Draw tiles and graphics on canvas
function draw() {
    // Draw background tiles
    for (i in tiles_background) {
        tiles_background[i].show();
    }

    // Draw player
    player.show();

    // Draw foreground tiles
    for (i in tiles_foreground) {
        tiles_foreground[i].show();
    }
}