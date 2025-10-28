"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, User, Building, MessageSquare, Calendar, ExternalLink } from "lucide-react";
import { trackEvent, trackConversion } from "@/components/GoogleAnalytics";
import { site } from "@/config/site";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
}

interface FieldState {
  touched: boolean;
  valid: boolean;
  focused: boolean;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });
  
  const [fieldStates, setFieldStates] = useState<Record<keyof FormData, FieldState>>({
    name: { touched: false, valid: false, focused: false },
    email: { touched: false, valid: false, focused: false },
    company: { touched: false, valid: false, focused: false },
    service: { touched: false, valid: false, focused: false },
    message: { touched: false, valid: false, focused: false },
    preferredDate: { touched: false, valid: false, focused: false },
    preferredTime: { touched: false, valid: false, focused: false }
  });
  
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Real-time validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: keyof FormData, value: string): boolean => {
    switch (name) {
      case 'name':
        return value.trim().length >= 2;
      case 'email':
        return validateEmail(value);
      case 'company':
        return value.trim().length >= 2;
      case 'service':
        return value.trim().length >= 2;
      case 'message':
        return value.trim().length >= 10;
      default:
        return true;
    }
  };

  const getErrorMessage = (name: keyof FormData): string => {
    switch (name) {
      case 'name':
        return 'Name must be at least 2 characters';
      case 'email':
        return 'Please enter a valid email address';
      case 'company':
        return 'Company name must be at least 2 characters';
      case 'service':
        return 'Please select a service';
      case 'message':
        return 'Message must be at least 10 characters';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Real-time validation
    const isValid = validateField(fieldName, value);
    const errorMessage = isValid ? '' : getErrorMessage(fieldName);
    
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        valid: isValid
      }
    }));
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
  };

  const handleFieldFocus = (fieldName: keyof FormData) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        focused: true
      }
    }));
  };

  const handleFieldBlur = (fieldName: keyof FormData) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        touched: true,
        focused: false
      }
    }));
  };

  const isFormValid = (): boolean => {
    return Object.keys(formData).every(key => {
      const fieldName = key as keyof FormData;
      return validateField(fieldName, formData[fieldName]);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || !isFormValid()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: '', // Phone field was removed, keeping for API compatibility
          company: formData.company,
          service: formData.service,
          message: formData.message,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          source: 'contact_form',
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.ok) {
        setSubmitStatus('success');
        setShowSuccessAnimation(true);
        
        // Track conversion in GA4
        trackEvent('form_submit', {
          form_name: 'contact_form',
          service_interest: formData.service,
          company: formData.company,
          lead_source: 'website_contact',
        });
        
        trackConversion('contact_form_submission', undefined, 'USD');
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            service: '',
            message: '',
            preferredDate: '',
            preferredTime: ''
          });
          setFieldStates({
            name: { touched: false, valid: false, focused: false },
            email: { touched: false, valid: false, focused: false },
            company: { touched: false, valid: false, focused: false },
            service: { touched: false, valid: false, focused: false },
            message: { touched: false, valid: false, focused: false },
            preferredDate: { touched: false, valid: false, focused: false },
            preferredTime: { touched: false, valid: false, focused: false }
          });
          setErrors({});
          setShowSuccessAnimation(false);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClassName = (fieldName: keyof FormData): string => {
    const field = fieldStates[fieldName];
    const hasError = errors[fieldName];
    
    let baseClasses = "w-full px-4 py-3 border rounded-xl text-base text-gray-900 bg-white focus:outline-none transition-all duration-200 min-h-[48px]";
    
    if (hasError && field.touched) {
      baseClasses += " border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500";
    } else if (field.valid && field.touched) {
      baseClasses += " border-green-500 focus:ring-2 focus:ring-green-500 focus:border-green-500";
    } else if (field.focused) {
      baseClasses += " border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    } else {
      baseClasses += " border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    }
    
    return baseClasses;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/15 to-purple-900/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Let&apos;s <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Build Together</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Ready to transform your business with AI? Let&apos;s discuss your project and create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Have a project in mind? Let&apos;s discuss how we can help you achieve your goals with custom AI solutions.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-300">hello@intelllx.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <p className="text-gray-300">Remote & Global</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Response Time
                </h3>
                <p className="text-gray-300 text-sm">
                  We typically respond within 24 hours. For urgent inquiries, please mention it in your message.
                </p>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus('name')}
                      onBlur={() => handleFieldBlur('name')}
                      className={`${getFieldClassName('name')} pl-12`}
                      placeholder="Enter your full name"
                      required
                    />
                    {fieldStates.name.valid && fieldStates.name.touched && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.name && fieldStates.name.touched && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus('email')}
                      onBlur={() => handleFieldBlur('email')}
                      className={`${getFieldClassName('email')} pl-12`}
                      placeholder="Enter your email address"
                      required
                    />
                    {fieldStates.email.valid && fieldStates.email.touched && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.email && fieldStates.email.touched && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Company Field */}
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium text-white">
                    Company *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus('company')}
                      onBlur={() => handleFieldBlur('company')}
                      className={`${getFieldClassName('company')} pl-12`}
                      placeholder="Enter your company name"
                      required
                    />
                    {fieldStates.company.valid && fieldStates.company.touched && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.company && fieldStates.company.touched && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Service Field */}
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-white">
                    Service Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus('service')}
                    onBlur={() => handleFieldBlur('service')}
                    className={getFieldClassName('service')}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="leadflow-chatbot">LeadFlow Chatbot</option>
                    <option value="website-development">Website Development</option>
                    <option value="both">Both Services</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.service && fieldStates.service.touched && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-white">
                    Project Details *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => handleFieldFocus('message')}
                      onBlur={() => handleFieldBlur('message')}
                      className={`${getFieldClassName('message')} pl-12 pt-3 min-h-[120px] resize-none`}
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      required
                    />
                    {fieldStates.message.valid && fieldStates.message.touched && (
                      <CheckCircle className="absolute right-3 top-4 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.message && fieldStates.message.touched && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Optional Booking Fields */}
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <label className="block text-sm font-medium text-white mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Book Your Discovery Call
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="preferredDate" className="block text-xs text-gray-300 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-xs text-gray-300 mb-1">Preferred Time (PST)</label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Available: Monday-Friday, 9am-6pm PST. Select your preferred time and we'll send you a Calendly link to confirm.</p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  loading={isSubmitting}
                  className="w-full py-4 text-lg font-semibold"
                  icon={<Send className="w-5 h-5" />}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className={`p-4 bg-green-500/20 border border-green-500/30 rounded-xl transition-all duration-500 ${showSuccessAnimation ? 'animate-pulse' : ''}`}>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <div>
                        <h3 className="text-green-400 font-semibold">Message Sent!</h3>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                      <div>
                        <h3 className="text-red-400 font-semibold">Something went wrong</h3>
                        <p className="text-red-300 text-sm">Please try again or email us directly at hello@intelllx.com</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}