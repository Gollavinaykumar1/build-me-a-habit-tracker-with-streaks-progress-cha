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

// Auto-generated missing exports by VIA
export const createItem = async (d) => { const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}); if (!r.ok) throw new Error("createItem failed"); return r.json(); };
export const deleteItem = async (id) => { const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items/${id}`, {method:"DELETE"}); if (!r.ok) throw new Error("deleteItem failed"); return r.json(); };
export const getItems = async (p) => { const q = p ? "?" + new URLSearchParams(p) : ""; const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items${q}`); if (!r.ok) throw new Error("getItems failed"); return r.json(); };
export const getStats = async () => { const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/stats`); if (!r.ok) throw new Error("getStats failed"); return r.json(); };
