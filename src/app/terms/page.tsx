import { site } from "@/config/site";

export default function Terms() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-indigo-900/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, #3b82f6 1px, transparent 1px),
                            radial-gradient(circle at 80% 80%, #8b5cf6 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0, 50px 50px'
          }}></div>
        </div>
      </div>

      <section className="relative container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Terms of <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <div className="text-slate-300 space-y-3">
                <p>By accessing and using INTELLLX's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <div className="text-slate-300 space-y-3">
                <p>INTELLLX provides AI-powered chatbot development and web development services, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Custom AI chatbot development and deployment</li>
                  <li>Website design and development</li>
                  <li>Consultation and project management services</li>
                  <li>Ongoing support and maintenance</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
              <div className="text-slate-300 space-y-3">
                <p>As a user of our services, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information during consultation and project setup</li>
                  <li>Use our services in compliance with all applicable laws and regulations</li>
                  <li>Not use our services for any illegal or unauthorized purpose</li>
                  <li>Respect intellectual property rights of INTELLLX and third parties</li>
                  <li>Maintain the confidentiality of any login credentials or access codes</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
              <div className="text-slate-300 space-y-3">
                <p><strong>Pricing:</strong> All prices are listed on our website and are subject to change with 30 days notice.</p>
                <p><strong>Payment:</strong> Payment is due upon project commencement or as specified in your service agreement.</p>
                <p><strong>Refunds:</strong> Setup fees are non-refundable as they cover custom development work. Monthly service fees may be refunded on a prorated basis with 30 days notice.</p>
                <p><strong>Late Payments:</strong> Late payments may result in service suspension and additional fees.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <div className="text-slate-300 space-y-3">
                <p><strong>Your Content:</strong> You retain ownership of all content, data, and materials you provide to us.</p>
                <p><strong>Our Work:</strong> Upon full payment, you receive ownership of the custom-developed chatbot and website code created specifically for your project.</p>
                <p><strong>Our Platform:</strong> INTELLLX retains ownership of our proprietary technology, methodologies, and platform infrastructure.</p>
                <p><strong>Third-Party Components:</strong> Some components may be subject to third-party licenses, which we will disclose as applicable.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Service Level Agreement</h2>
              <div className="text-slate-300 space-y-3">
                <p><strong>Availability:</strong> We strive to maintain 99.9% uptime for hosted services, excluding scheduled maintenance.</p>
                <p><strong>Support:</strong> Support is provided during business hours (Monday-Friday, 9 AM - 5 PM EST) via email and scheduled calls.</p>
                <p><strong>Response Times:</strong> We aim to respond to support requests within 24 hours during business days.</p>
                <p><strong>Maintenance:</strong> Scheduled maintenance will be announced with at least 48 hours notice when possible.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <div className="text-slate-300 space-y-3">
                <p>INTELLLX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.</p>
                <p>Our total liability to you for any damages arising from or related to these terms or our services shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Indemnification</h2>
              <div className="text-slate-300 space-y-3">
                <p>You agree to defend, indemnify, and hold harmless INTELLLX and its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your use of our services</li>
                  <li>Your violation of these terms</li>
                  <li>Your violation of any third-party rights</li>
                  <li>Any content you provide to us</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
              <div className="text-slate-300 space-y-3">
                <p><strong>By You:</strong> You may terminate your service with 30 days written notice.</p>
                <p><strong>By Us:</strong> We may terminate your service immediately if you breach these terms or for non-payment.</p>
                <p><strong>Effect of Termination:</strong> Upon termination, your access to services will cease, and you will retain ownership of any custom-developed work for which you have paid in full.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Privacy and Data Protection</h2>
              <div className="text-slate-300 space-y-3">
                <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
              <div className="text-slate-300 space-y-3">
                <p>These terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
              <div className="text-slate-300 space-y-3">
                <p>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page and updating the "Last updated" date.</p>
                <p>Your continued use of our services after any modifications constitutes acceptance of the new terms.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
              <div className="text-slate-300 space-y-3">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p><strong>Email:</strong> <a href={`mailto:${site.email}`} className="text-blue-400 hover:text-blue-300">{site.email}</a></p>
                  <p><strong>Website:</strong> <a href="https://intelllx.com" className="text-blue-400 hover:text-blue-300">intelllx.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
