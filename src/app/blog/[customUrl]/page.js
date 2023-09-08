import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import DeleteBlog from "@/components/deleteblog/delblog";
import Link from "next/link";

async function getData(customUrl) {
  const res = await fetch(`http://localhost:3000/api/getPosts/${customUrl}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}
export async function generateMetadata({ params }) {

  const post = await getData(params.customUrl)
  return {
    title: post.metatitle,
    description: post.metadescription,
    keywords: post.keywords
  };
}
const BlogPost = async ({ params }) => {
  const data = await getData(params.customUrl);
  const postInfo = data;
  return (
    
    <div className={styles.container}>
      <Link href={`/blog/editBlog/${data.customUrl}`}>Edit Blog</Link>
     <DeleteBlog postId={data._id} />
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.author}>
            <Image
              src={data.mediaUrl}
              alt=""
              width={1200}
              height={630}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <a href="" className="author">
          {" "}
          by {postInfo.author}{" "}
        </a>
        <div className={styles.imagePost}>
          <img src={`https://backend-taxi.onrender.com/${postInfo.cover}`} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
};

export default BlogPost;
