import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { BottomTabBar } from "./components/BottomTabBar";
import { MobileCalendarGrid } from "./components/MobileCalendarGrid";
import { MobileEventList } from "./components/MobileEventList";
import { MobileEventDialog } from "./components/MobileEventDialog";
import { HomePage } from "./components/pages/HomePage";
import { StocksPage } from "./components/pages/StocksPage";
import { NotificationsPage } from "./components/pages/NotificationsPage";
import { MyPage } from "./components/pages/MyPage";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
    setIsDialogOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'calendar':
        return (
          <div className="pb-20">
            <MobileCalendarGrid
              currentDate={currentDate}
              events={events}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onMonthChange={handleMonthChange}
            />
            <MobileEventList
              events={events}
              selectedDate={selectedDate}
              onDeleteEvent={handleDeleteEvent}
              onAddEvent={handleAddEvent}
            />
          </div>
        );
      case 'stocks':
        return <StocksPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'mypage':
        return <MyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main content */}
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {renderContent()}
      </div>

      {/* Bottom navigation */}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Event dialog */}
      <MobileEventDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}
