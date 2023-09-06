import { createSelector } from "reselect";

const amidaSizeSelector = (state: any) => state;

export const getAmidaSizeLengthEntryNames = createSelector(
    [amidaSizeSelector],
    state => state.lengthEntryNames
);

export const getAmidaSizeNumberOfTree = createSelector(
    [amidaSizeSelector],
    state => state.numberOfTree
);

export const getAmidaSizeCanvasWidth = createSelector(
    [amidaSizeSelector],
    state => state.canvasWidth
);

export const getAmidaSizeCanvasHeight = createSelector(
    [amidaSizeSelector],
    state => state.canvasHeight
);

export const getAmidaSizeIntervalWidth = createSelector(
    [amidaSizeSelector],
    state => state.intervalWidth
);

export const getAmidaSizeIntervalHeight = createSelector(
    [amidaSizeSelector],
    state => state.intervalHeight
);