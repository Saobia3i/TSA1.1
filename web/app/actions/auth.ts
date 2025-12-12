// app/actions/auth.ts
'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import {
  validateContact,
  sanitizeContact,
  validatePassword,
  validateEmail,
} from '@/lib/validators'

export async function login(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    return { error: 'Email and password required' }
  }

  const trimmedEmail = (email as string).toLowerCase().trim()

  if (!validateEmail(trimmedEmail)) {
    return { error: 'Invalid email format' }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
      select: {
        id: true,
        password: true,
      },
    })

    if (!user || !user.password) {
      return { error: 'Invalid email or password' }
    }

    const passwordMatch = await bcrypt.compare(
      password as string,
      user.password
    )

    if (!passwordMatch) {
      return { error: 'Invalid email or password' }
    }

    return { success: true, email: trimmedEmail }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Invalid email or password' }
  }
}

export async function signup(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const contact = formData.get('contact')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  if (!name || !email || !password || !confirmPassword) {
    return { error: 'All fields required except contact' }
  }

  const trimmedName = (name as string).trim()
  const trimmedEmail = (email as string).toLowerCase().trim()
  const sanitizedContact = contact ? sanitizeContact(contact as string) : null

  if (trimmedName.length < 2) {
    return { error: 'Name must be 2 characters' }
  }

  if (trimmedName.length > 50) {
    return { error: 'Name too long' }
  }

  if (!validateEmail(trimmedEmail)) {
    return { error: 'Invalid email format' }
  }

  if (sanitizedContact && !validateContact(sanitizedContact)) {
    return { error: 'Invalid contact format' }
  }

  const passwordValidation = validatePassword(password as string)
  if (!passwordValidation.isValid) {
    return { error: passwordValidation.errors[0] }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    })

    if (existingEmail) {
      return { error: 'Email already registered' }
    }

    if (sanitizedContact) {
      const existingContact = await prisma.user.findUnique({
        where: { contact: sanitizedContact },
      })

      if (existingContact) {
        return { error: 'Contact already registered' }
      }
    }

    const hashedPassword = await bcrypt.hash(password as string, 12)

    await prisma.user.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        contact: sanitizedContact,
        password: hashedPassword,
        role: 'STUDENT',
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Signup error:', error)

    if (error instanceof Error) {
      const errorMessage = error.message
      if (errorMessage.includes('Unique constraint failed')) {
        if (errorMessage.includes('email')) {
          return { error: 'Email already registered' }
        }
        if (errorMessage.includes('contact')) {
          return { error: 'Contact already registered' }
        }
      }
    }

    return { error: 'Failed to create account' }
  }
}

// ✅ Fixed logout - returns void and redirects
export async function logout(): Promise<void> {
  redirect('/api/auth/signout')
}
