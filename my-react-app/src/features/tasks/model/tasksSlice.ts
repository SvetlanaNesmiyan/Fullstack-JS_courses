import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskStart(state) {
      state.loading = true;
    },
    addTaskSuccess(state, action: PayloadAction<Task>) {
      state.loading = false;
      state.items.push(action.payload);
    },
    addTaskFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    removeTaskStart(state) {
      state.loading = true;
    },
    removeTaskSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    removeTaskFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    toggleTaskStart(state) {
      state.loading = true;
    },
    toggleTaskSuccess(state, action: PayloadAction<Task>) {
      state.loading = false;
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    toggleTaskFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTasksStart(state) {
      state.loading = true;
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addTaskStart,
  addTaskSuccess,
  addTaskFailure,
  removeTaskStart,
  removeTaskSuccess,
  removeTaskFailure,
  toggleTaskStart,
  toggleTaskSuccess,
  toggleTaskFailure,
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;