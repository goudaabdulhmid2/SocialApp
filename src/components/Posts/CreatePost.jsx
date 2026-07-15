import { useContext, useState, useEffect } from "react";
import { FaImage, FaSmile, FaGlobe, FaPaperPlane, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import createPostSchema from "../../schemas/posts/createPost.schema";
import EmojiPicker from "emoji-picker-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationMessage from "../shared/ValidationMessage/ValidationMessage";

import SubmitButton from "../shared/submitButton/SubmitButton";
import PostServices from "../../services/PostServices";
import { showApiErrorToast } from "../shared/ApiErrorDisplay/ApiErrorDisplay";

export default function CreatePost({ onPostCreated }) {
  const { userData } = useContext(AuthContext);
  const { photo, name } = userData;


  const { register, control, handleSubmit, reset, watch, setValue, getValues } = useForm({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
  });

  const imageFiles = watch("image");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiObject) => {
    const currentBody = getValues('body') || "";
    setValue('body', currentBody + emojiObject.emoji, { shouldValidate: true, shouldDirty: true });
  };

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      const url = URL.createObjectURL(imageFiles[0]);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [imageFiles]);

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append('body', data.body);

      if (data.image?.[0]) {
        formData.append('image', data.image[0]);
      }

      const res = await PostServices.creatPost(formData)

      console.log(res);
      reset({ body: "", image: null });
      setShowEmojiPicker(false);
      onPostCreated?.();
    } catch (err) {
      showApiErrorToast(err)
    }
  }

  return (
    <form className="mx-auto w-full max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start gap-3">
          <img
            alt={name}
            className="h-11 w-11 rounded-full object-cover"
            src={photo}
          />

          <div className="flex-1">
            <p className="text-base font-extrabold text-slate-900">{name}</p>

            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
              <FaGlobe className="h-3 w-3" />
              <select className="bg-transparent outline-none">
                <option value="public">Public</option>
                <option value="following">Followers</option>
                <option value="only_me">Only me</option>
              </select>
            </div>
          </div>
        </div>

        <div className="relative">
          <textarea
            {...register('body')}
            rows={4}
            placeholder={`What's on your mind, ${name}?`}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
          />
          <ValidationMessage name='body' control={control} />

        </div>

        {imagePreview && (
          <div className="relative mt-3 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
            <img src={imagePreview} alt="Preview" className="max-h-105 w-full object-cover" />
            <button
              type="button"
              onClick={() => setValue('image', null)}
              className="absolute top-3 right-3 bg-slate-900/50 text-white p-2 rounded-full hover:bg-slate-900/80 transition backdrop-blur-sm"
              aria-label="Remove image"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3">
          <div className="relative flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <FaImage className="text-emerald-600 h-4 w-4" />
              <span className="hidden sm:inline">Photo/video</span>
              <input {...register('image')} accept="image/*" className="hidden" type="file" />
            </label>
            <ValidationMessage name='image' control={control} />

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                <FaSmile className="text-amber-500 h-4 w-4" />
                <span className="hidden sm:inline">Feeling/activity</span>
              </button>

              {showEmojiPicker && (
                <div className="absolute z-50 top-full mt-2 left-0 shadow-2xl rounded-lg">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SubmitButton control={control} submitLabel="Post" action="Submitting..." icon={FaPaperPlane} />
          </div>
        </div>
      </div>
    </form>
  );
}
