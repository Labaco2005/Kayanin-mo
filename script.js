function sendMessage() {
  var userInput = document.getElementById("user-input").value.trim();
  if (!userInput || isBotResponding) {
    return;
  }
  var chatArea = document.getElementById("chat-area");
  var typingIndicator = document.getElementById("typing-indicator");

  var userMessage = '<div class="message-container"><div class="message user-message">' + userInput + '</div></div>';
  chatArea.innerHTML += userMessage;
  scrollToBottom();

  // Disable input and send button
  document.getElementById("user-input").disabled = true;
  document.querySelector(".send-button").disabled = true;

  // Display typing indicator
  typingIndicator.style.display = "inline-block";

  // Send user message to backend API
  var question = userInput;
  var apiKey = 'j86bwkwo-8hako-12C';
  isBotResponding = true;

  axios.get('https://lianeapi.onrender.com/@unregistered/api/wengai', {
    params: {
      key: apiKey,
      query: question,
    }
  }).then(response => {
    console.log(response.data); // Log response to console
    var aiMessage = '<div class="message-container"><div class="message ai-message">' + response.data.message + '</div></div>';
    chatArea.innerHTML += aiMessage;
    typingIndicator.style.display = "none"; // Hide typing indicator
    scrollToBottom();
    isBotResponding = false;

    // Enable input and send button
    document.getElementById("user-input").disabled = false;
    document.querySelector(".send-button").disabled = false;
  }).catch(error => {
    var errorMessage = '<div class="message-container"><div class="message ai-message">Sorry, I encountered an error.</div></div>';
    chatArea.innerHTML += errorMessage;
    typingIndicator.style.display = "none"; // Hide typing indicator
    scrollToBottom();
    isBotResponding = false;

    // Enable input and send button
    document.getElementById("user-input").disabled = false;
    document.querySelector(".send-button").disabled = false;
  });

  document.getElementById("user-input").value = ""; // Clear input field after sending message
}
