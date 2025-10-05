import { site } from "@/config/site";

export default function Privacy() {
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
              Privacy <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <div className="text-slate-300 space-y-3">
                <p><strong>Personal Information:</strong> When you book a consultation or contact us, we collect your name, email address, phone number, and company information.</p>
                <p><strong>Usage Data:</strong> We collect information about how you interact with our website, including pages visited, time spent, and device information.</p>
                <p><strong>Communication Data:</strong> We store records of our communications with you, including emails and consultation notes.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <div className="text-slate-300 space-y-3">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and improve our AI chatbot and web development services</li>
                  <li>Communicate with you about your projects and consultations</li>
                  <li>Process payments and manage your account</li>
                  <li>Send you important updates about our services</li>
                  <li>Analyze website usage to improve user experience</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
              <div className="text-slate-300 space-y-3">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in these circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <div className="text-slate-300 space-y-3">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure hosting with industry-standard security protocols</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
              <div className="text-slate-300 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Object to processing of your information</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
              <div className="text-slate-300 space-y-3">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve website functionality and user experience</li>
                </ul>
                <p>You can control cookie settings through your browser preferences.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
              <div className="text-slate-300 space-y-3">
                <p>We use third-party services that may collect information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Stripe:</strong> Payment processing (see Stripe&apos;s privacy policy)</li>
                  <li><strong>Calendly:</strong> Appointment scheduling (see Calendly&apos;s privacy policy)</li>
                  <li><strong>Google Analytics:</strong> Website analytics (see Google&apos;s privacy policy)</li>
                  <li><strong>Email Services:</strong> Communication and notifications</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
              <div className="text-slate-300 space-y-3">
                <p>We retain your personal information only as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide our services to you</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                </ul>
                <p>When we no longer need your information, we will securely delete or anonymize it.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Transfers</h2>
              <div className="text-slate-300 space-y-3">
                <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <div className="text-slate-300 space-y-3">
                <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <div className="text-slate-300 space-y-3">
                <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
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
