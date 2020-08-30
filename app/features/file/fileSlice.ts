import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const fileSlice = createSlice({
  name: 'file',
  initialState: '',
  reducers: {
    change: (_state, action) => {
      return action.payload;
    },
  },
});

export const { change } = fileSlice.actions;

export default fileSlice.reducer;

export const selectFile = (state: RootState) => state.file;
