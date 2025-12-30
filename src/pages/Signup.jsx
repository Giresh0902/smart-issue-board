import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr(""); // clear old errors

    if (!email || !password || !confirm) {
      return setErr("All fields are required");
    }

    if (password !== confirm) {
      return setErr("Passwords do not match");
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      console.log("User created:", userCred.user);
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      setErr(error.message || "Error creating account");
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <input 
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e)=>setConfirm(e.target.value)}
          required
        />

        <button type="submit">Signup</button>

        {err && <p className="error">{err}</p>}
      </form>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
