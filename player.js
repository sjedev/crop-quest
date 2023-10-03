class Player {
    constructor(initial_x, initial_y){
        this.x = initial_x;
        this.y = initial_y;
    }

    show(){
        image(spritesheet_avatars, 400, 400, 64, 64);
    }
}