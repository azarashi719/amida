
import {configureStore} from "@reduxjs/toolkit";

import {AmidaSizeReducer} from '../amidaSize/reducers';


export const store = configureStore({
    reducer: {
        amidaSize: AmidaSizeReducer,
    },
});