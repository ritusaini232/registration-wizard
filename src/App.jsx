import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "firstName":
        return value.trim() === "" ? "First Name is required" : "";

      case "lastName":
        return value.trim() === "" ? "Last Name is required" : "";

      case "dob":
        return value === "" ? "Date of Birth is required" : "";

      case "email":
        if (!value) return "Email is required";
        if (!value.includes("@"))
          return "Email must contain @";
        return "";

      case "password":
        if (!value)
          return "Password is required";
        if (value.length < 8)
          return "Password must be at least 8 characters";
        return "";

      case "confirmPassword":
        if (!value)
          return "Confirm Password is required";
        if (value !== formData.password)
          return "Passwords do not match";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    setErrors({
      firstName: validate(
        "firstName",
        updatedData.firstName
      ),
      lastName: validate(
        "lastName",
        updatedData.lastName
      ),
      dob: validate("dob", updatedData.dob),
      email: validate("email", updatedData.email),
      password: validate(
        "password",
        updatedData.password
      ),
      confirmPassword: validate(
        "confirmPassword",
        updatedData.confirmPassword
      ),
    });
  };

  const isStep1Valid =
    formData.firstName &&
    formData.lastName &&
    formData.dob &&
    !errors.firstName &&
    !errors.lastName &&
    !errors.dob;

  const isStep2Valid =
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;

  const handleSubmit = () => {
    console.log(formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="container">
      <h1>Registration Wizard</h1>

      <h3>Step {step} of 3</h3>
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
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <p className="error">{errors.dob}</p>}

          <button
            disabled={!isStep1Valid}
            onClick={() => setStep(2)}
          >
            Next
          </button>
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
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="password-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <div className="buttons">
            <button onClick={() => setStep(1)}>
              Back
            </button>

            <button
              disabled={!isStep2Valid}
              onClick={() => setStep(3)}
            >
              Next
            </button>
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
            <button onClick={() => setStep(2)}>
              Back
            </button>

            <button onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;