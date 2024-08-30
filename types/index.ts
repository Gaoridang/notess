export interface MessageType {
  id: string;
  type: "user" | "bot";
  message: string;
}

export type MessageProps = Pick<MessageType, "type" | "message">;
