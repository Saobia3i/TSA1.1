"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface ServiceBookingProps {
  serviceTitle?: string;
  selectedPackage?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const ENGAGEMENT_OPTIONS = [
  "One-time Assessment",
  "Ongoing / Retainer",
  "Enterprise / Long-term",
  "Not sure (need consultation)",
];

const TIMELINE_OPTIONS = [
  "Immediate",
  "Within 1 Month",
  "1–3 Months",
  "Flexible",
];

const BUDGET_OPTIONS = [
  "Startup / Small Business",
  "Mid-Level",
  "Enterprise",
  "Prefer to discuss",
];

export default function ServiceBooking({
  serviceTitle,
  selectedPackage,
}: ServiceBookingProps) {
  const resolvedServiceTitle = useMemo(
    () => serviceTitle ?? "",
    [serviceTitle]
  );

  const [form, setForm] = useState({
    fullName: "",
    organization: "",
    email: "",
    whatsapp: "",
    country: "",
    serviceTitle: resolvedServiceTitle,
    packageName: selectedPackage ?? "",
    requirements: "",
    engagementType: "",
    timeline: "",
    budget: "",
    notes: "",
    legalAgreement: false,
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      serviceTitle: resolvedServiceTitle,
    }));
  }, [resolvedServiceTitle]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      packageName: selectedPackage ?? "",
    }));
  }, [selectedPackage]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      if (!form.packageName) {
        throw new Error("Please select a package.");
      }

      const response = await fetch("/api/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceTitle: form.serviceTitle,
          ...form,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Booking failed. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section className="booking-wrap">
      <div className="booking-header">
        <span className="booking-kicker">TSA Professional Services Request</span>
        <h3 className="booking-title">
          Select the services you are interested in and provide your
          requirements.
        </h3>
        <p className="booking-subtitle">
          Our team will contact you via email or WhatsApp to discuss scope,
          pricing, and next steps. You may also directly contact us on WhatsApp
          for faster communication and required details to onboard as a TSA
          client.
        </p>
      </div>

      <form className="booking-form" onSubmit={onSubmit}>
        <p className="required-note">* Indicates required question</p>
        <div className="grid">
          <div className="field full">
            <label htmlFor="serviceTitle">
              Service Title <span className="req">*</span>
            </label>
            <input
              id="serviceTitle"
              name="serviceTitle"
              value={form.serviceTitle}
              onChange={onChange}
              placeholder="Service title"
              required
              readOnly
            />
          </div>
          <div className="field full">
            <label htmlFor="packageName">
              Selected Package <span className="req">*</span>
            </label>
            <input
              id="packageName"
              name="packageName"
              value={form.packageName}
              placeholder="Select a package above"
              required
              readOnly
            />
          </div>
          <div className="field">
            <label htmlFor="fullName">
              Full Name <span className="req">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              placeholder="Your name"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="organization">
              Organization / Company Name (if applicable)
            </label>
            <input
              id="organization"
              name="organization"
              value={form.organization}
              onChange={onChange}
              placeholder="Company name"
            />
          </div>
          <div className="field">
            <label htmlFor="email">
              Email Address <span className="req">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@company.com"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="whatsapp">
              WhatsApp Contact Number <span className="req">*</span>
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              value={form.whatsapp}
              onChange={onChange}
              placeholder="+880..."
              required
            />
          </div>
          <div className="field full">
            <label htmlFor="country">
              Country <span className="req">*</span>
            </label>
            <input
              id="country"
              name="country"
              value={form.country}
              onChange={onChange}
              placeholder="Country"
              required
            />
          </div>
          <div className="field full">
            <label htmlFor="requirements">
              Describe your requirements, scope, or security concerns{" "}
              <span className="req">*</span>
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={form.requirements}
              onChange={onChange}
              placeholder="Share requirements and scope..."
              rows={5}
              required
            />
          </div>
          <div className="field full">
            <label>
              Engagement Type <span className="req">*</span>
            </label>
            <div className="radio-grid">
              {ENGAGEMENT_OPTIONS.map((option) => (
                <label key={option} className="radio-item">
                  <input
                    type="radio"
                    name="engagementType"
                    value={option}
                    checked={form.engagementType === option}
                    onChange={onChange}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="field full">
            <label>
              Expected Timeline <span className="req">*</span>
            </label>
            <div className="radio-grid">
              {TIMELINE_OPTIONS.map((option) => (
                <label key={option} className="radio-item">
                  <input
                    type="radio"
                    name="timeline"
                    value={option}
                    checked={form.timeline === option}
                    onChange={onChange}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="field full">
            <label htmlFor="budget">Estimated Budget Range (Optional)</label>
            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={onChange}
            >
              <option value="">Select budget range</option>
              {BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="notes">Additional Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder="Additional details..."
              rows={3}
            />
          </div>
          <div className="field full">
            <p className="whatsapp-note">
              You may directly contact TSA via WhatsApp for faster communication
              and service onboarding.
            </p>
          </div>
          <div className="field full">
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="legalAgreement"
                checked={form.legalAgreement}
                onChange={onChange}
                required
              />
              <span>
                Legal Agreement & Policy Acceptance{" "}
                <span className="req">*</span>
                <span className="legal-text">
                  I agree to all TSA terms, policies, confidentiality rules, and
                  ethical usage guidelines.
                </span>
              </span>
            </label>
          </div>
        </div>

        {status === "error" && <p className="form-error">{error}</p>}
        {status === "success" && (
          <p className="form-success">Thanks! We will contact you soon.</p>
        )}

        <button className="submit" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Send Booking Request"}
        </button>
      </form>

      <style jsx>{`
        .booking-wrap {
          margin-top: 80px;
          padding: 32px;
          border-radius: 20px;
          border: 1px solid rgba(34, 211, 238, 0.3);
          background: rgba(10, 10, 10, 0.6);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(16px);
        }

        .booking-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .booking-kicker {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid rgba(34, 211, 238, 0.5);
          color: #22d3ee;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: var(--font-space-mono);
          margin-bottom: 12px;
        }

        .booking-title {
          font-size: clamp(26px, 4vw, 36px);
          margin: 0 0 8px;
          color: #fff;
          font-family: var(--font-space-mono);
        }

        .booking-subtitle {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-family: var(--font-space-mono);
        }

        .required-note {
          margin: 0 0 12px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-family: var(--font-space-mono);
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        label {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.6);
          font-family: var(--font-space-mono);
        }

        .req {
          color: #22d3ee;
          margin-left: 4px;
        }

        input,
        select,
        textarea {
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(17, 24, 39, 0.7);
          color: white;
          font-size: 14px;
          font-family: var(--font-space-mono);
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: rgba(34, 211, 238, 0.8);
          box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.2);
        }

        .radio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 12px;
          margin-top: 8px;
        }

        .checkbox-item,
        .radio-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(17, 24, 39, 0.45);
          color: rgba(255, 255, 255, 0.85);
          font-size: 13px;
          text-transform: none;
          letter-spacing: 0;
        }

        .checkbox-item input,
        .radio-item input {
          margin-top: 2px;
        }

        .whatsapp-note {
          margin: 0;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px dashed rgba(34, 211, 238, 0.3);
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          font-family: var(--font-space-mono);
        }

        .legal-text {
          display: block;
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          text-transform: none;
          letter-spacing: 0;
        }

        .submit {
          align-self: center;
          padding: 14px 40px;
          border-radius: 999px;
          border: 2px solid rgba(34, 211, 238, 0.8);
          background: transparent;
          color: white;
          font-family: var(--font-nunito-sans);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .submit:hover {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
          transform: translateY(-2px);
        }

        .submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .form-error {
          color: #fca5a5;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 10px 12px;
          border-radius: 10px;
          margin: 0;
          text-align: center;
          font-family: var(--font-space-mono);
        }

        .form-success {
          color: #86efac;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 10px 12px;
          border-radius: 10px;
          margin: 0;
          text-align: center;
          font-family: var(--font-space-mono);
        }
      `}</style>
    </section>
  );
}
