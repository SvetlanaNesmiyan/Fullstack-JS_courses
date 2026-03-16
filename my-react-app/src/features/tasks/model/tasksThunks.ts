import type { AppDispatch } from '../../../app/store';
import { addTaskStart, addTaskSuccess, addTaskFailure, removeTaskStart, removeTaskSuccess, removeTaskFailure, toggleTaskStart, toggleTaskSuccess, toggleTaskFailure, fetchTasksStart, fetchTasksSuccess, fetchTasksFailure } from './tasksSlice';
import { tasksApi } from '../api/tasksApi';
import type { Task } from './tasksSlice';

export const fetchTasks = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTasksStart());
  try {
    const tasks = await tasksApi.fetchTasks();
    dispatch(fetchTasksSuccess(tasks));
  } catch (error) {
    dispatch(fetchTasksFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
};

export const addTask = (task: Omit<Task, 'id'>) => async (dispatch: AppDispatch) => {
  dispatch(addTaskStart());
  try {
    const newTask = await tasksApi.addTask(task);
    dispatch(addTaskSuccess(newTask));
  } catch (error) {
    dispatch(addTaskFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
};

export const removeTask = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(removeTaskStart());
  try {
    await tasksApi.removeTask(id);
    dispatch(removeTaskSuccess(id));
  } catch (error) {
    dispatch(removeTaskFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
};

export const toggleTask = (task: Task) => async (dispatch: AppDispatch) => {
  dispatch(toggleTaskStart());
  try {
    const updatedTask = await tasksApi.toggleTask(task);
    dispatch(toggleTaskSuccess(updatedTask));
  } catch (error) {
    dispatch(toggleTaskFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
};