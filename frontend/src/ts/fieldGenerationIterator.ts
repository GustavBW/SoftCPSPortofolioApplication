export interface FieldIndex {
    /**
     * X offset from field center
     */
    x: number;
    /**
     * Y offset from field center
     */
    y: number;
    /**
     * Hexagon layer where center = 0
     */
    layer: number;
    /**
     * Index of hexagon in layer
     */
    index: number;
}

export default class FieldIterator {
    private width: number;
    private height: number;
    private index: number = 0;
    private layer: number = 0;
    private latest: {x: number, y: number} = {x: 0, y: 0};
    private pointer: number = 0;

    constructor(width: number, height: number, startLayer?: number) {
        this.width = width;
        this.height = height;
        if(startLayer){
            for(let i = 0; i < startLayer * 6; i++){
                this.next();
            }
        }
        this.layer = startLayer || 0;
    }

    private getCurrent(isCenter: boolean): FieldIndex {
        if(!isCenter) this.index++;
        return {x: this.latest.x, y: this.latest.y, layer: this.layer, index: this.index};
    }

    next(): FieldIndex {

        if(this.index % this.layer == 0){
            this.pointer++;
        }
        if (this.pointer > 5 || this.layer == 0){
            this.latest.x += this.width;
            this.layer++;
            this.pointer = 0;
        }

        // Apply a shift in accordence with what side of the hexagon we are on
        this.shiftLatest(this.pointer);
        return this.getCurrent(false);
    }

    private shiftLatest = (pointer: number) => {
        switch (pointer) {
            case 0: // Move up-left
                this.latest.x -= this.width / 2;
                this.latest.y -= this.height * 0.75;
                break;
            case 1: // Move left <-
                this.latest.x -= this.width;
                break;
            case 2: // Move down-left
                this.latest.x -= this.width / 2;
                this.latest.y += this.height * 0.75;
                break;
            case 3: // Move down-right
                this.latest.x += this.width / 2;
                this.latest.y += this.height * 0.75;
                break;
            case 4: // Move right
                this.latest.x += this.width;
                break;
            case 5: // Move up-right
                this.latest.x += this.width / 2;
                this.latest.y -= this.height * 0.75;
                break;
        }        
    }
}