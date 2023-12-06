import createServerClient from "~/auth/createServerClient"
import { NextResponse } from 'next/server'
import origin from "~/origin";

import { AuthError } from "@supabase/supabase-js";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next');

  if (code) {
    const supabase = createServerClient({ allowWriteCookies: true });
    try {
      await supabase.auth.exchangeCodeForSession(code);
    }
    catch(e){
      const error =
        encodeURIComponent(
          e instanceof AuthError
            ? e.message
            : "Unknown internal error"
        )
      return NextResponse.redirect(next ? `${next}?error=${error}` : `${origin}/signup?error=${error}`);
    }
  }

  return NextResponse.redirect(next ?? `${origin}/app`)
}