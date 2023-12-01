import ChatMessage from "../components/chatMessage/chatMessage";
import { SideBar } from "../components/sidebar/sidebar";

export default function Chat() {
  return (
    <div>
      <SideBar />
      <ChatMessage />
    </div>
  );
}
