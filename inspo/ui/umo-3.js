import React, { useState, useEffect } from 'react';

const styles = {
  root: {
    '--bg-color': '#050505',
    '--text-color': '#ffffff',
    '--card-pink': '#FF0048',
    '--card-pink-text': '#450010',
    '--card-pink-line': '#CC003A',
    '--card-gray': '#E6E6E6',
    '--card-gray-text': '#111111',
    '--card-gray-sub': '#555555',
    '--card-gray-line': '#BBBBBB',
    '--accent-line': '#333333',
    '--radius-card': '28px',
    '--radius-pill': '100px',
  },
  body: {
    backgroundColor: '#050505',
    color: '#ffffff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    WebkitFontSmoothing: 'antialiased',
    boxSizing: 'border-box',
    margin: 0,
  },
  appContainer: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  h1: {
    fontSize: '32px',
    fontWeight: 500,
    letterSpacing: '-1px',
    marginBottom: '8px',
    color: '#ffffff',
  },
  header: {
    padding: '12px 4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerMeta: {
    textAlign: 'right',
    fontSize: '14px',
    color: '#666',
    fontWeight: 500,
  },
  card: {
    borderRadius: '28px',
    padding: '24px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  cardPink: {
    backgroundColor: '#FF0048',
    color: '#450010',
  },
  cardGray: {
    backgroundColor: '#E6E6E6',
    color: '#111111',
  },
  flowContainer: {
    display: 'flex',
    gap: '16px',
  },
  sideTrack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '24px',
    flexShrink: 0,
    paddingTop: '8px',
  },
  verticalPillPink: {
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    transform: 'rotate(180deg)',
    background: 'rgba(69, 0, 16, 0.15)',
    color: '#450010',
    padding: '12px 4px',
    borderRadius: '100px',
    fontSize: '9px',
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    height: 'fit-content',
  },
  verticalPillGray: {
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    transform: 'rotate(180deg)',
    background: 'rgba(0,0,0,0.08)',
    color: '#111111',
    padding: '12px 4px',
    borderRadius: '100px',
    fontSize: '9px',
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    height: 'fit-content',
  },
  contentStack: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  flowLine: {
    width: '1px',
    backgroundColor: 'currentColor',
    opacity: 0.3,
    flexGrow: 1,
    position: 'relative',
    marginLeft: '1px',
  },
  step: {
    display: 'flex',
    gap: '16px',
    position: 'relative',
  },
  stepMarker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '12px',
    paddingTop: '6px',
  },
  stepContent: {
    flex: 1,
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  billInput: {
    fontSize: '56px',
    fontWeight: 600,
    background: 'transparent',
    border: 'none',
    color: '#450010',
    width: '100%',
    outline: 'none',
    letterSpacing: '-2px',
    marginTop: '4px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  splitRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
  },
  splitRowLast: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600,
  },
  userName: {
    fontWeight: 500,
    fontSize: '15px',
    color: '#111111',
  },
  userRole: {
    fontSize: '12px',
    color: '#555555',
  },
  amountDisplay: {
    fontWeight: 600,
    fontSize: '15px',
    color: '#111111',
  },
  sliderContainer: {
    marginTop: '8px',
  },
  actionButton: {
    backgroundColor: '#FF0048',
    color: '#450010',
    border: 'none',
    padding: '20px',
    borderRadius: '20px',
    fontSize: '16px',
    fontWeight: 600,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  iconArrowRight: {
    width: '18px',
    height: '18px',
    borderTop: '2px solid currentColor',
    borderRight: '2px solid currentColor',
    transform: 'rotate(45deg)',
    flexShrink: 0,
  },
};

const App = () => {
  const [billValue, setBillValue] = useState('$142.50');
  const [tipPercent, setTipPercent] = useState(20);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
      body { margin: 0; padding: 0; }
      input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #FF0048;
        cursor: pointer;
        margin-top: -9px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }
      input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: #ccc;
      }
      .bill-input-placeholder::placeholder {
        color: rgba(69, 0, 16, 0.3);
      }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  const parseBillAmount = (val) => {
    const num = parseFloat(val.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const billAmount = parseBillAmount(billValue);
  const tipAmount = parseFloat(((billAmount * tipPercent) / 100).toFixed(2));
  const totalAmount = billAmount + tipAmount;
  const perPersonAmount = parseFloat((totalAmount / 4).toFixed(2));
  const othersTotal = parseFloat((perPersonAmount * 3).toFixed(2));

  const formatCurrency = (num) => {
    return '$' + num.toFixed(2);
  };

  const handleBillChange = (e) => {
    setBillValue(e.target.value);
  };

  const handleTipChange = (e) => {
    setTipPercent(parseInt(e.target.value));
  };

  const handleRequestClick = () => {
    setIsButtonPressed(true);
    setSuccessMessage(`Request sent for ${formatCurrency(othersTotal)}!`);
    setTimeout(() => {
      setIsButtonPressed(false);
      setSuccessMessage('');
    }, 2000);
  };

  const people = [
    { initials: 'Me', name: 'You', role: 'Payer', bg: '#D1D1D1' },
    { initials: 'JD', name: 'John Doe', role: null, bg: '#C4C4C4' },
    { initials: 'AS', name: 'Alice S.', role: null, bg: '#B8B8B8' },
    { initials: 'MR', name: 'Mark R.', role: null, bg: '#ACACAC' },
  ];

  return (
    <div style={styles.body}>
      <div style={styles.appContainer}>
        <header style={styles.header}>
          <h1 style={styles.h1}>Split</h1>
          <div style={styles.headerMeta}>
            Table 4<br />
            <span style={{ opacity: 0.6 }}>Oct 24</span>
          </div>
        </header>

        {/* Pink Card - Bill & Tip */}
        <div style={{ ...styles.card, ...styles.cardPink }}>
          <div style={styles.flowContainer}>
            <div style={styles.sideTrack}>
              <div style={styles.verticalPillPink}>Total Bill</div>
            </div>
            <div style={styles.contentStack}>
              {/* Bill Input Step */}
              <div style={styles.step}>
                <div style={styles.stepMarker}>
                  <div style={styles.flowLine}></div>
                </div>
                <div style={styles.stepContent}>
                  <div style={{ ...styles.label, opacity: 0.6, color: '#450010' }}>Enter Amount</div>
                  <input
                    type="text"
                    className="bill-input-placeholder"
                    style={styles.billInput}
                    value={billValue}
                    onChange={handleBillChange}
                    inputMode="decimal"
                    placeholder="$0.00"
                  />
                </div>
              </div>

              {/* Tip Step */}
              <div style={styles.step}>
                <div style={styles.stepMarker}>
                  <div style={{ ...styles.flowLine, opacity: 0.3 }}></div>
                </div>
                <div style={styles.stepContent}>
                  <div style={{ ...styles.label, opacity: 0.6, color: '#450010' }}>Tip</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '4px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.5px', color: '#450010' }}>{tipPercent}%</h2>
                    <span style={{ fontWeight: 600, opacity: 0.8, color: '#450010' }}>{formatCurrency(tipAmount)}</span>
                  </div>
                  <div style={styles.sliderContainer}>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={tipPercent}
                      onChange={handleTipChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gray Card - Split */}
        <div style={{ ...styles.card, ...styles.cardGray }}>
          <div style={styles.flowContainer}>
            <div style={styles.sideTrack}>
              <div style={styles.verticalPillGray}>Split</div>
            </div>
            <div style={styles.contentStack}>
              <div style={styles.step}>
                <div style={styles.stepMarker}>
                  <div style={{ ...styles.flowLine, backgroundColor: '#111111' }}></div>
                </div>
                <div style={styles.stepContent}>
                  <div style={{ ...styles.label, color: '#555555' }}>Distribution</div>
                  <div style={{ marginTop: '16px' }}>
                    {people.map((person, index) => (
                      <div
                        key={index}
                        style={index === people.length - 1 ? styles.splitRowLast : styles.splitRow}
                      >
                        <div style={styles.userInfo}>
                          <div style={{ ...styles.avatar, background: person.bg }}>
                            {person.initials}
                          </div>
                          <div>
                            <div style={styles.userName}>{person.name}</div>
                            {person.role && (
                              <div style={styles.userRole}>{person.role}</div>
                            )}
                          </div>
                        </div>
                        <div style={styles.amountDisplay}>{formatCurrency(perPersonAmount)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          style={{
            ...styles.actionButton,
            transform: isButtonPressed ? 'scale(0.98)' : 'scale(1)',
          }}
          onClick={handleRequestClick}
          onMouseDown={() => setIsButtonPressed(true)}
          onMouseUp={() => setIsButtonPressed(false)}
          onMouseLeave={() => setIsButtonPressed(false)}
        >
          <span>{successMessage || `Request ${formatCurrency(othersTotal)}`}</span>
          <div style={styles.iconArrowRight}></div>
        </button>
      </div>
    </div>
  );
};

export default App;