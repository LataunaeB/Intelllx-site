import { NextRequest, NextResponse } from 'next/server';
import { generateGoogleAuthUrl } from '@/lib/google-auth';

export async function GET(request: NextRequest) {
  try {
    const redirectUri = `${request.nextUrl.origin}/api/auth/callback/google`;
    const authUrl = generateGoogleAuthUrl(redirectUri, 'calendar-booking');
    
    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Google auth URL generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate Google auth URL' },
      { status: 500 }
    );
  }
}