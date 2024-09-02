'use client'
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./slices/authSlice"
import jobReducer from './slices/jobSlice';

export const store = configureStore({
    reducer:{
        jobs: jobReducer,
        auth:authReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch:()=>typeof store.dispatch= useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>= useSelector;