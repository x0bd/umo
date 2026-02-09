import React, { useState, useEffect } from 'react';

const customStyles = {
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
    '--font-main': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    '--radius-card': '28px',
    '--radius-pill': '100px'
  }
};

const App = () => {
  const [billAmount, setBillAmount] = useState('142.50');
  const [tipPercentage, setTipPercentage] = useState(20);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
      }

      body {
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: var(--font-main);
      }

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
        background: var(--card-pink);
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

      input[type=range]::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: var(--card-pink);
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }

      input[type=range]::-moz-range-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: #ccc;
      }
    `;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);

  const calculateTipAmount = () => {
    const bill = parseFloat(billAmount.replace(/[^0-9.]/g, '')) || 0;
    return (bill * tipPercentage / 100).toFixed(2);
  };

  const calculateTotal = () => {
    const bill = parseFloat(billAmount.replace(/[^0-9.]/g, '')) || 0;
    const tip = parseFloat(calculateTipAmount());
    return (bill + tip).toFixed(2);
  };

  const calculatePerPerson = () => {
    const total = parseFloat(calculateTotal());
    return (total / 4).toFixed(2);
  };

  const calculateRequestAmount = () => {
    const total = parseFloat(calculateTotal());
    const yourShare = parseFloat(calculatePerPerson());
    return (total - yourShare).toFixed(2);
  };

  const handleBillChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setBillAmount(value);
  };

  const handleTipChange = (e) => {
    setTipPercentage(parseInt(e.target.value));
  };

  const handleRequest = () => {
    alert(`Requesting $${calculateRequestAmount()} from your friends!`);
  };

  return (
    <div style={customStyles.root}>
      <div style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        fontFamily: 'var(--font-main)',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <header style={{
            padding: '12px 4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '500',
              letterSpacing: '-1px',
              marginBottom: '8px'
            }}>Split</h1>
            <div style={{
              textAlign: 'right',
              fontSize: '14px',
              color: '#666',
              fontWeight: '500'
            }}>
              Table 4<br />
              <span style={{ opacity: 0.6 }}>Oct 24</span>
            </div>
          </header>

          {/* Pink Card - Total Bill */}
          <div style={{
            borderRadius: 'var(--radius-card)',
            padding: '24px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--card-pink)',
            color: 'var(--card-pink-text)'
          }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '24px',
                flexShrink: 0,
                paddingTop: '8px'
              }}>
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                  background: 'rgba(69, 0, 16, 0.15)',
                  color: 'var(--card-pink-text)',
                  padding: '12px 4px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '9px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  height: 'fit-content'
                }}>Total Bill</div>
              </div>

              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* Bill Input Step */}
                <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '12px',
                    paddingTop: '6px'
                  }}>
                    <div style={{
                      width: '1px',
                      backgroundColor: 'currentColor',
                      opacity: 0.3,
                      flexGrow: 1,
                      position: 'relative',
                      marginLeft: '1px'
                    }}>
                      <div style={{
                        content: '',
                        position: 'absolute',
                        bottom: 0,
                        left: '-3px',
                        width: '6px',
                        height: '6px',
                        borderRight: '1px solid currentColor',
                        borderBottom: '1px solid currentColor',
                        transform: 'rotate(45deg)'
                      }}></div>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      opacity: 0.6
                    }}>Enter Amount</div>
                    <input
                      type="text"
                      value={`$${billAmount}`}
                      onChange={handleBillChange}
                      inputMode="decimal"
                      style={{
                        fontSize: '56px',
                        fontWeight: '600',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--card-pink-text)',
                        width: '100%',
                        outline: 'none',
                        letterSpacing: '-2px',
                        marginTop: '4px',
                        fontFamily: 'var(--font-main)'
                      }}
                    />
                  </div>
                </div>

                {/* Tip Step */}
                <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '12px',
                    paddingTop: '6px'
                  }}>
                    <div style={{
                      width: '1px',
                      backgroundColor: 'currentColor',
                      opacity: 0.3,
                      flexGrow: 1,
                      position: 'relative',
                      marginLeft: '1px'
                    }}>
                      <div style={{
                        content: '',
                        position: 'absolute',
                        bottom: 0,
                        left: '-3px',
                        width: '6px',
                        height: '6px',
                        borderRight: '1px solid currentColor',
                        borderBottom: '1px solid currentColor',
                        transform: 'rotate(45deg)'
                      }}></div>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      opacity: 0.6
                    }}>Tip</div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginTop: '4px'
                    }}>
                      <h2 style={{ fontSize: '24px', fontWeight: '600', letterSpacing: '-0.5px' }}>
                        {tipPercentage}%
                      </h2>
                      <span style={{ fontWeight: '600', opacity: 0.8 }}>
                        ${calculateTipAmount()}
                      </span>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={tipPercentage}
                        onChange={handleTipChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gray Card - Split */}
          <div style={{
            borderRadius: 'var(--radius-card)',
            padding: '24px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--card-gray)',
            color: 'var(--card-gray-text)'
          }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '24px',
                flexShrink: 0,
                paddingTop: '8px'
              }}>
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                  background: 'rgba(0,0,0,0.08)',
                  color: 'var(--card-gray-text)',
                  padding: '12px 4px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '9px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  height: 'fit-content'
                }}>Split</div>
              </div>

              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '12px',
                    paddingTop: '6px'
                  }}>
                    <div style={{
                      width: '1px',
                      backgroundColor: 'var(--card-gray-text)',
                      opacity: 0.3,
                      flexGrow: 1,
                      position: 'relative',
                      marginLeft: '1px'
                    }}>
                      <div style={{
                        content: '',
                        position: 'absolute',
                        bottom: 0,
                        left: '-3px',
                        width: '6px',
                        height: '6px',
                        borderRight: '1px solid var(--card-gray-text)',
                        borderBottom: '1px solid var(--card-gray-text)',
                        transform: 'rotate(45deg)'
                      }}></div>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      color: 'var(--card-gray-sub)'
                    }}>Distribution</div>

                    <div style={{ marginTop: '16px' }}>
                      {/* User 1 - You */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 0',
                        borderBottom: '1px solid rgba(0,0,0,0.08)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            background: '#D1D1D1',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>Me</div>
                          <div>
                            <div style={{ fontWeight: '500', fontSize: '15px' }}>You</div>
                            <div style={{ fontSize: '12px', color: 'var(--card-gray-sub)' }}>Payer</div>
                          </div>
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '15px' }}>
                          ${calculatePerPerson()}
                        </div>
                      </div>

                      {/* User 2 - John Doe */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 0',
                        borderBottom: '1px solid rgba(0,0,0,0.08)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            background: '#C4C4C4',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>JD</div>
                          <div>
                            <div style={{ fontWeight: '500', fontSize: '15px' }}>John Doe</div>
                          </div>
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '15px' }}>
                          ${calculatePerPerson()}
                        </div>
                      </div>

                      {/* User 3 - Alice S. */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 0',
                        borderBottom: '1px solid rgba(0,0,0,0.08)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            background: '#B8B8B8',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>AS</div>
                          <div>
                            <div style={{ fontWeight: '500', fontSize: '15px' }}>Alice S.</div>
                          </div>
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '15px' }}>
                          ${calculatePerPerson()}
                        </div>
                      </div>

                      {/* User 4 - Mark R. */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 0'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            background: '#ACACAC',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>MR</div>
                          <div>
                            <div style={{ fontWeight: '500', fontSize: '15px' }}>Mark R.</div>
                          </div>
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '15px' }}>
                          ${calculatePerPerson()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleRequest}
            style={{
              backgroundColor: 'var(--card-pink)',
              color: 'var(--card-pink-text)',
              border: 'none',
              padding: '20px',
              borderRadius: '20px',
              fontSize: '16px',
              fontWeight: '600',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span>Request ${calculateRequestAmount()}</span>
            <div style={{
              width: '18px',
              height: '18px',
              borderTop: '2px solid currentColor',
              borderRight: '2px solid currentColor',
              transform: 'rotate(45deg)'
            }}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;