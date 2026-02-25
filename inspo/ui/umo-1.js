import React, { useState } from 'react';

const customStyles = {
  root: {
    backgroundColor: '#050505',
    color: '#FFFFFF',
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    WebkitFontSmoothing: 'antialiased',
  },
  sidebar: {
    width: '44px',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingBottom: '32px',
    flexShrink: 0,
    position: 'relative',
  },
  sidebarLine: {
    position: 'absolute',
    left: '20px',
    top: '20px',
    bottom: '140px',
    width: '1px',
    background: 'rgba(255,255,255,0.2)',
  },
  sidebarText: {
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    textTransform: 'lowercase',
    opacity: 0.8,
    marginLeft: '14px',
  },
  mainStage: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 12px 12px 0',
    gap: '12px',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  header: {
    padding: '24px 8px 12px 8px',
  },
  h1: {
    fontSize: '32px',
    lineHeight: 1.05,
    fontWeight: '500',
    letterSpacing: '-1px',
  },
  h1Span: {
    display: 'block',
    color: '#888',
  },
  card: {
    borderRadius: '28px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
  cardReceipt: {
    backgroundColor: '#EAEAEA',
    color: '#000000',
    flex: 1,
    minHeight: '380px',
  },
  cardAction: {
    backgroundColor: '#FF0055',
    color: '#000000',
    minHeight: '280px',
    boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
  },
  cardHeader: {
    fontSize: '28px',
    fontWeight: '500',
    letterSpacing: '-0.8px',
    marginBottom: '32px',
    lineHeight: 1.1,
  },
  railContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  railTagZone: {
    width: '24px',
    marginRight: '16px',
    position: 'relative',
  },
  railTag: {
    background: 'transparent',
    border: '1px solid rgba(0,0,0,0.2)',
    color: '#000000',
    borderRadius: '12px',
    padding: '8px 4px',
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    fontSize: '8px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    position: 'absolute',
    top: 0,
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  railTagDark: {
    background: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '8px 4px',
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    fontSize: '8px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    position: 'absolute',
    top: 0,
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentFlow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    position: 'relative',
  },
  flowLine: {
    position: 'absolute',
    left: '3px',
    top: '12px',
    bottom: '40px',
    width: '1px',
    borderLeft: '1px dashed rgba(0,0,0,0.2)',
    background: 'none',
  },
  flowLineSolid: {
    position: 'absolute',
    left: '3px',
    top: 0,
    height: '100px',
    width: '1px',
    backgroundColor: 'currentColor',
    opacity: 0.3,
  },
  flowItem: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingLeft: '24px',
  },
  label: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '700',
    marginBottom: '8px',
    opacity: 0.7,
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '4px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'opacity 0.2s',
  },
  itemName: {
    fontSize: '15px',
    fontWeight: '600',
    letterSpacing: '-0.2px',
  },
  itemDesc: {
    fontSize: '13px',
    color: 'rgba(0,0,0,0.6)',
    marginTop: '2px',
    lineHeight: 1.3,
    maxWidth: '90%',
  },
  itemPrice: {
    fontSize: '15px',
    fontWeight: '500',
    fontFeatureSettings: '"tnum"',
  },
  checkboxBase: {
    width: '18px',
    height: '18px',
    border: '1.5px solid #000',
    borderRadius: '50%',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    flexShrink: 0,
  },
  checkboxSelected: {
    background: '#000',
  },
  totalBlock: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(0,0,0,0.1)',
  },
  bigPrice: {
    fontSize: '42px',
    letterSpacing: '-2px',
    fontWeight: '500',
  },
  actionButton: {
    marginTop: '24px',
    background: 'black',
    color: 'white',
    border: 'none',
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
};

const Checkbox = ({ selected }) => (
  <div
    style={{
      ...customStyles.checkboxBase,
      ...(selected ? customStyles.checkboxSelected : {}),
    }}
  >
    {selected && (
      <div
        style={{
          width: '8px',
          height: '4px',
          borderLeft: '1.5px solid #fff',
          borderBottom: '1.5px solid #fff',
          transform: 'rotate(-45deg) translate(1px, -1px)',
        }}
      />
    )}
  </div>
);

const ItemRow = ({ name, desc, price, selected, onToggle }) => (
  <div
    style={{
      ...customStyles.itemRow,
      opacity: selected ? 1 : 0.4,
    }}
    onClick={onToggle}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox selected={selected} />
      <div>
        <div style={customStyles.itemName}>{name}</div>
        <div style={customStyles.itemDesc}>{desc}</div>
      </div>
    </div>
    <div style={customStyles.itemPrice}>{price}</div>
  </div>
);

const App = () => {
  const initialItems = [
    { id: 1, name: 'Burrata & Figs', desc: 'Aged balsamic, basil oil', price: 18.0, category: 'Starters', selected: false },
    { id: 2, name: 'Castelvetrano', desc: 'Marinated olives, citrus', price: 12.0, category: 'Starters', selected: false },
    { id: 3, name: 'Spicy Vodka Rigatoni', desc: 'Calabrian chili, pecorino', price: 24.0, category: 'Mains', selected: false },
    { id: 4, name: 'Veal Milanese', desc: 'Arugula salad, lemon', price: 28.0, category: 'Mains', selected: false },
  ];

  const [items, setItems] = useState(initialItems);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const subtotal = items.reduce((sum, item) => (item.selected ? sum + item.price : sum), 0);
  const taxRate = 0.2;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const fmt = (n) => '$' + n.toFixed(2);

  const hasSelected = subtotal > 0;

  const starters = items.filter((i) => i.category === 'Starters');
  const mains = items.filter((i) => i.category === 'Mains');

  return (
    <div style={customStyles.root}>
      {/* Sidebar */}
      <div style={customStyles.sidebar}>
        <div style={customStyles.sidebarLine} />
        <div style={customStyles.sidebarText}>table_04_session</div>
      </div>

      {/* Main Stage */}
      <div style={customStyles.mainStage}>
        {/* Header */}
        <header style={customStyles.header}>
          <h1 style={customStyles.h1}>
            Mario's Italian
            <br />
            <span style={customStyles.h1Span}>Sat, Oct 14</span>
          </h1>
        </header>

        {/* Receipt Card */}
        <div style={{ ...customStyles.card, ...customStyles.cardReceipt }}>
          <div style={customStyles.railContainer}>
            <div style={customStyles.railTagZone}>
              <div style={customStyles.railTag}>Itemized Feed</div>
            </div>
            <div style={customStyles.contentFlow}>
              <div style={customStyles.cardHeader}>Full Receipt</div>
              <div style={customStyles.flowLine} />

              {/* Starters */}
              <div style={customStyles.flowItem}>
                <div
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '4px',
                    width: '10px',
                    height: '10px',
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.5,
                    transform: 'rotate(-90deg)',
                  }}
                />
                <div style={customStyles.label}>Starters</div>
                {starters.map((item) => (
                  <ItemRow
                    key={item.id}
                    name={item.name}
                    desc={item.desc}
                    price={`$${item.price.toFixed(0)}`}
                    selected={item.selected}
                    onToggle={() => toggleItem(item.id)}
                  />
                ))}
              </div>

              {/* Mains */}
              <div style={{ ...customStyles.flowItem, marginTop: '12px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '4px',
                    width: '10px',
                    height: '10px',
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.5,
                    transform: 'rotate(-90deg)',
                  }}
                />
                <div style={customStyles.label}>Mains</div>
                {mains.map((item) => (
                  <ItemRow
                    key={item.id}
                    name={item.name}
                    desc={item.desc}
                    price={`$${item.price.toFixed(0)}`}
                    selected={item.selected}
                    onToggle={() => toggleItem(item.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div
          style={{
            ...customStyles.card,
            ...customStyles.cardAction,
            transform: hasSelected ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          <div style={customStyles.railContainer}>
            <div style={customStyles.railTagZone}>
              <div style={customStyles.railTagDark}>Settlement</div>
            </div>
            <div style={customStyles.contentFlow}>
              <div style={customStyles.cardHeader}>Your Share</div>

              <div style={customStyles.flowLineSolid} />

              <div style={customStyles.flowItem}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-6px',
                    top: '0px',
                    width: '10px',
                    height: '10px',
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.5,
                    transform: 'rotate(90deg)',
                  }}
                />
                <div style={customStyles.label}>Subtotal</div>
                <div style={customStyles.itemName}>{fmt(subtotal)}</div>
              </div>

              <div style={{ ...customStyles.flowItem, marginTop: '16px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-6px',
                    top: '0px',
                    width: '10px',
                    height: '10px',
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.5,
                    transform: 'rotate(90deg)',
                  }}
                />
                <div style={customStyles.label}>Tax &amp; Tip (20%)</div>
                <div style={customStyles.itemName}>{fmt(tax)}</div>
              </div>

              <div style={customStyles.totalBlock}>
                <div style={customStyles.label}>Total Due</div>
                <div style={customStyles.bigPrice}>{fmt(total)}</div>
                <button style={customStyles.actionButton}>
                  Apple Pay
                  <span style={{ opacity: 0.7 }}>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;