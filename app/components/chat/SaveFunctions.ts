// Save messages
export const saveMessages = (roomId: string, messages: any[]) => {
  localStorage.setItem(`chat_${roomId}`, JSON.stringify(messages));
};

// Load messages
export const loadMessages = (roomId: string) => {
  const data = localStorage.getItem(`chat_${roomId}`);
  return data ? JSON.parse(data) : [];
};
