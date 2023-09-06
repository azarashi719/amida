export interface AmidaDrawing {
    amidaPath: number[][][],
    canvasContext: CanvasRenderingContext2D | null,
}

export interface AmidaSize {
    lengthEntryNames: number,
    numberOfTree: number,
    canvasWidth: number,
    canvasHeight: number,
    intervalWidth: number,
    intervalHeight: number,
}