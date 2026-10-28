import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import type { commentType } from "../../Type/CommentType";

export default function CommentUpdate({
  comment,
  onClose,
}: {
  comment: commentType;
  onClose: () => void;
}) {
  const testInput = useRef<HTMLTextAreaElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const quary = useQueryClient();

  function commentEdit(formData: FormData) {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${comment.post}/comments/${comment._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      },
    );
  }
  const { isPending, mutate } = useMutation({
    mutationFn: commentEdit,
    onSuccess: res => {
      console.log(res.data.message);
      toast.success(res.data.message);
      console.log("done");
      if (testInput.current) testInput.current.value = "";
      if (imageInput.current) imageInput.current.value = "";
      quary.invalidateQueries({ queryKey: ["commentPost"] });
      onClose();
    },
    onError: err => {
      console.log(err);
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  function HandleCommentUpdate(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = testInput.current?.value ?? "";
    const file = imageInput.current?.files?.[0];

    if (!text && !file) return;

    const formdata = new FormData();
    if (text) formdata.append("content", text);
    if (file) formdata.append("image", file);

    mutate(formdata);
  }

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-slate-100 px-4 py-10">
      <form
        onSubmit={HandleCommentUpdate}
        className="mx-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
      >
        <h1 className="mb-4 text-lg font-bold text-slate-900">Edit comment</h1>

        <textarea
          ref={testInput}
          defaultValue={comment.content}
          rows={4}
          placeholder="Write a comment..."
          className="w-full rounded-xl bg-slate-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 cursor-pointer rounded bg-slate-200 p-2 hover:bg-slate-300 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex flex-1 cursor-pointer items-center justify-center rounded bg-indigo-600 p-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-600"
          >
            {isPending ? (
              <ImSpinner3 className="animate-spin" />
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
