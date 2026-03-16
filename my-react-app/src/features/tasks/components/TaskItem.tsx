import React from 'react';
import type { Task } from '../model/tasksSlice';
import { useAppDispatch } from '../../../app/hooks';
import { removeTaskStart, removeTaskSuccess, removeTaskFailure, toggleTaskStart, toggleTaskSuccess, toggleTaskFailure } from '../model/tasksSlice';
import { tasksApi } from '../api/tasksApi';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleToggle = async () => {
    try {
      dispatch(toggleTaskStart());
      const updatedTask = await tasksApi.toggleTask(task);
      dispatch(toggleTaskSuccess(updatedTask));
    } catch (error) {
      dispatch(toggleTaskFailure(error instanceof Error ? error.message : 'An error occurred'));
    }
  };

  const handleRemove = async () => {
    try {
      dispatch(removeTaskStart());
      await tasksApi.removeTask(task.id);
      dispatch(removeTaskSuccess(task.id));
    } catch (error) {
      dispatch(removeTaskFailure(error instanceof Error ? error.message : 'An error occurred'));
    }
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="task-checkbox"
      />
      <span className={task.completed ? 'task-text completed' : 'task-text'}>
        {task.title}
      </span>
      <button onClick={handleRemove} className="remove-button">
        Remove
      </button>
    </div>
  );
};

export default TaskItem;