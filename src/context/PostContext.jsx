import { createContext } from 'react';

export const PostContext = createContext({
  triggerRefresh: () => { },
  onPostDeleted: () => { },
  onCommentDeleted: () => { },
});
