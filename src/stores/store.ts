import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"
import pointer from "./slices/pointsSlice/pointsSlice";
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        pointer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;