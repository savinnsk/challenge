import { MessageSquare } from "lucide-react";

interface RooItemProps {
  title: string;
}

export function RoomItem({ title }: RooItemProps) {
  return (
    <a
      href=""
      className="flex hover:bg-slate-500 items-center gap-3 rounded px-3 py-2 "
    >
      <MessageSquare className="text-white" />
      <span className="font-medium text-white "> {title}</span>
    </a>
  );
}
