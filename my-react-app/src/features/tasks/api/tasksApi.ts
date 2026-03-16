import type { Task } from '../model/tasksSlice';

// Simulate API calls with localStorage
const TASKS_STORAGE_KEY = 'tasks';

export const tasksApi = {
  fetchTasks: async (): Promise<Task[]> => {
    const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  addTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const tasks = await tasksApi.fetchTasks();
    const newTask = { ...task, id: Math.random().toString(36).substr(2, 9) };
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    return newTask;
  },

  removeTask: async (id: string): Promise<void> => {
    const tasks = await tasksApi.fetchTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  },

  toggleTask: async (task: Task): Promise<Task> => {
    const tasks = await tasksApi.fetchTasks();
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    return updatedTasks.find(t => t.id === task.id) as Task;
  },
};