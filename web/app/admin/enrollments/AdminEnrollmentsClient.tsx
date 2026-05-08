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
  mailSentAt: Date | string | null;
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
        whiteSpace: "nowrap",
        display: "inline-flex",
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
      setItems((prev) =>
        prev.map((item) =>
          item.id === enrollmentId
            ? {
                ...item,
                mailSentAt:
                  payload?.enrollment?.mailSentAt || new Date().toISOString(),
              }
            : item
        )
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Send mail failed");
    } finally {
      setLoadingId("");
    }
  };

  const deleteEnrollment = async (enrollmentId: string) => {
    const confirmed = window.confirm("Delete this enrollment request? This cannot be undone.");
    if (!confirmed) return;

    try {
      setLoadingId(enrollmentId);
      setMessage("");

      const res = await fetch("/api/admin/enrollments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId }),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(payload?.error || "Delete failed");
      }

      setItems((prev) => prev.filter((item) => item.id !== enrollmentId));
      setMessage(payload?.message || "Enrollment deleted.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed");
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
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="header-row">
          <div>
            <h1 className="header-title">Enrollment Requests</h1>
            <p className="header-subtitle">Review, approve, email, or remove student enrollment requests.</p>
          </div>
          <div className="header-actions">
            <button onClick={lockPanel} className="top-button lock-button">
              Lock Admin
            </button>
            <Link href="/dashboard" className="top-button dashboard-button">
              Back to Dashboard
            </Link>
          </div>
        </div>

        {message && <p style={{ color: "#93c5fd" }}>{message}</p>}

        {items.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No enrollment requests found.</p>
        ) : (
          <div className="table-wrap">
            <table className="enrollments-table">
              <thead>
                <tr>
                  {["Student", "Email", "WhatsApp", "Course", "Status", "Requested At", "Approved At", "Mail Sent At", "Action"].map((h) => (
                    <th
                      key={h}
                      className="table-heading"
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
                    <td style={tdStyle}>{fmtNullable(item.mailSentAt)}</td>
                    <td style={tdStyle}>
                      <div className="action-buttons" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {item.status === "PENDING" && (
                          <button
                            onClick={() => approve(item.id)}
                            disabled={loadingId === item.id}
                            className="action-button approve-button"
                          >
                            {loadingId === item.id ? "Working..." : "Approve"}
                          </button>
                        )}
                        <button
                          onClick={() => sendMail(item.id)}
                          disabled={loadingId === item.id}
                          className="action-button mail-button"
                        >
                          {loadingId === item.id ? "Working..." : "Send Mail"}
                        </button>
                        <button
                          onClick={() => deleteEnrollment(item.id)}
                          disabled={loadingId === item.id}
                          className="action-button delete-button"
                        >
                          {loadingId === item.id ? "Working..." : "Delete"}
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
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 18px;
          margin-bottom: 18px;
          padding: 18px;
          border: 1px solid rgba(34, 211, 238, 0.18);
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.84), rgba(2, 6, 23, 0.72));
        }

        .header-title {
          margin: 0;
          color: #ffffff;
          font-size: 28px;
          line-height: 1.15;
        }

        .header-subtitle {
          margin: 8px 0 0;
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.5;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .top-button {
          display: inline-flex;
          min-height: 36px;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          padding: 0 13px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        .lock-button {
          border: 1px solid rgba(248, 113, 113, 0.34);
          background: rgba(248, 113, 113, 0.1);
          color: #fca5a5;
        }

        .dashboard-button {
          border: 1px solid rgba(125, 211, 252, 0.34);
          background: rgba(125, 211, 252, 0.1);
          color: #7dd3fc;
        }

        .table-wrap {
          overflow-x: auto;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.46);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.22);
        }

        .enrollments-table {
          width: 100%;
          min-width: 1080px;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .enrollments-table thead {
          background: rgba(2, 6, 23, 0.7);
        }

        .table-heading {
          padding: 12px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          color: #94a3b8;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          line-height: 1.35;
          text-align: left;
          text-transform: uppercase;
        }

        .enrollments-table th:nth-child(1),
        .enrollments-table td:nth-child(1) {
          width: 116px;
        }

        .enrollments-table th:nth-child(2),
        .enrollments-table td:nth-child(2) {
          width: 158px;
        }

        .enrollments-table th:nth-child(3),
        .enrollments-table td:nth-child(3) {
          width: 108px;
        }

        .enrollments-table th:nth-child(4),
        .enrollments-table td:nth-child(4) {
          width: 310px;
        }

        .enrollments-table th:nth-child(5),
        .enrollments-table td:nth-child(5) {
          width: 74px;
        }

        .enrollments-table th:nth-child(6),
        .enrollments-table td:nth-child(6),
        .enrollments-table th:nth-child(7),
        .enrollments-table td:nth-child(7),
        .enrollments-table th:nth-child(8),
        .enrollments-table td:nth-child(8) {
          width: 112px;
        }

        .enrollments-table th:nth-child(9),
        .enrollments-table td:nth-child(9) {
          width: 96px;
        }

        .enrollments-table tbody tr {
          background: rgba(2, 6, 23, 0.18);
        }

        .enrollments-table tbody tr:hover {
          background: rgba(34, 211, 238, 0.06);
        }

        .action-buttons {
          flex-direction: column;
          align-items: stretch;
          gap: 6px !important;
        }

        .action-button {
          width: 86px;
          min-height: 28px;
          border-radius: 8px;
          padding: 0 10px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }

        .action-button:disabled {
          cursor: wait;
          opacity: 0.72;
        }

        .action-button:not(:disabled):hover {
          transform: translateY(-1px);
        }

        .approve-button {
          border: 1px solid rgba(16, 185, 129, 0.5);
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
        }

        .mail-button {
          border: 1px solid rgba(125, 211, 252, 0.5);
          background: rgba(125, 211, 252, 0.15);
          color: #7dd3fc;
        }

        .delete-button {
          border: 1px solid rgba(248, 113, 113, 0.5);
          background: rgba(248, 113, 113, 0.15);
          color: #fca5a5;
        }

        @media (max-width: 768px) {
          .admin-main {
            padding: 20px 12px !important;
          }

          .header-row {
            display: grid;
            grid-template-columns: 1fr;
            padding: 14px;
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

          .action-buttons {
            min-width: 140px;
          }
        }
      `}</style>
    </main>
  );
}

const tdStyle = {
  padding: "13px 10px",
  borderBottom: "1px solid rgba(255,255,255,.06)",
  verticalAlign: "middle",
  overflowWrap: "anywhere" as const,
  lineHeight: 1.42,
  color: "#dbeafe",
  fontSize: 14,
};
