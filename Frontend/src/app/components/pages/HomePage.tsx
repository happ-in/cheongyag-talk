import { Calendar, TrendingUp, Bell } from "lucide-react";

export function HomePage() {
  return (
    <div className="px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">홈</h1>
      
      <div className="space-y-4">
        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-4 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">오늘의 일정</p>
            <p className="text-2xl font-bold text-blue-600">3개</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-sm text-gray-600">관심 종목</p>
            <p className="text-2xl font-bold text-green-600">12개</p>
          </div>
        </div>

        {/* Recent activities */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="font-medium mb-3">최근 활동</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm">활동 내용 {i}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{i}시간 전</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-gray-600" />
            <h2 className="font-medium">알림</h2>
          </div>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm">새로운 알림 메시지 {i}</p>
                <p className="text-xs text-gray-500 mt-1">{i * 2}분 전</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
