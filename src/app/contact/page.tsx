"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import BookingCalendar from "@/components/BookingCalendar";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, User, Building, MessageSquare, Calendar, ExternalLink, Sparkles, X, Phone } from "lucide-react";
import { trackEvent, trackConversion } from "@/components/GoogleAnalytics";
import { site } from "@/config/site";

interface TimeSlot {
  startTime: string;
  endTime: string;
  date: string;
  time: string;
  displayDate: string;
  displayTime: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
}

interface FieldState {
  touched: boolean;
  valid: boolean;
  focused: boolean;
}

export default function Contact() {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingFormData, setBookingFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [fieldStates, setFieldStates] = useState<Record<keyof BookingFormData, FieldState>>({
    name: { touched: false, valid: false, focused: false },
    email: { touched: false, valid: false, focused: false },
    phone: { touched: false, valid: false, focused: false },
    company: { touched: false, valid: false, focused: false },
    service: { touched: false, valid: false, focused: false },
    message: { touched: false, valid: false, focused: false }
  });
  
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [bookingError, setBookingError] = useState<string>('');
  const [bookingResult, setBookingResult] = useState<{
    meetingLink?: string;
    calendarLink?: string;
    eventId?: string;
  } | null>(null);

  // Real-time validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digits for validation
    const digitsOnly = phone.replace(/\D/g, '');
    // Valid if has at least 10 digits (US format minimum)
    return digitsOnly.length >= 10;
  };

  const validateField = (name: keyof BookingFormData, value: string): boolean => {
    switch (name) {
      case 'name':
        return value.trim().length >= 2;
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
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

  const getErrorMessage = (name: keyof BookingFormData): string => {
    switch (name) {
      case 'name':
        return 'Name must be at least 2 characters';
      case 'email':
        return 'Please enter a valid email address';
      case 'phone':
        return 'Please enter a valid phone number (at least 10 digits)';
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
    const fieldName = name as keyof BookingFormData;
    
    setBookingFormData(prev => ({ ...prev, [fieldName]: value }));
    
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

  const handleFieldFocus = (fieldName: keyof BookingFormData) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        focused: true
      }
    }));
  };

  const handleFieldBlur = (fieldName: keyof BookingFormData) => {
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
    return validateField('name', bookingFormData.name) &&
           validateField('email', bookingFormData.email) &&
           validateField('phone', bookingFormData.phone) &&
           validateField('company', bookingFormData.company) &&
           validateField('service', bookingFormData.service) &&
           validateField('message', bookingFormData.message);
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBooking || !isFormValid() || !selectedSlot) return;
    
    setIsBooking(true);
    setBookingStatus('idle');
    
    try {
      // 1. Save lead to Supabase and send notification
      const leadResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: bookingFormData.email,
          name: bookingFormData.name,
          phone: bookingFormData.phone,
          company: bookingFormData.company,
          service: bookingFormData.service,
          message: bookingFormData.message,
          preferredDate: selectedSlot.date,
          preferredTime: selectedSlot.displayTime,
          source: 'calendar_booking',
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined
        })
      });
      
      const leadData = await leadResponse.json();
      
      if (!leadResponse.ok || !leadData.ok) {
        throw new Error('Failed to save booking information');
      }

      // 2. Book calendar event
      const bookingResponse = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          attendeeEmail: bookingFormData.email,
          attendeeName: bookingFormData.name,
          meetingTitle: `Discovery Call with ${bookingFormData.name} - ${bookingFormData.company}`,
          meetingDescription: `Discovery call to discuss ${bookingFormData.service} needs.\n\nCompany: ${bookingFormData.company}\nPhone: ${bookingFormData.phone}\nService Interest: ${bookingFormData.service}\n\nMessage: ${bookingFormData.message}`
        })
      });
      
      const bookingData = await bookingResponse.json();
      
      if (!bookingResponse.ok || !bookingData.success) {
        console.error('Booking API error:', bookingData);
        const errorMessage = bookingData.error || bookingData.message || 'Failed to book calendar event';
        throw new Error(errorMessage);
      }

      // Success!
      setBookingStatus('success');
      setBookingResult({
        meetingLink: bookingData.meetingLink,
        calendarLink: bookingData.calendarLink,
        eventId: bookingData.eventId
      });
      
      // Track conversion
      trackEvent('calendar_booking', {
        service_interest: bookingFormData.service,
        company: bookingFormData.company,
        date: selectedSlot.date,
        time: selectedSlot.displayTime
      });
      
      trackConversion('calendar_booking_completed', undefined, 'USD');
      
      // Reset form after success (but keep confirmation visible)
      setTimeout(() => {
        setBookingFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
        setSelectedSlot(null);
        setFieldStates({
          name: { touched: false, valid: false, focused: false },
          email: { touched: false, valid: false, focused: false },
          phone: { touched: false, valid: false, focused: false },
          company: { touched: false, valid: false, focused: false },
          service: { touched: false, valid: false, focused: false },
          message: { touched: false, valid: false, focused: false }
        });
        setErrors({});
      }, 10000); // Keep confirmation for 10 seconds
      
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setBookingError(errorMessage);
      setBookingStatus('error');
    } finally {
      setIsBooking(false);
    }
  };

  const getFieldClassName = (fieldName: keyof BookingFormData): string => {
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
            Book Your <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Discovery Call</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Ready to transform your business with AI? Select a time that works for you and let&apos;s discuss your project.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Schedule Your Call</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Choose a date and time that works for you. All meetings are 30 minutes and include a Zoom link.
                </p>
              </div>

              <div className="space-y-6">
                <a 
                  href="mailto:hello@intelllx.com?subject=General Question - Intelllx"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-300 group-hover:text-blue-400 transition-colors">hello@intelllx.com</p>
                  </div>
                </a>

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
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  What to Expect
                </h3>
                <ul className="text-gray-300 text-sm space-y-2 ml-4 list-disc">
                  <li>30-minute discovery call</li>
                  <li>Discuss your business goals and challenges</li>
                  <li>Learn how AI can help you grow</li>
                  <li>Get a custom proposal for your needs</li>
                  <li>Automatic Zoom link included</li>
                </ul>
              </div>
            </div>

            {/* Right Side - Calendar & Booking Form */}
            <div className="space-y-6">
              {/* Calendar Widget */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-400" />
                    Select Date & Time
                  </h3>
                  {selectedSlot && (
                    <button
                      onClick={() => setSelectedSlot(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Clear selection"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {selectedSlot ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                      <p className="text-blue-200 text-sm font-medium mb-1">Selected Time</p>
                      <p className="text-white font-semibold">{selectedSlot.displayDate}</p>
                      <p className="text-blue-300">{selectedSlot.displayTime}</p>
                    </div>
                    
                    <Button
                      onClick={() => setSelectedSlot(null)}
                      variant="secondary"
                      className="w-full"
                    >
                      Change Time
                    </Button>
                  </div>
                ) : (
                  <BookingCalendar
                    onTimeSlotSelect={handleTimeSlotSelect}
                    selectedSlot={selectedSlot}
                  />
                )}
              </div>

              {/* Booking Form - Only show after time selection */}
              {selectedSlot && (
                <div id="booking-form" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-blue-400" />
                    Your Information
                  </h3>

                  <form onSubmit={handleBookingSubmit} className="space-y-6">
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
                          value={bookingFormData.name}
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
                          value={bookingFormData.email}
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

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-white">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={bookingFormData.phone}
                          onChange={handleInputChange}
                          onFocus={() => handleFieldFocus('phone')}
                          onBlur={() => handleFieldBlur('phone')}
                          className={`${getFieldClassName('phone')} pl-12`}
                          placeholder="(555) 123-4567"
                          required
                        />
                        {fieldStates.phone.valid && fieldStates.phone.touched && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                      </div>
                      {errors.phone && fieldStates.phone.touched && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
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
                          value={bookingFormData.company}
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
                        value={bookingFormData.service}
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
                        Tell Us About Your Project *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={bookingFormData.message}
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

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={!isFormValid() || isBooking}
                      loading={isBooking}
                      className="w-full py-4 text-lg font-semibold"
                      icon={<Calendar className="w-5 h-5" />}
                    >
                      {isBooking ? 'Booking...' : `Book ${selectedSlot.displayTime} Call`}
                    </Button>

                    {/* Success Message */}
                    {bookingStatus === 'success' && bookingResult && (
                      <div className="p-6 bg-green-500/20 border border-green-500/30 rounded-xl animate-pulse">
                        <div className="flex items-center gap-3 mb-4">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                          <div>
                            <h3 className="text-green-400 font-semibold text-lg">Call Booked Successfully! 🎉</h3>
                            <p className="text-green-300 text-sm mt-1">
                              Your meeting is confirmed for {selectedSlot?.displayDate} at {selectedSlot?.displayTime}
                            </p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-green-500/30 space-y-3">
                          {bookingResult.meetingLink && (
                            <a
                              href={bookingResult.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                            >
                              Join Zoom Meeting
                              <ExternalLink className="w-4 h-4 inline ml-2" />
                            </a>
                          )}
                          {bookingResult.calendarLink && (
                            <a
                              href={bookingResult.calendarLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 text-center"
                            >
                              Add to Calendar
                              <ExternalLink className="w-4 h-4 inline ml-2" />
                            </a>
                          )}
                          <p className="text-green-200 text-xs text-center">
                            You&apos;ll receive confirmation emails with all meeting details.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {bookingStatus === 'error' && (
                      <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h3 className="text-red-400 font-semibold mb-1">Booking Failed</h3>
                            <p className="text-red-300 text-sm mb-2">{bookingError || 'An unexpected error occurred'}</p>
                            <p className="text-red-200 text-xs">Please try again or email us directly at <a href="mailto:hello@intelllx.com" className="underline hover:text-red-100">hello@intelllx.com</a></p>
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* Prompt to select time if none selected */}
              {!selectedSlot && (
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                  <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-300 text-sm">Select a date and time above to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
