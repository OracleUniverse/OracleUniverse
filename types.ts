
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: 'Database' | 'Cloud' | 'SQL' | 'PL/SQL' | 'Java' | 'Security' | 'APEX';
  image: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type ViewState = 'home' | 'post' | 'about';
export type MobileTab = 'feed' | 'explore' | 'ai' | 'more';
