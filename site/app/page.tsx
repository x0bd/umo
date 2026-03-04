"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  }

  return (
    <main
      style={{
        height: "100dvh",
        overflow: "hidden",
        background: "#F4F4F4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* ── CARD ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* ── LEFT PANEL ───────────────────────────────────────────────── */}
        <section
          style={{
            flex: "0 0 54%",
            background: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "44px 48px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: "#FF0048",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(255,0,72,0.32)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3C9.5 3 8 5 8 7.5V9C6.5 9 5 10.5 5 12.5C5 14.5 6.5 16 8 16V18C8 19.1 8.9 20 10 20H14C15.1 20 16 19.1 16 18V16C17.5 16 19 14.5 19 12.5C19 10.5 17.5 9 16 9V7.5C16 5 14.5 3 12 3Z"
                  fill="white"
                />
                <circle cx="10" cy="12.5" r="1" fill="#FF0048" />
                <circle cx="14" cy="12.5" r="1" fill="#FF0048" />
                <path
                  d="M8 6.5C8 6.5 7 3.5 5.5 3.5C4 3.5 3.5 5 4 6.5C4.5 8 6 8.8 8 9.5"
                  stroke="white"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M16 6.5C16 6.5 17 3.5 18.5 3.5C20 3.5 20.5 5 20 6.5C19.5 8 18 8.8 16 9.5"
                  stroke="white"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: -0.2,
                color: "#0E0E0E",
              }}
            >
              umo
            </span>
          </div>

          {/* Center hero content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              maxWidth: 360,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 600,
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#BBBBBB",
                }}
              >
                Private Beta
              </span>

              <h1
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 3.2vw, 2.65rem)",
                  lineHeight: 1.08,
                  letterSpacing: -1.5,
                  color: "#0E0E0E",
                }}
              >
                Split the bill.
                <br />
                Not the mood.
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 400,
                  fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                  lineHeight: 1.65,
                  color: "#888888",
                  maxWidth: 290,
                }}
              >
                Claim exactly what you ordered. Convert between USD and ZiG on
                the fly. Settle with one tap.
              </p>
            </div>

            {joined ? (
              <div
                style={{
                  background: "#F4F4F4",
                  borderRadius: 16,
                  padding: "18px 32px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#0E0E0E",
                    letterSpacing: -0.3,
                  }}
                >
                  You&apos;re on the list 🎉
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 13,
                    color: "#AAAAAA",
                    marginTop: 5,
                    lineHeight: 1.5,
                  }}
                >
                  We&apos;ll reach out when your spot opens up.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: "100%",
                  maxWidth: 320,
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 14,
                    fontWeight: 500,
                    background: "#F7F7F7",
                    border: "1.5px solid rgba(0,0,0,0.08)",
                    borderRadius: 12,
                    padding: "13px 18px",
                    color: "#0E0E0E",
                    outline: "none",
                    width: "100%",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#FF0048";
                    e.target.style.background = "#FFFFFF";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0,0,0,0.08)";
                    e.target.style.background = "#F7F7F7";
                  }}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: -0.2,
                    background: "#FF0048",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 12,
                    padding: "14px 28px",
                    cursor: "pointer",
                    width: "100%",
                    boxShadow: "0 8px 24px rgba(255,0,72,0.28)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-1px)";
                    el.style.boxShadow = "0 12px 32px rgba(255,0,72,0.40)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 8px 24px rgba(255,0,72,0.28)";
                  }}
                >
                  Join the Waitlist
                </button>
              </form>
            )}
          </div>

          {/* Footer legal */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              color: "#C8C8C8",
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            By joining you agree to our{" "}
            <a
              href="#"
              style={{
                color: "#888",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              style={{
                color: "#888",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Privacy Policy
            </a>
          </p>
        </section>

        {/* ── RIGHT PANEL ──────────────────────────────────────────────── */}
        <section
          style={{
            flex: "0 0 46%",
            background: "#0E0E0E",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/screenshot.png"
            alt="umo app screenshot"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
              padding: "24px 20px",
            }}
            priority
          />
          {/* top vignette */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 100,
              background: "linear-gradient(to bottom, #0E0E0E 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
          {/* bottom vignette */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
              background: "linear-gradient(to top, #0E0E0E 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </section>
      </div>
    </main>
  );
}
