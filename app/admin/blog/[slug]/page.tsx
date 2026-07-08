import { getBlogPost } from "@/lib/content";
import BlogEditForm from "./BlogEditForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit Blog Post
        </h1>
        <div className="rounded-md bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">
            Blog post not found.
          </p>
          <a
            href="/admin/blog"
            className="mt-3 inline-block text-sm font-medium text-red-700 underline hover:text-red-900"
          >
            Back to Blog Management
          </a>
        </div>
      </div>
    );
  }

  return <BlogEditForm initialData={post} />;
}
