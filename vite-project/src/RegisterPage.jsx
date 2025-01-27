import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [graduation, setGraduation] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!name || !email || !university || !major || !graduation || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    console.log({
      name,
      email,
      university,
      major,
      graduation,
      password,
    });
  
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        name,
        email,
        university,
        major,
        graduation,
        password,
      });
  
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/profile'), 2000);
    } catch (error) {
      console.error(error); // Log the full error
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#000000',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '8px',
            color: '#360498',
          }}
        >
          Register
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: '#666666',
            marginBottom: '24px',
          }}
        >
          Create your account by filling out the details
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
            />
          </div>

          <div>
            <label>University</label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="Enter your university"
              style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
            />
          </div>

          <div>
            <label>Major</label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="Enter your major"
              style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
            />
          </div>

          <div>
            <label>Graduation Year</label>
            <input
              type="text"
              value={graduation}
              onChange={(e) => setGraduation(e.target.value)}
              placeholder="Enter your graduation year (e.g., 2025)"
              style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
            />
          </div>

          {error && <p style={{ color: '#FF5A05', textAlign: 'center' }}>{error}</p>}
          {success && <p style={{ color: '#28A745', textAlign: 'center' }}>{success}</p>}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#360498',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;