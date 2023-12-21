import React, { useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account created successfully');

        login(data.user);

        setTimeout(() => {
          navigate('/sign-in'); 
        }, 5000); 
      } else {
        toast.error(`Registration failed: ${data.message}`);
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      toast.error('Error during registration. Please try again.');
      console.error('Error during registration:', error);
    }
  };


  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      width: '300px',
      margin: 'auto',
      marginTop: '50px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginTop: '20px',
    },
    label: {
      marginBottom: '6px',
    },
    input: {
      padding: '4px',
      marginBottom: '12px',
      width: '100%',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#000d6b ',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      fontSize: '16px',
    },
    registerLink: {
      marginTop: '10px',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <h4>Register your account</h4>
      <form style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Username:
          <input
            type="text"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Email:
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Password:
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Confirm Password:
          <input
            type="password"
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="button" style={styles.button} onClick={handleRegister}>
          Register
        </button>
        <p style={styles.registerLink}>
          Already have an account? <a href="/sign-in">Login</a>
        </p>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Register;
