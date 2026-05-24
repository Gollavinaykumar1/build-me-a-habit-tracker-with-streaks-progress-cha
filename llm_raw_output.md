# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { FiCheckCircle } from 'react-icons/fi';
import { FiXCircle } from 'react-icons/fi';
import { format, isToday, isYesterday } from 'date-fns';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [habits, setHabits] = useState([]);
  const [streaks, setStreaks] = useState({});
  const [progress, setProgress] = useState({});
  const [reminders, setReminders] = useState({});
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios.get(`${BASE_URL}/habits`)
      .then(response => {
        setHabits(response.data);
      })
      .catch(error => {
        toast.error('Error fetching habits');
      });
  }, []);

  const handleHabitCheck = (habitId, checked) => {
    axios.patch(`${BASE_URL}/habits/${habitId}`, { checked: checked })
      .then(response => {
        const updatedHabits = habits.map(habit => habit.id === habitId ? { ...habit, checked: checked } : habit);
        setHabits(updatedHabits);
        calculateStreaks(updatedHabits);
        calculateProgress(updatedHabits);
      })
      .catch(error => {
        toast.error('Error updating habit');
      });
  };

  const calculateStreaks = (habits) => {
    const streaks = {};
    habits.forEach(habit => {
      const today = new Date();
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const habitDate = new Date(habit.date);
      if (isToday(habitDate)) {
        streaks[habit.id] = (streaks[habit.id] || 0) + 1;
      } else if (isYesterday(habitDate)) {
        streaks[habit.id] = (streaks[habit.id] || 0) + 1;
      } else {
        streaks[habit.id] = 0;
      }
    });
    setStreaks(streaks);
  };

  const calculateProgress = (habits) => {
    const progress = {};
    habits.forEach(habit => {
      const today = new Date();
      const habitDate = new Date(habit.date);
      if (isToday(habitDate)) {
        progress[habit.id] = (progress[habit.id] || 0) + 1;
      } else {
        progress[habit.id] = (progress[habit.id] || 0);
      }
    });
    setProgress(progress);
  };

  const handleReminder = (habitId, reminder) => {
    axios.patch(`${BASE_URL}/habits/${habitId}`, { reminder: reminder })
      .then(response => {
        const updatedHabits = habits.map(habit => habit.id === habitId ? { ...habit, reminder: reminder } : habit);
        setHabits(updatedHabits);
        setReminders({ ...reminders, [habitId]: reminder });
      })
      .catch(error => {
        toast.error('Error updating reminder');
      });
  };

  return (
    <HashRouter>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Habit Tracker</h1>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {habits.map(habit => (
            <li key={habit.id} style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
              <input type="checkbox" checked={habit.checked} onChange={(e) => handleHabitCheck(habit.id, e.target.checked)} style={{ marginRight: 10 }} />
              <span style={{ fontSize: 18, fontWeight: 'bold' }}>{habit.name}</span>
              <span style={{ fontSize: 14, color: '#666' }}>{format(new Date(habit.date), 'MMM d, yyyy')}</span>
              <span style={{ fontSize: 14, color: '#666', marginLeft: 10 }}>{streaks[habit.id] ? `Streak: ${streaks[habit.id]} days` : ''}</span>
              <span style={{ fontSize: 14, color: '#666', marginLeft: 10 }}>{progress[habit.id] ? `Progress: ${progress[habit.id]}%` : ''}</span>
              <input type="text" value={reminders[habit.id] || ''} onChange={(e) => handleReminder(habit.id, e.target.value)} style={{ padding: 5, border: '1px solid #ccc', borderRadius: 5, width: '100%', marginTop: 10 }} placeholder="Reminder" />
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </HashRouter>
  );
}

export default App;
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
=== END ===

=== FILE: src/index.css ===
/* No styles needed for this example */
=== END ===

=== FILE: src/api.js ===
// No separate API file needed, API calls are made directly in the App component
=== END ===