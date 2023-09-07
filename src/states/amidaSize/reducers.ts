import * as Actions from './actions';
import {initialState} from '../store/initialState';

// TODO: 引数の型
export const AmidaSizeReducer = (state: any = initialState.amidaSize, action: any) => {
    switch (action.type) {
        case Actions.SET_CANVAS_HEIGHT:
            return {
                ...state,
                canvasHeight: action.payload
            };
        case Actions.SET_CANVAS_WIDTH:
            return {
                ...state,
                canvasWidth: action.payload
            };
        default:
            return state
            
    }
}