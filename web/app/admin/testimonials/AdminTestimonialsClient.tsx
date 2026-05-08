"use client";

import Link from "next/link";
import { useState } from "react";

export type AdminTestimonialItem = {
  id: string;
  name: string;
  position: string | null;
  review: string;
  image: string | null;
  postLink: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
};

type FormState = {
  id?: string;
  name: string;
  position: string;
  review: string;
  image: string;
  postLink: string;
  sortOrder: string;
  isPublished: boolean;
};

const emptyForm: FormState = {
  name: "",
  position: "",
  review: "",
  image: "",
  postLink: "",
  sortOrder: "0",
  isPublished: true,
};

export default function AdminTestimonialsClient({
  initialTestimonials,
}: {
  initialTestimonials: AdminTestimonialItem[];
}) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = Boolean(form.id);

  const refreshTestimonials = async () => {
    const res = await fetch("/api/admin/testimonials", { cache: "no-store" });
    const data = await res.json();
    if (res.ok) {
      setTestimonials(data.testimonials);
    }
  };

  const saveTestimonial = async () => {
    setMessage("");
    setIsSaving(true);

    const res = await fetch("/api/admin/testimonials", {
      method: isEditing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        sortOrder: Number(form.sortOrder || 0),
      }),
    });

    const data = await res.json();
    setIsSaving(false);

    if (!res.ok) {
      setMessage(data.error || "Failed to save testimonial");
      return;
    }

    setMessage(isEditing ? "Testimonial updated." : "Testimonial added.");
    setForm(emptyForm);
    await refreshTestimonials();
  };

  const editTestimonial = (testimonial: AdminTestimonialItem) => {
    setMessage("");
    setForm({
      id: testimonial.id,
      name: testimonial.name,
      position: testimonial.position || "",
      review: testimonial.review,
      image: testimonial.image || "",
      postLink: testimonial.postLink || "",
      sortOrder: String(testimonial.sortOrder),
      isPublished: testimonial.isPublished,
    });
  };

  const deleteTestimonial = async (testimonial: AdminTestimonialItem) => {
    const confirmed = window.confirm(`Delete testimonial from ${testimonial.name}?`);
    if (!confirmed) return;

    const res = await fetch("/api/admin/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: testimonial.id }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Failed to delete testimonial");
      return;
    }

    setMessage("Testimonial deleted.");
    await refreshTestimonials();
  };

  return (
    <main className="admin-testimonials">
      <div className="admin-header">
        <div>
          <h1>Admin Testimonials</h1>
          <p>Add, edit, publish, and reorder homepage testimonials.</p>
        </div>
        <div className="admin-links">
          <Link href="/admin/enrollments">Enrollments</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>

      <section className="admin-panel">
        <h2>{isEditing ? "Edit Testimonial" : "Add Testimonial"}</h2>
        <div className="form-grid">
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Student or reviewer name"
            />
          </label>
          <label>
            Position
            <input
              value={form.position}
              onChange={(event) => setForm((current) => ({ ...current, position: event.target.value }))}
              placeholder="Student, country, title"
            />
          </label>
          <label>
            Image URL
            <input
              value={form.image}
              onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
              placeholder="https://..."
            />
          </label>
          <label>
            Post Link
            <input
              value={form.postLink}
              onChange={(event) => setForm((current) => ({ ...current, postLink: event.target.value }))}
              placeholder="LinkedIn, Trustpilot, etc."
            />
          </label>
          <label>
            Sort Order
            <input
              type="number"
              value={form.sortOrder}
              onChange={(event) => setForm((current) => ({ ...current, sortOrder: event.target.value }))}
            />
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => setForm((current) => ({ ...current, isPublished: event.target.checked }))}
            />
            Published
          </label>
        </div>

        <label className="review-field">
          Review
          <textarea
            value={form.review}
            onChange={(event) => setForm((current) => ({ ...current, review: event.target.value }))}
            placeholder="Write testimonial text"
            rows={5}
          />
        </label>

        {message ? <p className="message">{message}</p> : null}

        <div className="form-actions">
          <button type="button" onClick={saveTestimonial} disabled={isSaving}>
            {isSaving ? "Saving..." : isEditing ? "Update Testimonial" : "Add Testimonial"}
          </button>
          {isEditing ? (
            <button type="button" className="secondary" onClick={() => setForm(emptyForm)}>
              Cancel Edit
            </button>
          ) : null}
        </div>
      </section>

      <section className="admin-panel">
        <h2>Current Testimonials</h2>
        {testimonials.length === 0 ? (
          <p className="muted">No database testimonials yet. The public site will use static fallback testimonials.</p>
        ) : (
          <div className="testimonial-list">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="testimonial-row">
                <div>
                  <div className="row-title">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.isPublished ? "Published" : "Hidden"}</span>
                  </div>
                  <p className="muted">{testimonial.position || "No position"} | Sort {testimonial.sortOrder}</p>
                  <p>{testimonial.review}</p>
                </div>
                <div className="row-actions">
                  <button type="button" onClick={() => editTestimonial(testimonial)}>
                    Edit
                  </button>
                  <button type="button" className="danger" onClick={() => deleteTestimonial(testimonial)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .admin-testimonials {
          min-height: 100vh;
          padding: 42px 20px 70px;
          background: #06111f;
          color: #e5e7eb;
          font-family: var(--font-nunito);
        }
        .admin-header,
        .admin-panel {
          width: min(1120px, 100%);
          margin: 0 auto 18px;
        }
        .admin-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
        }
        h1,
        h2,
        p {
          margin-top: 0;
        }
        h1 {
          margin-bottom: 8px;
          color: #fff;
          font-size: 30px;
        }
        h2 {
          color: #fff;
          font-size: 20px;
        }
        .admin-links {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .admin-links a,
        button {
          border: 1px solid rgba(34, 211, 238, 0.35);
          border-radius: 8px;
          background: rgba(34, 211, 238, 0.1);
          color: #67e8f9;
          padding: 9px 12px;
          text-decoration: none;
          font-weight: 800;
          cursor: pointer;
        }
        .admin-panel {
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 14px;
          padding: 18px;
          background: rgba(2, 6, 23, 0.72);
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        label {
          display: flex;
          flex-direction: column;
          gap: 7px;
          color: #bfdbfe;
          font-size: 13px;
          font-weight: 800;
        }
        input,
        textarea {
          width: 100%;
          border: 1px solid rgba(148, 163, 184, 0.24);
          border-radius: 9px;
          background: rgba(15, 23, 42, 0.9);
          color: #fff;
          padding: 10px 11px;
          font: inherit;
        }
        textarea {
          resize: vertical;
        }
        .checkbox-row {
          flex-direction: row;
          align-items: center;
          align-self: end;
          min-height: 42px;
        }
        .checkbox-row input {
          width: auto;
        }
        .review-field {
          margin-top: 14px;
        }
        .form-actions,
        .row-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .form-actions {
          margin-top: 14px;
        }
        button.secondary {
          border-color: rgba(148, 163, 184, 0.3);
          background: rgba(148, 163, 184, 0.1);
          color: #cbd5e1;
        }
        button.danger {
          border-color: rgba(248, 113, 113, 0.38);
          background: rgba(248, 113, 113, 0.12);
          color: #fca5a5;
        }
        button:disabled {
          cursor: wait;
          opacity: 0.7;
        }
        .message {
          margin: 12px 0 0;
          color: #67e8f9;
          font-weight: 800;
        }
        .muted {
          color: #94a3b8;
        }
        .testimonial-list {
          display: grid;
          gap: 12px;
        }
        .testimonial-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 16px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: 12px;
          padding: 14px;
          background: rgba(15, 23, 42, 0.6);
        }
        .row-title {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }
        .row-title strong {
          color: #fff;
        }
        .row-title span {
          border-radius: 999px;
          background: rgba(34, 211, 238, 0.12);
          color: #67e8f9;
          padding: 3px 8px;
          font-size: 12px;
          font-weight: 800;
        }
        @media (max-width: 720px) {
          .admin-header,
          .testimonial-row {
            grid-template-columns: 1fr;
            display: grid;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
