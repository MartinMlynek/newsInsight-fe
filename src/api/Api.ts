import axios from 'axios';
import { MessageWithDocs } from '../types/MessageWithDocs';
import { Question } from '../types/Question';

const URL = 'http://localhost:8080/';

interface ErrorResponse {
	errorMessage: string;
	status: 'FAILED';
}

interface ApiResponse<T> {
	status: 'SUCCESS';
	data: T;
}

type Result<T> = ApiResponse<T> | ErrorResponse;

export const sendQuestion = async (
	data: Question
): Promise<Result<MessageWithDocs>> => {
	try {
		const response = await axios.post<MessageWithDocs>(URL, data);
		const apiResponse: ApiResponse<MessageWithDocs> = {
			status: 'SUCCESS',
			data: response.data
		};

		return apiResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Axios error:', error.response?.data);
		} else {
			console.error('Unknown error:', error);
		}
		const errorResponse: ErrorResponse = {
			errorMessage: 'Nastala chyba serveru',
			status: 'FAILED'
		};

		return errorResponse;
	}
};
