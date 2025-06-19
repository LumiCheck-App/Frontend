import { createSlice } from '@reduxjs/toolkit';

const isMonitoring = createSlice({
  name: 'isMonitoring',
  initialState: false, //ir buscar state à BD
  reducers: {
    toogleMonitorization: (state) => !state,
  },
});

export const { toogleMonitorization } = isMonitoring.actions;
export default isMonitoring.reducer;