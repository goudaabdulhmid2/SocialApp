import { useContext, useEffect, useState } from "react";
import { FiImage, FiSmile, FiSend } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ValidationMessage from "../shared/ValidationMessage/ValidationMessage";
import { showApiErrorToast } from "../shared/ApiErrorDisplay/ApiErrorDisplay";
import SubmitButton from "../shared/submitButton/SubmitButton";
import createCommentSchema from "../../schemas/comments/CreateCommentSchema";
import EmojiPicker from "emoji-picker-react";
import CommentServices from "../../services/CommentServices";
import { PostContext } from "../../context/PostContext";


export default function CreateComment({ postId }) {
  const { triggerRefresh } = useContext(PostContext);

  const { userData } = useContext(AuthContext)
  const { register, control, handleSubmit, reset, watch, setValue, getValues } = useForm({
    resolver: zodResolver(createCommentSchema),
    mode: "onChange",
  });

  const imageFiles = watch('image')
  const [imagePreview, setImagePreview] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const onEmojiClick = (emojiObject) => {
    const currentBody = getValues('content') || "";
    setValue('content', currentBody + emojiObject, { shouldValidate: true, shouldDirty: true });
  }

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      const url = URL.createObjectURL(imageFiles[0]);
      setImagePreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setImagePreview(null)
    }
  }, [imageFiles])

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append('content', data.content);

      if (data.image?.[0]) {
        formData.append('image', data.image[0]);
      }

      const res = await CommentServices.createComment(postId, formData);

      console.log(res)

      reset({ content: "", image: null });
      setShowEmojiPicker(false);
      triggerRefresh?.(postId);

    } catch (err) {
      showApiErrorToast(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-3 w-full relative">
      {/* Avatar */}
      <img
        src={userData?.photo}
        alt="User"
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />

      {/* Input Area */}
      <div className="flex-1 rounded-2xl bg-[#f0f2f5] p-3">
        <textarea
          {...register("content")}
          placeholder={`Comment as ${userData?.name}...`}
          rows={1}
          className="w-full resize-none bg-transparent text-sm text-slate-800 placeholder:text-slate-500 outline-none"
        />

        {/* Action Buttons */}
        <div className="mt-3 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <label
              htmlFor={`comment-image-${postId}`}
              className="text-slate-500 transition-colors hover:text-slate-700 cursor-pointer"
              aria-label="Add photo"
            >
              <FiImage className="h-5 w-5" />
              <input
                type="file"
                id={`comment-image-${postId}`}
                accept="image/*"
                className="hidden"
                {...register("image")}
              />
            </label>
            <button
              type="button"
              className="text-slate-500 transition-colors hover:text-slate-700 cursor-pointer"
              aria-label="Add emoji"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FiSmile className="h-5 w-5" />
            </button>
            {showEmojiPicker && (
              <div className="absolute top-10 left-0 z-50">
                <EmojiPicker onEmojiClick={(e) => onEmojiClick(e.emoji)} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <SubmitButton control={control} submitLabel="" action="Sending..." icon={FiSend} />
          </div>
        </div>

        <ValidationMessage control={control} name="content" />
        <ValidationMessage control={control} name="image" />

        {imagePreview && (
          <div className="mt-2 relative inline-block">
            <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-lg" />
            <button
              type="button"
              onClick={() => setValue("image", null)}
              className="absolute top-1 right-1 bg-white rounded-full h-5 w-5 flex items-center justify-center shadow-sm text-red-500 hover:bg-gray-100 text-xs"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
