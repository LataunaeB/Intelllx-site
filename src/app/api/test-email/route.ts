import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * Diagnostic endpoint to test email configuration
 * Visit: /api/test-email to see configuration status
 */
export async function GET(request: NextRequest) {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: 'production',
    config: {},
    test: {},
    error: null
  };

  try {
    // Check environment variables
    diagnostics.config = {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 8)}...` : 'MISSING',
      RESEND_FROM: process.env.RESEND_FROM || 'NOT SET',
      RESEND_TO: process.env.RESEND_TO || 'NOT SET',
      EMAIL_FROM: process.env.EMAIL_FROM || 'NOT SET',
      EMAIL_TO: process.env.EMAIL_TO || 'NOT SET',
      hasApiKey: !!process.env.RESEND_API_KEY
    };

    // Try to send a test email
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM || process.env.EMAIL_FROM || 'leads@intelllx.com';
      const to = process.env.RESEND_TO || process.env.EMAIL_TO || 'hello@intelllx.com';

      try {
        const result = await resend.emails.send({
          from: from,
          to: to,
          subject: 'Test Email from Intelllx Diagnostic',
          html: `
            <h1>Test Email</h1>
            <p>This is a diagnostic test email from your Intelllx website.</p>
            <p>If you receive this, email sending is working correctly!</p>
            <p>Sent at: ${new Date().toLocaleString('en-US')}</p>
          `
        });

        diagnostics.test = {
          status: 'SUCCESS',
          from: from,
          to: to,
          emailId: result.id,
          message: 'Email sent successfully! Check your inbox at ' + to
        };
      } catch (emailError: any) {
        diagnostics.test = {
          status: 'FAILED',
          from: from,
          to: to,
          error: emailError.message,
          errorType: emailError.name,
          errorDetails: emailError.toString()
        };
        diagnostics.error = emailError.message;
      }
    } else {
      diagnostics.test = {
        status: 'SKIPPED',
        reason: 'RESEND_API_KEY not configured'
      };
      diagnostics.error = 'RESEND_API_KEY environment variable is missing';
    }

    return NextResponse.json(diagnostics, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error: any) {
    return NextResponse.json({
      ...diagnostics,
      error: error.message,
      errorType: error.name
    }, { status: 500 });
  }
}

