import { Card, Spinner, Dropdown } from "@heroui/react";
import { FaCommentDots, FaHeart, FaImage, FaShareAlt, FaBookmark, FaArrowRight, FaEllipsisH, FaPen, FaTrash } from "react-icons/fa";

import Comments from '../Comments/Comments'
import ShowMoreCommantBtn from "../Comments/ShowMoreCommantBtn";
import { Link } from "react-router-dom";
import CreateComment from "../Comments/CreateComment";
import { useState, useContext } from "react";
import PostServices from "../../services/PostServices";
import { toast } from "react-hot-toast";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
import { showApiErrorToast } from "../shared/ApiErrorDisplay/ApiErrorDisplay";

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

  const { onPostDeleted } = useContext(PostContext);
  const { userData } = useContext(AuthContext);
  const [showCommnets, setShowComments] = useState(false);

  const handlePostDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;

    try {
      await PostServices.deletePost(post.id);
      toast.success("Post deleted successfully");
      onPostDeleted?.(post.id);
    } catch (error) {
      showApiErrorToast(error);
    }
  };

  const menuItems = [
    { key: "save", label: "Save post", icon: <FaBookmark className="text-default-500" /> }
  ];
  if (userData && (userData._id === post?.user?._id || userData.id === post?.user?.id)) {
    menuItems.push({ key: "edit", label: "Edit post", icon: <FaPen className="text-default-500" /> });
    menuItems.push({ key: "delete", label: "Delete post", icon: <FaTrash className="text-danger" />, isDanger: true });
  }

  return (
    <Card className="!overflow-visible border border-default-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
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

          <Dropdown placement="bottom-end">
            <Dropdown.Trigger className="text-default-400 hover:text-default-600 p-2 -mr-2 bg-transparent border-none cursor-pointer outline-none">
              <span className="flex items-center justify-center">
                <FaEllipsisH />
              </span>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu aria-label="Post actions" items={menuItems}>
                {(item) => (
                  <Dropdown.Item
                    key={item.key}
                    className={item.isDanger ? "text-danger" : ""}
                    color={item.isDanger ? "danger" : "default"}
                    startContent={item.icon}
                    onPress={() => {
                      if (item.key === 'delete') handlePostDelete();
                      // add edit post handler here later
                    }}
                  >
                    {item.label}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
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
      {/* Top Comment Preview */}
      {!isDetails && post?.topComment ? (

        <Comments comment={post.topComment} postId={post.id} isPreview />
      ) : null}
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
                <Comments key={comment._id || comment.id} comment={comment} postId={post.id} />
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