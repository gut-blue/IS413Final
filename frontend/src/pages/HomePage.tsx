// src/pages/HomePage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function HomePage() {
  const navigate = useNavigate();

  const heroStyle: React.CSSProperties = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    color: 'white',
    textAlign: 'center',
    padding: '0 1rem',
  };

  return (
    <div style={heroStyle}>
      <div style={overlayStyle} />
      <div style={contentStyle}>
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 700,
            marginBottom: '1rem',
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
          }}
        >
          Welcome to Hilton&apos;s Entertainment Agency!
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', textShadow: '1px 1px 6px rgba(0,0,0,0.5)' }}>
          Discover and book the best entertainers for your next event.
        </p>
        <Button
          variant="success"
          size="lg"
          onClick={() => navigate('/entertainers')}
          style={{ padding: '0.75rem 2rem', fontSize: '1.25rem' }}
        >
          Click Here to Book an Entertainer
        </Button>
      </div>
    </div>
  );
}
