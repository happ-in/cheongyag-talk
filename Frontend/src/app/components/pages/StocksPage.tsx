import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "../ui/input";

export function StocksPage() {
  const stocks = [
    { name: '삼성전자', price: '71,500', change: '+2.3%', isUp: true },
    { name: 'SK하이닉스', price: '134,000', change: '-1.2%', isUp: false },
    { name: 'NAVER', price: '185,500', change: '+3.1%', isUp: true },
    { name: '카카오', price: '45,200', change: '+0.8%', isUp: true },
    { name: 'LG에너지솔루션', price: '412,000', change: '-0.5%', isUp: false },
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl font-bold mb-3">종목톡</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="종목명 또는 종목코드 검색"
            className="pl-10"
          />
        </div>
      </div>

      {/* Stock list */}
      <div className="px-4 py-3">
        <h2 className="text-sm font-medium text-gray-600 mb-3">관심 종목</h2>
        <div className="space-y-2">
          {stocks.map((stock) => (
            <div
              key={stock.name}
              className="bg-white p-4 rounded-lg border border-gray-200 active:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">{stock.name}</h3>
                  <p className="text-lg font-bold">{stock.price}원</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 justify-end mb-1 ${
                    stock.isUp ? 'text-red-500' : 'text-blue-500'
                  }`}>
                    {stock.isUp ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{stock.change}</span>
                  </div>
                  <button className="text-xs text-blue-600 active:text-blue-700">
                    톡방 입장
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
