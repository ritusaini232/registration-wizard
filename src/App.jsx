import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

const schema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    dob: z.string().min(1, "Date of Birth is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

function App() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const nextStep = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger(["firstName", "lastName", "dob"]);
    }

    if (step === 2) {
      valid = await trigger([
        "email",
        "password",
        "confirmPassword",
      ]);
    }

    if (valid) {
      setStep(step + 1);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
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
            placeholder="First Name"
            {...register("firstName")}/>
          {errors.firstName && (
            <p className="error">{errors.firstName.message}</p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}/>
          {errors.lastName && (
            <p className="error">{errors.lastName.message}</p>
          )}

          <input
            type="date"
            {...register("dob")}/>
          {errors.dob && (
            <p className="error">{errors.dob.message}</p>
          )}

          <button
            type="button"
            onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="form-box">
          <h2>Step 2 - Account Details</h2>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}/>
          {errors.email && (
            <p className="error">{errors.email.message}</p>
          )}

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}/>

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <div className="password-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}/>

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }>
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          {errors.confirmPassword && (
            <p className="error">
              {errors.confirmPassword.message}
            </p>
          )}

          <div className="buttons">
            <button
              type="button"
              onClick={() => setStep(1)}>
              Back
            </button>

            <button
              type="button"
              onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="form-box">
          <h2>Step 3 - Review & Submit</h2>

          <p>
            <strong>First Name:</strong> {watch("firstName")}
          </p>

          <p>
            <strong>Last Name:</strong> {watch("lastName")}
          </p>

          <p>
            <strong>Date of Birth:</strong> {watch("dob")}
          </p>

          <p>
            <strong>Email:</strong> {watch("email")}
          </p>

          <div className="buttons">
            <button
              type="button"
              onClick={() => setStep(2)}>
              Back
            </button>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}>            
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;