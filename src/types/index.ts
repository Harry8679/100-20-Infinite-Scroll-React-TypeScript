// Types pour l'infinite scroll

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  company: string;
  location: string;
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  author: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export interface UserCardProps {
  user: User;
}

export interface PhotoCardProps {
  photo: Photo;
}

export interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}