// ==========================
// CROP QUEST
// A game by Sebastien Jensen
// Version 0.1
// ==========================

// Objects (contain data from JSON files)
let tile, level;

// Player metadata
let player_level = "menu";

let tile_size;
let tiles_x = 24;
let tiles_y = 12;
let tiles_background = new Array;
let tiles_foreground = new Array;
let spritesheet_tiles;

// Margins in pixels to centre the graphics
let margin_x;
let margin_y;

// Preload assets before setup
function preload () {
    spritesheet_tiles = loadImage("resources/spritesheets/tiles_v2.png");
}

// Create canvas, fetch JSON, push tiles
async function setup () {
    
}

// Draw tiles and graphics on canvas
function draw () {

}