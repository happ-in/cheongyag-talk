import { Bell, Calendar, MessageSquare, TrendingUp } from "lucide-react";

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'calendar',
      title: '회의 일정 알림',
      message: '1시간 후 팀 미팅이 예정되어 있습니다.',
      time: '10분 전',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'stock',
      title: '삼성전자 가격 알림',
      message: '목표가에 도달했습니다. (71,500원)',
      time: '1시간 전',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      type: 'message',
      title: '새로운 댓글',
      message: 'SK하이닉스 종목톡에 새로운 댓글이 달렸습니다.',
      time: '2시간 전',
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      type: 'calendar',
      title: '일정 등록 완료',
      message: '내일 오전 미팅이 등록되었습니다.',
      time: '3시간 전',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 5,
      type: 'stock',
      title: 'NAVER 급등 알림',
      message: '전일 대비 3% 이상 상승했습니다.',
      time: '5시간 전',
      icon: TrendingUp,
      color: 'bg-red-100 text-red-600'
    },
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">알림</h1>
        <button className="text-sm text-blue-600 active:text-blue-700">
          모두 읽음
        </button>
      </div>

      {/* Notifications list */}
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className="bg-white px-4 py-4 active:bg-gray-50 transition-colors"
            >
              <div className="flex gap-3">
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    <span className="text-xs text-gray-500 shrink-0">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
