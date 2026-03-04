'use client';

import { Rabbit } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovering, setHovering] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  }

  return (
    <div
      style={{
        height: '100dvh',
        overflow: 'hidden',
        background: '#0C0C0C',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-geist), system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
      }}>
      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
        <div
          style={{
            maxWidth: 896,
            margin: '0 auto',
            padding: '0 24px',
            height: 54,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: '#FF0048',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Rabbit size={16} color="#fff" strokeWidth={2} />
            </div>
            <span
              style={{
                fontWeight: 600,
                fontSize: 14.5,
                letterSpacing: '-0.5px',
                color: '#ffffff',
              }}>
              umo
            </span>
          </div>

          <a
            href="#"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.38)',
              textDecoration: 'none',
              letterSpacing: '-0.2px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}>
            Updates
          </a>
        </div>
      </nav>

      {/* ── BODY ────────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}>
        <div
          style={{
            width: '100%',
            maxWidth: 896,
            height: '100%',
            maxHeight: 640,
            borderRadius: 24,
            overflow: 'hidden',
            display: 'flex',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          }}>
          {/* ── LEFT ── */}
          <div
            style={{
              flex: '0 0 52%',
              background: '#161616',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '40px 44px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
            }}>
            {/* Top: wordmark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: '#FF0048',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                <Rabbit size={18} color="#fff" strokeWidth={2} />
              </div>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: '-0.5px',
                  color: '#ffffff',
                }}>
                umo
              </span>
            </div>

            {/* Middle: headline + form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#FF0048',
                  }}>
                  Private Beta
                </span>
                <h1
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(1.85rem, 2.8vw, 2.5rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.045em',
                    color: '#ffffff',
                    margin: 0,
                  }}>
                  Split the bill.
                  <br />
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>Not the mood.</span>
                </h1>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.42)',
                    letterSpacing: '-0.15px',
                    margin: 0,
                    maxWidth: 300,
                  }}>
                  Claim exactly what you ordered. Convert between USD and ZiG on the fly. Settle
                  with one tap.
                </p>
              </div>

              {joined ? (
                <div
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 14,
                    padding: '18px 22px',
                  }}>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: '#ffffff',
                      letterSpacing: '-0.3px',
                      marginBottom: 5,
                    }}>
                    {"You're on the list."}
                  </p>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: 'rgba(255,255,255,0.38)',
                      letterSpacing: '-0.1px',
                    }}>
                    {"We'll reach out when your spot opens up."}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                      fontFamily: 'var(--font-geist), system-ui, sans-serif',
                      fontSize: 13.5,
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${focused ? 'rgba(255,0,72,0.50)' : 'rgba(255,255,255,0.09)'}`,
                      borderRadius: 11,
                      padding: '12px 16px',
                      color: '#ffffff',
                      outline: 'none',
                      width: '100%',
                      letterSpacing: '-0.15px',
                      transition: 'border-color 0.18s',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSubmit as unknown as React.MouseEventHandler}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    style={
                      {
                        fontFamily: 'var(--font-geist), system-ui, sans-serif',
                        fontWeight: 600,
                        fontSize: 13.5,
                        letterSpacing: '-0.3px',
                        background: '#FF0048',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 11,
                        padding: '12px 20px',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'background 0.18s, transform 0.18s',
                        transform: hovering ? 'translateY(-1px)' : 'translateY(0)',
                        background: hovering ? '#e0003f' : '#FF0048',
                      } as React.CSSProperties
                    }>
                    Join the Waitlist
                  </button>
                </div>
              )}
            </div>

            {/* Bottom: legal */}
            <p
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.22)',
                lineHeight: 1.7,
                letterSpacing: '-0.1px',
              }}>
              By joining you agree to our{' '}
              <a
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.40)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}>
                Terms
              </a>{' '}
              and{' '}
              <a
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.40)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}>
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* ── RIGHT ── */}
          <div
            style={{
              flex: '0 0 48%',
              background: '#0E0E0E',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* Screenshot */}
            <img
              src="/screenshot.png"
              alt="umo app"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
            />
            {/* top vignette */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(to bottom, #0E0E0E 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* bottom vignette */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(to top, #0E0E0E 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* Beta tag overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 22,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(14,14,14,0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 100,
                padding: '7px 14px',
                whiteSpace: 'nowrap',
              }}>
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: '0.10em',
                  background: '#FF0048',
                  color: '#fff',
                  borderRadius: 4,
                  padding: '2px 6px',
                  textTransform: 'uppercase',
                }}>
                Beta
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-geist), system-ui, sans-serif',
                  fontSize: 11.5,
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '-0.1px',
                }}>
                Zimbabwe &amp; region &middot; iOS &amp; Android
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
        <div
          style={{
            maxWidth: 896,
            margin: '0 auto',
            padding: '0 24px',
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <span
            style={{
              fontSize: 11.5,
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '-0.1px',
            }}>
            &copy; 2026 umo
          </span>
          <div style={{ display: 'flex', gap: 18 }}>
            {['Privacy', 'Terms'].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  fontSize: 11.5,
                  color: 'rgba(255,255,255,0.25)',
                  textDecoration: 'none',
                  letterSpacing: '-0.1px',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
