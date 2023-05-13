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
    rawWidth: number;
    rawHeight: number;
}

const getCurrent = (state: FieldIteratorState): FieldIndex => {
    state.index++;
    return { 
        x: state.latest!.x,
        y: state.latest!.y,
        layer: state.layer, 
        index: state.index
    };
}

/**
 * Mutates the state according to pointer, layer and latest
 * Then shifts the position based on the result and returns 
 * a new FieldIndex object.
 * @param state 
 * @returns 
 */
const iterateField = (state: FieldIteratorState): FieldIndex => {

    if(state.latest == null) {
        //Accounting for tile mounting point at top left corner
        //also the first index is special as it does not follow the same pattern as the rest
        state.latest = {x: 0 - (state.rawWidth / 2), y: 0 - (state.rawHeight / 2)};
        return { x: state.latest.x, y: state.latest.y, layer: state.layer, index: state.index };
    }

    if (state.index % state.layer == 0){ //whenever we reach the end of a layer
        state.pointer++;
    }

    if (state.pointer > 5 || state.layer == 0){ //whenever we reach the end of a hexagon, reset pointer
        state.latest.x += state.width;          //also reset when the layer is 0 - X % 0 doesn't go so well
        state.layer++;
        state.pointer = 0;
    }

    // Apply a shift in accordence with what side of the hexagon we are on
    shiftLatest(state);
    return getCurrent(state);
}
export default iterateField;

const shiftLatest = (state: FieldIteratorState) => {
    //based on the side of the "incircling" hexagon of the current layer we are on, shift the latest hexagon
    const width = state.width;
    const height = state.height;

    switch (state.pointer) {
        case 0: // Move up-left
            state.latest!.x -= width / 2;
            state.latest!.y -= height * 0.75;
            break;
        case 1: // Move left <-
            state.latest!.x -= width;
            break;
        case 2: // Move down-left
            state.latest!.x -= width / 2;
            state.latest!.y += height * 0.75;
            break;
        case 3: // Move down-right
            state.latest!.x += width / 2;
            state.latest!.y += height * 0.75;
            break;
        case 4: // Move right
            state.latest!.x += width;
            break;
        case 5: // Move up-right
            state.latest!.x += width / 2;
            state.latest!.y -= height * 0.75;
            break;
    }        
}
