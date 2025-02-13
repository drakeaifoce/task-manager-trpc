import { trpc } from '../api/trpc';
import './styles.css'

export const TaskList = () => {
  const { data: tasks, isLoading } = trpc.task.getAll.useQuery();
  const toggleTask = trpc.task.toggleTask.useMutation();
  const deleteTask = trpc.task.deleteTask.useMutation();
  const utils = trpc.useUtils();

  if (isLoading) return <p>Loading tasks...</p>;

  const handleToggle = (id: string) => {
    toggleTask.mutate({ id }, {
      onSuccess: () => utils.task.getAll.invalidate()
    });
  };

  const handleDelete = (id: string) => {
    deleteTask.mutate({ id }, {
      onSuccess: () => utils.task.getAll.invalidate()
    });
  };

  return (
    <ul className='container'>
      {tasks?.map(task => (
        <li key={task.id} className='item'>
            <div>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                </span>
            </div>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
