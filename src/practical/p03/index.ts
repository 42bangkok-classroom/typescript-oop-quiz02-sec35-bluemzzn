import axios from "axios";

interface Post {
  userId?: number;
  id: number;
  title: string;
  body?: string;
}

interface Comment{
  postId : number;
  id : number;
  name? : string;
  email: string;
  body? : string;
}

interface filterdPost {
  postId: number;
  title: string;
  totalComments: number;
}

export async function getPostsByUser(): Promise<filterdPost[]> {
  try {
    const [postsResponse, commentsResponse] = await Promise.all([
      axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts'),
      axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
    ]);

    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    const countComments = comments.reduce((sum, comment) => {
      sum[comment.postId] = (sum[comment.postId] || 0) + 1;
      return sum;
    }, {} as Record<number,number>);

    return posts.map(post => ({ postId: post.id, title: post.title, totalComments: countComments[post.id] || 0 }));

  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
