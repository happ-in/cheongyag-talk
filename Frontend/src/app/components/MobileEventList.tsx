import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { Trash2, Plus } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

interface MobileEventListProps {
  events: CalendarEvent[];
  selectedDate: Date | null;
  onDeleteEvent: (id: string) => void;
  onAddEvent: () => void;
}

export function MobileEventList({ events, selectedDate, onDeleteEvent, onAddEvent }: MobileEventListProps) {
  const selectedDateEvents = selectedDate
    ? events.filter(event => isSameDay(event.date, selectedDate))
    : [];

  if (!selectedDate) {
    return null;
  }

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <h3 className="font-medium">
          {format(selectedDate, 'M월 d일 (E)', { locale: ko })}
        </h3>
        <button
          onClick={onAddEvent}
          className="flex items-center gap-1 text-sm text-blue-600 active:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>일정 추가</span>
        </button>
      </div>

      <div className="px-4 py-3">
        {selectedDateEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">일정이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedDateEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg active:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-0.5">{event.title}</h4>
                  {event.description && (
                    <p className="text-xs text-gray-600 line-clamp-2">{event.description}</p>
                  )}
                </div>
                <button
                  onClick={() => onDeleteEvent(event.id)}
                  className="shrink-0 p-2 -mr-2 active:bg-gray-200 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
