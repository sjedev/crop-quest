class Tile {
    constructor(id, x, y) {
        // Using the tiles object, get the sprite's location within the spritesheet
        this.spritesheet_x = tile[id].spritesheet_x;
        this.spritesheet_y = tile[id].spritesheet_y;

        // Then, get the collisions data
        this.collisions = tile[id].collisions;

        // Then get the on-screen co-ordinates of the tile from the parsed arguments
        this.x = x + margin_x;
        this.y = y + margin_y;
    }

    show() {
        // Gets the texture from within the spritesheet, displays it at the given co-ordinates
        // All tiles are 64 x 64 pixels in the spritesheet
        image(spritesheet_tiles, this.x, this.y, tile_size, tile_size, this.spritesheet_x, this.spritesheet_y, 64, 64);
    }
}