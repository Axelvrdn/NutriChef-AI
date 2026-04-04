"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { addPostComment, getPostComments } from "@/services/discover";
import type { PostCommentResponse } from "@/types/api";

interface CommentThreadProps {
  postId: string;
  open: boolean;
  onClose: () => void;
  onCommentAdded?: () => void;
}

export function CommentThread({ postId, open, onClose, onCommentAdded }: CommentThreadProps) {
  const [comments, setComments] = useState<PostCommentResponse[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const load = async () => {
      try {
        const data = await getPostComments(postId);
        setComments(data);
      } catch {
        setComments([]);
      }
    };
    void load();
  }, [open, postId]);

  if (!open) return null;

  return (
    <>
      <button type="button" onClick={onClose} className="fixed inset-0 z-40 bg-black/40" aria-label="Fermer les commentaires" />
      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-[var(--color-surface-card)] p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Commentaires</h3>
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
        </div>
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-xl bg-[var(--color-surface-low)] p-3">
              <p className="text-sm font-semibold">{comment.authorUsername}</p>
              <p className="text-sm text-[var(--color-on-surface-soft)]">{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 ? <p className="text-sm text-[var(--color-on-surface-soft)]">Aucun commentaire.</p> : null}
        </div>
        <form
          className="mt-4 space-y-2"
          onSubmit={async (event) => {
            event.preventDefault();
            if (!content.trim()) return;
            setLoading(true);
            try {
              const created = await addPostComment(postId, content.trim());
              setComments((prev) => [created, ...prev]);
              setContent("");
              onCommentAdded?.();
            } finally {
              setLoading(false);
            }
          }}
        >
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Écrire un commentaire..."
            className="min-h-20 w-full rounded-xl border border-[var(--color-outline)] bg-white px-3 py-2"
          />
          <Button type="submit" disabled={loading || !content.trim()}>
            {loading ? "Envoi..." : "Publier"}
          </Button>
        </form>
      </aside>
    </>
  );
}
