import { Card, Spinner } from "@heroui/react";
import { FaCommentDots, FaHeart, FaImage, FaShareAlt, FaBookmark, FaArrowRight } from "react-icons/fa";

import Comments from '../Comments/Comments'
import ShowMoreCommantBtn from "../Comments/ShowMoreCommantBtn";
import { Link } from "react-router-dom";
import CreateComment from "../Comments/CreateComment";
import { useState } from "react";

function formatPostDate(dateValue) {
  if (!dateValue) return "Recently";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

export default function PostCard({ post, comments, getComments, pagination, loading, isDetails = false }) {
  const userName = post?.user?.name ?? "Unknown user";
  const userHandle = post?.user?.username ? `@${post.user.username}` : "@unknown";
  const userPhoto = post?.user?.photo;
  const postImage = post?.image;

  const [showCommnets, setShowComments] = useState(false)



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


          <span className="inline-flex items-center gap-1.5 rounded-full bg-default-100 px-3 py-1.5 font-medium cursor-pointer" onClick={() => setShowComments(prev => !prev)}>
            <FaCommentDots className="text-primary" />
            {post?.commentsCount ?? 0}
          </span>

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

          {!isDetails && (
            <Link
              to={`/posts/${post?.id}`}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-4 py-1.5 font-medium text-primary-600 transition-colors hover:bg-primary-100"
            >
              Details <FaArrowRight className="text-[10px]" />
            </Link>
          )}
        </div>
      </div>
      {!isDetails && post?.topComment ? <Comments comment={post.topComment} /> : null}
      {!isDetails && post?.commentsCount ? <Link to={`/posts/${post.id}`}> <ShowMoreCommantBtn className="w-full" /> </Link> : null}

      {showCommnets && !isDetails &&
        <div className="mt-4">
          <CreateComment postId={post?.id} />
        </div>
      }

      {isDetails &&
        <div className="mt-4">
          <CreateComment postId={post?.id} />
        </div>
      }

      {comments && (
        <>
          <div className="space-y-4">
            {/* Comments Section */}
            <h3 className="text-xl font-bold text-foreground">Comments ({pagination.total})</h3>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment._id || comment.id} className="p-4 sm:p-5 bg-white border border-default-200 rounded-2xl shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <img
                      src={comment?.commentCreator?.photo}
                      alt={comment?.commentCreator?.name}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-default-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">
                          {comment?.commentCreator?.name}
                        </h4>
                        <span className="text-xs text-default-500">
                          {comment?.commentCreator?.username ? `@${comment.commentCreator.username}` : ''}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-default-700 whitespace-pre-wrap leading-relaxed">
                        {comment?.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {loading && comments.length > 0 && (
              <div className="flex justify-center py-4">
                <Spinner size="md" />
              </div>
            )}

            {!loading && pagination.currentPage < pagination.numberOfPages && (
              <div className="flex justify-center pt-4">
                <ShowMoreCommantBtn
                  onClick={() => getComments(pagination.currentPage + 1)}
                  className="w-full sm:w-auto"
                />
              </div>
            )}

            {!loading && comments.length === 0 && (
              <p className="text-center text-default-500 py-8">No comments yet. Be the first to comment!</p>
            )}
          </div>

        </>
      )}
    </Card>
  );
}