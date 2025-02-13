import React, { useState } from 'react';
import { trpc } from '../api/trpc';
import './styles.css'

export const AddTask = () => {
  const [title, setTitle] = useState('');
  const utils = trpc.useUtils();
  const addTask = trpc.task.addTask.useMutation({
    onSuccess: () => {
      setTitle('');
      utils.task.getAll.invalidate(); 
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title) {
      addTask.mutate({ title });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='add-task'>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
