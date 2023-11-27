import { NextResponse } from 'next/server'
import createServerClient from '~/auth/createServerClient'

/**
 *
 * @param {import("next/server").NextRequest} req
 * @returns
 */
export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createServerClient({ req, res })
  await supabase.auth.getSession()
  return res
}