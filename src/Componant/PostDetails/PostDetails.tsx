// import React from 'react'
import Loader from './../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import  axios  from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../post/Post';




export default function PostDetails() {
 const{_id} =   useParams()

 function getSinglePost() {
    return axios.get(` https://route-posts.routemisr.com/posts/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["SinglePost"],
    queryFn: getSinglePost,
    
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
    <>
      
      <Post post={data?.data.data.post} isPostDetails ={true}    />  
      
    </>
  )
}
