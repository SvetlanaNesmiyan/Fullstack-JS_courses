import { useRef } from 'react';

export default function UncontrolledForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const countryRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      country: countryRef.current.value,
      message: messageRef.current.value,
    };

    console.log('Uncontrolled Form Submitted:', formData);
    alert(`Form submitted!\nUsername: ${formData.username}\nEmail: ${formData.email}\nCountry: ${formData.country}\nMessage: ${formData.message}`);

    // Reset form
    e.target.reset();
  };

  return (
    <div className="component-container">
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            defaultValue="Guest User"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select id="country" ref={countryRef} defaultValue="USA">
            <option value="Ukraine">Ukraine</option>
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
            <option value="Poland">Poland</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            ref={messageRef}
            rows="4"
            placeholder="Enter your message"
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="form-info">
        <p><strong>Note:</strong> This form uses refs to access values. The values are only available when the form is submitted.</p>
      </div>
    </div>
  );
}
