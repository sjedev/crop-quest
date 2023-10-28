class Tile {
    constructor(id, x, y) {
        // Using the tiles object, get the sprite's location within the spritesheet
		this.id = id;
		
        this.spritesheet_x = tile[this.id].spritesheet_x;
        this.spritesheet_y = tile[this.id].spritesheet_y;

        // Then, get the collisions data
        this.collisions = tile[this.id].collisions;

        // Then get the on-screen co-ordinates of the tile from the parsed arguments
        this.x = x + margin_x;
        this.y = y + margin_y;

		this.grid_x = Math.floor(x / tile_size);
		this.grid_y = Math.floor(y / tile_size);

		this.cultivatable = tile[this.id].cultivatable;
		this.waterable = tile[this.id].waterable;
    }

    show() {
        // Gets the texture from within the spritesheet, displays it at the given co-ordinates
        // All tiles are 64 x 64 pixels in the spritesheet
        image(spritesheet_tiles, this.x, this.y, tile_size, tile_size, this.spritesheet_x, this.spritesheet_y, 64, 64);
    }

	update() {
		// Updates tile ID
		// E.g., when a tile is cultivated for farming
		this.spritesheet_x = tile[this.id].spritesheet_x;
		this.spritesheet_y = tile[this.id].spritesheet_y;
		this.collisions = tile[this.id].collisions;
		this.cultivatable = tile[this.id].cultivatable;
		this.waterable = tile[this.id].waterable;
	}
}