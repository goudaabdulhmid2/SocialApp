import { useContext } from "react";
import { FaImage, FaSmile, FaGlobe, FaPaperPlane } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";


export default function CreatePost() {
    const {userData} =useContext(AuthContext);
    const{photo,name} =userData
    
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start gap-3">
          <img
            alt="hamid"
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
            rows={4}
            placeholder={`What's on your mind, ${name}?`}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
          <div className="relative flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <FaImage className="text-emerald-600 h-4 w-4" />
              <span className="hidden sm:inline">Photo/video</span>
              <input accept="image/*" className="hidden" type="file" />
            </label>

            <button type="button" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <FaSmile className="text-amber-500 h-4 w-4" />
              <span className="hidden sm:inline">Feeling/activity</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button disabled className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60">
              Post
              <FaPaperPlane className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
