// app/actions/auth.ts
'use server';

import { signIn, signOut } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function login(formData: FormData): Promise<void> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    redirect('/login?error=please enter email and password');
  }

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      redirect('/login?error=Invalid credentials');
    }

    // Success
    redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          redirect('/login?error=Invalid credentials');
        default:
          redirect('/login?error=Something went wrong');
      }
    }
    throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: '/' });
}

export async function signup(formData: FormData): Promise<void> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    redirect('/signup?error=All fields are required');
  }

  // Your signup logic here
  // After successful signup:
  redirect('/login?success=Account created successfully');
}
