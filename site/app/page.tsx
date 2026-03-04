'use client';

import { Rabbit } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  }

  return (
    <div
      style={{
        height: '100dvh',
        overflow: 'hidden',
        background: '#111110',
        color: '#f5f5f3',
        fontFamily: 'var(--font-geist), system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}>
      {/* NAV */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          height: 52,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: '#FF0048',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255,0,72,0.4)',
            }}>
            <Rabbit size={15} color="#fff" strokeWidth={2} />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-geist)',
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: -0.4,
              color: '#f5f5f3',
            }}>
            umo
          </span>
        </div>
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-geist)',
            fontSize: 13.5,
            fontWeight: 500,
            color: 'rgba(245,245,243,0.55)',
            textDecoration: 'none',
            letterSpacing: -0.2,
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f3')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,243,0.55)')}>
          Updates
        </a>
      </nav>

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
        }}>
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 26,
            background: 'linear-gradient(145deg, #FF0048 0%, #cc0039 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(255,0,72,0.28), 0 4px 16px rgba(0,0,0,0.5)',
          }}>
          <Rabbit size={54} color="#fff" strokeWidth={1.5} />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-geist)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            letterSpacing: '-0.04em',
            color: '#f5f5f3',
            lineHeight: 1,
            marginBottom: 18,
          }}>
          umo
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-geist)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            fontWeight: 400,
            color: 'rgba(245,245,243,0.50)',
            lineHeight: 1.6,
            textAlign: 'center',
            maxWidth: 380,
            marginBottom: 36,
            letterSpacing: -0.15,
          }}>
          Itemize every order. Convert between USD &amp; ZiG.
          <br />
          Settle with one tap.
        </p>

        {joined ? (
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 14,
              padding: '16px 36px',
              textAlign: 'center',
            }}>
            <p
              style={{
                fontFamily: 'var(--font-geist)',
                fontWeight: 600,
                fontSize: 15,
                color: '#f5f5f3',
                letterSpacing: -0.3,
                marginBottom: 4,
              }}>
              {"You're on the list."}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-geist)',
                fontSize: 12.5,
                color: 'rgba(245,245,243,0.45)',
                letterSpacing: -0.1,
              }}>
              {"We'll reach out when your spot opens up."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: 8,
              width: '100%',
              maxWidth: 390,
              marginBottom: 16,
            }}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                flex: 1,
                fontFamily: 'var(--font-geist)',
                fontSize: 14,
                background: 'rgba(255,255,255,0.06)',
                border: focused
                  ? '1px solid rgba(255,0,72,0.55)'
                  : '1px solid rgba(255,255,255,0.10)',
                borderRadius: 10,
                padding: '11px 16px',
                color: '#f5f5f3',
                outline: 'none',
                transition: 'border-color 0.2s',
                letterSpacing: -0.2,
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: 'var(--font-geist)',
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: -0.3,
                background: '#FF0048',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '11px 22px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(255,0,72,0.35)',
                transition: 'opacity 0.15s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.88';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
              Join Waitlist
            </button>
          </form>
        )}

        {!joined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.08em',
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(245,245,243,0.55)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 5,
                padding: '3px 7px',
                textTransform: 'uppercase',
              }}>
              Beta
            </span>
            <span
              style={{
                fontFamily: 'var(--font-geist)',
                fontSize: 12,
                color: 'rgba(245,245,243,0.32)',
                letterSpacing: -0.1,
              }}>
              Zimbabwe &amp; region &middot; iOS &amp; Android
            </span>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          height: 48,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
        <span
          style={{
            fontFamily: 'var(--font-geist)',
            fontSize: 12,
            color: 'rgba(245,245,243,0.28)',
            letterSpacing: -0.1,
          }}>
          &copy; 2026 umo
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms'].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                fontFamily: 'var(--font-geist)',
                fontSize: 12,
                color: 'rgba(245,245,243,0.32)',
                textDecoration: 'none',
                letterSpacing: -0.1,
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(245,245,243,0.75)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,243,0.32)')}>
              {label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
