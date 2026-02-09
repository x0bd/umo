import React, { useState } from 'react';

const styles = {
  root: {
    '--bg-dark': '#050505',
    '--card-pink': '#FF1A55',
    '--card-grey': '#E6E6E6',
    '--text-white': '#FFFFFF',
    '--text-black': '#000000',
    '--text-grey': '#808080',
    '--line-color': '#000000',
    '--font-main': "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    '--tracking-tight': '-0.04em',
    '--tracking-normal': '-0.01em',
    '--radius-lg': '28px',
    '--radius-sm': '12px',
    '--pill-width': '24px'
  }
};

const Avatar = ({ children, style }) => (
  <div style={{
    width: '32px',
    height: '32px',
    background: '#000',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600',
    ...style
  }}>
    {children}
  </div>
);

const SplitItem = ({ avatar, name, role, amount, status, isPaid }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {avatar}
      <div>
        <div style={{
          fontWeight: '500',
          fontSize: '15px',
          letterSpacing: 'var(--tracking-normal)'
        }}>
          {name}
        </div>
        <div style={{ fontSize: '12px', opacity: '0.5' }}>
          {role}
        </div>
      </div>
    </div>
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontWeight: '600', fontSize: '16px' }}>
        {amount}
      </div>
      <div style={isPaid ? {
        fontSize: '10px',
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: '0.05em',
        padding: '2px 6px',
        borderRadius: '4px',
        background: '#000',
        color: '#fff',
        display: 'inline-block',
        marginTop: '2px'
      } : {
        fontSize: '10px',
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: '0.05em',
        color: '#000',
        opacity: '0.4',
        display: 'inline-block',
        marginTop: '2px'
      }}>
        {status}
      </div>
    </div>
  </div>
);

const FlowStep = ({ title, description, isLast }) => (
  <div style={{
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    paddingBottom: isLast ? '0' : '24px'
  }}>
    {!isLast && (
      <div style={{
        width: '1px',
        background: 'var(--text-black)',
        position: 'absolute',
        left: '3px',
        top: '6px',
        bottom: '-6px',
        opacity: '0.3'
      }} />
    )}
    {!isLast && (
      <div style={{
        width: '7px',
        height: '7px',
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
        transform: 'rotate(45deg)',
        position: 'absolute',
        bottom: '0',
        left: '0',
        marginLeft: '-3px',
        opacity: '0.3'
      }} />
    )}
    <div style={{ paddingLeft: '20px', width: '100%' }}>
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '2px'
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '13px',
        opacity: '0.6',
        lineHeight: '1.3'
      }}>
        {description}
      </div>
    </div>
  </div>
);

const App = () => {
  const [members] = useState([
    { id: 1, name: 'You', role: 'Payer', amount: '$50.00', status: 'Paid', isPaid: true, avatar: 'Y', avatarStyle: {} },
    { id: 2, name: 'Alex', role: 'Shared Pizza', amount: '$46.25', status: 'Owes', isPaid: false, avatar: 'A', avatarStyle: { background: 'white', color: 'black', border: '1px solid #ccc' } },
    { id: 3, name: 'Jamie', role: 'Drinks Only', amount: '$46.25', status: 'Owes', isPaid: false, avatar: 'J', avatarStyle: { background: 'white', color: 'black', border: '1px solid #ccc' } }
  ]);

  const handleRequestPayments = () => {
    console.log('Requesting payments...');
  };

  return (
    <div style={{
      ...styles.root,
      backgroundColor: 'var(--bg-dark)',
      color: 'var(--text-white)',
      fontFamily: 'var(--font-main)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      WebkitFontSmoothing: 'antialiased'
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 20px',
        maxWidth: '450px',
        margin: '0 auto',
        width: '100%',
        gap: '20px'
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '12px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '500',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: '1',
            margin: 0
          }}>
            Check Split
          </h1>
          <span style={{
            fontSize: '14px',
            color: '#666',
            letterSpacing: 'var(--tracking-normal)'
          }}>
            #4021
          </span>
        </header>

        <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
          <div style={{
            width: 'var(--pill-width)',
            marginRight: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexShrink: 0
          }}>
            <div style={{
              background: 'rgba(0,0,0,0.1)',
              color: '#000',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              fontSize: '10px',
              fontWeight: '600',
              textTransform: 'uppercase',
              padding: '12px 2px',
              borderRadius: '12px',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              height: 'auto',
              minHeight: '80px'
            }}>
              Receipt
            </div>
          </div>

          <div style={{
            flex: 1,
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--card-pink)',
            color: 'var(--text-black)',
            minHeight: '220px'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              opacity: '0.7',
              marginBottom: '4px'
            }}>
              Total Amount
            </div>
            <div style={{
              fontSize: '56px',
              fontWeight: '500',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: '0.9',
              marginBottom: '24px'
            }}>
              $142.50
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              marginTop: 'auto'
            }}>
              <FlowStep title="Service Charge" description="Included (18%)" isLast={false} />
              <FlowStep title="Tax" description="$12.50 State Tax" isLast={true} />
            </div>
          </div>
        </div>

        <div style={{
          width: '1px',
          height: '20px',
          background: '#333',
          marginLeft: '54px',
          position: 'relative'
        }}>
          <div style={{
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '-3px',
            width: '7px',
            height: '7px',
            borderRight: '1px solid #333',
            borderBottom: '1px solid #333',
            transform: 'rotate(45deg)'
          }} />
        </div>

        <div style={{ display: 'flex', width: '100%', position: 'relative', flex: 1 }}>
          <div style={{
            width: 'var(--pill-width)',
            marginRight: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexShrink: 0
          }}>
            <div style={{
              background: '#333',
              color: '#999',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              fontSize: '10px',
              fontWeight: '600',
              textTransform: 'uppercase',
              padding: '12px 2px',
              borderRadius: '12px',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              height: 'auto',
              minHeight: '80px'
            }}>
              Members
            </div>
          </div>

          <div style={{
            flex: 1,
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--card-grey)',
            color: 'var(--text-black)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {members.map((member, index) => (
                <SplitItem
                  key={member.id}
                  avatar={<Avatar style={member.avatarStyle}>{member.avatar}</Avatar>}
                  name={member.name}
                  role={member.role}
                  amount={member.amount}
                  status={member.status}
                  isPaid={member.isPaid}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '0 0 10px 0', marginTop: 'auto' }}>
          <button
            onClick={handleRequestPayments}
            style={{
              width: '100%',
              background: 'var(--text-white)',
              color: 'var(--text-black)',
              border: 'none',
              padding: '20px',
              borderRadius: '50px',
              fontFamily: 'var(--font-main)',
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: 'var(--tracking-tight)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span>Request Payments</span>
            <div style={{
              width: '28px',
              height: '28px',
              background: '#000',
              borderRadius: '50%',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              →
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;