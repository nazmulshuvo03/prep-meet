import { fetchContent } from "../api";
import { message_inbox_url, sent_message_url } from "../urls/message";

export const fetchInboxMessages = async () => {
  const res = await fetchContent(message_inbox_url());
  console.log("Message Inbox response: ", res);
  if (res.success) {
    return res.data;
  } else {
    return null;
  }
};

export const fetchSentMessages = async () => {
  const res = await fetchContent(sent_message_url());
  console.log("Sent message response: ", res);
  if (res.success) {
    return res.data;
  } else {
    return null;
  }
};
