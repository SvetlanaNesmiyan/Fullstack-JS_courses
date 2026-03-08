import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserProfile from './UserProfile'

// Мок для fetch API
global.fetch = vi.fn()

describe('UserProfile', () => {
  const mockUser = {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    address: {
      city: 'Gwenborough'
    },
    company: {
      name: 'Romaguera-Crona'
    }
  }

  beforeEach(() => {
    fetch.mockReset()
  })

  it('відображає індикатор завантаження під час виконання запиту', () => {
    // Створюємо Promise, який не resolve (імітація завантаження)
    fetch.mockImplementation(() => new Promise(() => {}))
    
    render(<UserProfile />)
    
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByText('Завантаження...')).toBeInTheDocument()
  })

  it('коректно відображає дані користувача після успішного запиту', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUser
    })
    
    render(<UserProfile />)
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    
    expect(screen.getByTestId('user-profile')).toBeInTheDocument()
    expect(screen.getByTestId('user-name')).toHaveTextContent('Leanne Graham')
    expect(screen.getByTestId('user-email')).toHaveTextContent('Sincere@april.biz')
    expect(screen.getByTestId('user-phone')).toHaveTextContent('1-770-736-8031 x56442')
    expect(screen.getByTestId('user-city')).toHaveTextContent('Gwenborough')
    expect(screen.getByTestId('user-company')).toHaveTextContent('Romaguera-Crona')
  })

  it('відображає повідомлення про помилку у разі невдалого запиту', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404
    })
    
    render(<UserProfile />)
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
    
    expect(screen.getByTestId('error')).toHaveTextContent('Помилка: 404')
  })

  it('відображає повідомлення про помилку при виключенні', async () => {
    fetch.mockRejectedValue(new Error('Network error'))
    
    render(<UserProfile />)
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
    
    expect(screen.getByTestId('error')).toHaveTextContent('Network error')
  })
})
