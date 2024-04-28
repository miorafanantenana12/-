const axios = require('axios');

module.exports = {
config : {
  name: "token",
  version: "1.0.0",
  role: 0, 
  author: "Anonymous",
  description: "Get token from Facebook API",
  commandCategory: "Generate",
  usages: "/token username: <username> password: <password>",
  cooldowns: 6,
},

onStart: async function ({ api, event, args }) {
  try {
    const [username, password] = args; 
    if (!username || !password) { 
      return api.sendMessage("Please enter a username and password", event.threadID, event.messageID);
    }

    api.sendMessage(`Getting token, please wait...`, event.threadID, event.messageID);

    const response = await axios.get(`https://eurix-api.replit.app/fbtoken?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    const token = response.data.data.access_token_eaad6v7
const tokensecond = response.data.data.access_token
const cookie = response.data.data.cookies

  api.sendMessage(`Token generate\n\nToken ${token}\n\n\n${tokensecond}\n\n\nCookie\n${cookie}`, event.threadID, event.messageID);

  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while getting the token", event.threadID, event.messageID);
  }
}
};
