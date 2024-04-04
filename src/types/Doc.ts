interface Metadata {
	date: string;
	link: string;
	news: string;
}

export interface Doc {
	page_content: string;
	metadata: Metadata;
}
