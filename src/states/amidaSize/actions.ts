export const SET_CANVAS_HEIGHT = "SET_CANVAS_HEIGHT";
export const setCanvasHeight = (height: number) => {
    return {
        type: SET_CANVAS_HEIGHT,
        payload: height
    }
}

export const SET_CANVAS_WIDTH = "SET_CANVAS_WIDTH";
export const setCanvasWidth = (width: number) => {
    return {
        type: SET_CANVAS_WIDTH,
        payload: width
    }
}

// MEMO: 値の更新がうまくいっていない
export const SET_LENGTH_ENTRY_NAMES = "SET_CANVAS_WIDTH";
export const setLengthEntryNames = (length: number) => {
    return {
        type: SET_LENGTH_ENTRY_NAMES,
        payload: length
    }
}