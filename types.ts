
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: 'Database' | 'Cloud' | 'SQL' | 'PL/SQL' | 'Javascript' | 'Security' | 'APEX';
  image: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  duration: string;
  views: string;
  publishedAt: string;
}

export type ViewState = 'home' | 'post' | 'about';
export type MobileTab = 'feed' | 'explore' | 'ai' | 'more';
