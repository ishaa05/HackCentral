

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
        role,
      });

      if (response.data.user.role === 'judge') {
        navigate('/judgedashboard');
      } 
      else if(response.data.user.role === 'user'){
        localStorage.setItem('userId', response.data.user._id);
        navigate('/');
      }
      else if(response.data.user.role === 'mentor'){
        navigate('/mentorProfile');
      }
        else{
          navigate('/organizer');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#000000'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '8px',
          color: '#360498'
        }}>
          Welcome Back
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#666666',
          marginBottom: '24px'
        }}>
          Please enter your details
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333333'
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333333'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333333'
            }}>
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#000000'
              }}
            >
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
              <option value="judge">Judge</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          {error && (
            <p style={{
              color: '#FF5A05',
              fontSize: '14px',
              textAlign: 'center',
              margin: '0'
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#360498',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              marginTop: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6C1F93'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#360498'}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;