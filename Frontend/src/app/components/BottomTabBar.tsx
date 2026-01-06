import { House, Calendar, MessageSquare, Bell, User } from "lucide-react";

interface BottomTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const tabs = [
    { id: 'home', label: '홈', icon: House },
    { id: 'calendar', label: '캘린더', icon: Calendar },
    { id: 'stocks', label: '종목톡', icon: MessageSquare },
    { id: 'notifications', label: '알림', icon: Bell },
    { id: 'mypage', label: '마이페이지', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-2 px-1 min-w-0 transition-colors"
            >
              <Icon 
                className={`w-6 h-6 mb-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              />
              <span 
                className={`text-xs truncate ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
