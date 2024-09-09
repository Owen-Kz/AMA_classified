const { configDotenv } = require("dotenv");

const SaveMessage = async (data, roomId, userId) => {
    try {
    const recipientId = data.receiver;
    const content = data.message;
    const senderId = data.name;
    const timestamp = data.dateTime;

    const buffer_id = data.inbox;
    const MessaggeData = {
        roomId: buffer_id,
        message: content,
        recipient: recipientId,
        sender: senderId
    };

  
        const response = await fetch(`${process.env.ENDPOINT}/y/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(MessaggeData)
        });
        const responseData = await response.json();
        if (responseData.success) {
            return responseData; // resolve the promise with the response data
        } else {
            throw new Error(responseData.error); // reject the promise with an error
        }
    } catch (error) {
        throw new Error(error.message); // reject the promise with an error
    }
};

module.exports = SaveMessage;
