import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import DeleteBlog from "@/components/deletecity/delcity";
import Link from "next/link";


async function getData(customUrl) {
  const res = await fetch(`http://localhost:3000/api/getCity/${customUrl}`, {
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

  
const CityPost = async ({ params }) => {
    const data = await getData(params.customUrl);
    const postInfo = data;
    console.log(postInfo);
    
    return (
        <div className={styles.container}>
           <Link href="/dashboard"> {/* Add your dashboard URL */}
        <div className={styles.goBackLink}>Go Back To Dashboard</div>
      </Link>
      <div className={styles.buttonContainer}>
      <Link href={`/city/editcity/${data.customUrl}`}> <button className={`${styles.button} ${styles.editButton}`}>
        Edit Post
      </button> </Link>
     <DeleteBlog postId={data._id} />
     </div>
        <div className={styles.postPage}>
          <h1>{postInfo.title}</h1>
          <div>{postInfo.metadescription}</div>
          <div className={styles.imagePost}>
            <img src={`https://backend-taxi.onrender.com/${postInfo.cover}`} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
  
          {/* Render FAQs using FAQAccordion */}
          <h2 className={styles.faqTitle} >Frequently Asked Questions</h2>
          <div className={styles.faqs}>
          {Object.keys(postInfo)
            .filter((key) => key.startsWith("faq"))
            .map((key) => (
              <div key={key} className={styles.faq}>
                <input type="checkbox" id={key} className={styles.faqToggle} />
                <label htmlFor={key} className={styles.faqButton}>
                  {postInfo[key].que}
                </label>
                <div className={styles.faqAnswer}>{postInfo[key].ans}</div>
              </div>
            ))}
        </div>
        </div>
      </div>
    );
  };
  
  export default CityPost;
  