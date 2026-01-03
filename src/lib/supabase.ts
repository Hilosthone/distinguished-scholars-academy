import { createClient } from '@supabase/supabase-js'

/**
 * This file initializes the Supabase client.
 * We use 'NEXT_PUBLIC_' variables so that the browser
 * can access them during the signup/login process.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Safeguard: This will alert you in the browser console if your keys aren't loading
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase Environment Variables! Check your .env.local file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
