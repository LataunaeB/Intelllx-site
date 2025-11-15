"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react";

interface TimeSlot {
  startTime: string;
  endTime: string;
  date: string;
  time: string;
  displayDate: string;
  displayTime: string;
}

interface BookingCalendarProps {
  onTimeSlotSelect: (slot: TimeSlot) => void;
  selectedSlot?: TimeSlot | null;
}

export default function BookingCalendar({ onTimeSlotSelect, selectedSlot }: BookingCalendarProps) {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calendarConnected, setCalendarConnected] = useState(false);

  // Group slots by date
  const slotsByDate = availableSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  // Get dates that have available slots
  const availableDates = Object.keys(slotsByDate).sort();

  // Get slots for selected date
  const selectedDateSlots = selectedDate ? slotsByDate[selectedDate] || [] : [];

  // Fetch availability
  useEffect(() => {
    fetchAvailability();
  }, [currentMonth]);

  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);

    try {
      const startDate = new Date(currentMonth);
      startDate.setDate(1); // Start of month
      
      const endDate = new Date(currentMonth);
      endDate.setMonth(endDate.getMonth() + 1); // Next month
      endDate.setDate(0); // Last day of current month

      const response = await fetch(
        `/api/calendar/availability?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setAvailableSlots([]);
      } else {
        setAvailableSlots(data.availableSlots || []);
        setCalendarConnected(data.calendarConnected || false);
      }
    } catch (err) {
      console.error('Error fetching availability:', err);
      setError('Failed to load available times. Please try again.');
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null); // Clear selection when changing months
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    if (dateOnly.getTime() === today.getTime()) {
      return 'Today';
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateOnly.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }

    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Calendar grid generation
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Start from Monday
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const dateStr = currentDate.toISOString().split('T')[0];
      const isCurrentMonth = currentDate.getMonth() === month;
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      const hasSlots = availableDates.includes(dateStr);
      const isPast = currentDate < new Date(new Date().setHours(0, 0, 0, 0));
      
      days.push({
        date: new Date(currentDate),
        dateStr,
        isCurrentMonth,
        isWeekend,
        hasSlots,
        isPast
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = getCalendarDays();

  if (loading && availableSlots.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        <span className="ml-3 text-gray-300">Loading available times...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-300" />
        </button>
        
        <h3 className="text-xl font-bold text-white">
          {formatMonthYear(currentMonth)}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => {
          const isSelectable = day.hasSlots && !day.isPast && day.isCurrentMonth;
          const isSelected = selectedDate === day.dateStr;
          
          return (
            <button
              key={index}
              onClick={() => {
                if (isSelectable) {
                  setSelectedDate(day.dateStr);
                }
              }}
              disabled={!isSelectable}
              className={`
                aspect-square p-2 rounded-lg text-sm font-medium transition-all
                ${!day.isCurrentMonth ? 'text-gray-600' : ''}
                ${day.isWeekend && !day.hasSlots ? 'text-gray-600 cursor-not-allowed' : ''}
                ${day.isPast ? 'text-gray-700 cursor-not-allowed opacity-50' : ''}
                ${day.hasSlots && !day.isPast && day.isCurrentMonth
                  ? 'text-white hover:bg-blue-500/20 hover:border-blue-500/50 cursor-pointer border border-transparent'
                  : 'cursor-not-allowed'
                }
                ${isSelected
                  ? 'bg-blue-500 border-blue-500 text-white ring-2 ring-blue-400'
                  : ''
                }
              `}
            >
              {day.date.getDate()}
              {day.hasSlots && !day.isPast && (
                <div className="w-1 h-1 mx-auto mt-1 bg-blue-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
          <p className="text-yellow-200 text-sm">{error}</p>
          {!calendarConnected && (
            <p className="text-yellow-300/80 text-xs mt-2">
              Showing static availability. Connect Google Calendar for real-time availability.
            </p>
          )}
        </div>
      )}

      {/* Time Slots for Selected Date */}
      {selectedDate && selectedDateSlots.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Clock className="w-5 h-5 text-blue-400" />
            <span>Available Times for {formatDay(selectedDate)}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
            {selectedDateSlots.map((slot, index) => {
              const isSelected = selectedSlot?.startTime === slot.startTime;
              
              return (
                <button
                  key={index}
                  onClick={() => onTimeSlotSelect(slot)}
                  className={`
                    p-3 rounded-lg text-sm font-medium transition-all
                    ${isSelected
                      ? 'bg-blue-600 text-white border-2 border-blue-400 shadow-lg'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-blue-500/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isSelected && <CheckCircle className="w-4 h-4" />}
                    {slot.displayTime}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedDate && selectedDateSlots.length === 0 && !loading && (
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
          <p className="text-gray-400 text-sm">No available times for this date</p>
        </div>
      )}

      {!selectedDate && availableDates.length === 0 && !loading && (
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center">
          <p className="text-gray-400 text-sm">No available dates in this month</p>
          <button
            onClick={() => navigateMonth('next')}
            className="mt-2 text-blue-400 text-sm hover:underline"
          >
            Check next month
          </button>
        </div>
      )}
    </div>
  );
}

