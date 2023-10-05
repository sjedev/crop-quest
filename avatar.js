class Avatar {
    constructor(initial_x, initial_y){
        this.x = initial_x;
        this.y = initial_y;
		this.size = tile_size;
    }

    show(){
        image(spritesheet_avatars, this.x, this.y, this.size, this.size);
    }
}