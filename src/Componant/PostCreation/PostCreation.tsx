// import React from 'react'

import { IoIosClose } from "react-icons/io";
import { useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImSpinner3 } from "react-icons/im";
import toast from "react-hot-toast";

export default function PostCreation() {
  const [isUploaded, setisUploaded] = useState("");

 

  const testInput = useRef<HTMLTextAreaElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const quary = useQueryClient();
  function HandlePostImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
  if (!file) return;

  const path = URL.createObjectURL(file);
  setisUploaded(path);
  }

  function CreatPost(formData: FormData) {
    return axios.post(`https://route-posts.routemisr.com/posts/`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
  }
  const { isPending, mutate } = useMutation({
    mutationFn: CreatPost,
    onSuccess: res => {
      console.log(res.data.message);
      toast.success(res.data.message);
      console.log("done");
      if (testInput.current) testInput.current.value = "";
      if (imageInput.current) imageInput.current.value = "";
      setisUploaded("");
      quary.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
    onError: err => {
      console.log(err);
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  function HandlePostCreation() {
    const text = testInput.current?.value ?? "";
    const file = imageInput.current?.files?.[0];

    if (!text && !file) return;

    const formdata = new FormData();
    if (text) formdata.append("body", text);
    if (file) formdata.append("image", file);

    mutate(formdata);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h1 className="text-lg font-bold text-slate-900">Create post</h1>
          <button
            type="button"
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <IoIosClose className="h-5 w-5" />
          </button>
        </header>

        <div className="px-5 pb-5 pt-4">
          {/* Author row */}
          <div className="flex items-center gap-3">
            <img
              className="h-11 w-11 rounded-full border-2 border-white object-cover ring-1 ring-slate-200"
              src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linked-posts/1791094543384-efa42096-f9e9-44a6-ab03-b0a8529d0919-download--46-.webp"
              alt="menna"
            />
            <p className="font-bold text-slate-900">samy</p>
          </div>

          {/* Text */}
          <textarea
            ref={testInput}
            rows={2}
            placeholder="What's on your mind?"
            className="mt-4 w-full resize-none rounded-xl bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Image upload */}
          {isUploaded && (
            <div className="relative ">
              <img
                src={isUploaded}
                alt=""
                className="text-xs text-slate-500    "
              />
              <button className="h-8 w-8 absolute text-black    top-2.5 inset-e-2.5  rounded-full bg-white flex justify-center items-center   ">
                <IoIosClose
                  className="size-12"
                  onClick={() => {
                    setisUploaded("");
                  }}
                />
              </button>
            </div>
          )}

          <label
            htmlFor="post-image"
            className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-8 text-center hover:border-indigo-400 hover:bg-indigo-50/40"
          >
            <span className="text-sm font-semibold text-slate-800">
              Add a photo
            </span>
            <input
              ref={imageInput}
              id="post-image"
              type="file"
              className="hidden"
              onChange={HandlePostImage}
            />
          </label>

          {/* Submit */}
          <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              onClick={() => {
                HandlePostCreation();
              }}
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {isPending ? (
                <ImSpinner3 className="animate-spin" />
              ) : (
                "creat post"
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
