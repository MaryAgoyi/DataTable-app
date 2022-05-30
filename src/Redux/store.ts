import { configureStore } from '@reduxjs/toolkit'

import dataTableReducer from '../features/dataTable/dataTableSlice'
export const store = configureStore({
  reducer: {
    dataTable: dataTableReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
