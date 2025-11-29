/**
 * Email Templates for Lead Automation
 * Automated sequences based on lead temperature
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export const emailTemplates = {
  // HOT LEAD - Immediate response
  hotLead: {
    subject: "🚀 Websites + Chatbots that get you booked — let’s talk!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .cta-button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Welcome to INTELLLX!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">You're exactly the type of business we love working with</p>
          </div>
          <div class="content">
            <p>Hi {{name}},</p>
            
            <p>I'm excited you reached out about our services. We build <strong>high-converting websites</strong> and <strong>LeadFlow AI chatbots</strong> that work together to turn visitors into booked meetings.</p>
            
            <div class="highlight">
              <strong>🎯 Here's what we can do for you:</strong>
              <ul>
                <li><strong>Web Development:</strong> Modern, fast, mobile-first websites optimized for conversion (speed, SEO, UX, trust signals)</li>
                <li><strong>AI Chatbots:</strong> Custom conversations that qualify leads, answer questions, and <em>book meetings</em> 24/7</li>
                <li><strong>Integrations:</strong> Google Calendar/Meet, Zoom, HubSpot/Pipedrive, email, and analytics</li>
                <li><strong>Automation:</strong> Instant notifications, automated follow-ups, and lead scoring</li>
              </ul>
            </div>
            
            <p><strong>Next steps:</strong></p>
            <ol>
              <li>Book a 15-minute strategy call</li>
              <li>We'll discuss your specific needs and goals</li>
              <li>I'll create a custom proposal for your business</li>
            </ol>
            
            <div style="text-align: center;">
              <a href="{{calendlyLink}}" class="cta-button">Book Your Strategy Call</a>
            </div>
            
            <p>I typically respond to high-priority inquiries within 2 hours. If you need to reach me directly, reply to this email.</p>
            
            <p>Looking forward to helping you capture more leads!</p>
            
            <p>Best regards,<br>
            <strong>Your INTELLLX Team</strong></p>
          </div>
          <div class="footer">
            <p>This email was sent because you submitted a contact form on intelllx.com</p>
            <p>INTELLLX - Websites and chatbots that simply get you booked.</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to INTELLLX!
      
      Hi {{name}},
      
      I'm excited you reached out. We build high-converting websites and LeadFlow AI chatbots that work together to turn visitors into booked meetings.
      
      Here's what we can do for you:
      • Web Development: Modern, fast, mobile-first websites optimized for conversion (speed, SEO, UX, trust)
      • AI Chatbots: Custom conversations that qualify leads and book meetings 24/7
      • Integrations: Google Calendar/Meet or Zoom, CRM, email, analytics
      • Automation: Instant notifications, automated follow-ups, lead scoring
      
      Next steps:
      1. Book a 15-minute strategy call: {{calendlyLink}}
      2. We'll discuss your specific needs and goals
      3. I'll create a custom proposal for your business
      
      I typically respond to high-priority inquiries like yours within 2 hours. If you need to reach me directly, reply to this email.
      
      Looking forward to helping you capture more leads!
      
      Best regards,
      Your INTELLLX Team
      
      ---
      This email was sent because you submitted a contact form on intelllx.com
      INTELLLX - Websites and chatbots that simply get you booked.
    `
  },

  // WARM LEAD - Nurture sequence
  warmLead: {
    subject: "Thanks for your interest! Websites + chatbots that convert",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .cta-button { display: inline-block; background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .resources { background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Thanks for reaching out!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Let me share some valuable resources with you</p>
          </div>
          <div class="content">
            <p>Hi {{name}},</p>
            
            <p>Thank you for your interest in INTELLLX! We help businesses grow with <strong>conversion-focused websites</strong> and <strong>LeadFlow AI chatbots</strong>.</p>
            
            <p>Here are a few helpful resources to see how we think about growth and conversions:</p>
            
            <div class="resources">
              <h3>📚 Free Resources:</h3>
              <ul>
                <li><a href="https://intelllx.com/resources/lead-leakage-calculator">Lead Leakage Calculator</a> - See how much revenue you're losing</li>
                <li><a href="https://intelllx.com/resources/leadflow-vs-generic">LeadFlow vs Generic Chatbots</a> - Why custom AI works better</li>
                <li><a href="https://intelllx.com/resources/5-critical-questions">5 Questions Your Chatbot Should Answer</a> - Essential guide</li>
              </ul>
            </div>
            
            <p><strong>What makes INTELLLX different:</strong></p>
            <ul>
              <li>✅ <strong>Websites that convert:</strong> Clear messaging, speed, SEO, trust, and UX that drives action</li>
              <li>✅ <strong>AI chatbots that book meetings:</strong> Qualification, answers, and calendar booking 24/7</li>
              <li>✅ <strong>Professional setup included:</strong> We do it for you, end-to-end</li>
              <li>✅ <strong>Automation + analytics:</strong> Follow-ups, notifications, and insight into what’s working</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="{{calendlyLink}}" class="cta-button">Schedule a Free Consultation</a>
            </div>
            
            <p>I'll send you a follow-up email with tactical tips on improving both website conversion and AI-driven lead capture.</p>
            
            <p>Feel free to reply with any questions!</p>
            
            <p>Best regards,<br>
            <strong>Your INTELLLX Team</strong></p>
          </div>
          <div class="footer">
            <p>This email was sent because you submitted a contact form on intelllx.com</p>
            <p>INTELLLX - Websites and chatbots that simply get you booked.</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Thanks for reaching out!
      
      Hi {{name}},
      
      Thanks for your interest in INTELLLX! We help businesses grow with conversion-focused websites and LeadFlow AI chatbots.
      
      Here are a few resources to get you started:
      
      Free Resources:
      • Lead Leakage Calculator: https://intelllx.com/resources/lead-leakage-calculator
      • LeadFlow vs Generic Chatbots: https://intelllx.com/resources/leadflow-vs-generic
      • 5 Questions Your Chatbot Should Answer: https://intelllx.com/resources/5-critical-questions
      
      What makes INTELLLX different:
      ✅ Websites that convert (speed, SEO, UX, trust)
      ✅ AI chatbots that qualify and book meetings 24/7
      ✅ Professional setup done for you
      ✅ Automation + analytics baked in
      
      Schedule a Free Consultation: {{calendlyLink}}
      
      I’ll follow up with practical tips to boost conversions via your website and AI automation.
      
      Feel free to reply with any questions!
      
      Best regards,
      Your INTELLLX Team
      
      ---
      This email was sent because you submitted a contact form on intelllx.com
      INTELLLX - Websites and chatbots that simply get you booked.
    `
  },

  // COLD LEAD - Nurture content
  coldLead: {
    subject: "Welcome! Websites + chatbots that actually convert",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .cta-button { display: inline-block; background: #6366f1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .tip-box { background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Welcome to INTELLLX!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Let's explore how AI can grow your business</p>
          </div>
          <div class="content">
            <p>Hi {{name}},</p>
            
            <p>Welcome to INTELLLX! We build <strong>conversion-focused websites</strong> and <strong>LeadFlow AI chatbots</strong> so your visitors turn into booked meetings.</p>
            
            <p>Here’s how each helps:</p>
            
            <div class="tip-box">
              <h3>💡 AI Chatbot Benefits:</h3>
              <ul>
                <li><strong>24/7 Lead Capture:</strong> Never miss another opportunity</li>
                <li><strong>Instant Qualification:</strong> Only book calls with serious prospects</li>
                <li><strong>Automated Follow-up:</strong> Nurture leads while you sleep</li>
                <li><strong>Brand Consistency:</strong> Every interaction reflects your quality</li>
              </ul>
            </div>
            
            <div class="tip-box" style="border-left-color:#22c55e;">
              <h3>💡 Website Benefits:</h3>
              <ul>
                <li><strong>Conversion-first Design:</strong> Clear messaging and trust signals</li>
                <li><strong>Speed + SEO:</strong> Fast loads and structure that ranks</li>
                <li><strong>Mobile-first UX:</strong> Smooth experience on every device</li>
                <li><strong>Analytics:</strong> See what’s working and where to optimize</li>
              </ul>
            </div>
            
            <p><strong>Here's what I recommend:</strong></p>
            <ol>
              <li>Check your <a href="https://intelllx.com/resources/lead-leakage-calculator">Lead Leakage</a> — see potential revenue left on the table</li>
              <li>Read <a href="https://intelllx.com/resources/leadflow-vs-generic">LeadFlow vs Generic</a> — why custom AI converts better</li>
              <li>When you're ready, <a href="{{calendlyLink}}">schedule a free consultation</a></li>
            </ol>
            
            <p>I’ll send simple, practical tips to improve both your website conversion and AI automation over the next few weeks.</p>
            
            <div style="text-align: center;">
              <a href="{{calendlyLink}}" class="cta-button">Learn More</a>
            </div>
            
            <p>Feel free to reply with any questions!</p>
            
            <p>Best regards,<br>
            <strong>Your INTELLLX Team</strong></p>
          </div>
          <div class="footer">
            <p>This email was sent because you submitted a contact form on intelllx.com</p>
            <p>INTELLLX - Websites and chatbots that simply get you booked.</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to INTELLLX!
      
      Hi {{name}},
      
      Welcome to INTELLLX! We build conversion-focused websites and LeadFlow AI chatbots so your visitors turn into booked meetings.
      
      How each helps:
      
      AI Chatbot Benefits:
      • 24/7 Lead Capture: Never miss another opportunity
      • Instant Qualification: Only book calls with serious prospects
      • Automated Follow-up: Nurture leads while you sleep
      • Brand Consistency: Every interaction reflects your quality
      
      Website Benefits:
      • Conversion-first design (messaging, trust, CTAs)
      • Speed + SEO to rank and load fast
      • Mobile-first UX on every device
      • Analytics to see what works
      
      Here's what I recommend:
      1. Check out our Lead Leakage Calculator: https://intelllx.com/resources/lead-leakage-calculator
      2. Read our comparison guide: https://intelllx.com/resources/leadflow-vs-generic
      3. When you're ready, schedule a free consultation: {{calendlyLink}}
      
      I’ll send useful tips on improving both your website and AI capture over the next few weeks.
      
      Learn More: {{calendlyLink}}
      
      Feel free to reply with any questions!
      
      Best regards,
      Your INTELLLX Team
      
      ---
      This email was sent because you submitted a contact form on intelllx.com
      INTELLLX - Websites and chatbots that simply get you booked.
    `
  },

  // STYLIST SPECIFIC TEMPLATES
  stylistWelcome: {
    subject: "✨ Welcome! Your Stylist AI Booking System Discovery Call",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #06B6D4 0%, #6D28D9 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .highlight { background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Your Stylist AI Booking System</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Let's get your chair fully booked</p>
          </div>
          <div class="content">
            <p>Hi {{name}},</p>
            
            <p>I'm excited you're interested in the <strong>Stylist AI Booking System</strong>! This is exactly what you need to stop losing clients in your DMs and get fully booked on autopilot.</p>
            
            <div class="highlight">
              <strong>💇🏽‍♀️ What You're Getting:</strong>
              <ul>
                <li><strong>Custom booking site</strong> - One beautiful page that matches your brand</li>
                <li><strong>AI DM assistant</strong> - Replies instantly, 24/7, handles bookings automatically</li>
                <li><strong>Booking app integration</strong> - Connects to your existing system</li>
                <li><strong>30 days support</strong> - I'll help you launch and optimize</li>
              </ul>
            </div>
            
            <p><strong>Founder Offer: $497</strong> (Regular price: $1,497)</p>
            <p>This is a limited founding stylist price while I build case studies. You're getting the full system at a fraction of the cost.</p>
            
            <p><strong>What happens next:</strong></p>
            <ol>
              <li>I'll review your details and Instagram</li>
              <li>We'll schedule your discovery call (if you haven't already)</li>
              <li>I'll build your custom system around how you actually work</li>
              <li>You add your link to Instagram and start booking automatically</li>
            </ol>
            
            <p>I'll follow up within 24 hours with next steps. If you have questions before then, just reply to this email.</p>
            
            <p>Looking forward to helping you get fully booked!</p>
            
            <p>Best,<br>
            <strong>LaTaunae</strong><br>
            INTELLLX - AI Booking Systems for Stylists</p>
          </div>
          <div class="footer">
            <p>This email was sent because you submitted a stylist inquiry on intelllx.com/stylists</p>
            <p>INTELLLX - AI booking systems for beauty and service pros.</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to Your Stylist AI Booking System
      
      Hi {{name}},
      
      I'm excited you're interested in the Stylist AI Booking System! This is exactly what you need to stop losing clients in your DMs and get fully booked on autopilot.
      
      What You're Getting:
      • Custom booking site - One beautiful page that matches your brand
      • AI DM assistant - Replies instantly, 24/7, handles bookings automatically
      • Booking app integration - Connects to your existing system
      • 30 days support - I'll help you launch and optimize
      
      Founder Offer: $497 (Regular price: $1,497)
      This is a limited founding stylist price while I build case studies.
      
      What happens next:
      1. I'll review your details and Instagram
      2. We'll schedule your discovery call (if you haven't already)
      3. I'll build your custom system around how you actually work
      4. You add your link to Instagram and start booking automatically
      
      I'll follow up within 24 hours with next steps. If you have questions, just reply to this email.
      
      Looking forward to helping you get fully booked!
      
      Best,
      LaTaunae
      INTELLLX - AI Booking Systems for Stylists
      
      ---
      This email was sent because you submitted a stylist inquiry on intelllx.com/stylists
      INTELLLX - AI booking systems for beauty and service pros.
    `
  }
};

/**
 * Replace template variables with actual values
 */
export function processEmailTemplate(template: EmailTemplate, variables: Record<string, string>): EmailTemplate {
  const processText = (text: string): string => {
    let processed = text;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(regex, value);
    });
    return processed;
  };

  return {
    subject: processText(template.subject),
    html: processText(template.html),
    text: processText(template.text)
  };
}













