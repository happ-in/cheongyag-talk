import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { Trash2, Calendar } from "lucide-react";
import { Button } from "./ui/button";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

interface EventListProps {
  events: CalendarEvent[];
  selectedDate: Date | null;
  onDeleteEvent: (id: string) => void;
}

export function EventList({ events, selectedDate, onDeleteEvent }: EventListProps) {
  const selectedDateEvents = selectedDate
    ? events.filter(event => isSameDay(event.date, selectedDate))
    : [];

  if (!selectedDate) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p>날짜를 선택하여 일정을 확인하세요</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg mb-4">
        {format(selectedDate, 'yyyy년 M월 d일', { locale: ko })}의 일정
      </h3>

      {selectedDateEvents.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          <p>이 날짜에는 일정이 없습니다</p>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedDateEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1">{event.title}</h4>
                  {event.description && (
                    <p className="text-sm text-gray-600">{event.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteEvent(event.id)}
                  className="shrink-0"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
