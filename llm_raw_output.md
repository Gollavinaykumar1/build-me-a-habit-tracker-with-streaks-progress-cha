# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react'
import { BrowserRouter as HashRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { Notification } from 'react-toastify'
import { Toast } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import { HiOutlineCalendar } from 'react-icons/hi'
import { FiPlus } from 'react-icons/fi'
import { clsx } from 'clsx'
import { format, addDays } from 'date-fns'
import { useForm } from 'react-hook-form'

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

function App() {
  const [habits, setHabits] = useState([])
  const [user, setUser] = useState(null)
  const [streaks, setStreaks] = useState({})

  const { register, handleSubmit } = useForm()

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data)
      setUser(response.data)
    } catch (error) {
      toast.error('Invalid credentials')
    }
  }

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, data)
      setUser(response.data)
    } catch (error) {
      toast.error('User already exists')
    }
  }

  const handleCreateHabit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/habits`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setHabits([...habits, response.data])
    } catch (error) {
      toast.error('Failed to create habit')
    }
  }

  const handleUpdateHabit = async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/habits/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setHabits(habits.map(habit => habit.id === id ? response.data : habit))
    } catch (error) {
      toast.error('Failed to update habit')
    }
  }

  const handleDeleteHabit = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/habits/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setHabits(habits.filter(habit => habit.id !== id))
    } catch (error) {
      toast.error('Failed to delete habit')
    }
  }

  const handleCheckHabit = async (id) => {
    try {
      const response = await axios.put(`${BASE_URL}/habits/${id}/check`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setHabits(habits.map(habit => habit.id === id ? response.data : habit))
    } catch (error) {
      toast.error('Failed to check habit')
    }
  }

  const handleUncheckHabit = async (id) => {
    try {
      const response = await axios.put(`${BASE_URL}/habits/${id}/uncheck`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setHabits(habits.map(habit => habit.id === id ? response.data : habit))
    } catch (error) {
      toast.error('Failed to uncheck habit')
    }
  }

  const handleGetStreaks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/habits/streaks`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setStreaks(response.data)
    } catch (error) {
      toast.error('Failed to get streaks')
    }
  }

  useEffect(() => {
    if (user) {
      axios.get(`${BASE_URL}/habits`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(response => {
        setHabits(response.data)
      })
      .catch(error => {
        toast.error('Failed to get habits')
      })
    }
  }, [user])

  return (
    <HashRouter>
      <div className="max-w-5xl mx-auto p-4 pt-6 md:p-6 lg:p-8">
        <ToastContainer />
        <Toaster />
        {user ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">Habit Tracker</h1>
            <ul>
              {habits.map(habit => (
                <li key={habit.id} className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-lg">{habit.name}</span>
                    <span className="text-lg">{streaks[habit.id] ? streaks[habit.id].streak : 0} days</span>
                  </div>
                  <div className="flex justify-between">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCheckHabit(habit.id)}>Check</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUncheckHabit(habit.id)}>Uncheck</button>
                  </div>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit(handleCreateHabit)}>
              <input type="text" {...register("name")} className="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="New habit" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Habit</button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4">Login or Register</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
              <input type="text" {...register("username")} className="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Username" />
              <input type="password" {...register("password")} className="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Password" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
            </form>
            <form onSubmit={handleSubmit(handleRegister)}>
              <input type="text" {...register("username")} className="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Username" />
              <input type="password" {...register("password")} className="block w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Password" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
            </form>
          </div>
        )}
      </div>
    </HashRouter>
  )
}

export default App
=== END ===

=== FILE: src/main.jsx ===
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
=== END ===

=== FILE: src/index.css ===
@tailwind base
@tailwind components
@tailwind utilities
=== END ===

=== FILE: src/api.js ===
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export const login = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  } catch (error) {
    throw error
  }
}

export const register = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  } catch (error) {
    throw error
  }
}

export const createHabit = async (data, token) => {
  try {
    const response = await fetch(`${BASE_URL}/habits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  } catch (error) {
    throw error
  }
}

export const getHabits = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/habits`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.json()
  } catch (error) {
    throw error
  }
}

export const updateHabit = async (id, data, token) => {
  try {
    const response = await fetch(`${BASE_URL}/habits/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  } catch (error) {
    throw error
  }
}

export const deleteHabit = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/habits/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.json()
  } catch (error) {
    throw error
  }
}

export const checkHabit = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/habits/${id}/check`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.json()
  } catch (error) {
    throw error
  }
}

export const uncheckHabit = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/habits/${id}/uncheck`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.json()
  } catch (error) {
    throw error
  }
}

export const getStreaks = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/habits/streaks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.json()
  } catch (error) {
    throw error
  }
}
=== END ===