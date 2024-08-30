import { MessageProps } from "@/types";

const Message = ({ message, type }: MessageProps) => {
  return <div className={type === "user" ? "text-right" : ""}>{message}</div>;
};

export default Message;
