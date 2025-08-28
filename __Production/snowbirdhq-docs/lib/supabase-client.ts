import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  // Use hardcoded values if env vars are missing (temporary fix for production)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sosefomtzqvpyzojlckh.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc2Vmb210enF2cHl6b2psY2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMTg3NDcsImV4cCI6MjA3MTg5NDc0N30.XuTALvh6SAKfySzRO2xNGxeLTOLjjzMyms-cw7-r0Es'
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase configuration missing')
    return null as unknown as ReturnType<typeof createSupabaseClient>
  }

  // Validate URL format
  try {
    new URL(supabaseUrl)
  } catch (error) {
    console.error('Invalid Supabase URL:', supabaseUrl)
    return null as unknown as ReturnType<typeof createSupabaseClient>
  }
  
  try {
    return createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    return null as unknown as ReturnType<typeof createSupabaseClient>
  }
}