'use client';

import { Rabbit } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  'use client';

  import Image from 'next/image';
  import { Rabbit } from 'lucide-react';
  import { FormEvent, useState } from 'react';

  export default function Home() {
    const [email, setEmail] = useState('');
    const [joined, setJoined] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (email.trim()) setJoined(true);
    }

    return (
      <main className="h-dvh overflow-hidden bg-[#111111] px-4 py-4 text-[#F4F4F4] sm:px-6 sm:py-6">
        <div className="mx-auto flex h-full w-full max-w-4xl flex-col rounded-[28px] border border-white/10 bg-[#141414] shadow-[0_28px_90px_rgba(0,0,0,0.48)]">
          <header className="flex h-14 items-center justify-between border-b border-white/10 px-5 sm:px-6">
            <div className="flex items-center gap-2.5">
              <div className="grid h-7 w-7 place-items-center rounded-[9px] bg-[#FF0048] shadow-[0_8px_20px_rgba(255,0,72,0.36)]">
                <Rabbit size={15} color="#fff" strokeWidth={2} />
              </div>
              <span className="font-sans text-[15px] font-semibold tracking-[-0.02em] text-white">umo</span>
            </div>
            <a
              href="#"
              className="text-[13px] font-medium tracking-[-0.01em] text-white/55 transition-colors hover:text-white">
              Updates
            </a>
          </header>

          <section className="relative grid flex-1 items-center gap-0 overflow-hidden md:grid-cols-[1.06fr_0.94fr]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,0,72,0.14)_0%,rgba(255,0,72,0.02)_40%,transparent_72%)]" />

            <div className="relative z-10 flex items-center justify-center px-6 py-9 sm:px-8 md:px-10">
              <div className="w-full max-w-[440px] text-center md:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white/58">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#FF0048]" />
                  Private Beta
                </div>

                <h1 className="font-sans text-[clamp(2.1rem,4.5vw,3.35rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
                  Split the bill.
                  <br />
                  Keep the vibe.
                </h1>

                <p className="mt-4 max-w-[390px] text-[15px] leading-[1.6] tracking-[-0.01em] text-[#AAAAAA] md:max-w-[380px]">
                  Itemize every order, convert between USD and ZiG instantly, and settle faster after
                  every meal.
                </p>

                <div className="mt-7">
                  {joined ? (
                    <div className="inline-flex flex-col rounded-2xl border border-white/12 bg-white/5 px-6 py-4 text-left">
                      <p className="font-sans text-[15px] font-semibold tracking-[-0.02em] text-white">
                        You&apos;re on the waitlist.
                      </p>
                      <p className="mt-1.5 text-[13px] leading-5 text-white/55">
                        We&apos;ll send your invite as soon as your spot opens.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex w-full max-w-[420px] flex-col gap-2.5">
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 rounded-xl border border-white/12 bg-white/[0.06] px-4 text-[14px] tracking-[-0.01em] text-white outline-none transition-colors focus:border-[#FF0048]/70"
                      />
                      <button
                        type="submit"
                        className="h-11 rounded-xl bg-[#FF0048] px-5 text-[14px] font-semibold tracking-[-0.01em] text-white shadow-[0_10px_26px_rgba(255,0,72,0.30)] transition-all hover:translate-y-[-1px] hover:shadow-[0_14px_30px_rgba(255,0,72,0.40)] active:translate-y-0">
                        Join Waitlist
                      </button>
                    </form>
                  )}
                </div>

                <p className="mt-4 text-[12px] tracking-[-0.01em] text-white/36">
                  Beta · Zimbabwe &amp; region · iOS &amp; Android
                </p>
              </div>
            </div>

            <div className="relative hidden h-full border-l border-white/8 bg-[#0E0E0E] md:block">
              <Image
                src="/screenshot.png"
                alt="umo app preview"
                fill
                priority
                className="object-contain px-6 py-8"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0E0E0E] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0E0E0E] to-transparent" />
            </div>
          </section>

          <footer className="flex h-12 items-center justify-between border-t border-white/10 px-5 sm:px-6">
            <span className="text-[12px] tracking-[-0.01em] text-white/30">© 2026 umo</span>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[12px] tracking-[-0.01em] text-white/36 transition-colors hover:text-white/70">
                Privacy
              </a>
              <a href="#" className="text-[12px] tracking-[-0.01em] text-white/36 transition-colors hover:text-white/70">
                Terms
              </a>
            </div>
          </footer>
        </div>
      </main>
    );
  }
            lineHeight: 1.6,
