"use client";

import { useEffect, useMemo, useState } from "react";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { SelectionChip } from "@/components/ui/SelectionChip";
import { DiscoverPost } from "@/components/features/DiscoverPost";
import { getDiscoverFeed } from "@/services/discover";
import type { DiscoverFeedItemResponse } from "@/types/api";

const tabs = ["Pour vous", "Abonnements"];

const fallbackPosts: DiscoverFeedItemResponse[] = [
  {
    id: "d1",
    title: "Le rituel du matin : bol d'énergie verte",
    body: "Commencer la journée par des lipides sans amertume crée une clarté mentale durable.",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80&auto=format&fit=crop",
    type: "EDITORIAL",
    isCurated: true,
    shareCount: 12,
    createdAt: new Date().toISOString(),
    authorId: "u2",
    authorUsername: "julianne",
    authorDisplayName: "Julianne Morel",
    authorAvatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&auto=format&fit=crop",
    recipeId: null,
    recipeTitle: null,
    likeCount: 120,
    commentCount: 16,
    likedByCurrentUser: false,
  },
  {
    id: "d2",
    title: "Infusions adaptogènes pour le sommeil",
    body: "L'ashwagandha et la mélisse préparent le système nerveux à une régénération profonde.",
    imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80&auto=format&fit=crop",
    type: "TIP",
    isCurated: false,
    shareCount: 45,
    createdAt: new Date().toISOString(),
    authorId: "u3",
    authorUsername: "marcus",
    authorDisplayName: "Marcus Chen",
    authorAvatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop",
    recipeId: null,
    recipeTitle: null,
    likeCount: 89,
    commentCount: 7,
    likedByCurrentUser: false,
  },
];

export default function DecouvrirPage() {
  const [activeTab, setActiveTab] = useState("Pour vous");
  const [feed, setFeed] = useState<DiscoverFeedItemResponse[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDiscoverFeed(0, 20);
        setFeed(data);
      } catch {
        setFeed(fallbackPosts);
      }
    };
    void load();
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === "Pour vous") {
      return feed.filter((post) => post.isCurated || post.type === "EDITORIAL");
    }
    return feed.filter((post) => !post.isCurated);
  }, [activeTab, feed]);

  return (
    <div className="space-y-8">
      <MotionFadeIn>
        <h1 className="page-title">L&apos;Apothicaire du Quotidien.</h1>
      </MotionFadeIn>

      <MotionFadeIn delay={0.03} className="flex gap-3">
        {tabs.map((tab) => (
          <SelectionChip key={tab} label={tab} selected={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </MotionFadeIn>

      <div className="space-y-6">
        {filtered.map((post, index) => (
          <MotionFadeIn key={post.id} delay={0.08 + index * 0.03}>
            <DiscoverPost post={post} />
          </MotionFadeIn>
        ))}
      </div>
    </div>
  );
}
