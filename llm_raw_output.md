# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { format } from 'date-fns';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { clsx } from 'clsx';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [date, setDate] = useState(new Date());
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState([]);
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/habits`)
      .then(response => {
        setHabits(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedHabit) {
      axios.get(`${BASE_URL}/habits/${selectedHabit.id}/streak`)
        .then(response => {
          setStreak(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedHabit]);

  useEffect(() => {
    if (selectedHabit) {
      axios.get(`${BASE_URL}/habits/${selectedHabit.id}/progress`)
        .then(response => {
          setProgress(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedHabit]);

  const handleCheck = (habit) => {
    axios.post(`${BASE_URL}/habits/${habit.id}/check`)
      .then(response => {
        setHabits(habits.map(h => h.id === habit.id ? { ...h, checked: true } : h));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUncheck = (habit) => {
    axios.post(`${BASE_URL}/habits/${habit.id}/uncheck`)
      .then(response => {
        setHabits(habits.map(h => h.id === habit.id ? { ...h, checked: false } : h));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSelectHabit = (habit) => {
    setSelectedHabit(habit);
  };

  const handleReminder = () => {
    setReminder(!reminder);
  };

  return (
    <HashRouter>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: 20, maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 20 }}>Habit Tracker</h1>
        <Routes>
          <Route path="/" element={
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 10 }}>Habits</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {habits.map(habit => (
                  <li key={habit.id} style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
                    <span style={{ fontSize: 18, marginRight: 10 }}>{habit.name}</span>
                    <button style={{ backgroundColor: '#4CAF50', color: '#fff', border: 'none', padding: 10, borderRadius: 5 }} onClick={() => handleCheck(habit)}>Check</button>
                    <button style={{ backgroundColor: '#f44336', color: '#fff', border: 'none', padding: 10, borderRadius: 5, marginLeft: 10 }} onClick={() => handleUncheck(habit)}>Uncheck</button>
                    <button style={{ backgroundColor: '#03A9F4', color: '#fff', border: 'none', padding: 10, borderRadius: 5, marginLeft: 10 }} onClick={() => handleSelectHabit(habit)}>View</button>
                  </li>
                ))}
              </ul>
            </div>
          } />
          <Route path="/habit/:id" element={
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 10 }}>{selectedHabit && selectedHabit.name}</h2>
              <p style={{ fontSize: 18, marginBottom: 20 }}>Streak: {streak} days</p>
              <div style={{ width: '100%', height: 200, backgroundColor: '#f7f7f7', padding: 20, borderRadius: 10 }}>
                <canvas style={{ width: '100%', height: '100%' }}></canvas>
              </div>
              <button style={{ backgroundColor: '#4CAF50', color: '#fff', border: 'none', padding: 10, borderRadius: 5 }} onClick={handleReminder}>Set Reminder</button>
            </div>
          } />
        </Routes>
        <ToastContainer style={{ fontSize: 18, fontWeight: 'bold' }} />
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
/* No styles defined */
=== END ===

=== FILE: src/api.js ===
// No API functions defined, using axios directly in App component
=== END ===