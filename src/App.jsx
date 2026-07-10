import { useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="container">
      <h1>Registration Wizard</h1>

      {step === 1 && (
        <div className="form-box">
          <h2>Step 1 - Personal Info</h2>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-box">
          <h2>Step 2 - Account Details</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="buttons">
            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={() => setStep(3)}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-box">
          <h2>Step 3 - Review & Submit</h2>

          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Date of Birth:</strong> {formData.dob}</p>
          <p><strong>Email:</strong> {formData.email}</p>

          <div className="buttons">
            <button onClick={() => setStep(2)}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;