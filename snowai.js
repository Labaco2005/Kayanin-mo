document.addEventListener('DOMContentLoaded', function () {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const stopButton = document.getElementById('stop-button');
  const chatMessages = document.getElementById('chat-messages');
  const typingIndicator = document.getElementById('typing-indicator');
  const introBox = document.getElementById('intro-box');
  const uidBox = document.getElementById('uid-box');
  const confirmBox = document.getElementById('confirm-box');
  const confirmMessage = document.getElementById('confirm-message');
  const confirmYesButton = document.getElementById('confirm-yes');
  const confirmNoButton = document.getElementById('confirm-no');
  const usernameInput = document.getElementById('username-input');
  const uidInput = document.getElementById('uid-input');
  const usernameSubmitButton = document.getElementById('username-submit');
  const uidSubmitButton = document.getElementById('uid-submit');
  const backButton = document.getElementById('back-button');
  let typingInterval;
  let username = '';
  let uid = '';

  // Disable message input and send button by default
  messageInput.disabled = true;
  sendButton.disabled = true;

  // Show intro box
  introBox.style.display = 'block';

  // Username submission
  usernameSubmitButton.addEventListener('click', function () {
    username = usernameInput.value.trim();
    if (username !== '') {
      // Show UID box
      uidBox.style.display = 'block';
      // Hide intro box
      introBox.style.display = 'none';
    }
  });

  // UID submission
  uidSubmitButton.addEventListener('click', function () {
    uid = uidInput.value.trim();
    if (uid !== '') {
      // Ask for confirmation
      showConfirmBox(`Is "${username}" and ${uid} your final username and ID?`);
    }
  });

  // Confirm username and UID
  confirmYesButton.addEventListener('click', function () {
    introBox.style.display = 'none';
    uidBox.style.display = 'none';
    // Enable message input and send button
    messageInput.disabled = false;
    sendButton.disabled = false;
    // Welcome message
    appendMessage('Snow-Ai', `Welcome, ${username}!`);
    // Start main website intro after 5s
    setTimeout(startMainWebsiteIntro, 5000);
    // Hide confirm box
    confirmBox.style.display = 'none';
  });

  // Change username and UID
  confirmNoButton.addEventListener('click', function () {
    // Show username input again
    introBox.style.display = 'block';
    uidBox.style.display = 'none';
    // Clear input fields
    usernameInput.value = '';
    uidInput.value = '';
    // Hide confirm box
    confirmBox.style.display = 'none';
  });

  // Send message button click event
  sendButton.addEventListener('click', function () {
    const message = messageInput.value.trim();
    if (message !== '') {
      appendMessage(username || 'You', message);
      messageInput.value = '';
      showTypingIndicator(true);
      // Change send button to stop button
      sendButton.style.display = 'none';
      stopButton.style.display = 'inline-block';
      // Fetch AI response
      fetchAIResponse(message);
    }
  });

  // Stop button click event
  stopButton.addEventListener('click', function () {
    clearInterval(typingInterval);
    showTypingIndicator(false);
    // Change stop button to send button
    stopButton.style.display = 'none';
    sendButton.style.display = 'inline-block';
  });

  // Back button click event
  backButton.addEventListener('click', function () {
    // Redirect to mainCenter.html
    window.location.href = 'mainCenter.html';
  });

  // Function to append message to chat
  function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    if (sender === 'Snow-Ai') {
      const botProfilePic = document.createElement('span');
      botProfilePic.classList.add('bot-profile-pic');
      messageDiv.appendChild(botProfilePic);
    }
    messageDiv.innerHTML += `<strong>${sender}:</strong> `;
    chatMessages.appendChild(messageDiv);
    typeMessage(sender, message, messageDiv);
  }

  // Function to simulate typing
  function typeMessage(sender, message, messageDiv) {
    let i = 0;
    typingInterval = setInterval(function () {
      if (i < message.length) {
        messageDiv.innerHTML += message.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
        showTypingIndicator(false);
      }
    }, 30); // Typing speed
  }

  // Function to fetch AI response from API
  function fetchAIResponse(query) {
    fetch(`https://markdevs-last-api.onrender.com/gpt4?prompt=${query}&uid=${uid}`)
      .then(response => response.json())
      .then(data => {
        const response = data.gpt4 || 'Sorry, I could not understand that.';
        appendMessage('Snow-Ai', response);
        showTypingIndicator(false);
        // Change stop button to send button
        stopButton.style.display = 'none';
        sendButton.style.display = 'inline-block';
      })
      .catch(error => {
        console.error('Error fetching AI response:', error);
        appendMessage('Snow-Ai', 'Sorry, there was an error processing your request.');
        showTypingIndicator(false);
        // Change stop button to send button
        stopButton.style.display = 'none';
        sendButton.style.display = 'inline-block';
      });
  }

  // Function to show/hide typing indicator
  function showTypingIndicator(show) {
    if (show) {
      typingIndicator.classList.add('show');
    } else {
      typingIndicator.classList.remove('show');
    }
  }

  // Function to start main website intro
  function startMainWebsiteIntro() {
    // Start intro animation for main website
  }

  // Confirmation box functions
  function showConfirmBox(message) {
    confirmMessage.textContent = message;
    confirmBox.style.display = 'block';
  }
});
