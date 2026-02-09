import React, { useState } from 'react';

const App = () => {
  const [sliderPosition, setSliderPosition] = useState(33);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderInteraction = (clientX, sliderRef) => {
    if (!sliderRef) return;
    
    const rect = sliderRef.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e, sliderRef) => {
    setIsDragging(true);
    handleSliderInteraction(e.clientX, sliderRef);
  };

  const handleMouseMove = (e, sliderRef) => {
    if (isDragging) {
      handleSliderInteraction(e.clientX, sliderRef);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e, sliderRef) => {
    setIsDragging(true);
    handleSliderInteraction(e.touches[0].clientX, sliderRef);
  };

  const handleTouchMove = (e, sliderRef) => {
    if (isDragging) {
      handleSliderInteraction(e.touches[0].clientX, sliderRef);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    const styles = `
      :root {
        --bg-black: #080808;
        --card-grey: #E2E2E2;
        --card-pink: #FF004C;
        --text-primary: #000000;
        --text-on-black: #FFFFFF;
        --text-secondary: #555555;
        --text-on-pink: #59001A;
        --font-main: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        --radius-card: 24px;
        --spacing-unit: 1.25rem;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
      }

      body {
        background-color: var(--bg-black);
        color: var(--text-on-black);
        font-family: var(--font-main);
        height: 100vh;
        width: 100vw;
        overflow: hidden;
      }

      @keyframes floatIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .card:nth-child(1) { animation: floatIn 0.6s ease-out; }
      .card:nth-child(2) { animation: floatIn 0.6s ease-out 0.2s backwards; }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-black)'
      }}
      onMouseMove={(e) => {
        const sliderRef = document.querySelector('.slider-track');
        handleMouseMove(e, sliderRef);
      }}
      onMouseUp={handleMouseUp}
      onTouchMove={(e) => {
        const sliderRef = document.querySelector('.slider-track');
        handleTouchMove(e, sliderRef);
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        style={{
          width: '40px',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '30px',
          paddingLeft: '10px',
          borderRight: '1px solid #333',
          flexShrink: 0,
          zIndex: 10,
          background: 'var(--bg-black)'
        }}
      >
        <div 
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            textTransform: 'lowercase',
            fontWeight: 700,
            fontSize: '24px',
            letterSpacing: '-1px',
            color: 'white'
          }}
        >
          <span style={{ color: 'var(--card-pink)', marginBottom: '4px' }}>_</span>spltr
        </div>
      </div>

      <div 
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--spacing-unit)',
          position: 'relative',
          overflowY: 'auto'
        }}
      >
        <header style={{ marginBottom: '30px', paddingLeft: '10px' }}>
          <h1 
            style={{
              fontSize: '3rem',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              fontWeight: 500
            }}
          >
            Total<br />
            <span style={{ display: 'block', color: '#666' }}>vs. Yours</span>
          </h1>
        </header>

        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            paddingBottom: '40px'
          }}
        >
          <div 
            className="card"
            style={{
              borderRadius: 'var(--radius-card)',
              padding: '30px 24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '420px',
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              backgroundColor: 'var(--card-grey)',
              color: 'var(--text-primary)'
            }}
          >
            <div 
              style={{
                fontSize: '2rem',
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                marginBottom: '40px',
                maxWidth: '80%'
              }}
            >
              Evening<br />Tab
            </div>

            <div 
              style={{
                position: 'relative',
                paddingLeft: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                marginTop: 'auto',
                marginBottom: 'auto'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '10px',
                  bottom: '30px',
                  width: '1px',
                  backgroundColor: 'currentColor'
                }}
              >
                <div 
                  style={{
                    content: '',
                    position: 'absolute',
                    bottom: '-5px',
                    left: '-3px',
                    width: '6px',
                    height: '6px',
                    borderRight: '1px solid currentColor',
                    borderBottom: '1px solid currentColor',
                    transform: 'rotate(45deg)'
                  }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <div 
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                    opacity: 0.7
                  }}
                >
                  Source
                </div>
                <div 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    lineHeight: 1.3
                  }}
                >
                  Izakaya Omakase
                </div>
                <div 
                  style={{
                    display: 'block',
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 500
                  }}
                >
                  Table 4
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div 
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                    opacity: 0.7
                  }}
                >
                  Consume
                </div>
                <div 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    lineHeight: 1.3
                  }}
                >
                  3x Chef's Select<br />
                  1x Junmai Ginjo
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div 
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                    opacity: 0.7
                  }}
                >
                  Subtotal
                </div>
                <div 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    lineHeight: 1.3
                  }}
                >
                  $240.00
                </div>
              </div>
            </div>
          </div>

          <div 
            className="card"
            style={{
              borderRadius: 'var(--radius-card)',
              padding: '30px 24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '420px',
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              backgroundColor: 'var(--card-pink)',
              color: 'var(--text-on-pink)',
              marginLeft: '30px',
              width: 'calc(100% - 30px)'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                left: '-34px',
                top: '40px',
                bottom: '40px',
                width: '28px',
                backgroundColor: 'transparent',
                border: '1px solid var(--card-pink)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 0',
                color: 'var(--card-pink)'
              }}
            >
              <span 
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  whiteSpace: 'nowrap'
                }}
              >
                Payment Flow
              </span>
              <span 
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  whiteSpace: 'nowrap'
                }}
              >
                Apple Pay
              </span>
            </div>

            <div 
              style={{
                fontSize: '2rem',
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                marginBottom: '40px',
                maxWidth: '80%'
              }}
            >
              Personal<br />Share
            </div>

            <div 
              style={{
                position: 'relative',
                paddingLeft: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                marginTop: 0,
                marginBottom: '30px'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '10px',
                  bottom: '30px',
                  width: '1px',
                  backgroundColor: 'currentColor',
                  borderColor: 'rgba(89, 0, 26, 0.3)'
                }}
              >
                <div 
                  style={{
                    content: '',
                    position: 'absolute',
                    bottom: '-5px',
                    left: '-3px',
                    width: '6px',
                    height: '6px',
                    borderRight: '1px solid currentColor',
                    borderBottom: '1px solid currentColor',
                    transform: 'rotate(45deg)'
                  }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <div 
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                    opacity: 0.6
                  }}
                >
                  Algorithm
                </div>
                <div 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    lineHeight: 1.3
                  }}
                >
                  Equal Split (3)
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div 
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px',
                    opacity: 0.6
                  }}
                >
                  Gratuity
                </div>
                <div 
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    lineHeight: 1.3
                  }}
                >
                  20% Included
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: '20px'
                }}
              >
                <div>
                  <div 
                    style={{
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      opacity: 0.8,
                      marginBottom: '10px'
                    }}
                  >
                    Due Now
                  </div>
                  <div 
                    style={{
                      fontSize: '4rem',
                      fontWeight: 600,
                      letterSpacing: '-0.05em',
                      lineHeight: 1
                    }}
                  >
                    <sup style={{ fontSize: '1.5rem', top: '-1.5rem' }}>$</sup>96
                  </div>
                </div>
              </div>

              <div 
                className="slider-track"
                style={{
                  width: '100%',
                  height: '2px',
                  background: 'rgba(0,0,0,0.1)',
                  position: 'relative',
                  marginTop: '30px',
                  marginBottom: '10px',
                  cursor: 'pointer'
                }}
                onMouseDown={(e) => handleMouseDown(e, e.currentTarget)}
                onTouchStart={(e) => handleTouchStart(e, e.currentTarget)}
              >
                <div 
                  style={{
                    width: '12px',
                    height: '12px',
                    background: 'black',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '-5px',
                    left: `${sliderPosition}%`,
                    transform: 'translateX(-50%)',
                    cursor: 'grab',
                    userSelect: 'none'
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                />
              </div>

              <button 
                style={{
                  marginTop: '30px',
                  width: '100%',
                  padding: '20px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: 'inherit',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => alert('Payment confirmed!')}
              >
                Confirm & Pay
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;