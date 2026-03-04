"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminVerifyClient({ email }: { email: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(payload?.error || "Verification failed");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="verify-main"
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "#e5e7eb",
        padding: "32px 18px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <form
        className="verify-form"
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: 460,
          border: "1px solid rgba(255,255,255,.12)",
          borderRadius: 14,
          padding: 20,
          background: "rgba(2,6,23,.75)",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 8, fontSize: 24 }}>Admin Verification</h1>
        <p style={{ color: "#9ca3af", marginTop: 0 }}>
          Logged in as: <strong>{email}</strong>
        </p>
        <label htmlFor="admin-password" style={{ display: "block", marginBottom: 8 }}>
          Enter admin password
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,.2)",
            background: "rgba(15,23,42,.75)",
            color: "#fff",
          }}
        />
        {error && <p style={{ color: "#fca5a5" }}>{error}</p>}
        <div className="verify-actions" style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button
            type="submit"
            disabled={loading}
            className="verify-button"
            style={{
              border: "1px solid rgba(125,211,252,.5)",
              background: "rgba(125,211,252,.15)",
              color: "#7dd3fc",
              borderRadius: 8,
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
          <Link href="/dashboard" style={{ color: "#9ca3af", alignSelf: "center" }}>
            Cancel
          </Link>
        </div>
      </form>
      <style jsx>{`
        @media (max-width: 768px) {
          .verify-main {
            padding: 20px 12px !important;
          }

          .verify-form {
            padding: 16px !important;
          }

          .verify-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .verify-button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
