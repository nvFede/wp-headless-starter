import Image from "next/image";
import { GET_ALL_POSTS } from "./api/querys";
import { readableDate, sanitize } from "@/utils/sanitaze";

export default function Blog({ posts }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Blog</h1>

      <div className="grid grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="card w-96 bg-base-100 shadow-xl rounded-xl"
          >
            {post.featuredImage?.node && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                width={600}
                height={600}
                alt={post.title}
              />
            )}
            <div className="card-body p-5">
              <h2 className="card-title">{post.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize(post?.excerpt ?? ""),
                }}
                className="mb-3 mt-2 line-clamp-3 text-sm"
              />
              <p>{readableDate(post.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const data = await GET_ALL_POSTS();
  const posts = data.posts.nodes;

  return {
    props: {
      posts,
    },
  };
}
