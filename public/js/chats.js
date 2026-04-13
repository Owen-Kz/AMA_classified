let otherUser = ""
let dataId = ""
let chatHistory = []
const displayedMessageIds_Array = []
let newMessages = []; // Array to store new message elements
    

const nameInput = document.getElementById('senderId')
const inputFieldContainer = document.getElementById("inputFieldContainer")
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
const MessgeList = document.getElementById("messageList")
const send = document.getElementById("send")
const submit = document.getElementById("submit")
send.addEventListener("click", function(){
    submit.click()
})

const ChatExpansion = document.querySelectorAll(".menuHamburger")
const chatListContainer = document.getElementById("chaListContainer")
const messageContainer = document.getElementById("mainMessageBody")
const messsgeHeaderTop = document.getElementById("messageHeaderTop")


let displayedMessages = 0; // Number of messages currently displayed
const messagesPerLoad = 40; // Number of messages to load per scroll

  // Get the IDs of messages already displayed
  const displayedMessageIds = new Set();
  const displayedMessages_ = messageContainer.querySelectorAll('.chat-bubble');

  function GetParameters(href){
    // Get the URL string
    const urlString = href;
    
    // Create a URL object
    const url = new URL(urlString);
    
    // Get the search parameters from the URL
    const searchParams = new URLSearchParams(url.search);
    return searchParams
    
}

const TOChat = GetParameters(window.location.href).get("s")

const socket = io()
async function GetChatHistory(room){
    return fetch(`/chatHistory`, {
        method:"POST", 
        body:JSON.stringify({roomId:room}),
        headers:{
            "Content-Type":"application/JSON"
        }
    }).then(res => res.json())
    .then(data=>{
        if(data){
            messageContainer.innerHTML = ""
            return data.messages
        }else{
            return []
        }
    })
}

async function addMessageToUI_HIstory(isOwnMessage, message, timestamp, messageId) { 
    const element = ` 
          <div class="row no-gutters">
                      <div class="col-md-9">
                          <div class="chat-bubble ${isOwnMessage ? 'chat-bubble--right' : 'chat-bubble--left'}" data-message-id="${messageId}">
                          ${message}
                          </div>
                      </div>
                      </div>
    `;
    
    newMessages.push(element); // Add the element to the array
}
async function GetSellerDetails(uid){
    return fetch(`/seller/profile/details/`, {
        method:"POST",
        body:JSON.stringify({u_id:uid}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data.success){
            messsgeHeaderTop.innerHTML = ""
            const details = data.sellerDetails
           
            return details
        }else{
            return []
        }
    })
}

async function CheckForChatList(){


    $( '.friend-drawer--onhover' ).on( 'click', async function() {
        messageContainer.innerHTML = ""
        displayedMessageIds.clear();
        dataId = $(this).attr('data-id');
        otherUser = $(this).attr('data-user-id');
        chatHistory = await GetChatHistory(dataId)
        const details = await GetSellerDetails(otherUser)
        chatHistory.reverse();
        messsgeHeaderTop.innerHTML = ` 
        <img class="profile-image" src="/plugins/images/users1.jpg" alt="">
        <div class="text">
          <h6>${details.u_name}</h6>

        </div>
 `
 inputFieldContainer.style.display = "flex";
        $( '.chat-bubble' ).hide('slow').show('slow');
        
        chatListContainer.classList.toggle('mobileListClose');
        // messageContainer.classList.toggle('maxWidthContainer')
        messageContainer.classList.toggle('maxWidthContainer')


    
      displayedMessages_.forEach(msg => {
        const msgId = msg.getAttribute('data-message-id');
        if (msgId) {
          displayedMessageIds.add(msgId);
        }
      });
    
            if(chatHistory.length > 0){
            if(chatHistory.length < messagesPerLoad){
            chatHistory_(0, chatHistory.length)
            displayedMessages += chatHistory.length;
            }else{
                chatHistory_(0, messagesPerLoad - 1)
            displayedMessages += messagesPerLoad;
            }
            }
socket.emit("join-room", dataId, userId);
    scrollToBottom();
    

      });
      if(TOChat && TOChat != ""){
        CreateNewMessage(TOChat)
      }
}

function generateRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}





ChatExpansion.forEach(icon =>{
    icon.addEventListener("click", function(){
        // chatListContainer.classList.toggle('expanded');
        chatListContainer.classList.toggle('mobileListClose');

        
        messageContainer.classList.toggle('maxWidthContainer')
      // messageContainer.classList.toggle('minWidthContainer')
    })
  })

// FORMAT the TIMESTAMP 
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
  
    // return `${dayName}, ${monthName} ${day}, ${hours}:${minutes}`;
    return `${dayName}, ${hours}:${minutes}`;
  
  
  }
  
function GetAllChats() {
    fetch(`/myChats`, {
        method:"GET"
    }).then(res=>res.json())
    .then(async data=>{
        if(data){
            if(data.success){         
            const AllChats = data.chatList
            for(let i=0; i<AllChats.length; i++){
                let userInfo = []
                let rule = ""

                if(i < AllChats.length){
                    rule = "<hr>"
                }else{
                    rule = ""
                }
                if(AllChats[i].sender_id == nameInput.value){
                    userInfo = await GetSellerDetails(AllChats[i].receiver_id)
                }else{
                    userInfo = await GetSellerDetails(AllChats[i].sender_id)
                }

                chatListContainer.innerHTML += `
                <div class="friend-drawer friend-drawer--onhover" data-id="${AllChats[i].message_id}" data-user-id="${userInfo.id}">
                          <img class="profile-image" src="/plugins/images/users1.jpg" alt="">
                          <div class="text">
                            <h6>${userInfo.u_name}</h6>
                            <p class="text-muted">${AllChats[i].slug}</p>
                          </div>
                          <span class="time text-muted small">${formatTimestamp(AllChats[i].updated_at)}</span>
                        </div>
                        ${rule}` 
                        CheckForChatList()
            }
            
        }else{
            console.log(data.error)
        }
        }
    })
}

GetAllChats()




// Get chat History -
// Clear the newMessages array


async function chatHistory_(startIndex, endIndex) {
  if(chatHistory.length > 0){
    messageContainer.innerHTML = ""
  newMessages.length = 0;

  // Iterate through the chat history array
  for (i = endIndex -1 ; i >= startIndex; i--) {
    const chatMessage = chatHistory[i];
    const messageId = chatMessage.id; // Replace with the actual message ID property
// console.log(messageId)
    if (!displayedMessageIds.has(messageId)) {
      // Message not displayed yet, proceed to add it
      const isOwnMessage = chatMessage.sender_id == nameInput.value;
      const message = chatMessage.reply;
      

      const originalTimestamp = new Date(chatMessage.updated_at);
      const formattedTimestamp = formatTimestamp(originalTimestamp);

      const timestamp_ = formattedTimestamp;
    //   const Sender_ = chatMessage.sender_id;
      // Add the message to the newMessages array
     await addMessageToUI_HIstory(isOwnMessage, message, timestamp_, messageId);

      // Add the message ID to the displayedMessageIds set
      displayedMessageIds.add(messageId);
      displayedMessageIds_Array.push(messageId)
    }else{
    }
  }

  // Insert the new messages at the beginning of the container
  messageContainer.innerHTML = newMessages.join('') + messageContainer.innerHTML;
}
}


// Function to handle scroll event
let isLoadingMessages = false; // Flag to track if messages are being loaded


// Function to handle scroll event
async function handleScroll() {
  const scrollTop = messageContainer.scrollTop;
  if (scrollTop === 0 && displayedMessages >= messagesPerLoad && !isLoadingMessages) {
    isLoadingMessages = true; // Set the flag to true
    // const endIndex = displayedMessages + 1;
    // const endIndex = chatHistory.length - displayedMessageIds.length;
    if(messagesPerLoad >= chatHistory.length){
    // const startIndex = Math.max(displayedMessageIds_Array[0] - (messagesPerLoad + 1), 0);
    const startIndex = chatHistory[0];

    const endIndex = chatHistory.length;

    await chatHistory_(startIndex, endIndex);
    displayedMessages = startIndex + 1;
    console.log(startIndex, endIndex,displayedMessages)
    }else if(messagesPerLoad <= chatHistory.length){
    const startIndex = 9;
    // const startIndex = Math.max((displayedMessageIds_Array[0]) - messagesPerLoad),0);
    const endIndex = chatHistory.length;

    // console.log(chatHistory);
    await chatHistory_(startIndex, endIndex);

    displayedMessages = displayedMessageIds_Array.length;

    }
 

    // const startIndex = Math.max(endIndex - displayedMessages + 1, 0);

    isLoadingMessages = false; // Reset the flag after loading
  }
}

// Debounce function
function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}

// Debounced scroll handler
const debouncedHandleScroll = debounce(handleScroll, 300);

// Attach debounced scroll event listener to chat container
// messageContainer.addEventListener('scroll', debouncedHandleScroll);

//END PAGINATION CODE

// Submit messages 
messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})

// Generate unique sockets and rooms 
// Generate a unique room ID based on the user IDs

// const roomId = dataId
const userId = nameInput.value; // Replace with actual user ID


async function sendMessage() {
  if (messageInput.value === '') return
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    receiver: otherUser,
    inbox: dataId,
    dateTime: new Date(),
  }
  socket.emit('message', data, dataId)
  messageInput.value = ''
}

socket.on('chat-message', async (data, isOwnMessage) => {
  if(data.name === userId){
    await addMessageToUI(true, data)
  }else{
    await addMessageToUI(false, data)
  }
})



async function addMessageToUI(isOwnMessage, data) {
  clearFeedback()

  const element = `<div class="row no-gutters">
                    <div class="col-md-9">
                        <div class="chat-bubble ${isOwnMessage ? 'chat-bubble--right' : 'chat-bubble--left'}" data-message-id="${data.dateTime+data.inbox}">
                        ${data.message}
                        </div>
                    </div>
                    </div>
                    `;

  messageContainer.innerHTML += element
  scrollToBottom()
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

messageInput.addEventListener('focus', (e) => {
  socket.emit('feedback', {
    feedback: `✍️ Typing....`,
  })
})

messageInput.addEventListener('keypress', (e) => {
  socket.emit('feedback', {
    feedback: `✍️ Typing...`,
  })
})
messageInput.addEventListener('blur', (e) => {
  socket.emit('feedback', {
    feedback: '',
  })
})

socket.on('feedback', (data) => {
  clearFeedback()
  const element = `
        <div class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </div>
  `
  messageContainer.innerHTML += element
})

function clearFeedback() {
  document.querySelectorAll('div.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element)
  })
}



// ADD NEw Chat MESSAGES 
// CReate New Message if query parameter exists 
async function CreateNewMessage(TOChat){
  const newUserData = await GetSellerDetails(TOChat);
  const randomNumber = generateRandomSixDigitNumber();
  let rule = "<hr>";

  // Check if the chat already exists
  const existingChat = document.querySelector(`.friend-drawer--onhover[data-user-id="${newUserData.id}"]`);

  if (!existingChat) {
      chatListContainer.innerHTML += `
          <div class="friend-drawer friend-drawer--onhover" data-id="${randomNumber}" data-user-id="${newUserData.id}">
              <img class="profile-image" src="/plugins/images/users1.jpg" alt="">
              <div class="text">
                  <h6>${newUserData.u_name}</h6>
                  <p class="text-muted">Click Here to send Message</p>
              </div>
              <span class="time text-muted small"></span>
          </div>
          ${rule}
      `;
      CheckForChatList();
  } else {
      // Optionally, bring the existing chat to focus
      existingChat.scrollIntoView({ behavior: 'smooth', block: 'center' });
      existingChat.classList.add('highlight'); // Add a highlight effect
      setTimeout(() => existingChat.classList.remove('highlight'), 2000); // Remove highlight after 2 seconds
  }
}


