
  //// Coffee counter logic
window.addEventListener('load',()=> {  
  document.getElementById('button-coffee').addEventListener('click', ()=> {
    //grab the cups value
    let nameCountry = document.getElementById('name_country').value;
    let nameCity = document.getElementById('name_city').value;
    let dateVisit = document.getElementById('date_visit').value;
    let memoVisit = document.getElementById('memo_visit').value;
  
    console.log(nameCountry);
    console.log(nameCity);
    console.log(dateVisit);
    console.log(memoVisit);


    //create the object 
    let obj = {"date" : dateVisit, "country" : nameCountry, "city" : nameCity, "memo" : memoVisit};

    //stringify the object
    let jsonData = JSON.stringify(obj);

    //fetch to route noCups
    fetch('/nameCountry', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {console.log(data)});

    //1. make a fetch request of type POST so that we can send the (noCups) info to the server
})

document.getElementById('get-tracker').addEventListener('click', ()=> {
    //get info on ALL the coffees we've had so far
    fetch('/getCups')
    .then(resp=> resp.json())
    .then(data => {
        document.getElementById('coffee-info').innerHTML = '';
        console.log(data.data);
        for(let i=0;i<data.data.length;i++) {
            let string = " # " + data.data[i].date + " @ " + data.data[i].country + " / " + data.data[i].city + " => " + data.data[i].memo;
            let elt = document.createElement('p');
            elt.innerHTML = string;
            document.getElementById('coffee-info').appendChild(elt);
        }

    })
})

});

window.addEventListener('load', function () {

  //Open and connect socket
  let socket = io();
  //Listen for confirmation of connection
  socket.on('connect', function () {
    console.log("Connected");
  });

  /* --- Code to RECEIVE a socket message from the server --- */
  let chatBox = document.getElementById('chat-box-msgs');

  //Listen for messages named 'msg' from the server
  socket.on('msg', function (data) {
    console.log("Message arrived!");
    console.log(data);

    //Create a message string and page element
    let receivedMsg = data.name + ": " + data.msg;
    let msgEl = document.createElement('p');
    msgEl.innerHTML = receivedMsg;

    //Add the element with the message to the page
    chatBox.appendChild(msgEl);
    //Add a bit of auto scroll for the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  /* --- Code to SEND a socket message to the Server --- */
  let nameInput = document.getElementById('name-input')
  let msgInput = document.getElementById('msg-input');
  let sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', function () {
    let curName = nameInput.value;
    let curMsg = msgInput.value;
    let msgObj = { "name": curName, "msg": curMsg };

    //Send the message object to the server
    socket.emit('msg', msgObj);
  });
});



