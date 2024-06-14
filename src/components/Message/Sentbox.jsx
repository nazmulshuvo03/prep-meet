import { useEffect, useState } from "react";
import { fetchSentMessages } from "../../services/functions/message";

export const Sentbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const sentMessages = await fetchSentMessages();
        setMessages(sentMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    loadMessages();
  }, []);

  console.log("!!!!!!!! sentbox", messages);

  return (
    <div>
      <h1>Sent messages</h1>
    </div>
  );
};
