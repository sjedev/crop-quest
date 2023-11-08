function tile_size_setup() {
    let minimum_width = tiles_x * 64; // 64 is the default tile size

    if (windowWidth < minimum_width) {
        tile_size = Math.floor(windowWidth / tiles_x);

        // Position tiles in the top left on unsupported displays
        margin_x = 0;
        margin_y = 0;
    } else {
        tile_size = 64;

        // Centre tiles with margins
        margin_x = Math.floor((windowWidth - (64 * tiles_x)) / 2);
        margin_y = Math.floor((windowHeight - (64 * tiles_y)) / 2);
    }
}

async function fetch_JSON(file) {
    // Fetches and returns the named file; throws an error if it fails
    return fetch(file).then(response => response.json()).catch(error => { console.error(error) });
}

function push_tiles(push_level) {
	// Remove current tile objects
	tiles_background = [];
	tiles_foreground = [];
	current_level = push_level;
	
    // Iterate through tiles on the y-axis
    for (p = 0; p < level[push_level].height; p++) {

        // Iterate through tiles on the x-axis
        for (q = 0; q < level[push_level].width; q++) {

            // If the tile is in the foreground
            if (tile[level[push_level].tiles[p][q]].foreground) {

                // Add a grass tile to the background
                tiles_background.push(new Tile("1", (q * tile_size), (p * tile_size)));

                // Add foreground tile to separate array so it is drawn after the avatar
                tiles_foreground.push(new Tile(level[push_level].tiles[p][q], (q * tile_size), (p * tile_size)));
            } else {
                // Add background tile
                tiles_background.push(new Tile(level[push_level].tiles[p][q], (q * tile_size), (p * tile_size)));
            }
        }
    }
}