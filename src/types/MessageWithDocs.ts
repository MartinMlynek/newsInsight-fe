import { Message } from './Message';
import { Doc } from './Doc';

export interface MessageWithDocs {
	message: Message;
	docs?: Array<Doc>;
}
