// import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaCommentAlt } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";
import toast from "react-hot-toast";

export default function CommentCreation({
  postId,
  queryKey,
}: {
  postId: string;
  queryKey: string[];
}) {
  const form = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  const { register, handleSubmit, reset } = form;

  const formdata = new FormData();

  const quary = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: CreatComment,
    onSuccess: res => {
      console.log(res);
      reset();
      quary.invalidateQueries({ queryKey: queryKey });
      toast.success(res.data.message);
    },
    onError: err => {
      console.log(err);
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  function CreatComment() {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      },
    );
  }

  function HandleCommentCreator(values: { content: string; image: string }) {
    if (!values.content && !values.image) return;

    if (values.content) {
      formdata.append("content", values.content);
    }
    if (values.image) {
      formdata.append("image", values.image[0]);
    }
    mutate();
  }

  return (
    <div className="bg-white  p-3 my-4">
      <form
        className="max-w-md mx-auto "
        onSubmit={handleSubmit(HandleCommentCreator)}
      >
        <div className="relative">
          <input
            {...register("content")}
            type="text"
            id="search"
            className="block rounded-lg   w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder="Search"
          />
          <button
            disabled={isPending}
            type="submit"
            className="absolute top-[50%]  disabled:bg-slate-600 disabled:cursor-not-allowed   inset-e-2.5 cursor-pointer  translate-y-[-50%] text-white bg-blue-500 hover:bg-blue-700 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
          >
            {isPending ? (
              <ImSpinner3 className="animate-spin" />
            ) : (
              <FaCommentAlt />
            )}
          </button>
        </div>
        <label className="my-2 p-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white flex justify-center transition-all">
          {" "}
          <input type="file" hidden {...register("image")} />
          <FaImages className="size-6" />
        </label>
      </form>
    </div>
  );
}
