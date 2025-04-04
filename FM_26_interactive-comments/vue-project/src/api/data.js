async function getMessages() {
  try {
    const response = await fetch('/assets/data.json');
    const data = response.json();
    return data;
  }
  catch (err) {
    console.error('data read error:', err);
  }
}
export const getMessagesApi = () => {
  return getMessages();
};
