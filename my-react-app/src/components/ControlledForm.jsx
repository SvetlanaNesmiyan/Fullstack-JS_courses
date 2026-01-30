import { useState } from 'react';

export default function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: 'Ukraine',
    isAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Controlled Form Submitted:', formData);
    alert(`Form submitted!\nUsername: ${formData.username}\nEmail: ${formData.email}\nCountry: ${formData.country}`);
  };

  return (
    <div className="component-container">
      <h2>Controlled Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="Ukraine">Ukraine</option>
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
            <option value="Poland">Poland</option>
          </select>
        </div>

        <div className="form-group checkbox">
          <label htmlFor="isAgreed">
            <input
              type="checkbox"
              id="isAgreed"
              name="isAgreed"
              checked={formData.isAgreed}
              onChange={handleChange}
            />
            I agree to the terms
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="form-data-display">
        <h3>Current Form Data:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}
