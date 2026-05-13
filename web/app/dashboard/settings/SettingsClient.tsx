"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Trash2 } from "lucide-react";
import Navbar from "@/features/layout/components/Navbar";
import { signOut } from "next-auth/react";
import { updateProfile, deleteAccount } from "./actions";

export default function SettingsClient({ user }: { user: { name: string; email: string } }) {
  const [name, setName] = useState(user.name);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);

    const res = await updateProfile(formData);
    if (res?.error) {
      setMessage(`Error: ${res.error}`);
    } else {
      setMessage("Profile updated successfully!");
    }
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone and you will lose all access.")) return;
    
    setIsDeleting(true);
    const res = await deleteAccount();
    if (res?.error) {
      setMessage(`Error: ${res.error}`);
      setIsDeleting(false);
    } else {
      await signOut({ callbackUrl: '/' });
    }
  };

  return (
    <div style={{ backgroundColor: "#0a1929", minHeight: "100vh", fontFamily: "var(--font-nunito)" }}>
      <Navbar user={{ name: user.name, email: user.email }} />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px 60px" }}>
        <h1 style={{ color: "#fff", fontSize: 32, marginBottom: 24 }}>Account Settings</h1>

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
          <h2 style={{ fontSize: 22, color: "#fff", margin: "0 0 20px 0" }}>Profile Information</h2>
          
          <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ color: "#9ca3af", display: "block", marginBottom: 8, fontSize: 14 }}>Email (Cannot be changed)</label>
              <input 
                type="email" 
                value={user.email} 
                disabled 
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(0,0,0,0.3)",
                  color: "#6b7280",
                  fontFamily: "inherit",
                  fontSize: 16,
                  cursor: "not-allowed"
                }}
              />
            </div>
            
            <div>
              <label htmlFor="name" style={{ color: "#9ca3af", display: "block", marginBottom: 8, fontSize: 14 }}>Full Name</label>
              <input 
                id="name"
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,212,255,0.4)",
                  background: "rgba(2,6,23,0.7)",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: 16,
                  outline: "none"
                }}
              />
            </div>

            {message && (
              <p style={{ color: message.includes("Error") ? "#fca5a5" : "#34d399", margin: 0, fontSize: 14 }}>
                {message}
              </p>
            )}

            <button 
              type="submit" 
              disabled={isUpdating}
              style={{
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 8,
                border: "1px solid rgba(34,211,238,0.5)",
                background: "rgba(34,211,238,0.15)",
                color: "#22d3ee",
                fontWeight: 700,
                cursor: isUpdating ? "wait" : "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s"
              }}
            >
              <Save style={{ width: 18, height: 18 }} />
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            padding: 28,
            borderRadius: 16,
            border: "1px solid rgba(239,68,68,0.35)",
            background: "rgba(17,24,39,0.8)",
          }}
        >
          <h2 style={{ fontSize: 22, color: "#fca5a5", margin: "0 0 10px 0" }}>Danger Zone</h2>
          <p style={{ color: "#9ca3af", marginBottom: 20, fontSize: 14 }}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
          
          <button 
            type="button" 
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 8,
              border: "1px solid rgba(239,68,68,0.5)",
              background: "rgba(239,68,68,0.15)",
              color: "#ef4444",
              fontWeight: 700,
              cursor: isDeleting ? "wait" : "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s"
            }}
          >
            <Trash2 style={{ width: 18, height: 18 }} />
            {isDeleting ? "Deleting Account..." : "Delete Account"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
