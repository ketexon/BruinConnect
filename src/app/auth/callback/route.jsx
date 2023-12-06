import createServerClient from "~/auth/createServerClient"
import { NextResponse } from 'next/server'
import origin from "~/origin";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next');

  if (code) {
    const supabase = createServerClient({ allowWriteCookies: true });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(next ?? `${origin}/app`)
}