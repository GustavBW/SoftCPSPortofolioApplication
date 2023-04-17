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
        this.layer = startLayer || 0;
    }

    private getCurrent(): FieldIndex {
        this.index++;
        return {x: this.latest.x, y: this.latest.y, layer: this.layer, index: this.index};
    }

    next(): FieldIndex {
        this.pointer++; // increment pointer before determining direction

        // Check if we need to move to the next layer
        if (this.index === this.layer * 6) {
            this.layer++;
            this.latest.x = (this.layer % 2 === 0) ? this.width / 2 : 0;
            this.latest.y -= this.height * 0.75;
            return this.getCurrent();
        }

        // Move to the next hexagon in the current layer
        switch (this.pointer % 6) {
            case 0: // Move left
                this.latest.x -= this.width;
                break;
            case 1: // Move down-left
                this.latest.x -= this.width / 2;
                this.latest.y += this.height * 0.75;
                break;
            case 2: // Move down-right
                this.latest.x += this.width / 2;
                this.latest.y += this.height * 0.75;
                break;
            case 3: // Move right
                this.latest.x += this.width;
                break;
            case 4: // Move up-right
                this.latest.x += this.width / 2;
                this.latest.y -= this.height * 0.75;
                break;
            case 5: // Move up-left
                this.latest.x -= this.width / 2;
                this.latest.y -= this.height * 0.75;
                break;
        }

        return this.getCurrent();
    }
}