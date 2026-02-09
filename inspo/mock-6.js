import React, { useState } from 'react';

const customStyles = {
  root: {
    '--bg-black': '#050505',
    '--card-grey': '#EAEAEA',
    '--card-pink': '#FF0055',
    '--text-primary': '#000000',
    '--text-secondary': '#555555',
    '--text-white': '#FFFFFF',
    '--font-main': "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
    '--radius-card': '28px',
    '--pad-base': '24px'
  },
  body: {
    backgroundColor: 'var(--bg-black)',
    color: 'var(--text-white)',
    fontFamily: 'var(--font-main)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    margin: 0,
    padding: 0
  }
};

const Sidebar = () => (
  <div style={{
    width: '44px',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingBottom: '32px',
    flexShrink: 0,
    position: 'relative'
  }}>
    <div style={{
      position: 'absolute',
      left: '20px',
      top: '20px',
      bottom: '140px',
      width: '1px',
      background: 'rgba(255,255,255,0.2)'
    }}></div>
    <div style={{
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)',
      color: 'var(--text-white)',
      fontSize: '14px',
      fontWeight: 500,
      letterSpacing: '0.5px',
      textTransform: 'lowercase',
      opacity: 0.8,
      marginLeft: '14px'
    }}>table_04_session</div>
  </div>
);

const Header = () => (
  <header style={{
    padding: '24px 8px 12px 8px'
  }}>
    <h1 style={{
      fontSize: '32px',
      lineHeight: 1.05,
      fontWeight: 500,
      letterSpacing: '-1px',
      margin: 0
    }}>
      Mario's Italian<br />
      <span style={{ display: 'block', color: '#888' }}>Sat, Oct 14</span>
    </h1>
  </header>
);

const ItemRow = ({ item, isSelected, onToggle }) => (
  <div 
    onClick={onToggle}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '4px',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'opacity 0.2s',
      opacity: isSelected ? 1 : 0.4
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        width: '18px',
        height: '18px',
        border: '1.5px solid #000',
        borderRadius: '50%',
        marginRight: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        background: isSelected ? '#000' : 'transparent'
      }}>
        {isSelected && (
          <div style={{
            width: '8px',
            height: '4px',
            borderLeft: '1.5px solid #fff',
            borderBottom: '1.5px solid #fff',
            transform: 'rotate(-45deg) translate(1px, -1px)'
          }}></div>
        )}
      </div>
      <div>
        <div style={{
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '-0.2px'
        }}>{item.name}</div>
        <div style={{
          fontSize: '13px',
          color: 'rgba(0,0,0,0.6)',
          marginTop: '2px',
          lineHeight: 1.3,
          maxWidth: '90%'
        }}>{item.desc}</div>
      </div>
    </div>
    <div style={{
      fontSize: '15px',
      fontWeight: 500,
      fontFeatureSettings: '"tnum"'
    }}>${item.price}</div>
  </div>
);

const ReceiptCard = ({ selectedItems, onToggleItem }) => {
  const starters = [
    { id: 1, name: 'Burrata & Figs', desc: 'Aged balsamic, basil oil', price: 18 },
    { id: 2, name: 'Castelvetrano', desc: 'Marinated olives, citrus', price: 12 }
  ];

  const mains = [
    { id: 3, name: 'Spicy Vodka Rigatoni', desc: 'Calabrian chili, pecorino', price: 24 },
    { id: 4, name: 'Veal Milanese', desc: 'Arugula salad, lemon', price: 28 }
  ];

  return (
    <div style={{
      borderRadius: 'var(--radius-card)',
      padding: 'var(--pad-base)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      backgroundColor: 'var(--card-grey)',
      color: 'var(--text-primary)',
      flex: 1,
      minHeight: '380px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{ width: '24px', marginRight: '16px', position: 'relative' }}>
          <div style={{
            background: 'transparent',
            border: '1px solid rgba(0,0,0,0.2)',
            color: 'var(--text-primary)',
            borderRadius: '12px',
            padding: '8px 4px',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '8px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            position: 'absolute',
            top: 0,
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>Itemized Feed</div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
          <div style={{
            fontSize: '28px',
            fontWeight: 500,
            letterSpacing: '-0.8px',
            marginBottom: '32px',
            lineHeight: 1.1
          }}>Full Receipt</div>

          <div style={{
            position: 'absolute',
            left: '3px',
            top: '12px',
            bottom: '40px',
            width: '1px',
            borderLeft: '1px dashed rgba(0,0,0,0.2)'
          }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '24px' }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: '4px',
              width: '10px',
              height: '10px',
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              opacity: 0.5,
              transform: 'rotate(-90deg)'
            }}></div>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: 700,
              marginBottom: '8px',
              opacity: 0.7
            }}>Starters</div>

            {starters.map(item => (
              <ItemRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                onToggle={() => onToggleItem(item.id, item.price)}
              />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '24px', marginTop: '12px' }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: '4px',
              width: '10px',
              height: '10px',
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              opacity: 0.5,
              transform: 'rotate(-90deg)'
            }}></div>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: 700,
              marginBottom: '8px',
              opacity: 0.7
            }}>Mains</div>

            {mains.map(item => (
              <ItemRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                onToggle={() => onToggleItem(item.id, item.price)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ subtotal, tax, total }) => (
  <div style={{
    borderRadius: 'var(--radius-card)',
    padding: 'var(--pad-base)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
    backgroundColor: 'var(--card-pink)',
    color: 'var(--text-primary)',
    minHeight: '280px',
    boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
    cursor: 'pointer',
    transform: subtotal > 0 ? 'translateY(-4px)' : 'translateY(0)'
  }}>
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ width: '24px', marginRight: '16px', position: 'relative' }}>
        <div style={{
          background: '#000',
          color: '#fff',
          borderRadius: '12px',
          padding: '8px 4px',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          fontSize: '8px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          position: 'absolute',
          top: 0,
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>Settlement</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 500,
          letterSpacing: '-0.8px',
          marginBottom: '32px',
          lineHeight: 1.1
        }}>Your Share</div>

        <div style={{
          position: 'absolute',
          left: '3px',
          top: 0,
          height: '100px',
          width: '1px',
          backgroundColor: 'currentColor',
          opacity: 0.3
        }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '24px' }}>
          <div style={{
            position: 'absolute',
            left: '-6px',
            top: 0,
            width: '10px',
            height: '10px',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
            transform: 'rotate(90deg)'
          }}></div>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 700,
            marginBottom: '8px',
            opacity: 0.7
          }}>Subtotal</div>
          <div style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.2px' }}>${subtotal.toFixed(2)}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '24px', marginTop: '16px' }}>
          <div style={{
            position: 'absolute',
            left: '-6px',
            top: 0,
            width: '10px',
            height: '10px',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
            transform: 'rotate(90deg)'
          }}></div>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 700,
            marginBottom: '8px',
            opacity: 0.7
          }}>Tax & Tip (20%)</div>
          <div style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.2px' }}>${tax.toFixed(2)}</div>
        </div>

        <div style={{
          marginTop: 'auto',
          paddingTop: '20px',
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 700,
            marginBottom: '8px',
            opacity: 0.7
          }}>Total Due</div>
          <div style={{
            fontSize: '42px',
            letterSpacing: '-2px',
            fontWeight: 500
          }}>${total.toFixed(2)}</div>

          <button style={{
            marginTop: '24px',
            background: 'black',
            color: 'white',
            border: 'none',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            Apple Pay
            <span style={{ opacity: 0.7 }}>→</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [currentSubtotal, setCurrentSubtotal] = useState(0);

  const taxRate = 0.20;

  const handleToggleItem = (itemId, price) => {
    const newSelected = new Set(selectedItems);
    let newSubtotal = currentSubtotal;

    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
      newSubtotal -= price;
    } else {
      newSelected.add(itemId);
      newSubtotal += price;
    }

    setSelectedItems(newSelected);
    setCurrentSubtotal(newSubtotal);
  };

  const tax = currentSubtotal * taxRate;
  const total = currentSubtotal + tax;

  return (
    <div style={{ ...customStyles.root, ...customStyles.body }}>
      <Sidebar />
      
      <div style={{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 12px 12px 0',
        gap: '12px',
        overflowY: 'auto'
      }}>
        <Header />
        <ReceiptCard selectedItems={selectedItems} onToggleItem={handleToggleItem} />
        <ActionCard subtotal={currentSubtotal} tax={tax} total={total} />
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          margin: 0;
          padding: 0;
        }
        
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;