import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import { DeletePostButton } from "./DeletePostButton";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Blog</h1>
          <p className="mt-1 text-slate-600">
            Create, edit, or delete blog posts displayed on the blog page.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center px-4 py-2 bg-[#1565C0] text-white text-sm font-medium rounded-md hover:bg-[#0d47a1] transition-colors"
        >
          + New Post
        </Link>
      </div>

      {/* Posts Table */}
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <p className="text-slate-500">No blog posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="mt-4 inline-block text-[#1565C0] hover:underline text-sm font-medium"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                  Title
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                  Category
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                  Date
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-900 font-medium">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/${post.slug}`}
                        className="px-3 py-1 text-sm font-medium text-[#1565C0] hover:text-[#0d47a1] hover:bg-blue-50 rounded-md transition-colors"
                      >
                        Edit
                      </Link>
                      <DeletePostButton slug={post.slug} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
