// lib/validators.ts
export const CONTACT_REGEX = /^(?:\+880|0)[1-9]\d{8,10}$/ // Bangladesh phone numbers

export function validateContact(contact: string): boolean {
  const cleaned = contact.replace(/[\s-]/g, '')
  return CONTACT_REGEX.test(cleaned)
}

export function sanitizeContact(contact: string): string {
  return contact.replace(/[\s-]/g, '')
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Must contain lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Must contain number')
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Must contain special character (!@#$%^&*)')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.toLowerCase())
}
