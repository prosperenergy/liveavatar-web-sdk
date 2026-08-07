"use client";

import { useState } from "react";
import { LiveAvatarSession } from "./LiveAvatarSession";

export type SessionMode = "FULL" | "FULL_PTT" | "LITE";

export const LiveAvatarDemo = () => {
  const [sessionToken, setSessionToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startHanna = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/start-lite-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to start HANNA");
      }

      if (!payload?.session_token) {
        throw new Error("HANNA did not receive a LiveAvatar session token");
      }

      setSessionToken(payload.session_token);
    } catch (startError: unknown) {
      setError(
        startError instanceof Error
          ? startError.message
          : "Unable to start HANNA",
      );
    } finally {
      setLoading(false);
    }
  };

  const onSessionStopped = () => {
    setSessionToken("");
  };

  return (
    <main className="min-h-screen w-full bg-slate-950 text-white">
      {!sessionToken ? (
        <section className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-12">
          <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  PROSPER LIVE
                </div>

                <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                  Meet HANNA
                </h1>

                <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                  Prosper&apos;s live solar assistant. HANNA can answer questions,
                  learn about your home, and help connect you with the right
                  advisor.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-400">
                  <span className="rounded-full border border-white/10 px-3 py-1.5">
                    Solar questions
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1.5">
                    Home qualification
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1.5">
                    Appointment help
                  </span>
                </div>

                {error && (
                  <div className="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={startHanna}
                  disabled={loading}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-sky-400 px-6 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
                >
                  {loading ? "Starting HANNA..." : "Start HANNA"}
                </button>

                <p className="mt-3 text-xs text-slate-500">
                  Starting a session may request microphone permission.
                </p>
              </div>

              <div className="relative min-h-72 border-t border-white/10 bg-gradient-to-br from-sky-500/20 via-slate-900 to-amber-300/10 md:min-h-[560px] md:border-l md:border-t-0">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="flex h-44 w-44 items-center justify-center rounded-full border border-sky-300/30 bg-slate-950/60 shadow-[0_0_80px_rgba(56,189,248,0.18)]">
                    <span className="text-6xl font-semibold tracking-tight text-sky-300">
                      H
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
                  <p className="text-sm font-medium text-white">HANNA is ready</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Secure LiveAvatar sessions are created by the Prosper server.
                    API keys are never sent to the browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <LiveAvatarSession
          mode="LITE"
          sessionAccessToken={sessionToken}
          voiceChatConfig={true}
          onSessionStopped={onSessionStopped}
        />
      )}
    </main>
  );
};
