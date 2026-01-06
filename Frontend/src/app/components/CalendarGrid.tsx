import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { ko } from "date-fns/locale";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
}

export function CalendarGrid({ currentDate, events, selectedDate, onDateSelect, onMonthChange }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the starting day of the week (0 = Sunday, 1 = Monday, etc.)
  const startingDayOfWeek = monthStart.getDay();
  
  // Create empty cells for days before the month starts
  const emptyCells = Array(startingDayOfWeek).fill(null);
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">
          {format(currentDate, 'yyyy년 M월', { locale: ko })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => onMonthChange('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onMonthChange('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`text-center py-2 text-sm ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells */}
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {/* Day cells */}
        {daysInMonth.map((day) => {
          const dayEvents = getEventsForDate(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);
          const dayOfWeek = day.getDay();
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`
                aspect-square p-2 rounded-lg border-2 transition-all
                flex flex-col items-start justify-start
                hover:border-blue-300 hover:bg-blue-50
                ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                ${isTodayDate ? 'bg-yellow-50' : ''}
              `}
            >
              <span
                className={`
                  text-sm mb-1
                  ${dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : 'text-gray-700'}
                  ${isTodayDate ? 'font-bold' : ''}
                `}
              >
                {format(day, 'd')}
              </span>
              
              {/* Event indicators */}
              {dayEvents.length > 0 && (
                <div className="flex flex-wrap gap-1 w-full">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="w-full text-xs bg-blue-500 text-white px-1 py-0.5 rounded truncate"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 2}
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
