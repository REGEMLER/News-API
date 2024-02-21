export type source = {
    id: string;
    category: string;
    country: string;
    description: string;
    language: string;
    name: string;
    url: string;
};
export type article = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    urlToImage: string;
    url: string;
    source: { id: string; name: string };
};
export type option = { sources?: string; apiKey?: string };
export type respParams = { endpoint: string; options?: option };
interface fullData {
    status: string;
    articles: article[];
    sources: source[];
    totalResults?: number;
}
export type articleData = Pick<fullData, 'status' | 'articles' | 'totalResults'>;
export type sourceData = Pick<fullData, 'status' | 'sources' | 'totalResults'>;
