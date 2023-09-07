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