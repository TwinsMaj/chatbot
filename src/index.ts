/* eslint-disable prefer-const */
import { getConversationId, getRequest, getUserId, postRequest } from './rivalClient';

(async () => {
	const userId = await getUserId();
	const conversationId = await getConversationId(userId);


	const processConvo = async () => {
		const targetOps = ['add', 'length', 'even', 'odd', 'sum', 'largest'];

		const convo = await getRequest(`challenge-behaviour/${conversationId}`);
		const question = convo[convo.length - 1].text;

		console.log('question', question);

		const sendAnswer = async (answer: string) => {
			const response = await postRequest(`challenge-behaviour/${conversationId}`, {
				content: answer,
			});

			return response;
		}

		if (question.toLowerCase().includes("are you")) {
			const possibleAnswers = ['yes', 'no']
			// respond
			const response = await sendAnswer(possibleAnswers[1])

			console.log('response', response)

			if (response === true) {
				await processConvo();
			} else {
				const response = await sendAnswer(possibleAnswers[0])

				console.log('response', response)
				if (response === true) {
					// pick another question
					await processConvo();
				}
			}
		} else {
			// split question
			let [operation, subjects] = question.split(':');
			subjects =  subjects.substring(0, subjects.length - 1);
			console.log(operation, subjects);

			if(operation.includes('sum')) {
				const answer = subjects.split(', ').reduce((total: number, item: number) => Number(total) + Number(item))

				console.log(answer)
				const response = await sendAnswer(String(answer))

				console.log(response)

				if (response) {
					await processConvo();
				}
			}
		}
	}

	await processConvo();

})()

const port = Number(process.env.PORT ?? 8000);
app.listen(port, '0.0.0.0', () => {
	console.log(`Server started at http://localhost:${port}`);
});
