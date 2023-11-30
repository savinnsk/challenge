interface RooItemProps {
  title: string;
}

export function RoomItem({ title }: RooItemProps) {
  return (
    <a
      href=""
      className="  hover:bg-blue-300 bg-blue-500 items-center gap-3 rounded px-3 py-2"
    >
      <span className="font-medium text-white ">{title}</span>
    </a>
  );
}
