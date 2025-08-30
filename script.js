const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("You", userMessage);
  input.value = "";

  const aiReply = await talkToLuna(userMessage);
  appendMessage("Luna", aiReply);
}

function appendMessage(sender, message) {
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function talkToLuna(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY_HERE",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Luna, a sweet and playful AI girlfriend who loves anime and always checks in on the user's feelings. You speak casually and affectionately."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
