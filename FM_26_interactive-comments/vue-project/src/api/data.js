async function getMessages() {
  try {
    const response = await fetch('/data.json');
    const data = response.json();
    console.log(data);

    return data;
  }
  catch (err) {
    console.error('data read error:', err);
  }
}
export const getMessagesApi = () => {
  return getMessages();
};
