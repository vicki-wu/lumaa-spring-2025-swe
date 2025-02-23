import React, { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask } from '../services/api';

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask(task.id, { ...task, isComplete: !task.isComplete });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;
    try {
      await updateTask(editingTask.id, editingTask);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="no-tasks">No tasks found. Add one above!</div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="card">
            <div className="card-body">
              {editingTask?.id === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                  />
                  <textarea
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                  />
                  <div className="card-actions">
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingTask(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                    <button 
                      className={task.isComplete ? 'btn-complete' : 'btn-incomplete'}
                      onClick={() => handleToggleComplete(task)}
                    >
                      {task.isComplete ? 'Completed' : 'Not Complete'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
