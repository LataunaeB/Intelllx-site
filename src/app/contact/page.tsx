"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import HubSpotForm from "@/components/HubSpotForm";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Hero Section */}
      <section className="relative container-max section-padding">
        <div className="text-center">
          {/* Eyebrow Label */}
          <div className="eyebrow-label mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[--accent]"></span>
            <span>Get in Touch</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="text-white">Let&apos;s Build</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
            Ready to transform your business with AI? Let&apos;s discuss how we can help you achieve your goals.
          </p>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/contact/contact-hero.jpg"
                alt="Contact Us - Let's build something amazing together"
                width={1000}
                height={500}
                className="w-full h-auto transition-all duration-700 group-hover:scale-105"
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="card p-12">
              <h2 className="text-4xl font-black text-white mb-8">Send us a Message</h2>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed font-medium">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-8 p-6 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-green-300 font-medium">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 p-6 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-300 font-medium">Sorry, there was an error sending your message. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-white mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-white mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="leadflow-chatbot">LeadFlow Chatbot</option>
                    <option value="website-development">Website Development</option>
                    <option value="both-services">Both Services</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project and how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  icon={<Send className="w-5 h-5" />}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
                <p className="text-lg text-gray-300 leading-relaxed font-medium mb-8">
                  We&apos;re here to help you succeed. Reach out to us through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Email Us</h4>
                    <p className="text-gray-300 mb-1">hello@intelllx.com</p>
                    <p className="text-gray-400 text-sm">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Book a Call</h4>
                    <p className="text-gray-300 mb-1">Schedule a discovery call</p>
                    <p className="text-gray-400 text-sm">30-minute consultation</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Business Hours</h4>
                    <p className="text-gray-300 mb-1">Monday - Friday: 9 AM - 6 PM PST</p>
                    <p className="text-gray-400 text-sm">Weekend support available</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card p-6">
                <h4 className="text-xl font-bold text-white mb-4">Quick Actions</h4>
                <div>
                  <Link
                    href="/pricing"
                    className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl text-center hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HubSpot Form Integration Section */}
      {process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID && (
        <section className="relative section-padding">
          <div className="container-max">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="eyebrow-label mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[--accent]"></span>
                  <span>Alternative Contact Method</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  HubSpot <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Contact Form</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed font-medium">
                  You can also reach us using our HubSpot form below
                </p>
              </div>

              <div className="card p-8">
                <HubSpotForm
                  formId={process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID}
                  onSubmit={() => {
                    console.log('HubSpot form submitted!');
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Instructions Section (shown when form ID not configured) */}
      {!process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID && (
        <section className="relative section-padding">
          <div className="container-max">
            <div className="max-w-3xl mx-auto">
              <div className="card p-8 bg-blue-500/10 border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-blue-400" />
                  HubSpot Form Not Configured
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  To enable the HubSpot contact form on this page:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-4">
                  <li>Create a form in HubSpot (Marketing → Lead Capture → Forms)</li>
                  <li>Copy the Form ID (GUID) from the form settings</li>
                  <li>Add it to your <code className="bg-white/10 px-2 py-1 rounded text-blue-300">.env.local</code>:</li>
                </ol>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-white/10 mb-4">
                  <code className="text-green-400 text-sm">
                    NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID=your-form-guid-here
                  </code>
                </div>
                <p className="text-gray-400 text-sm">
                  The form will automatically appear on this page once configured. See <code className="bg-white/10 px-1 py-0.5 rounded">.env.local.example</code> for more details.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-medium">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly can you get started?",
                answer: "We typically begin projects within 1-2 weeks of contract signing. LeadFlow Chatbot setup takes 1-2 weeks, while website development ranges from 2-8 weeks depending on complexity."
              },
              {
                question: "Do you offer ongoing support?",
                answer: "Yes! We provide comprehensive support for all our services. LeadFlow Chatbot includes 7 hours of monthly support, and we offer maintenance packages for websites."
              },
              {
                question: "Can you work with my existing systems?",
                answer: "Absolutely! We integrate with most CRM systems, calendar applications, and existing business tools. We'll work with your current setup to ensure seamless integration."
              },
              {
                question: "What makes you different from competitors?",
                answer: "We focus on real business results, not just technology. Our solutions are designed specifically for lead generation and conversion, with transparent pricing and ongoing optimization."
              }
            ].map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed font-medium">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}