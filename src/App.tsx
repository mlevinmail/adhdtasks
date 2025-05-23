import { useState, useEffect } from 'react'
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
  const [completedCount, setCompletedCount] = useState(0)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('adhd-tasks')
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }))
        setTasks(parsedTasks)
      } catch (error) {
        console.error('Error loading tasks:', error)
      }
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('adhd-tasks', JSON.stringify(tasks))
  }, [tasks])

  // Update completed count when tasks change
  useEffect(() => {
    const completed = tasks.filter(task => task.completed).length
    setCompletedCount(completed)
  }, [tasks])

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
      
      // Add a small celebration for adding a task
      const button = document.querySelector('.add-button') as HTMLButtonElement
      if (button) {
        button.style.transform = 'scale(0.95)'
        setTimeout(() => {
          button.style.transform = ''
        }, 150)
      }
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed }
        
        // Add celebration animation for completing a task
        if (!task.completed) {
          setTimeout(() => {
            const taskElement = document.querySelector(`[data-task-id="${id}"]`)
            if (taskElement) {
              taskElement.classList.add('celebrating')
              setTimeout(() => {
                taskElement.classList.remove('celebrating')
              }, 500)
            }
          }, 100)
        }
        
        return updatedTask
      }
      return task
    }))
  }

  const deleteTask = (id: string) => {
    // Add exit animation before removing
    const taskElement = document.querySelector(`[data-task-id="${id}"]`)
    if (taskElement) {
      taskElement.classList.add('task-item-exit-active')
      setTimeout(() => {
        setTasks(tasks.filter(task => task.id !== id))
      }, 300)
    } else {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

  const getMotivationalMessage = () => {
    const totalTasks = tasks.length
    const completed = completedCount
    
    if (totalTasks === 0) return "Ready to tackle some tasks? Add one above! 🚀"
    if (completed === 0) return "You've got this! One task at a time 💪"
    if (completed === totalTasks) return "Amazing! You've completed everything! 🎉"
    if (completed / totalTasks >= 0.8) return "You're on fire! Almost done! 🔥"
    if (completed / totalTasks >= 0.5) return "Great progress! Keep it up! ⭐"
    return "Every task completed is a win! 🌟"
  }

  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)

  return (
    <div className="app">
      <header className="app-header">
        <h1>ADHD Task Manager</h1>
        <p>Simple, focused task management for better productivity</p>
        <div style={{ 
          marginTop: '1rem', 
          fontSize: '1rem', 
          fontWeight: '500',
          opacity: 0.9 
        }}>
          {getMotivationalMessage()}
        </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Pending Tasks ({pendingTasks.length})</h2>
            {completedTasks.length > 0 && (
              <button 
                onClick={clearCompleted}
                style={{
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 154, 158, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                Clear Completed
              </button>
            )}
          </div>
          <div className="tasks-list">
            {pendingTasks.map(task => (
              <div key={task.id} className={`task-item priority-${task.priority}`} data-task-id={task.id}>
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
              <p className="empty-state">
                {tasks.length === 0 
                  ? "No tasks yet. Add your first task above! 🎯" 
                  : "All tasks completed! You're amazing! 🎉"
                }
              </p>
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
