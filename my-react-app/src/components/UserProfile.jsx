import { useState, useEffect } from 'react'

const API_URL = 'https://jsonplaceholder.typicode.com/users/1'

function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(API_URL)
        
        if (!response.ok) {
          throw new Error(`Помилка: ${response.status}`)
        }
        
        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err.message || 'Сталася помилка при завантаженні даних')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div data-testid="loading">
        Завантаження...
      </div>
    )
  }

  if (error) {
    return (
      <div data-testid="error" style={{ color: 'red' }}>
        {error}
      </div>
    )
  }

  return (
    <div data-testid="user-profile">
      <h2>Профіль користувача</h2>
      <div data-testid="user-info">
        <p><strong>Ім'я:</strong> <span data-testid="user-name">{user.name}</span></p>
        <p><strong>Електронна пошта:</strong> <span data-testid="user-email">{user.email}</span></p>
        <p><strong>Телефон:</strong> <span data-testid="user-phone">{user.phone}</span></p>
        <p><strong>Місто:</strong> <span data-testid="user-city">{user.address.city}</span></p>
        <p><strong>Компанія:</strong> <span data-testid="user-company">{user.company.name}</span></p>
      </div>
    </div>
  )
}

export default UserProfile
