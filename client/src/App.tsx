import { AddTask } from "./components/AddTask"
import { TaskList } from "./components/TaskList"
import './App.css'

function App() {
  return (
    <main className="main">
      <div className="box">
        <h1>Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </main>
  )
}

export default App
