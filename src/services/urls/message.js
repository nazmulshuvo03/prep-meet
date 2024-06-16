export const all_messge_url = () => `/message`;
export const single_message_url = (messageId) => `/message/${messageId}`;
export const message_inbox_url = () => `/message/inbox`;
export const sent_message_url = () => `/message/sent`;
export const user_chat_url = (otherUserId) => `/message/chat/${otherUserId}`;
