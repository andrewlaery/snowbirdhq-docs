import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface UserProfile {
  id: string
  email: string
  role: 'guest' | 'staff' | 'admin' | 'owner'
  property_access?: string[] // Array of property slugs
  created_at: string
  updated_at: string
}

export interface GuestToken {
  id: string
  token: string
  property_slug: string
  guest_email: string
  expires_at: string
  booking_reference?: string
  created_at: string
  is_active: boolean
}

export interface PropertyAccess {
  user_id: string
  property_slug: string
  access_level: 'read' | 'write' | 'admin'
  granted_by: string
  granted_at: string
  expires_at?: string
}