import { FaShareAlt } from "react-icons/fa";
import { FaCommentMedical } from "react-icons/fa6";
import { GrLike } from "react-icons/gr";
import type { PostType } from "../../Type/Posts.type";
import Comment from "../Comment/Comment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import type { commentType } from "../../Type/CommentType";
import CommentCreation from "../CommentCreation/CommentCreation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import PostEdit from "../PostEdit/PostEdit";

export default function Post({
  post,
  isPostDetails = false,
}: {
  post: PostType;
  isPostDetails?: boolean;
}) {
  const {
    _id,
    image,
    body,
    commentsCount,
    likesCount,
    createdAt,
    user,
    sharesCount,
    topComment,
  } = post;

  const { photo, name, _id: userId } = user;

  const { userId: loginUserId } = useContext(AuthContext);

  const [isOpen, setisOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  function getPostComment() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${_id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      },
    );
  }
  function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
  }
  const quary = useQueryClient();

  const Navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: res => {
      console.log(res.data.message);
      quary.invalidateQueries({ queryKey: ["getAllProduct"] });
      toast.success(res.data.message);
      Navigate("/");
    },
    onError: err => {
      console.log(err);
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["commentPost"],
    queryFn: getPostComment,
    enabled: isPostDetails,
  });

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (isError) {
    return (
      <>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <div>
      <div className="p-4 w-150 bg-slate-300 mx-auto rounded-lg my-6">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex justify-start gap-3">
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src={photo}
              alt=""
            />
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-sm text-slate-500">{createdAt}</p>
            </div>
          </div>
          <div className="relative">
            {loginUserId === userId && (
              <BsThreeDotsVertical
                className="size-6 cursor-pointer"
                onClick={() => {
                  setisOpen(!isOpen);
                }}
              />
            )}

            {isOpen && (
              <div className="p-2  bg-white rounded-lg absolute top -[40px] inset-e-[-6oopx] ">
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        setIsEditOpen(true);
                        setisOpen(false);
                      }}
                      className="flex w-full justify-between items-center gap-2 p-2 cursor-pointer bg-slate-100"
                    >
                      Edit <FaEdit />
                    </button>
                  </li>
                  <li>
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
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="mb-4">{body}</p>
          <img className="w-full" src={image} alt="" />
        </div>
        <div className="flex justify-between p-4 bg-slate-200 rounded-sm">
          <div className="font-bold cursor-pointer flex gap-2 items-center">
            {" "}
            <span className="pl-2">{likesCount}</span>
            Like <GrLike />
          </div>
          <Link
            to={`PostDetails/${_id}`}
            className="font-bold cursor-pointer flex gap-2 items-center"
          >
            {" "}
            <span className="pl-2">{commentsCount}</span>
            Comment <FaCommentMedical />
          </Link>
          <div className="font-bold cursor-pointer flex gap-2 items-center">
            {" "}
            <span className="pl-2">{sharesCount}</span>
            Share <FaShareAlt />
          </div>
        </div>

        {/* comment creation */}
        <CommentCreation
        
          postId={_id}
          queryKey={isPostDetails ? ["commentPost"] : ["SinglePost"]}
        />

        {/* topcomment */}
        {topComment && <Comment comment={topComment} />}

        {/* postdetails */}
        {isPostDetails &&
          data?.data.data.comments &&
          (data?.data.data.comments).map((comment: commentType) => (
            <Comment key={comment._id} comment={comment} />
          ))}
      </div>
      {isEditOpen && <PostEdit post={post} onClose={() => setIsEditOpen(false)} />}
    </div>
  );
}
