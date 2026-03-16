import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasks, addTask } from '../features/tasks/model/tasksThunks';
import TaskItem from '../features/tasks/components/TaskItem';

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.tasks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  React.useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') return;
    dispatch(addTask({ title, description, completed: false }));
    setTitle('');
    setDescription('');
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tasks-page">
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="tasks-list">
        {items.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;