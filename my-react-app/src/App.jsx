import { useState } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')

  const handleClick = () => {
    alert(`Ви ввели: ${inputValue}`)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="card">
      <Input
        placeholder="Введіть текст..."
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <Button
        text="Натисни мене"
        type="button"
        onClick={handleClick}
      />
    </div>
  )
}

export default App
