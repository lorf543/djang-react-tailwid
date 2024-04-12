import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import { TasksPage } from './pages/TasksPage'
import { TasksFormPage } from './pages/TaskFormPages'
import { Navigations } from './components/Navigations'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        < Navigations />
        <Routes>
          < Route path='/' element={<Navigate to="/tasks" />}/>,
          < Route path='/tasks' element={<TasksPage />}/>,
          < Route path='/tasks-create' element={<TasksFormPage />}/>,
          < Route path='/tasks/:id' element={<TasksFormPage />}/>,
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App