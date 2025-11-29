"use client";

import { useState } from "react";
import Link from "next/link";
import BookingCalendar from "@/components/BookingCalendar";
import { CheckCircle2, Instagram, Phone, Mail, ArrowLeft, Scissors, AlertCircle, Calendar, X } from "lucide-react";

interface TimeSlot {
  startTime: string;
  endTime: string;
  date: string;
  time: string;
  displayDate: string;
  displayTime: string;
}

interface FormData {
  name: string;
  instagram: string;
  email: string;
  phone: string;
  salonName: string;
  cityState: string;
  priority: string;
  situation: string;
}

export default function StylistContactPage() {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<{
    meetingLink?: string;
    calendarLink?: string;
    eventId?: string;
  } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    instagram: '',
    email: '',
    phone: '',
    salonName: '',
    cityState: '',
    priority: '',
    situation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setBookingError(null);
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingError(null);
    setIsBooking(true);
    setBookingStatus('idle');

    if (!selectedSlot) {
      setBookingError('Please select a time slot first');
      setIsBooking(false);
      return;
    }

    try {
      // Step 1: Save lead to Supabase and send notification
      const message = `Stylist Inquiry - Founder Offer Application

Instagram: ${formData.instagram}
Salon/Business: ${formData.salonName}
Location: ${formData.cityState}
Priority: ${formData.priority}

Current Booking Situation:
${formData.situation}`;

      const leadResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          company: formData.salonName,
          message: message,
          service: formData.priority,
          preferredDate: selectedSlot.date,
          preferredTime: selectedSlot.displayTime,
          source: 'stylist_calendar_booking',
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      const leadData = await leadResponse.json();

      if (!leadResponse.ok || !leadData.ok) {
        throw new Error('Failed to save booking information');
      }

      // Step 2: Book calendar event with Zoom/Google Meet
      const meetingTitle = `Stylist AI Booking System Discovery Call - ${formData.name}`;
      const meetingDescription = `Discovery call to discuss Stylist AI Booking System for ${formData.name}.

Stylist Details:
- Instagram: ${formData.instagram}
- Salon/Business: ${formData.salonName}
- Location: ${formData.cityState}
- Phone: ${formData.phone}
- Priority: ${formData.priority}

Current Booking Situation:
${formData.situation}`;

      const bookingResponse = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          attendeeEmail: formData.email,
          attendeeName: formData.name,
          meetingTitle: meetingTitle,
          meetingDescription: meetingDescription,
        }),
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
        eventId: bookingData.eventId,
      });
    } catch (err) {
      console.error('Booking error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setBookingError(errorMessage);
      setBookingStatus('error');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white relative overflow-hidden">
      {/* Ambient glow - matches stylist page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6D28D9]/10 blur-[140px] rounded-full" />
      </div>

      {/* Back link */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/stylists"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stylist System
        </Link>
      </div>

      {/* Page container */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Hero Section - Premium Continuation */}
        <section className="mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Scissors className="h-5 w-5 text-[#06B6D4]" />
            </div>
            <span className="text-sm font-medium text-gray-400 tracking-wide">STYLIST INQUIRY</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-center mb-6">
            <span className="block">Book Your</span>
            <span className="block mt-2 text-[#06B6D4]">Discovery Call</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-center leading-relaxed font-light">
            Choose a time that works for you. 30-minute call to discuss your Stylist AI Booking System.
          </p>
        </section>

        {/* Calendar + Form Section */}
        <section className="grid md:grid-cols-[1.2fr,0.8fr] gap-6 md:gap-8 items-start">
          {/* Main Content - Calendar + Form */}
          <div className="space-y-6">
            {/* Calendar Widget - Premium Styled */}
            <div className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#06B6D4]" />
                    <h2 className="text-xl md:text-2xl font-black tracking-tight">
                      Select Date & Time
                    </h2>
                  </div>
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
                    <div className="p-4 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-xl">
                      <p className="text-[#06B6D4] text-xs font-semibold uppercase tracking-wider mb-1">Selected Time</p>
                      <p className="text-white font-semibold text-lg">{selectedSlot.displayDate}</p>
                      <p className="text-gray-300">{selectedSlot.displayTime}</p>
                    </div>
                    <button
                      onClick={() => setSelectedSlot(null)}
                      className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Change Time
                    </button>
                  </div>
                ) : (
                  <BookingCalendar
                    onTimeSlotSelect={handleTimeSlotSelect}
                    selectedSlot={selectedSlot}
                  />
                )}
              </div>
            </div>

            {/* Booking Form - Only show after time selection */}
            {selectedSlot && (
              <div id="booking-form" className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
                {/* Gradient accent */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 rounded-full blur-2xl" />
                
                <div className="relative">
                  {bookingStatus === 'success' && bookingResult ? (
                    <div className="text-center py-8 md:py-10">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 mb-6">
                        <CheckCircle2 className="w-8 h-8 text-[#06B6D4]" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                        Call Booked Successfully
                      </h2>
                      <p className="text-base text-gray-300 max-w-md mx-auto leading-relaxed mb-6">
                        Your meeting is confirmed for <strong>{selectedSlot.displayDate}</strong> at <strong>{selectedSlot.displayTime}</strong>
                      </p>
                      {bookingResult.meetingLink && (
                        <div className="space-y-4">
                          <a
                            href={bookingResult.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/30"
                          >
                            Join Meeting
                          </a>
                          <p className="text-xs text-gray-400">
                            You'll receive an email with all meeting details and calendar invite.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                          Your Information
                        </h2>
                        <p className="text-sm text-gray-400">
                          Fill out your details to complete the booking.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                            placeholder="Your name"
                          />
                        </div>

                        {/* Instagram */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                            Instagram Handle *
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center rounded-xl bg-[#020617]/80 border border-white/10 px-3 py-3">
                              <Instagram className="w-4 h-4 text-[#06B6D4]" />
                            </div>
                            <input
                              type="text"
                              name="instagram"
                              value={formData.instagram}
                              onChange={handleChange}
                              required
                              className="flex-1 rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                              placeholder="@yourstylistpage"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                            Best Email *
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center rounded-xl bg-[#020617]/80 border border-white/10 px-3 py-3">
                              <Mail className="w-4 h-4 text-[#06B6D4]" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="flex-1 rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                            Phone Number *
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center rounded-xl bg-[#020617]/80 border border-white/10 px-3 py-3">
                              <Phone className="w-4 h-4 text-[#06B6D4]" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="flex-1 rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                        </div>

                        {/* Salon Info Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                              Salon / Business Name *
                            </label>
                            <input
                              type="text"
                              name="salonName"
                              value={formData.salonName}
                              onChange={handleChange}
                              required
                              className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                              placeholder="Your brand"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                              City, State *
                            </label>
                            <input
                              type="text"
                              name="cityState"
                              value={formData.cityState}
                              onChange={handleChange}
                              required
                              className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                              placeholder="Long Beach, CA"
                            />
                          </div>
                        </div>

                        {/* What You Need */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                            What's Your Biggest Priority Right Now *
                          </label>
                          <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                            required
                          >
                            <option value="" disabled className="bg-[#020617]">
                              Choose your main priority
                            </option>
                            <option value="booked" className="bg-[#020617]">
                              Get fully booked with the right clients
                            </option>
                            <option value="dms" className="bg-[#020617]">
                              Stop living in my DMs - automate replies
                            </option>
                            <option value="professional" className="bg-[#020617]">
                              Look more professional online with a booking site
                            </option>
                            <option value="automation" className="bg-[#020617]">
                              Full automation - site + AI assistant + everything
                            </option>
                          </select>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                            Current Booking Situation *
                          </label>
                          <textarea
                            name="situation"
                            value={formData.situation}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all resize-none"
                            placeholder="Example: I book through IG DMs and a link in bio. I get a lot of messages and feel like I miss people."
                          />
                        </div>

                        {/* Error Message */}
                        {bookingError && (
                          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-red-400 text-sm">{bookingError}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* CTA Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isBooking}
                            className="inline-flex w-full items-center justify-center gap-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 disabled:opacity-50 text-[#0F172A] font-semibold px-6 py-4 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/30 disabled:hover:scale-100"
                          >
                            {isBooking ? "Booking..." : `Book ${selectedSlot.displayTime} Call`}
                          </button>
                          <p className="text-xs text-gray-500 text-center mt-3">
                            You'll receive a calendar invite with Zoom/Google Meet link automatically.
                          </p>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Prompt to select time if none selected */}
            {!selectedSlot && bookingStatus !== 'success' && (
              <div className="p-6 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-xl text-center">
                <Calendar className="w-8 h-8 text-[#06B6D4] mx-auto mb-2" />
                <p className="text-gray-300 text-sm">Select a date and time above to continue</p>
              </div>
            )}
          </div>

          {/* Trust Column - Compact */}
          <div className="space-y-5">
            {/* What to Expect */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6 shadow-xl">
              <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-4">
                What to Expect
              </p>
              <ul className="space-y-3 text-sm text-gray-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                  <span>30-minute discovery call</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                  <span>Automatic Zoom/Google Meet link</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                  <span>Calendar invite sent to your email</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                  <span>Discuss your booking system needs</span>
                </li>
              </ul>
            </div>

            {/* Alternative Contact */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6 shadow-xl">
              <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-4">
                Other Ways to Connect
              </p>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-[#06B6D4]" />
                  <span>@LaTaunaeb</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#06B6D4]" />
                  <span className="text-xs break-all">lataunaebrookss@icloud.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
