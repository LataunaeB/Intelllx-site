"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TimeSlot {
  startTime: string;
  endTime: string;
  date: string;
  time: string;
  displayDate: string;
  displayTime: string;
}

interface CalendarBookingWidgetProps {
  onTimeSlotSelected: (slot: TimeSlot) => void;
  selectedSlot?: TimeSlot | null;
}

export default function CalendarBookingWidget({ onTimeSlotSelected, selectedSlot }: CalendarBookingWidgetProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load availability when month changes
  useEffect(() => {
    loadAvailability();
  }, [currentMonth]);

  const loadAvailability = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
      
      // Get 2 weeks from today
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 14);
      
      const endDate = endOfMonth > maxDate ? maxDate : endOfMonth;

      const response = await fetch(
        `/api/calendar/availability?startDate=${startOfMonth.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`
      );

      const data = await response.json();

      if (response.ok && data.availableSlots) {
        setAvailableSlots(data.availableSlots);
      } else {
        setError(data.error || 'Failed to load availability');
      }
    } catch (err) {
      console.error('Error loading availability:', err);
      setError('Failed to load calendar availability');
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Array<{ date: number; fullDate: Date; isAvailable: boolean }> = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: 0, fullDate: new Date(), isAvailable: false });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day);
      const dateStr = fullDate.toISOString().split('T')[0];
      
      // Check if this date has available slots (not weekends and within 2 weeks)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const twoWeeksFromNow = new Date(today);
      twoWeeksFromNow.setDate(today.getDate() + 14);
      
      const dayOfWeek = fullDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isPast = fullDate < today;
      const isTooFar = fullDate > twoWeeksFromNow;
      
      const hasSlots = !isWeekend && !isPast && !isTooFar && 
        availableSlots.some(slot => slot.date === dateStr);

      days.push({
        date: day,
        fullDate,
        isAvailable: hasSlots,
      });
    }

    return days;
  };

  const handleDateClick = (fullDate: Date) => {
    const dateStr = fullDate.toISOString().split('T')[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoWeeksFromNow = new Date(today);
    twoWeeksFromNow.setDate(today.getDate() + 14);
    
    const dayOfWeek = fullDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isPast = fullDate < today;
    const isTooFar = fullDate > twoWeeksFromNow;

    if (isWeekend || isPast || isTooFar) {
      return;
    }

    const dateSlots = availableSlots.filter(slot => slot.date === dateStr);
    
    if (dateSlots.length > 0) {
      setSelectedDate(dateStr);
    }
  };

  const handleTimeSlotClick = (slot: TimeSlot) => {
    onTimeSlotSelected(slot);
  };

  const getDateSlots = (): TimeSlot[] => {
    if (!selectedDate) return [];
    return availableSlots.filter(slot => slot.date === selectedDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null);
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dateSlots = getDateSlots();

  return (
    <div className="w-full space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Select a Date</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-white font-medium min-w-[150px] text-center">{monthName}</span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
          <span className="ml-2 text-gray-300">Loading availability...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Calendar Grid */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="grid grid-cols-7 gap-2">
              {/* Week day headers */}
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {days.map((day, index) => {
                if (day.date === 0) {
                  return <div key={index} className="aspect-square" />;
                }

                const isSelected = day.fullDate.toISOString().split('T')[0] === selectedDate;
                const isToday = day.fullDate.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day.fullDate)}
                    disabled={!day.isAvailable}
                    className={`
                      aspect-square rounded-lg text-sm font-medium transition-all duration-200
                      ${day.isAvailable
                        ? isSelected
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : isToday
                          ? 'bg-blue-500/30 text-white border-2 border-blue-400 hover:bg-blue-500/40'
                          : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                        : 'bg-gray-900/50 text-gray-500 cursor-not-allowed opacity-50'
                      }
                    `}
                  >
                    {day.date}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && dateSlots.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">
                  Available Times - {dateSlots[0]?.displayDate}
                </h3>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {dateSlots.map((slot, index) => {
                  const isSelected = selectedSlot?.startTime === slot.startTime;
                  return (
                    <button
                      key={index}
                      onClick={() => handleTimeSlotClick(slot)}
                      className={`
                        p-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${isSelected
                          ? 'bg-blue-600 text-white shadow-lg scale-105 border-2 border-blue-400'
                          : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-blue-500/50'
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

          {selectedDate && dateSlots.length === 0 && (
            <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
              <p className="text-yellow-300 text-sm">
                No available times on this date. Please select another date.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

