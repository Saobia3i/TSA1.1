"use client";

import { motion } from "framer-motion";
import { BookOpen, BriefcaseBusiness, Clock3, CheckCircle2 } from "lucide-react";
import Navbar from "@/features/layout/components/Navbar";
import type { CSSProperties, ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";

type EnrollmentItem = {
  id: string;
  courseId: string;
  courseName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  enrolledAt: Date | string;
  approvedAt: Date | string | null;
  user?: {
    id: string;
    name: string | null;
    email: string;
    contact: string | null;
  } | null;
};

type ServiceBookingItem = {
  id: string;
  serviceTitle: string;
  fullName: string;
  email: string;
  packageName: string;
  engagementType: string;
  timeline: string;
  createdAt: Date | string;
};

interface DashboardContentProps {
  user: {
    name: string;
    email: string;
    id: string;
    role: string;
    contact?: string;
  };
  enrollments: EnrollmentItem[];
  serviceBookings: ServiceBookingItem[];
}

const fmt = (v: Date | string | null) =>
  v ? new Date(v).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" }) : "-";

export default function DashboardContent({
  user,
  enrollments: initialEnrollments,
  serviceBookings,
}: DashboardContentProps) {
  const [serviceBookingItems, setServiceBookingItems] = useState(serviceBookings);
  const [enrollmentItems, setEnrollmentItems] = useState(initialEnrollments);
  const [deleteLoadingId, setDeleteLoadingId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const pending = useMemo(
    () => enrollmentItems.filter((e) => e.status === "PENDING"),
    [enrollmentItems]
  );
  const approved = useMemo(
    () => enrollmentItems.filter((e) => e.status === "APPROVED"),
    [enrollmentItems]
  );

  const deleteRecord = async (
    type: "enrollment" | "serviceBooking",
    id: string,
    label: string
  ) => {
    const confirmed = window.confirm(`Delete ${label}? This cannot be undone.`);
    if (!confirmed) return;

    setDeleteLoadingId(id);
    setDeleteMessage("");

    const res = await fetch("/api/admin/dashboard-records", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id }),
    });
    const payload = await res.json().catch(() => null);

    setDeleteLoadingId("");

    if (!res.ok) {
      setDeleteMessage(payload?.error || "Delete failed");
      return;
    }

    if (type === "enrollment") {
      setEnrollmentItems((current) => current.filter((item) => item.id !== id));
    } else {
      setServiceBookingItems((current) => current.filter((item) => item.id !== id));
    }

    setDeleteMessage(`${label} deleted.`);
  };

  return (
    <div style={{ backgroundColor: "#0a1929", minHeight: "100vh", fontFamily: "var(--font-nunito)" }}>
      <Navbar user={{ name: user.name, email: user.email }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 24px 60px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: 28,
            borderRadius: 16,
            border: "1px solid rgba(0,212,255,0.35)",
            background: "rgba(17,24,39,0.8)",
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontSize: 28, color: "#fff", margin: 0 }}>Welcome, {user.name}</h2>
          <p style={{ color: "#9ca3af", marginTop: 8 }}>
            Role: {user.role} | Email: {user.email}
          </p>
          {user.role === "ADMIN" && (
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 10 }}>
              <a
                href="/admin/enrollments"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(125,211,252,.45)",
                  background: "rgba(125,211,252,.12)",
                  color: "#7dd3fc",
                  borderRadius: 8,
                  padding: "8px 13px",
                  textDecoration: "none",
                  fontWeight: 800,
                }}
              >
                Open Admin Approval Page
              </a>
              <a
                href="/admin/testimonials"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(34,211,238,.45)",
                  background: "rgba(34,211,238,.12)",
                  color: "#67e8f9",
                  borderRadius: 8,
                  padding: "8px 13px",
                  textDecoration: "none",
                  fontWeight: 800,
                }}
              >
                Manage Testimonials
              </a>
            </div>
          )}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14, marginBottom: 24 }}>
          <StatCard icon={Clock3} label="Pending Enrollment" value={pending.length} color="#f59e0b" />
          <StatCard icon={CheckCircle2} label="Approved Courses" value={approved.length} color="#10b981" />
          <StatCard icon={BookOpen} label="Total Enrollment" value={enrollmentItems.length} color="#22d3ee" />
          <StatCard icon={BriefcaseBusiness} label="Service Bookings" value={serviceBookingItems.length} color="#a78bfa" />
        </div>

        {deleteMessage ? (
          <p style={{ color: deleteMessage.includes("failed") ? "#fca5a5" : "#67e8f9", fontWeight: 800 }}>
            {deleteMessage}
          </p>
        ) : null}

        <Section title="Course Enrollments">
          {enrollmentItems.length === 0 ? (
            <p style={{ color: "#9ca3af", margin: 0 }}>No enrollment request found yet.</p>
          ) : (
            <>
              {user.role === "ADMIN" ? (
                <>
                  <p style={{ color: "#9ca3af", marginTop: 0 }}>
                    Dashboard shows enrollment status only. Approvals are handled from the simple admin approval page.
                  </p>
                  <Table
                    headers={["Student", "Email", "WhatsApp", "Course", "Status", "Requested At", "Approved At", "Action"]}
                    rows={enrollmentItems.map((e) => [
                      e.user?.name || "Unknown",
                      e.user?.email || "-",
                      e.user?.contact || "-",
                      e.courseName,
                      <StatusBadge key={`${e.id}-status`} status={e.status} />,
                      fmt(e.enrolledAt),
                      fmt(e.approvedAt),
                      <DeleteButton
                        key={`${e.id}-delete`}
                        disabled={deleteLoadingId === e.id}
                        onClick={() => deleteRecord("enrollment", e.id, "enrollment")}
                      />,
                    ])}
                  />
                </>
              ) : (
                <Table
                  headers={["Course", "Status", "Requested At", "Approved At"]}
                  rows={enrollmentItems.map((e) => [
                    e.courseName,
                    <StatusBadge key={`${e.id}-status`} status={e.status} />,
                    fmt(e.enrolledAt),
                    fmt(e.approvedAt),
                  ])}
                />
              )}
            </>
          )}
        </Section>

        <Section title="Service Bookings">
          {serviceBookingItems.length === 0 ? (
            <p style={{ color: "#9ca3af", margin: 0 }}>No service booking found for your account.</p>
          ) : (
            <>
              {user.role === "ADMIN" ? (
                <Table
                  headers={["Booked By", "Email", "Service", "Package", "Engagement", "Timeline", "Requested At", "Action"]}
                  rows={serviceBookingItems.map((s) => [
                    s.fullName,
                    s.email,
                    s.serviceTitle,
                    s.packageName,
                    s.engagementType,
                    s.timeline,
                    fmt(s.createdAt),
                    <DeleteButton
                      key={`${s.id}-delete`}
                      disabled={deleteLoadingId === s.id}
                      onClick={() => deleteRecord("serviceBooking", s.id, "service booking")}
                    />,
                  ])}
                />
              ) : (
                <Table
                  headers={["Service", "Package", "Engagement", "Timeline", "Requested At"]}
                  rows={serviceBookingItems.map((s) => [
                    s.serviceTitle,
                    s.packageName,
                    s.engagementType,
                    s.timeline,
                    fmt(s.createdAt),
                  ])}
                />
              )}
            </>
          )}
        </Section>

        {user.role === "ADMIN" && (
          <Section title="Admin Actions">
            <p style={{ color: "#9ca3af", marginTop: 0 }}>
              Approve pending enrollment requests and manage public testimonials.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="/admin/enrollments"
                style={{
                  display: "inline-block",
                  border: "1px solid rgba(16,185,129,.5)",
                  background: "rgba(16,185,129,.15)",
                  color: "#34d399",
                  borderRadius: 8,
                  padding: "8px 14px",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Approve Pending Enrollments
              </a>
              <a
                href="/admin/testimonials"
                style={{
                  display: "inline-block",
                  border: "1px solid rgba(34,211,238,.5)",
                  background: "rgba(34,211,238,.13)",
                  color: "#67e8f9",
                  borderRadius: 8,
                  padding: "8px 14px",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Manage Testimonials
              </a>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: ComponentType<{ style?: CSSProperties }>;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        border: `1px solid ${color}55`,
        borderRadius: 14,
        padding: 16,
        background: "rgba(17,24,39,0.8)",
      }}
    >
      <Icon style={{ width: 20, height: 20, color }} />
      <p style={{ color: "#9ca3af", margin: "8px 0 6px" }}>{label}</p>
      <p style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}>{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: 18,
        background: "rgba(2,6,23,0.7)",
        marginBottom: 18,
      }}
    >
      <h3 style={{ color: "#fff", marginTop: 0 }}>{title}</h3>
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: "PENDING" | "APPROVED" | "REJECTED" }) {
  const map = {
    PENDING: { bg: "rgba(245,158,11,.2)", text: "#fbbf24" },
    APPROVED: { bg: "rgba(16,185,129,.2)", text: "#34d399" },
    REJECTED: { bg: "rgba(239,68,68,.2)", text: "#f87171" },
  }[status];
  return (
    <span style={{ background: map.bg, color: map.text, padding: "4px 10px", borderRadius: 999, fontSize: 12 }}>
      {status}
    </span>
  );
}

function DeleteButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        border: "1px solid rgba(248,113,113,.48)",
        background: "rgba(248,113,113,.13)",
        color: "#fca5a5",
        borderRadius: 8,
        padding: "6px 10px",
        fontWeight: 800,
        cursor: disabled ? "wait" : "pointer",
      }}
    >
      {disabled ? "Deleting..." : "Delete"}
    </button>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (React.ReactNode | string)[][] }) {
  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <table style={{ width: "max-content", minWidth: "100%", borderCollapse: "collapse", color: "#e5e7eb" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  fontSize: 12,
                  color: "#9ca3af",
                  padding: "10px 8px",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid rgba(255,255,255,.12)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} style={{ padding: "12px 8px", whiteSpace: "nowrap", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
