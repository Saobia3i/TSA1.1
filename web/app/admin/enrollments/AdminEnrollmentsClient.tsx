"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PendingEnrollment = {
  id: string;
  courseId: string;
  courseName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  enrolledAt: Date | string;
  approvedAt: Date | string | null;
  user: {
    name: string | null;
    email: string;
    contact: string | null;
  };
};

function fmt(v: Date | string) {
  return new Date(v).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function fmtNullable(v: Date | string | null) {
  return v ? fmt(v) : "-";
}

function StatusBadge({
  status,
}: {
  status: "PENDING" | "APPROVED" | "REJECTED";
}) {
  const map = {
    PENDING: { bg: "rgba(245,158,11,.2)", text: "#fbbf24" },
    APPROVED: { bg: "rgba(16,185,129,.2)", text: "#34d399" },
    REJECTED: { bg: "rgba(239,68,68,.2)", text: "#f87171" },
  }[status];

  return (
    <span
      style={{
        background: map.bg,
        color: map.text,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {status}
    </span>
  );
}

export default function AdminEnrollmentsClient({
  pendingEnrollments,
}: {
  pendingEnrollments: PendingEnrollment[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(pendingEnrollments);
  const [loadingId, setLoadingId] = useState("");
  const [message, setMessage] = useState("");

  const approve = async (enrollmentId: string) => {
    try {
      setLoadingId(enrollmentId);
      setMessage("");

      const res = await fetch("/api/admin/enrollments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId }),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(payload?.error || "Approve failed");
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === enrollmentId
            ? {
                ...item,
                status: "APPROVED",
                approvedAt: new Date().toISOString(),
              }
            : item
        )
      );
      setMessage("Enrollment approved successfully.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Approve failed");
    } finally {
      setLoadingId("");
    }
  };

  const sendMail = async (enrollmentId: string) => {
    try {
      setLoadingId(enrollmentId);
      setMessage("");

      const res = await fetch("/api/admin/enrollments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, action: "SEND_MAIL" }),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(payload?.error || "Send mail failed");
      }

      setMessage(payload?.message || "Course details mail sent.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Send mail failed");
    } finally {
      setLoadingId("");
    }
  };

  const lockPanel = async () => {
    await fetch("/api/admin/verify", { method: "DELETE" });
    router.refresh();
  };

  return (
    <main
      className="admin-main"
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "#e5e7eb",
        padding: "32px 18px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h1 className="header-title" style={{ margin: 0, fontSize: 28 }}>Admin Enrollment Approval</h1>
          <div className="header-actions" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={lockPanel}
              style={{
                border: "1px solid rgba(248,113,113,.45)",
                background: "rgba(248,113,113,.15)",
                color: "#fca5a5",
                borderRadius: 8,
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Lock Admin
            </button>
            <Link href="/dashboard" style={{ color: "#7dd3fc", textDecoration: "none" }}>
              Back to Dashboard
            </Link>
          </div>
        </div>

        {message && <p style={{ color: "#93c5fd" }}>{message}</p>}

        {items.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No enrollment requests found.</p>
        ) : (
          <div className="table-wrap" style={{ overflowX: "auto", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }}>
            <table className="enrollments-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Student", "Email", "WhatsApp", "Course", "Status", "Requested At", "Approved At", "Action"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        fontSize: 12,
                        color: "#9ca3af",
                        padding: "10px 8px",
                        borderBottom: "1px solid rgba(255,255,255,.12)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.user.name || "Unknown"}</td>
                    <td style={tdStyle}>{item.user.email}</td>
                    <td style={tdStyle}>{item.user.contact || "-"}</td>
                    <td style={tdStyle}>{item.courseName}</td>
                    <td style={tdStyle}>
                      <StatusBadge status={item.status} />
                    </td>
                    <td style={tdStyle}>{fmt(item.enrolledAt)}</td>
                    <td style={tdStyle}>{fmtNullable(item.approvedAt)}</td>
                    <td style={tdStyle}>
                      <div className="action-buttons" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {item.status === "PENDING" && (
                          <button
                            onClick={() => approve(item.id)}
                            disabled={loadingId === item.id}
                            style={{
                              border: "1px solid rgba(16,185,129,.5)",
                              background: "rgba(16,185,129,.15)",
                              color: "#34d399",
                              borderRadius: 8,
                              padding: "6px 12px",
                              cursor: "pointer",
                            }}
                          >
                            {loadingId === item.id ? "Working..." : "Approve"}
                          </button>
                        )}
                        <button
                          onClick={() => sendMail(item.id)}
                          disabled={loadingId === item.id}
                          style={{
                            border: "1px solid rgba(125,211,252,.5)",
                            background: "rgba(125,211,252,.15)",
                            color: "#7dd3fc",
                            borderRadius: 8,
                            padding: "6px 12px",
                            cursor: "pointer",
                          }}
                        >
                          {loadingId === item.id ? "Working..." : "Send Mail"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .admin-main {
            padding: 20px 12px !important;
          }

          .header-row {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 10px;
          }

          .header-title {
            font-size: 22px !important;
            line-height: 1.25;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 8px;
          }

          .enrollments-table {
            min-width: 980px;
          }

          .action-buttons {
            min-width: 140px;
          }
        }
      `}</style>
    </main>
  );
}

const tdStyle = {
  padding: "12px 8px",
  borderBottom: "1px solid rgba(255,255,255,.06)",
};
