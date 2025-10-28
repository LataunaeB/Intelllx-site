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
    subject: "🚀 Ready to transform your business? Let's talk!",
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
            
            <p>I'm excited you reached out about our LeadFlow chatbot service! Based on your inquiry, I can tell you're serious about growing your business with AI.</p>
            
            <div class="highlight">
              <strong>🎯 Here's what I can do for you:</strong>
              <ul>
                <li>Design a custom AI conversation that matches your brand</li>
                <li>Set up automated lead capture and calendar booking</li>
                <li>Integrate with your existing CRM and tools</li>
                <li>Provide ongoing optimization and support</li>
              </ul>
            </div>
            
            <p><strong>Next steps:</strong></p>
            <ol>
              <li>Book a 15-minute strategy call (I'll send you the link)</li>
              <li>We'll discuss your specific needs and goals</li>
              <li>I'll create a custom proposal for your business</li>
            </ol>
            
            <div style="text-align: center;">
              <a href="{{calendlyLink}}" class="cta-button">Book Your Strategy Call</a>
            </div>
            
            <p>I typically respond to high-priority inquiries like yours within 2 hours. If you need to reach me directly, reply to this email.</p>
            
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
      
      I'm excited you reached out about our LeadFlow chatbot service! Based on your inquiry, I can tell you're serious about growing your business with AI.
      
      Here's what I can do for you:
      • Design a custom AI conversation that matches your brand
      • Set up automated lead capture and calendar booking
      • Integrate with your existing CRM and tools
      • Provide ongoing optimization and support
      
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
    subject: "Thanks for your interest! Here's how we can help...",
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
            
            <p>Thank you for your interest in INTELLLX! I appreciate you taking the time to reach out.</p>
            
            <p>I've helped dozens of businesses like yours capture more leads and grow their revenue with AI chatbots. Here are some resources that might be helpful:</p>
            
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
              <li>✅ Custom AI conversations tailored to your business</li>
              <li>✅ Professional setup included (no technical work for you)</li>
              <li>✅ Automated lead capture and calendar booking</li>
              <li>✅ Ongoing optimization and support</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="{{calendlyLink}}" class="cta-button">Schedule a Free Consultation</a>
            </div>
            
            <p>I'll send you a follow-up email in a few days with more insights about AI chatbots for businesses like yours.</p>
            
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
      
      Thank you for your interest in INTELLLX! I appreciate you taking the time to reach out.
      
      I've helped dozens of businesses like yours capture more leads and grow their revenue with AI chatbots. Here are some resources that might be helpful:
      
      Free Resources:
      • Lead Leakage Calculator: https://intelllx.com/resources/lead-leakage-calculator
      • LeadFlow vs Generic Chatbots: https://intelllx.com/resources/leadflow-vs-generic
      • 5 Questions Your Chatbot Should Answer: https://intelllx.com/resources/5-critical-questions
      
      What makes INTELLLX different:
      ✅ Custom AI conversations tailored to your business
      ✅ Professional setup included (no technical work for you)
      ✅ Automated lead capture and calendar booking
      ✅ Ongoing optimization and support
      
      Schedule a Free Consultation: {{calendlyLink}}
      
      I'll send you a follow-up email in a few days with more insights about AI chatbots for businesses like yours.
      
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
    subject: "Welcome! Here's how AI chatbots can grow your business",
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
            
            <p>Welcome to INTELLLX! Thanks for your interest in our services.</p>
            
            <p>Did you know that businesses using AI chatbots see an average of <strong>3-5x more qualified leads</strong>? Here's why:</p>
            
            <div class="tip-box">
              <h3>💡 AI Chatbot Benefits:</h3>
              <ul>
                <li><strong>24/7 Lead Capture:</strong> Never miss another opportunity</li>
                <li><strong>Instant Qualification:</strong> Only book calls with serious prospects</li>
                <li><strong>Automated Follow-up:</strong> Nurture leads while you sleep</li>
                <li><strong>Brand Consistency:</strong> Every interaction reflects your quality</li>
              </ul>
            </div>
            
            <p><strong>Here's what I recommend:</strong></p>
            <ol>
              <li>Check out our <a href="https://intelllx.com/resources/lead-leakage-calculator">Lead Leakage Calculator</a> to see your potential revenue loss</li>
              <li>Read our <a href="https://intelllx.com/resources/leadflow-vs-generic">comparison guide</a> to understand why custom AI works better</li>
              <li>When you're ready, <a href="{{calendlyLink}}">schedule a free consultation</a></li>
            </ol>
            
            <p>I'll send you valuable tips and insights about AI chatbots over the next few weeks. No pressure, just helpful content!</p>
            
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
      
      Welcome to INTELLLX! Thanks for your interest in our services.
      
      Did you know that businesses using AI chatbots see an average of 3-5x more qualified leads? Here's why:
      
      AI Chatbot Benefits:
      • 24/7 Lead Capture: Never miss another opportunity
      • Instant Qualification: Only book calls with serious prospects
      • Automated Follow-up: Nurture leads while you sleep
      • Brand Consistency: Every interaction reflects your quality
      
      Here's what I recommend:
      1. Check out our Lead Leakage Calculator: https://intelllx.com/resources/lead-leakage-calculator
      2. Read our comparison guide: https://intelllx.com/resources/leadflow-vs-generic
      3. When you're ready, schedule a free consultation: {{calendlyLink}}
      
      I'll send you valuable tips and insights about AI chatbots over the next few weeks. No pressure, just helpful content!
      
      Learn More: {{calendlyLink}}
      
      Feel free to reply with any questions!
      
      Best regards,
      Your INTELLLX Team
      
      ---
      This email was sent because you submitted a contact form on intelllx.com
      INTELLLX - Websites and chatbots that simply get you booked.
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












