import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
  return (
    <div className="post">
      <div>
        <Image
          src={post.picture}
          alt="Profile picture"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-white w-full">
        <div className="flex items-center justify-between">
          <Link href={`/@${post.pseudo}`}>
            <b>{post.pseudo}</b>
          </Link>
          <div className="text-sm text-threads-gray-light">
            {" "}
            Il y a une heure
          </div>
        </div>
        <div className="mt-4 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}
