const axios = require('axios');

module.exports = {  
	config: { 
		name: "Mr_Bruno",  
		version: "1.0.0",  
		credits: "Anonymos :)",  
		hasPermission: 0,  
		commandCategory: "utility",  
		usage: "[ prefix ]quantum_quill [prompt]",  
		usePrefix: true,  
		cooldown: 0
	}, 
	
	onStart: async ({ api, event, args }) => {  
		try {      
			const query = args.join(" ");      
			if (query) {        
				const processingMessage = await api.sendMessage(`Asking 🌌 QuantumQuill. Please wait a moment...`, event.threadID);        
				const response = await axios.get(`https://lianeapi.onrender.com/@JenicaDev/api/quantum_quill?query=${encodeURIComponent(query)}`);                
				if (response.data && response.data.message) {          
					await api.sendMessage({ body: response.data.message.trim() }, event.threadID, event.messageID);          
					console.log(`Sent 🌌 QuantumQuill's response to the user`);        
				} else {          
					throw new Error(`Invalid or missing response from 🌌 QuantumQuill API`);        
				}        
				await api.unsendMessage(processingMessage.messageID);      
			}    
		} catch (error) {      
			console.error(`❌ | Failed to get 🌌 QuantumQuill's response: ${error.message}`);      
			api.sendMessage(`❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`, event.threadID);    
		}  
	}
};
