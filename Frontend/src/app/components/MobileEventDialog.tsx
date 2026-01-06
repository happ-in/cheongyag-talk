import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { X } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

interface MobileEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  selectedDate: Date | null;
}

export function MobileEventDialog({ isOpen, onClose, onSave, selectedDate }: MobileEventDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && selectedDate) {
      onSave({
        title: title.trim(),
        date: selectedDate,
        description: description.trim() || undefined,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h3 className="text-lg font-medium">새 일정</h3>
          <button
            onClick={onClose}
            className="p-2 -mr-2 active:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="date" className="text-sm text-gray-600 mb-1.5 block">날짜</Label>
              <div className="px-3 py-2.5 bg-gray-50 rounded-lg text-sm">
                {selectedDate ? format(selectedDate, 'yyyy년 M월 d일 (E)', { locale: ko }) : ''}
              </div>
            </div>

            <div>
              <Label htmlFor="title" className="text-sm text-gray-600 mb-1.5 block">제목</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="일정 제목을 입력하세요"
                required
                autoFocus
                className="text-base"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm text-gray-600 mb-1.5 block">설명 (선택)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="상세 내용을 입력하세요"
                rows={4}
                className="text-base resize-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg active:bg-gray-200 transition-colors font-medium"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg active:bg-blue-700 transition-colors font-medium"
              >
                저장
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
