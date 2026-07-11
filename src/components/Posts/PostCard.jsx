import {Card} from "@heroui/react";
import {FaCommentDots, FaHeart, FaImage, FaShareAlt, FaBookmark} from "react-icons/fa";

import Comments from '../Comments/Comments'
import { useState } from "react";

function formatPostDate(dateValue) {
  if (!dateValue) return "Recently";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

export default function PostCard({ post }) {
  const userName = post?.user?.name ?? "Unknown user";
  const userHandle = post?.user?.username ? `@${post.user.username}` : "@unknown";
  const userPhoto = post?.user?.photo;
  const postImage = post?.image;
  const [isCommentClick, setCommentClick] = useState(false);

  function handleCommentClick() {
    setCommentClick((currentValue) => !currentValue);
  }

  return (
    <Card className=" overflow-hidden border border-default-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <img
            alt={userName}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-default-100 sm:h-12 sm:w-12"
            src={userPhoto}
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">{userName}</h3>
              <span className="text-xs text-default-500 sm:text-sm">{userHandle}</span>
              <span className="rounded-full bg-default-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-default-600">
                {post?.privacy ?? "public"}
              </span>
            </div>

            <p className="mt-1 text-xs text-default-500 sm:text-sm">{formatPostDate(post?.createdAt)}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3 sm:mt-5">
          <p className="whitespace-pre-wrap text-sm leading-6 text-foreground-700 sm:text-[15px]">
            {post?.body || "No post content available."}
          </p>

          {postImage ? (
            <div className="overflow-hidden rounded-2xl border border-default-200 bg-default-100">
              <img
                alt={post?.body ? `Post by ${userName}` : "Post media"}
                className="max-h-105 w-full object-cover"
                src={postImage}
              />
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-default-200 pt-4 text-xs text-default-500 sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-default-100 px-3 py-1.5 font-medium">
            <FaHeart className={post?.likesCount ? "text-danger" : "text-default-400"} />
            {post?.likesCount ?? 0}
          </span>
          <button
            type="button"
            onClick={handleCommentClick}
            className="inline-flex items-center gap-1.5 rounded-full bg-default-100 px-3 py-1.5 font-medium transition-colors hover:bg-default-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-expanded={isCommentClick}
            aria-label="Toggle comments"
          >
            <FaCommentDots className="text-primary" />
            {post?.commentsCount ?? 0}
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-default-100 px-3 py-1.5 font-medium">
            <FaShareAlt className="text-secondary" />
            {post?.sharesCount ?? 0}
          </span>
          {post?.bookmarked ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-100 px-3 py-1.5 font-medium text-warning-700">
              <FaBookmark />
              Saved
            </span>
          ) : null}
          {post?.image ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-default-100 px-3 py-1.5 font-medium">
              <FaImage className="text-default-400" />
              Image
            </span>
          ) : null}
        </div>
      </div>
      {isCommentClick && post?.topComment ? <Comments comment={post.topComment} /> : null}
    </Card>
  );
}