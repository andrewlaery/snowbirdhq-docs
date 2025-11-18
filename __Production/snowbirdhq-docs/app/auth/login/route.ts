import { redirect } from 'next/navigation'

export async function GET() {
  // Permanent redirect from old login route to new signin route
  redirect('/auth/signin')
}