"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  const isLockedOut = useCallback(() => {
    if (lockedUntil && Date.now() < lockedUntil) {
      return true;
    }
    if (lockedUntil && Date.now() >= lockedUntil) {
      setLockedUntil(null);
      setAttempts([]);
      return false;
    }
    return false;
  }, [lockedUntil]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (isLockedOut()) {
      setError(
        "Too many failed attempts. Please try again in a few minutes."
      );
      return;
    }

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Client-side validation: both fields required
    if (!username || !username.trim()) {
      setError("Both username and password are required.");
      return;
    }
    if (!password) {
      setError("Both username and password are required.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Track failed attempt
        const now = Date.now();
        const recentAttempts = [...attempts, now].filter(
          (t) => now - t < WINDOW_MS
        );
        setAttempts(recentAttempts);

        if (recentAttempts.length >= MAX_ATTEMPTS) {
          setLockedUntil(now + LOCKOUT_MS);
          setError(
            "Too many failed attempts. Please try again in a few minutes."
          );
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">
              Sign in to manage site content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={loading}
              />
            </div>

            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || isLockedOut()}
              className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
