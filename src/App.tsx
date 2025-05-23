import { useState } from 'react'
import './App.css'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: newTaskTitle.trim(),
        completed: false,
        priority: newTaskPriority,
        createdAt: new Date()
      }
      setTasks([newTask, ...tasks])
      setNewTaskTitle('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)

  return (
    <div className="app">
      <header className="app-header">
        <h1>ADHD Task Manager</h1>
        <p>Simple, focused task management for better productivity</p>
      </header>

      <main className="main-content">
        <section className="add-task-section">
          <h2>Add New Task</h2>
          <div className="add-task-form">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="task-input"
              autoFocus
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="priority-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button onClick={addTask} className="add-button">
              Add Task
            </button>
          </div>
        </section>

        <section className="tasks-section">
          <h2>Pending Tasks ({pendingTasks.length})</h2>
          <div className="tasks-list">
            {pendingTasks.map(task => (
              <div key={task.id} className={`task-item priority-${task.priority}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className="task-title">{task.title}</span>
                <span className={`priority-badge priority-${task.priority}`}>
                  {task.priority}
                </span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                  aria-label="Delete task"
                >
                  ✕
                </button>
              </div>
            ))}
            {pendingTasks.length === 0 && (
              <p className="empty-state">No pending tasks. Great job! 🎉</p>
            )}
          </div>
        </section>

        {completedTasks.length > 0 && (
          <section className="completed-section">
            <h2>Completed Tasks ({completedTasks.length})</h2>
            <div className="tasks-list">
              {completedTasks.map(task => (
                <div key={task.id} className="task-item completed">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <span className="task-title">{task.title}</span>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="delete-button"
                    aria-label="Delete task"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
