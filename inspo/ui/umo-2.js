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
  },
  body: {
    backgroundColor: '#050505',
    color: '#FFFFFF',
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    WebkitFontSmoothing: 'antialiased',
  },
  spine: {
    position: 'absolute',
    left: '20px',
    top: '0',
    bottom: '0',
    width: '2px',
    background: '#FFFFFF',
    zIndex: 10,
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
    color: '#FFFFFF',
    whiteSpace: 'nowrap',
  },
  spineMarker: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '20px',
    height: '4px',
    background: '#FFFFFF',
  },
  appContainer: {
    marginLeft: '50px',
    padding: '40px 20px 20px 20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    marginBottom: '10px',
    animation: 'slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  h1: {
    fontSize: '48px',
    lineHeight: 0.95,
    fontWeight: 500,
    letterSpacing: '-2px',
    marginBottom: '24px',
  },
  heroDesc: {
    fontSize: '16px',
    lineHeight: 1.4,
    maxWidth: '260px',
    opacity: 0.8,
  },
  cardsWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowY: 'auto',
    paddingBottom: '20px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  card: {
    borderRadius: '28px',
    padding: '32px 24px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'default',
  },
  cardTitle: {
    fontSize: '32px',
    fontWeight: 500,
    letterSpacing: '-1.5px',
    marginBottom: '32px',
    lineHeight: 1,
  },
  cardReceipt: {
    backgroundColor: '#E6E6E6',
    color: '#000000',
    flex: 1,
    minHeight: '320px',
    animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards',
  },
  flowContainer: {
    position: 'relative',
    paddingLeft: '20px',
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    marginLeft: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  flowItem: {
    position: 'relative',
  },
  flowItemBefore: {
    content: "''",
    position: 'absolute',
    left: '-25px',
    top: '10px',
    width: '8px',
    height: '8px',
    borderBottom: '1px solid #000',
    borderRight: '1px solid #000',
    transform: 'rotate(45deg)',
    background: 'transparent',
  },
  flowLabel: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
    opacity: 0.6,
  },
  flowValue: {
    fontSize: '20px',
    fontWeight: 500,
    letterSpacing: '-0.5px',
  },
  flowValueTotal: {
    fontSize: '36px',
    fontWeight: 600,
    marginTop: '8px',
    letterSpacing: '-0.5px',
  },
  cardAction: {
    backgroundColor: '#FF004E',
    color: '#000000',
    minHeight: '280px',
    animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sideTab: {
    position: 'absolute',
    left: '-12px',
    top: '40px',
    bottom: '40px',
    width: '24px',
    background: '#000000',
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
    boxShadow: '4px 0 10px rgba(0,0,0,0.2)',
  },
  splitControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    marginLeft: '10px',
    borderLeft: '1px solid rgba(0,0,0,0.1)',
    paddingLeft: '24px',
  },
  controlGroup: {
    position: 'relative',
  },
  splitDisplay: {
    fontSize: '56px',
    fontWeight: 500,
    letterSpacing: '-3px',
    lineHeight: 0.9,
  },
  splitLabel: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    display: 'block',
  },
  rangeWrapper: {
    marginTop: '10px',
    position: 'relative',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
  },
  payButton: {
    marginTop: 'auto',
    background: '#000000',
    color: '#FFFFFF',
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
    transition: 'all 0.2s',
  },
  payArrow: {
    fontSize: '24px',
  },
  textDim: {
    opacity: 0.5,
  },
};

const FlowItem = ({ label, valueStyle, children, labelStyle }) => (
  <div style={customStyles.flowItem}>
    <div style={{ position: 'absolute', left: '-25px', top: '10px', width: '8px', height: '8px', borderBottom: '1px solid #000', borderRight: '1px solid #000', transform: 'rotate(45deg)', background: 'transparent' }}></div>
    <div style={{ ...customStyles.flowLabel, ...labelStyle }}>{label}</div>
    <div style={{ ...customStyles.flowValue, ...valueStyle }}>{children}</div>
  </div>
);

const ControlGroupArrow = () => (
  <div style={{ position: 'absolute', left: '-29px', top: '6px', width: '8px', height: '8px', borderBottom: '1px solid #000', borderRight: '1px solid #000', transform: 'rotate(45deg)' }}></div>
);

const HomePage = () => {
  const total = 183.45;
  const [splitCount, setSplitCount] = useState(3);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isCardReceiptActive, setIsCardReceiptActive] = useState(false);
  const [isCardActionActive, setIsCardActionActive] = useState(false);

  const splitAmount = (total / splitCount).toFixed(2);
  const personLabel = splitCount === 1 ? 'Person' : 'People';

  return (
    <div style={customStyles.body}>
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

        <div style={customStyles.cardsWrapper}>
          <div
            style={{
              ...customStyles.card,
              ...customStyles.cardReceipt,
              transform: isCardReceiptActive ? 'scale(0.98)' : 'scale(1)',
            }}
            onMouseDown={() => setIsCardReceiptActive(true)}
            onMouseUp={() => setIsCardReceiptActive(false)}
            onMouseLeave={() => setIsCardReceiptActive(false)}
            onTouchStart={() => setIsCardReceiptActive(true)}
            onTouchEnd={() => setIsCardReceiptActive(false)}
          >
            <div style={customStyles.cardTitle}>
              Receipt<br />Data
            </div>

            <div style={customStyles.flowContainer}>
              <FlowItem label="Source">Bill #90210</FlowItem>
              <FlowItem label="Subtotal">$142.50</FlowItem>
              <FlowItem label="Gratuity (20%)">$28.50</FlowItem>
              <FlowItem label="Tax" valueStyle={customStyles.textDim}>$12.45</FlowItem>
              <FlowItem
                label="Total Acquire"
                labelStyle={{ opacity: 1, color: '#000' }}
                valueStyle={customStyles.flowValueTotal}
              >
                $183.45
              </FlowItem>
            </div>
          </div>

          <div
            style={{
              ...customStyles.card,
              ...customStyles.cardAction,
              transform: isCardActionActive ? 'scale(0.98)' : 'scale(1)',
            }}
            onMouseDown={() => setIsCardActionActive(true)}
            onMouseUp={() => setIsCardActionActive(false)}
            onMouseLeave={() => setIsCardActionActive(false)}
            onTouchStart={() => setIsCardActionActive(true)}
            onTouchEnd={() => setIsCardActionActive(false)}
          >
            <div style={customStyles.sideTab}>ADJUST + SPLIT</div>

            <div style={customStyles.cardTitle}>
              Your<br />Share
            </div>

            <div style={customStyles.splitControls}>
              <div style={customStyles.controlGroup}>
                <ControlGroupArrow />
                <label style={customStyles.splitLabel}>Split Mode</label>
                <div style={customStyles.rangeWrapper}>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={splitCount}
                    onChange={(e) => setSplitCount(Number(e.target.value))}
                    style={{ width: '100%', WebkitAppearance: 'none', background: 'transparent' }}
                  />
                </div>
                <div style={{ marginTop: '5px', fontWeight: 600 }}>
                  {splitCount} {personLabel}
                </div>
              </div>

              <div style={customStyles.controlGroup}>
                <ControlGroupArrow />
                <label style={customStyles.splitLabel}>Individual Owe</label>
                <div style={customStyles.splitDisplay}>${splitAmount}</div>
              </div>
            </div>

            <button
              style={{
                ...customStyles.payButton,
                transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isButtonHovered ? '0 10px 20px rgba(0,0,0,0.2)' : 'none',
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              onClick={() => alert(`Settling up $${splitAmount} per person!`)}
            >
              <span>Settle Up</span>
              <span style={customStyles.payArrow}>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(100px); }
        to { opacity: 1; transform: translateY(0); }
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background: #000000;
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
        background: #000000;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        border: none;
      }
      input[type=range]::-moz-range-track {
        width: 100%;
        height: 4px;
        background: rgba(0,0,0,0.1);
        border-radius: 2px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;