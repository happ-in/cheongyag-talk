import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect } from "react";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

interface MobileCalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
}

export function MobileCalendarGrid({ currentDate, events, selectedDate, onDateSelect, onMonthChange }: MobileCalendarGridProps) {
  useEffect(() => {
    console.log(format(monthStart, 'yyyyMMdd'))
    console.log(format(monthEnd, 'yyyyMMdd'));
  })
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDayOfWeek = monthStart.getDay();
  const emptyCells = Array(startingDayOfWeek).fill(null);
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <button
          onClick={() => onMonthChange('prev')}
          className="p-2 -ml-2 active:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-lg font-medium">
          {format(currentDate, 'yyyy년 M월', { locale: ko })}
        </h2>
        
        <button
          onClick={() => onMonthChange('next')}
          className="p-2 -mr-2 active:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="px-3 py-2">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <div
              key={day}
              className={`text-center py-2 text-xs ${
                index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
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
                  aspect-square p-1 rounded-lg transition-all relative
                  active:scale-95
                  ${isSelected ? 'bg-blue-500 text-white' : ''}
                  ${isTodayDate && !isSelected ? 'bg-blue-50 ring-2 ring-blue-300' : ''}
                  ${!isSelected && !isTodayDate ? 'hover:bg-gray-50' : ''}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span
                    className={`
                      text-sm
                      ${isSelected ? 'text-white font-medium' : ''}
                      ${!isSelected && dayOfWeek === 0 ? 'text-red-500' : ''}
                      ${!isSelected && dayOfWeek === 6 ? 'text-blue-500' : ''}
                      ${!isSelected && dayOfWeek !== 0 && dayOfWeek !== 6 ? 'text-gray-700' : ''}
                      ${isTodayDate && !isSelected ? 'font-bold' : ''}
                    `}
                  >
                    {format(day, 'd')}
                  </span>
                  
                  {/* Event indicator dot */}
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      <div 
                        className={`w-1 h-1 rounded-full ${
                          isSelected ? 'bg-white' : 'bg-blue-500'
                        }`}
                      />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
