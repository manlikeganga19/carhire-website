import React, { useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      const response = await fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful');

        login(data.user);

        setTimeout(() => {
          navigate('/');
        }, 1000); 
      } else {
        toast.error(`Login failed: ${data.message}`);
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      toast.error('Error during login. Please try again.');
      console.error('Error during login:', error);
    }
  };

  

  return (
    <div style={styles.container}>
      <h4>Login in to your account</h4>
      <form style={styles.form}>
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
          Password:
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" style={styles.button} onClick={handleLogin}>
          Login
        </button>
        <p style={styles.registerLink}>
          Don't have an account? <a href="/sign-up">Register</a>
        </p>
      </form>
    </div>
  );
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
    marginTop: '6em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '20px',
  },
  label: {
    marginBottom: '8px',
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


export default Login;
