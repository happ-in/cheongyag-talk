import { useState, useEffect } from "react";
import { Dialog } from "./ui/dialog";
import { Button } from "./ui/button";
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

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  selectedDate: Date | null;
}

export function EventDialog({ isOpen, onClose, onSave, selectedDate }: EventDialogProps) {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl">새 일정 추가</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">날짜</Label>
              <Input
                id="date"
                type="text"
                value={selectedDate ? format(selectedDate, 'yyyy년 M월 d일', { locale: ko }) : ''}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div>
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="일정 제목을 입력하세요"
                required
                autoFocus
              />
            </div>

            <div>
              <Label htmlFor="description">설명 (선택)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="상세 내용을 입력하세요"
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
              >
                취소
              </Button>
              <Button type="submit">
                저장
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
