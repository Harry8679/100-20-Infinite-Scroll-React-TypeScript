import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { InfiniteScrollProps } from '../types';

export const InfiniteScroll = ({
  children,
  onLoadMore,
  hasMore,
  isLoading,
  loader,
  endMessage,
  threshold = 0.1,
  rootMargin = '100px',
}: InfiniteScrollProps) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    enabled: hasMore && !isLoading,
  });

  // Trigger load more when intersecting
  if (isIntersecting && hasMore && !isLoading) {
    onLoadMore();
  }

  return (
    <>
      {children}
      {hasMore && <div ref={targetRef}>{isLoading && loader}</div>}
      {!hasMore && endMessage}
    </>
  );
};