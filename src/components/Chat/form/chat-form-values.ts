import { Question } from '../../../types/Question';

export type ChatFormValues = Question;

export const defaultChatFormValues: ChatFormValues = {
	question: '',
	time: 'm'
};
