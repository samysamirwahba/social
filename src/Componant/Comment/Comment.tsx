import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { commentType } from "../../Type/CommentType";
import axios from "axios";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import CommentUpdate from "../CommentUpdate/CommentUpdate";


 

export default function Comment({ comment}: { comment: commentType}) {
  function deleteComment() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${comment.post}/comments/${comment._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
  }
  const quary = useQueryClient();


  const [isEditOpen, setIsEditOpen] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: res => {
      console.log(res.data.message);
      quary.invalidateQueries({ queryKey: ["commentPost"] });
      toast.success(res.data.message);
      
    },
    onError: err => {
      console.log(err);
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  return (
    <div className=" p-4 rounded-sm  my-2 bg-slate-100">
      <div className="   flex gap-4 items-center              ">
        <img
          className="w-10 h-10 rounded-full border-2 border-white"
          src={comment.commentCreator.photo}
          alt=""
        />
        <div>
          <p className="font-bold">{comment.commentCreator.name}</p>
          <p className="text-sm text-slate-500">{comment.createdAt}</p>
        </div>
      </div>
      <p className="px-4">{comment.content}</p>
      <img src={comment.image} alt="" />
      <button
        disabled={isPending}
        onClick={() => {
          mutate();
        }}
        className="flex w-full  justify-center disabled:bg-slate-800  disabled:cursor-not-allowed disabled:text-white items-center gap-2 p-2 cursor-pointer bg-slate-100"
      >
        {isPending ? (
          <ImSpinner3 className="animate-spin" />
        ) : (
          <>
            Delete <MdDelete />
          </>
        )}
      </button>
      <button
          onClick={() => {
            setIsEditOpen(true);
          
          }}
          className=" w-full my-2 p-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white flex justify-center transition-all"
        >
          edit
        </button>
         {isEditOpen && <CommentUpdate comment ={comment} onClose={() => setIsEditOpen(false)} />}
    </div>
  );
}
