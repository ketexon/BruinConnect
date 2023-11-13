import createServerClient from "~/auth/createServerClient"
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }
  return NextResponse.redirect(`${requestUrl.origin}/app`)
}