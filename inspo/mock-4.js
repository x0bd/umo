import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  root: {
    '--bg-color': '#050505',
    '--card-grey': '#E6E6E6',
    '--card-pink': '#FF004E',
    '--text-black': '#000000',
    '--text-white': '#FFFFFF',
    '--accent-pill': '#1a1a1a',
    '--font-main': "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    '--ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)'
  },
  body: {
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-white)',
    fontFamily: 'var(--font-main)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased'
  },
  spine: {
    position: 'absolute',
    left: '20px',
    top: 0,
    bottom: 0,
    width: '2px',
    background: 'var(--text-white)',
    zIndex: 10
  },
  spineLogo: {
    position: 'absolute',
    bottom: '40px',
    left: '-18px',
    transform: 'rotate(-90deg)',
    transformOrigin: 'left bottom',
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '-1px',
    color: 'var(--text-white)',
    whiteSpace: 'nowrap'
  },
  spineMarker: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '20px',
    height: '4px',
    background: 'var(--text-white)'
  },
  appContainer: {
    marginLeft: '50px',
    padding: '40px 20px 20px 20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  header: {
    marginBottom: '10px',
    animation: 'slideIn 0.6s var(--ease-out)'
  },
  h1: {
    fontSize: '48px',
    lineHeight: 0.95,
    fontWeight: 500,
    letterSpacing: '-2px',
    marginBottom: '24px'
  },
  heroDesc: {
    fontSize: '16px',
    lineHeight: 1.4,
    maxWidth: '260px',
    opacity: 0.8
  },
  cardsWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowY: 'auto',
    paddingBottom: '20px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  },
  card: {
    borderRadius: '28px',
    padding: '32px 24px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s var(--ease-out)',
    cursor: 'default'
  },
  cardTitle: {
    fontSize: '32px',
    fontWeight: 500,
    letterSpacing: '-1.5px',
    marginBottom: '32px',
    lineHeight: 1
  },
  cardReceipt: {
    backgroundColor: 'var(--card-grey)',
    color: 'var(--text-black)',
    flex: 1,
    minHeight: '320px',
    animation: 'slideUp 0.8s var(--ease-out) 0.1s backwards'
  },
  flowContainer: {
    position: 'relative',
    paddingLeft: '20px',
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    marginLeft: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  flowItem: {
    position: 'relative'
  },
  flowItemBefore: {
    content: '""',
    position: 'absolute',
    left: '-25px',
    top: '10px',
    width: '8px',
    height: '8px',
    borderBottom: '1px solid #000',
    borderRight: '1px solid #000',
    transform: 'rotate(45deg)',
    background: 'transparent'
  },
  flowLabel: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
    opacity: 0.6
  },
  flowValue: {
    fontSize: '20px',
    fontWeight: 500,
    letterSpacing: '-0.5px'
  },
  flowValueTotal: {
    fontSize: '36px',
    fontWeight: 600,
    marginTop: '8px'
  },
  cardAction: {
    backgroundColor: 'var(--card-pink)',
    color: 'var(--text-black)',
    minHeight: '280px',
    animation: 'slideUp 0.8s var(--ease-out) 0.2s backwards',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  sideTab: {
    position: 'absolute',
    left: '-12px',
    top: '40px',
    bottom: '40px',
    width: '24px',
    background: 'var(--text-black)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.6)',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    transform: 'rotate(180deg)',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    boxShadow: '4px 0 10px rgba(0,0,0,0.2)'
  },
  splitControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    marginLeft: '10px',
    borderLeft: '1px solid rgba(0,0,0,0.1)',
    paddingLeft: '24px'
  },
  controlGroup: {
    position: 'relative'
  },
  controlGroupBefore: {
    content: '""',
    position: 'absolute',
    left: '-29px',
    top: '6px',
    width: '8px',
    height: '8px',
    borderBottom: '1px solid #000',
    borderRight: '1px solid #000',
    transform: 'rotate(45deg)'
  },
  splitDisplay: {
    fontSize: '56px',
    fontWeight: 500,
    letterSpacing: '-3px',
    lineHeight: 0.9
  },
  splitLabel: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    display: 'block'
  },
  rangeWrapper: {
    marginTop: '10px',
    position: 'relative',
    height: '40px',
    display: 'flex',
    alignItems: 'center'
  },
  rangeInput: {
    WebkitAppearance: 'none',
    width: '100%',
    background: 'transparent'
  },
  payButton: {
    marginTop: 'auto',
    background: 'var(--text-black)',
    color: 'var(--text-white)',
    border: 'none',
    padding: '20px',
    fontSize: '18px',
    fontWeight: 500,
    borderRadius: '16px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  textDim: {
    opacity: 0.5
  }
};

const FlowItem = ({ label, value, isTotal, isDim }) => {
  return (
    <div style={customStyles.flowItem}>
      <div style={customStyles.flowItemBefore}></div>
      <div style={{ ...customStyles.flowLabel, ...(isTotal && { opacity: 1, color: '#000' }) }}>
        {label}
      </div>
      <div style={{ 
        ...customStyles.flowValue, 
        ...(isTotal && customStyles.flowValueTotal),
        ...(isDim && customStyles.textDim)
      }}>
        {value}
      </div>
    </div>
  );
};

const ControlGroup = ({ label, children }) => {
  return (
    <div style={customStyles.controlGroup}>
      <div style={customStyles.controlGroupBefore}></div>
      <label style={customStyles.splitLabel}>{label}</label>
      {children}
    </div>
  );
};

const HomePage = () => {
  const [splitCount, setSplitCount] = useState(3);
  const [cardActiveReceipt, setCardActiveReceipt] = useState(false);
  const [cardActiveAction, setCardActiveAction] = useState(false);
  const total = 183.45;

  const handleSliderChange = (e) => {
    setSplitCount(parseInt(e.target.value));
  };

  const splitAmount = (total / splitCount).toFixed(2);
  const personLabel = splitCount === 1 ? "Person" : "People";

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
      }
      
      .cards-wrapper::-webkit-scrollbar {
        display: none;
      }
      
      .card:active {
        transform: scale(0.98);
      }
      
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background: var(--text-black);
        cursor: pointer;
        margin-top: -14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }
      
      input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        background: rgba(0,0,0,0.1);
        border-radius: 2px;
      }
      
      input[type=range]::-moz-range-thumb {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background: var(--text-black);
        cursor: pointer;
        border: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }
      
      input[type=range]::-moz-range-track {
        width: 100%;
        height: 4px;
        background: rgba(0,0,0,0.1);
        border-radius: 2px;
      }
      
      .pay-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      }
      
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(100px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);

  return (
    <div style={{ ...customStyles.body, ...customStyles.root }}>
      <div style={customStyles.spine}>
        <div style={customStyles.spineMarker}></div>
        <div style={customStyles.spineLogo}>SPLITR__APP</div>
      </div>

      <div style={customStyles.appContainer}>
        <header style={customStyles.header}>
          <h1 style={customStyles.h1}>
            Izakaya<br />Night
          </h1>
          <p style={customStyles.heroDesc}>
            We streamline the chaos of group dining by leveraging automated itemization logic.
          </p>
        </header>

        <div style={customStyles.cardsWrapper} className="cards-wrapper">
          <div 
            style={{ 
              ...customStyles.card, 
              ...customStyles.cardReceipt 
            }}
            className="card"
            onMouseDown={() => setCardActiveReceipt(true)}
            onMouseUp={() => setCardActiveReceipt(false)}
            onMouseLeave={() => setCardActiveReceipt(false)}
            onTouchStart={() => setCardActiveReceipt(true)}
            onTouchEnd={() => setCardActiveReceipt(false)}
          >
            <div style={customStyles.cardTitle}>
              Receipt<br />Data
            </div>
            
            <div style={customStyles.flowContainer}>
              <FlowItem label="Source" value="Bill #90210" />
              <FlowItem label="Subtotal" value="$142.50" />
              <FlowItem label="Gratuity (20%)" value="$28.50" />
              <FlowItem label="Tax" value="$12.45" isDim={true} />
              <FlowItem label="Total Acquire" value="$183.45" isTotal={true} />
            </div>
          </div>

          <div 
            style={{ 
              ...customStyles.card, 
              ...customStyles.cardAction 
            }}
            className="card"
            onMouseDown={() => setCardActiveAction(true)}
            onMouseUp={() => setCardActiveAction(false)}
            onMouseLeave={() => setCardActiveAction(false)}
            onTouchStart={() => setCardActiveAction(true)}
            onTouchEnd={() => setCardActiveAction(false)}
          >
            <div style={customStyles.sideTab}>
              ADJUST + SPLIT
            </div>

            <div style={customStyles.cardTitle}>
              Your<br />Share
            </div>

            <div style={customStyles.splitControls}>
              <ControlGroup label="Split Mode">
                <div style={customStyles.rangeWrapper}>
                  <input 
                    type="range" 
                    min="1" 
                    max="6" 
                    value={splitCount}
                    onChange={handleSliderChange}
                    style={customStyles.rangeInput}
                  />
                </div>
                <div style={{ marginTop: '5px', fontWeight: 600 }}>
                  {splitCount} {personLabel}
                </div>
              </ControlGroup>

              <ControlGroup label="Individual Owe">
                <div style={customStyles.splitDisplay}>
                  ${splitAmount}
                </div>
              </ControlGroup>
            </div>

            <button style={customStyles.payButton} className="pay-button">
              <span>Settle Up</span>
              <span style={{ fontSize: '24px' }}>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;