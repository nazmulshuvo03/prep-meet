import { useEffect, useState } from "react";
import { fetchInboxMessages } from "../../services/functions/message";

export const Inbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const inboxMessages = await fetchInboxMessages();
        setMessages(inboxMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    loadMessages();
  }, []);

  console.log("!!!!!!!! inbox", messages);

  return (
    <div>
      <h1>Inbox messages</h1>
    </div>
  );
};
