import { Card } from "@heroui/react";

function formatCommentDate(dateValue) {
  if (!dateValue) return "Just now";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

export default function Comments({ comment }) {
  const commenterName = comment?.commentCreator?.name ?? "Unknown user";
  const commenterHandle = comment?.commentCreator?.username? `@${comment.commentCreator.username}` : "@unknown";
  const commenterPhoto = comment?.commentCreator?.photo;
  const commentBody =  comment?.content ?? "No comment content available.";

  return (
    <div className="border-t border-default-200 bg-default-50/70 px-4 py-4 sm:px-5 sm:py-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-default-500">Top comment</p>
          <p className="text-sm text-default-600">A quick look at the latest reply</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-default-500 shadow-sm">
          Preview
        </span>
      </div>

      <Card className="border border-default-200 bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <img
            alt={commenterName}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-default-100"
            src={commenterPhoto}
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h4 className="truncate text-sm font-semibold text-foreground">{commenterName}</h4>
              <span className="text-xs text-default-500">{commenterHandle}</span>
              <span className="rounded-full bg-default-100 px-2 py-0.5 text-[11px] font-medium text-default-600">
                {formatCommentDate(comment?.createdAt)}
              </span>
            </div>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-default-700">
              {commentBody}
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-default-500">
              <span className="rounded-full bg-default-100 px-2.5 py-1">Reply</span>
              <span className="rounded-full bg-default-100 px-2.5 py-1">Like</span>
              <span className="rounded-full bg-default-100 px-2.5 py-1">Share</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
