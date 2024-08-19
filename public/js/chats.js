$( '.friend-drawer--onhover' ).on( 'click',  function() {
    var dataId = $(this).attr('data-id');
    console.log(dataId);
    $( '.chat-bubble' ).hide('slow').show('slow');
    
  });


  const ChatExpansion = document.querySelectorAll(".menuHamburger")
  const chatList = document.getElementById("chaListContainer")
  const messageContainer = document.getElementById("messageContainer")
  ChatExpansion.forEach(icon =>{
    icon.addEventListener("click", function(){
        chatList.classList.toggle('expanded');
        
        messageContainer.classList.toggle('maxWidthContainer')
    })
  })