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

export interface FieldIteratorState {
    /**
     * Index of previous hexagon
     */
    index: number;
    /**
     * Hexagon layer where center = 0
     */
    layer: number;
    /**
     * Latest hexagon position
     */
    latest?: {x: number, y: number};
    /**
     * Hexagon width
     */
    width: number;
    /**
     * Hexagon height
     */
    height: number;
    /**
     * Pointer to current side of hexagon
     */
    pointer: number;
}


const getCurrent = (state: FieldIteratorState): FieldIndex => {
    state.index++;
    return { x: state.latest!.x, y: state.latest!.y, layer: state.layer, index: state.index};
}

const iterateField = (state: FieldIteratorState): FieldIndex => {
    if(state.latest == null) {
        state.latest = {x: 0, y: 0};
        return { x: state.latest.x, y: state.latest.y, layer: state.layer, index: state.index };
    }

    if (state.index % state.layer == 0){
        state.pointer++;
    }
    if (state.pointer > 5 || state.layer == 0){
        state.latest.x += state.width;
        state.layer++;
        state.pointer = 0;
    }

    // Apply a shift in accordence with what side of the hexagon we are on
    shiftLatest(state);
    return getCurrent(state);
}
export default iterateField;

const shiftLatest = (state: FieldIteratorState) => {
    switch (state.pointer) {
        case 0: // Move up-left
            state.latest!.x -= state.width / 2;
            state.latest!.y -= state.height * 0.75;
            break;
        case 1: // Move left <-
            state.latest!.x -= state.width;
            break;
        case 2: // Move down-left
            state.latest!.x -= state.width / 2;
            state.latest!.y += state.height * 0.75;
            break;
        case 3: // Move down-right
            state.latest!.x += state.width / 2;
            state.latest!.y += state.height * 0.75;
            break;
        case 4: // Move right
            state.latest!.x += state.width;
            break;
        case 5: // Move up-right
            state.latest!.x += state.width / 2;
            state.latest!.y -= state.height * 0.75;
            break;
    }        
}
