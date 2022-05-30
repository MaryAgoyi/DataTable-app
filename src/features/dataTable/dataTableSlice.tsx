import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../Redux/store'
import dataFile from '../../components/example-data.json'

export interface Tablerow {
  data: Record<string, string>
  kids: Record<string, undefined | { records: Tablerow[] }>
}

export interface dataTableState {
  userObject: Tablerow[]
}

const initialState: dataTableState = {
  userObject: dataFile,
}

export const deleteTable = createAsyncThunk('student/logout', async (node: Tablerow[]) => {
  return node
})

export const dataTableSlice = createSlice({
  name: 'dataTable',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(deleteTable.fulfilled, (state, action) => {
      state.userObject = action.payload
    })
  },
})

export const getData = (state: RootState) => state.dataTable.userObject

export default dataTableSlice.reducer
