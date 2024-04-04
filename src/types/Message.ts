export type Message = {
	author: 'Human' | 'AI';
	content: string;
	error?: boolean;
};
