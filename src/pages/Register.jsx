import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Implement your register logic here
    console.log('Name:', name);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
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
    </div>
  );
};

export default Register;
