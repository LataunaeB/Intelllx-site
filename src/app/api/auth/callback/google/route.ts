import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    // const state = searchParams.get('state'); // Unused for now

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code not provided' },
        { status: 400 }
      );
    }

    // Create OAuth2 client
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${request.nextUrl.origin}/api/auth/callback/google`
    );

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    
    // Return the access token to the frontend
    return NextResponse.json({
      success: true,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expiry_date,
    });

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate with Google' },
      { status: 500 }
    );
  }
}




