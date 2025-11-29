"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Instagram, Phone, Mail, ArrowLeft, Scissors, AlertCircle, Calendar, X, Clock, Loader2 } from "lucide-react";

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch next 14 days of availability
  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 14); // Next 14 days only

        const response = await fetch(
          `/api/calendar/availability?startDate=${today.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`
        );

        const data = await response.json();

        if (data.error) {
          console.error('Availability error:', data.error);
          setAvailableSlots([]);
        } else {
          setAvailableSlots(data.availableSlots || []);
        }
      } catch (err) {
        console.error('Error fetching availability:', err);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  // Group slots by date
  const slotsByDate = availableSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  // Get next 14 days with availability
  const getNext14Days = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const hasSlots = !isWeekend && slotsByDate[dateStr] && slotsByDate[dateStr].length > 0;

      days.push({
        date,
        dateStr,
        isToday: i === 0,
        isTomorrow: i === 1,
        hasSlots,
        slots: hasSlots ? slotsByDate[dateStr] : []
      });
    }

    return days;
  };

  const next14Days = getNext14Days();
  const selectedDateSlots = selectedDate ? slotsByDate[selectedDate] || [] : [];

  const formatDay = (date: Date, isToday: boolean, isTomorrow: boolean) => {
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedSlot(null); // Clear time selection when changing date
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setBookingError(null);
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/stylists"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stylist System
        </Link>
      </div>

      {/* Page container */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Hero Section - Compact */}
        <section className="mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Scissors className="h-5 w-5 text-[#06B6D4]" />
            </div>
            <span className="text-sm font-medium text-gray-400 tracking-wide">STYLIST INQUIRY</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-center mb-4">
            <span className="block">Book Your</span>
            <span className="block mt-2 text-[#06B6D4]">Discovery Call</span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto text-center leading-relaxed font-light">
            30-minute call to discuss your Stylist AI Booking System
          </p>
        </section>

        {/* Calendar + Form Section - Side by Side */}
        {bookingStatus === 'success' && bookingResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 rounded-full blur-2xl" />
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#06B6D4]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                  Call Booked Successfully
                </h2>
                <p className="text-base text-gray-300 max-w-md mx-auto leading-relaxed mb-6">
                  Your meeting is confirmed for <strong>{selectedSlot?.displayDate}</strong> at <strong>{selectedSlot?.displayTime}</strong>
                </p>
                {bookingResult.meetingLink && (
                  <div className="space-y-4">
                    <a
                      href={bookingResult.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/30"
                    >
                      Join Meeting
                    </a>
                    <p className="text-xs text-gray-400">
                      You'll receive an email with all meeting details and calendar invite.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={`grid ${selectedSlot ? 'lg:grid-cols-[0.45fr,0.55fr]' : 'lg:grid-cols-1'} gap-6 md:gap-8 transition-all duration-500`}>
            {/* Compact Calendar - Left */}
            <div className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 shadow-2xl overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <Calendar className="w-5 h-5 text-[#06B6D4]" />
                  <h2 className="text-lg md:text-xl font-black tracking-tight">
                    Select Date & Time
                  </h2>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-[#06B6D4]" />
                    <span className="ml-3 text-sm text-gray-400">Loading times...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Compact Date Grid - Next 14 Days */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {next14Days.map((day) => {
                        const isSelected = selectedDate === day.dateStr;
                        const isSelectable = day.hasSlots;

                        return (
                          <button
                            key={day.dateStr}
                            onClick={() => isSelectable && handleDateSelect(day.dateStr)}
                            disabled={!isSelectable}
                            className={`
                              p-3 rounded-xl text-xs md:text-sm font-medium transition-all
                              ${isSelectable
                                ? isSelected
                                  ? 'bg-[#06B6D4] text-[#0F172A] border-2 border-[#06B6D4]'
                                  : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-[#06B6D4]/50'
                                : 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed opacity-40'
                              }
                            `}
                          >
                            <div className="text-center">
                              <div className="font-semibold">{formatDay(day.date, day.isToday, day.isTomorrow)}</div>
                              {day.hasSlots && (
                                <div className="text-[10px] text-[#06B6D4] mt-1">
                                  {day.slots.length} slots
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Time Slots for Selected Date */}
                    {selectedDate && selectedDateSlots.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                          <Clock className="w-4 h-4 text-[#06B6D4]" />
                          <span>Available Times</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                          {selectedDateSlots.map((slot, index) => {
                            const isSelected = selectedSlot?.startTime === slot.startTime;
                            
                            return (
                              <button
                                key={index}
                                onClick={() => handleTimeSlotSelect(slot)}
                                className={`
                                  p-2.5 rounded-lg text-xs font-medium transition-all
                                  ${isSelected
                                    ? 'bg-[#06B6D4] text-[#0F172A] border-2 border-[#06B6D4]'
                                    : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-[#06B6D4]/50'
                                  }
                                `}
                              >
                                {slot.displayTime}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {selectedDate && selectedDateSlots.length === 0 && (
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                        <p className="text-xs text-gray-400">No available times for this date</p>
                      </div>
                    )}

                    {!selectedDate && (
                      <div className="p-4 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-xl text-center">
                        <p className="text-xs text-gray-300">Select a date above</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Form - Right (appears when time selected) */}
            {selectedSlot && (
              <div 
                id="booking-form"
                className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 shadow-2xl overflow-hidden transition-all duration-500 ease-out"
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 rounded-full blur-2xl" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl md:text-2xl font-black tracking-tight mb-1">
                        Your Information
                      </h2>
                      <p className="text-xs text-gray-400">
                        Selected: {selectedSlot.displayDate} at {selectedSlot.displayTime}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSlot(null);
                        setSelectedDate(null);
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Change time"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                        Instagram Handle *
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center justify-center rounded-xl bg-[#020617]/80 border border-white/10 px-2.5 py-2.5">
                          <Instagram className="w-4 h-4 text-[#06B6D4]" />
                        </div>
                        <input
                          type="text"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleChange}
                          required
                          className="flex-1 rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                          placeholder="@yourstylistpage"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                        Best Email *
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center justify-center rounded-xl bg-[#020617]/80 border border-white/10 px-2.5 py-2.5">
                          <Mail className="w-4 h-4 text-[#06B6D4]" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="flex-1 rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center justify-center rounded-xl bg-[#020617]/80 border border-white/10 px-2.5 py-2.5">
                          <Phone className="w-4 h-4 text-[#06B6D4]" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="flex-1 rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Salon Info Grid */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                          Salon / Business Name *
                        </label>
                        <input
                          type="text"
                          name="salonName"
                          value={formData.salonName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                          placeholder="Your brand"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                          City, State *
                        </label>
                        <input
                          type="text"
                          name="cityState"
                          value={formData.cityState}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                          placeholder="Long Beach, CA"
                        />
                      </div>
                    </div>

                    {/* What You Need */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                        What's Your Biggest Priority Right Now *
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
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
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                        Current Booking Situation *
                      </label>
                      <textarea
                        name="situation"
                        value={formData.situation}
                        onChange={handleChange}
                        rows={3}
                        required
                        className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all resize-none"
                        placeholder="Example: I book through IG DMs and a link in bio. I get a lot of messages and feel like I miss people."
                      />
                    </div>

                    {/* Error Message */}
                    {bookingError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-red-400 text-xs">{bookingError}</p>
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isBooking}
                        className="inline-flex w-full items-center justify-center gap-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 disabled:opacity-50 text-[#0F172A] font-semibold px-6 py-3.5 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/30 disabled:hover:scale-100"
                      >
                        {isBooking ? "Booking..." : `Book ${selectedSlot.displayTime} Call`}
                      </button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        You'll receive a calendar invite with Zoom/Google Meet link automatically.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
