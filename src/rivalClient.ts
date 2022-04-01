import axios from 'axios';

const BASE_URL = 'https://us-central1-rival-chatbot-challenge.cloudfunctions.net';

export const getUserId = async () => {
	try {
		const res = await axios.post(`${BASE_URL}/challenge-register`, {
				name: "Jane Doe",
				email: "jane@doe.com"
		});
		return res.data.user_id;
	} catch(error) {
		console.log(error);
	}
}

export const getConversationId = async (userId: number) => {
	try {
		const res = await axios.post(`${BASE_URL}/challenge-conversation`, {
				user_id: userId,
		});
		return res.data.conversation_id;
	} catch(error) {
		console.log(error);
	}
}

export const postRequest = async (path: string, data: any) => {
	try {
		const res = await axios.post(`${BASE_URL}/${path}`, data);
		return res.data.correct
	} catch(error) {
		console.log(error);
	}
}

export const getRequest = async (path: string) => {
	try {
		const res = await axios.get(`${BASE_URL}/${path}`);
		return res.data.messages;
	} catch(error) {
		console.log(error);
	}
}

