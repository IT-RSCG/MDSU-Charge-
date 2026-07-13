import { db } from "@/server/db";
import Link from "next/link";

export const metadata = {
  title: "Blog — MDSSC",
  description: "Articles, updates and insights from MDSSC",
};

export default async function PublicBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; q?: string }>;
}) {
  const { tag, q } = await searchParams;
  const query = q?.trim() ?? "";

  const posts = await db.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      ...(tag ? { tags: { has: tag } } : {}),
      ...(query
        ? { title: { contains: query, mode: "insensitive" as const } }
        : {}),
    },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      publishedAt: true,
      author: { select: { name: true } },
    },
  });

  const allPosts = await db.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { tags: true },
  });
  const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].filter(Boolean);

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, sans-serif",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2.5rem 1.5rem",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#1d4ed8",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: "0 0 8px",
          }}
        >
          Our Blog
        </p>
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 12px",
            letterSpacing: "-0.6px",
          }}
        >
          Articles & Updates
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#64748b",
            margin: 0,
            maxWidth: "480px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          Insights, news and resources from MDSSC
        </p>
      </div>

      {/* Search + tags */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <form method="GET" style={{ position: "relative" }}>
          {tag && <input type="hidden" name="tag" value={tag} />}
          <svg
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            name="q"
            defaultValue={query}
            placeholder="Search articles…"
            style={{
              height: "40px",
              paddingLeft: "36px",
              paddingRight: "14px",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              fontSize: "13px",
              width: "240px",
              background: "#fff",
            }}
          />
        </form>

        {allTags.map((t) => (
          <Link
            key={t}
            href={`/blog?tag=${t}`}
            style={{
              height: "36px",
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              borderRadius: "20px",
              fontSize: "12.5px",
              fontWeight: 600,
              background: tag === t ? "#1d4ed8" : "#f8fafc",
              color: tag === t ? "#fff" : "#475569",
              border: tag === t ? "1px solid #1d4ed8" : "1px solid #e2e8f0",
              textDecoration: "none",
            }}
          >
            #{t}
          </Link>
        ))}

        {(tag || query) && (
          <Link
            href="/blog"
            style={{
              height: "36px",
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              borderRadius: "20px",
              fontSize: "12.5px",
              color: "#94a3b8",
              border: "1px solid #e2e8f0",
              textDecoration: "none",
              background: "#fff",
            }}
          >
            Clear
          </Link>
        )}
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#0f172a",
              margin: "0 0 6px",
            }}
          >
            No articles found
          </p>
          <p style={{ fontSize: "13px" }}>Check back soon for new content</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                border: "1px solid #e8edf2",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "box-shadow 0.14s",
              }}
            >
              {/* Cover */}
              <div
                style={{
                  height: "180px",
                  background: "#f1f5f9",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(135deg, ${["#eff6ff", "#faf5ff", "#f0fdf4", "#fff7ed"][i % 4]} 0%, #f8fafc 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "1.1rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      marginBottom: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {post.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: "6px",
                          background: "#eff6ff",
                          color: "#1d4ed8",
                          border: "1px solid #bfdbfe",
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <h2
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: "0 0 6px",
                    letterSpacing: "-0.2px",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      margin: "0 0 12px",
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}

                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#eff6ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        fontWeight: 700,
                        color: "#1d4ed8",
                      }}
                    >
                      {post.author.name?.[0]?.toUpperCase() ?? "A"}
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#64748b",
                        fontWeight: 500,
                      }}
                    >
                      {post.author.name ?? "MDSSC"}
                    </span>
                  </div>
                  {post.publishedAt && (
                    <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                      {post.publishedAt.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
