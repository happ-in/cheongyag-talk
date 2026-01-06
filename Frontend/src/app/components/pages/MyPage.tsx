import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";

export function MyPage() {
  const menuItems = [
    { icon: User, label: '프로필 편집', color: 'text-blue-600' },
    { icon: Bell, label: '알림 설정', color: 'text-green-600' },
    { icon: Settings, label: '환경 설정', color: 'text-gray-600' },
    { icon: HelpCircle, label: '고객 센터', color: 'text-purple-600' },
  ];

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-200">
        <h1 className="text-xl font-bold mb-4">마이페이지</h1>
        
        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-medium text-lg mb-1">홍길동</h2>
            <p className="text-sm text-gray-600">hong@example.com</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 mb-4">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <div className="text-center">
            <p className="text-xl font-bold text-blue-600 mb-1">24</p>
            <p className="text-xs text-gray-600">일정</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-green-600 mb-1">12</p>
            <p className="text-xs text-gray-600">관심종목</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-purple-600 mb-1">8</p>
            <p className="text-xs text-gray-600">톡방</p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="bg-white divide-y divide-gray-200 mb-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="w-full px-4 py-4 flex items-center gap-3 active:bg-gray-50 transition-colors"
            >
              <Icon className={`w-5 h-5 ${item.color}`} />
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          );
        })}
      </div>

      {/* Logout button */}
      <div className="px-4">
        <button className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-red-600 active:bg-gray-50 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">로그아웃</span>
        </button>
      </div>

      {/* Version info */}
      <div className="px-4 py-6 text-center">
        <p className="text-xs text-gray-400">버전 1.0.0</p>
      </div>
    </div>
  );
}
