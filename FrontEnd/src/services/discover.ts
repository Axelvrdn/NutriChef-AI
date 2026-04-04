import { http } from "@/services/http";
import type { DiscoverFeedItemResponse, PostCommentResponse } from "@/types/api";

export async function getDiscoverFeed(page = 0, size = 20): Promise<DiscoverFeedItemResponse[]> {
  const { data } = await http.get<DiscoverFeedItemResponse[]>("/api/discover/feed", {
    params: { page, size },
  });
  return data;
}

export async function togglePostLike(postId: string): Promise<{ liked: boolean }> {
  const { data } = await http.post<{ liked: boolean }>(`/api/discover/posts/${postId}/like`);
  return data;
}

export async function registerPostShare(postId: string): Promise<{ shareCount: number }> {
  const { data } = await http.post<{ shareCount: number }>(`/api/discover/posts/${postId}/share`);
  return data;
}

export async function getPostComments(postId: string): Promise<PostCommentResponse[]> {
  const { data } = await http.get<PostCommentResponse[]>(`/api/discover/posts/${postId}/comments`);
  return data;
}

export async function addPostComment(postId: string, content: string): Promise<PostCommentResponse> {
  const { data } = await http.post<PostCommentResponse>(`/api/discover/posts/${postId}/comments`, { content });
  return data;
}
