import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { CommentThread } from "@/components/features/CommentThread";
import { registerPostShare, togglePostLike } from "@/services/discover";
import type { DiscoverFeedItemResponse } from "@/types/api";

interface DiscoverPostProps {
  post: DiscoverFeedItemResponse;
}

export function DiscoverPost({ post }: DiscoverPostProps) {
  const [liked, setLiked] = useState(post.likedByCurrentUser);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [shareCount, setShareCount] = useState(post.shareCount);
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <>
      <Card elevated className="overflow-hidden p-0">
        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          <img
            src={
              post.imageUrl ||
              "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1000&q=80&auto=format&fit=crop"
            }
            alt={post.title}
            className="h-full min-h-64 w-full object-cover"
          />
          <div className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <img
                src={
                  post.authorAvatarUrl ||
                  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80&auto=format&fit=crop"
                }
                alt={post.authorDisplayName || "Auteur"}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-[var(--color-on-surface)]">{post.authorDisplayName || post.authorUsername || "Équipe NutriFlow"}</p>
                <p className="text-xs text-[var(--color-on-surface-soft)]">{post.type}</p>
              </div>
            </div>
            <h3 className="font-manrope text-4xl font-semibold leading-tight text-[var(--color-on-surface)]">{post.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--color-on-surface-soft)]">{post.body}</p>
            <div className="flex items-center gap-6 text-sm text-[var(--color-on-surface-soft)]">
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={async () => {
                  const nextLiked = !liked;
                  setLiked(nextLiked);
                  setLikeCount((prev) => prev + (nextLiked ? 1 : -1));
                  try {
                    const res = await togglePostLike(post.id);
                    setLiked(res.liked);
                  } catch {
                    setLiked((prev) => !prev);
                    setLikeCount((prev) => prev + (nextLiked ? -1 : 1));
                  }
                }}
              >
                {liked ? "❤" : "♡"} {likeCount}
              </motion.button>
              <button type="button" onClick={() => setCommentsOpen(true)}>
                💬 {commentCount}
              </button>
              <button
                type="button"
                onClick={async () => {
                  setShareCount((prev) => prev + 1);
                  try {
                    const res = await registerPostShare(post.id);
                    setShareCount(res.shareCount);
                  } catch {
                    setShareCount((prev) => Math.max(prev - 1, 0));
                  }
                }}
              >
                ↪ {shareCount}
              </button>
            </div>
          </div>
        </div>
      </Card>
      <CommentThread
        postId={post.id}
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        onCommentAdded={() => setCommentCount((prev) => prev + 1)}
      />
    </>
  );
}
