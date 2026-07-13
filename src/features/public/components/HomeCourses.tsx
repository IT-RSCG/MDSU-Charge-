// import { db } from "@/server/db";
// import Link from "next/link";
// import { AccessDurationBadge } from "@/features/courses/components/access-duration-badge";
// import type { AccessDuration } from "@prisma/client";

// export async function HomeCourses() {
//   const courses = await db.course.findMany({
//     where: { status: "PUBLISHED", isFeatured: true },
//     orderBy: { createdAt: "desc" },
//     take: 6,
//     select: {
//       id: true,
//       title: true,
//       slug: true,
//       description: true,
//       thumbnail: true,
//       price: true,
//       mrp: true,
//       accessDuration: true,
//       level: true,
//       totalLectures: true,
//       category: { select: { name: true } },
//     },
//   });

//   const displayCourses =
//     courses.length > 0
//       ? courses
//       : await db.course.findMany({
//           where: { status: "PUBLISHED" },
//           orderBy: { createdAt: "desc" },
//           take: 6,
//           select: {
//             id: true,
//             title: true,
//             slug: true,
//             description: true,
//             thumbnail: true,
//             price: true,
//             mrp: true,
//             accessDuration: true,
//             level: true,
//             totalLectures: true,
//             category: { select: { name: true } },
//           },
//         });

//   if (displayCourses.length === 0) return null;

//   const LEVEL_COLORS: Record<string, { bg: string; color: string }> = {
//     BEGINNER: { bg: "#f0fdf4", color: "#166534" },
//     INTERMEDIATE: { bg: "#fffbeb", color: "#92400e" },
//     ADVANCED: { bg: "#fef2f2", color: "#991b1b" },
//   };

//   return (
//     <section style={{ background: "#eef4fc", padding: "4rem 0" }}>
//       <div
//         style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 1.5rem" }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-end",
//             justifyContent: "space-between",
//             marginBottom: "2.5rem",
//             flexWrap: "wrap",
//             gap: "12px",
//           }}
//         >
//           <div>
//             <p
//               style={{
//                 fontSize: "11px",
//                 fontWeight: 700,
//                 color: "#1d4ed8",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.1em",
//                 margin: "0 0 8px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             >
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "24px",
//                   height: "2px",
//                   background: "#1d4ed8",
//                   borderRadius: "2px",
//                 }}
//               />
//               Our Courses
//             </p>
//             <h2
//               style={{
//                 fontSize: "clamp(22px, 3.5vw, 32px)",
//                 fontWeight: 800,
//                 color: "#0f172a",
//                 margin: 0,
//                 letterSpacing: "-0.6px",
//                 lineHeight: 1.2,
//               }}
//             >
//               Learn from Expert Faculty
//             </h2>
//             <p
//               style={{
//                 fontSize: "15px",
//                 color: "#64748b",
//                 margin: "8px 0 0",
//                 lineHeight: 1.6,
//               }}
//             >
//               Structured courses designed for academic excellence
//             </p>
//           </div>
//           <Link
//             href="/courses"
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "6px",
//               height: "40px",
//               padding: "0 20px",
//               border: "1.5px solid #1d4ed8",
//               borderRadius: "10px",
//               background: "#fff",
//               color: "#1d4ed8",
//               fontSize: "13.5px",
//               fontWeight: 700,
//               textDecoration: "none",
//             }}
//           >
//             Browse All Courses
//             <svg
//               width="14"
//               height="14"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="5" y1="12" x2="19" y2="12" />
//               <polyline points="12 5 19 12 12 19" />
//             </svg>
//           </Link>
//         </div>

//         {/* Grid */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//             gap: "20px",
//           }}
//         >
//           {displayCourses.map((course) => {
//             const levelCfg =
//               LEVEL_COLORS[course.level] ?? LEVEL_COLORS.BEGINNER;
//             const discountPct =
//               course.mrp > course.price
//                 ? Math.round(((course.mrp - course.price) / course.mrp) * 100)
//                 : 0;

//             return (
//               <Link
//                 key={course.id}
//                 href={`/courses/${course.slug}`}
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   background: "#fff",
//                   border: "1px solid #e8edf2",
//                   borderRadius: "16px",
//                   overflow: "hidden",
//                   textDecoration: "none",
//                   boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
//                   transition: "box-shadow 0.14s",
//                 }}
//               >
//                 {/* Thumbnail */}
//                 <div
//                   style={{
//                     position: "relative",
//                     aspectRatio: "16/9",
//                     background: "#f1f5f9",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {course.thumbnail ? (
//                     <img
//                       src={course.thumbnail}
//                       alt={course.title}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   ) : (
//                     <div
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         background:
//                           "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)",
//                       }}
//                     >
//                       <svg
//                         width="32"
//                         height="32"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="#bfdbfe"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//                         <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//                       </svg>
//                     </div>
//                   )}
//                   {discountPct > 0 && (
//                     <span
//                       style={{
//                         position: "absolute",
//                         top: "8px",
//                         right: "8px",
//                         fontSize: "10px",
//                         fontWeight: 700,
//                         padding: "2px 8px",
//                         borderRadius: "20px",
//                         background: "#dc2626",
//                         color: "#fff",
//                       }}
//                     >
//                       {discountPct}% OFF
//                     </span>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div
//                   style={{
//                     padding: "14px",
//                     display: "flex",
//                     flexDirection: "column",
//                     flex: 1,
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       gap: "6px",
//                       marginBottom: "8px",
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     {course.category && (
//                       <span
//                         style={{
//                           fontSize: "10.5px",
//                           fontWeight: 600,
//                           padding: "2px 8px",
//                           borderRadius: "6px",
//                           background: "#f8fafc",
//                           color: "#64748b",
//                           border: "1px solid #e2e8f0",
//                         }}
//                       >
//                         {course.category.name}
//                       </span>
//                     )}
//                     <span
//                       style={{
//                         fontSize: "10.5px",
//                         fontWeight: 600,
//                         padding: "2px 8px",
//                         borderRadius: "6px",
//                         background: levelCfg.bg,
//                         color: levelCfg.color,
//                       }}
//                     >
//                       {course.level[0] + course.level.slice(1).toLowerCase()}
//                     </span>
//                   </div>

//                   <h3
//                     style={{
//                       fontSize: "14.5px",
//                       fontWeight: 700,
//                       color: "#0f172a",
//                       margin: "0 0 5px",
//                       lineHeight: 1.4,
//                       letterSpacing: "-0.2px",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {course.title}
//                   </h3>

//                   {course.description && (
//                     <p
//                       style={{
//                         fontSize: "12.5px",
//                         color: "#64748b",
//                         margin: "0 0 10px",
//                         lineHeight: 1.5,
//                         display: "-webkit-box",
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                       }}
//                     >
//                       {course.description}
//                     </p>
//                   )}

//                   <p
//                     style={{
//                       fontSize: "12px",
//                       color: "#94a3b8",
//                       margin: "0 0 12px",
//                     }}
//                   >
//                     {course.totalLectures} lectures
//                   </p>

//                   <div
//                     style={{
//                       marginTop: "auto",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <AccessDurationBadge
//                       duration={course.accessDuration as AccessDuration}
//                       variant="card"
//                     />
//                     <div style={{ textAlign: "right" }}>
//                       <span
//                         style={{
//                           fontSize: "16px",
//                           fontWeight: 800,
//                           color: course.price === 0 ? "#16a34a" : "#0f172a",
//                           letterSpacing: "-0.4px",
//                         }}
//                       >
//                         {course.price === 0
//                           ? "Free"
//                           : `₹${(course.price / 100).toLocaleString("en-IN")}`}
//                       </span>
//                       {course.mrp > course.price && (
//                         <span
//                           style={{
//                             fontSize: "11px",
//                             color: "#94a3b8",
//                             textDecoration: "line-through",
//                             marginLeft: "6px",
//                           }}
//                         >
//                           ₹{(course.mrp / 100).toLocaleString("en-IN")}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

import { db } from "@/server/db";
import Link from "next/link";
import { AccessDurationBadge } from "@/features/courses/components/access-duration-badge";
import type { AccessDuration } from "@prisma/client";
import styles from "./HomeCourses.module.css";

export async function HomeCourses() {
  const courses = await db.course.findMany({
    where: { status: "PUBLISHED", isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      thumbnail: true,
      price: true,
      mrp: true,
      accessDuration: true,
      level: true,
      totalLectures: true,
      category: { select: { name: true } },
    },
  });

  const displayCourses =
    courses.length > 0
      ? courses
      : await db.course.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { createdAt: "desc" },
          take: 6,
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            thumbnail: true,
            price: true,
            mrp: true,
            accessDuration: true,
            level: true,
            totalLectures: true,
            category: { select: { name: true } },
          },
        });

  if (displayCourses.length === 0) return null;

  const LEVEL_COLORS: Record<string, { bg: string; color: string }> = {
    BEGINNER: { bg: "#f0fdf4", color: "#166534" },
    INTERMEDIATE: { bg: "#fffbeb", color: "#92400e" },
    ADVANCED: { bg: "#fef2f2", color: "#991b1b" },
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>Our Courses</p>
            <h2 className={styles.title}>Learn from Expert Faculty</h2>
            <p className={styles.subtitle}>
              Structured courses designed for academic excellence
            </p>
          </div>
          <Link href="/courses" className={styles.browseBtn}>
            Browse All Courses
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* ── Grid ── */}
        <div className={styles.grid}>
          {displayCourses.map((course) => {
            const levelCfg =
              LEVEL_COLORS[course.level] ?? LEVEL_COLORS.BEGINNER;
            const discountPct =
              course.mrp > course.price
                ? Math.round(((course.mrp - course.price) / course.mrp) * 100)
                : 0;

            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className={styles.card}
              >
                {/* Thumbnail */}
                <div className={styles.thumb}>
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className={styles.thumbImg}
                    />
                  ) : (
                    <div className={styles.thumbPlaceholder}>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#93c5fd"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                  )}
                  {discountPct > 0 && (
                    <span className={styles.discountBadge}>
                      {discountPct}% OFF
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className={styles.content}>
                  <div className={styles.tags}>
                    {course.category && (
                      <span className={styles.tagCategory}>
                        {course.category.name}
                      </span>
                    )}
                    <span
                      className={styles.tagLevel}
                      style={{ background: levelCfg.bg, color: levelCfg.color }}
                    >
                      {course.level[0] + course.level.slice(1).toLowerCase()}
                    </span>
                  </div>

                  <h3 className={styles.cardTitle}>{course.title}</h3>

                  {course.description && (
                    <p className={styles.cardDesc}>{course.description}</p>
                  )}

                  <p className={styles.lectures}>
                    {course.totalLectures} lectures
                  </p>

                  <div className={styles.footer}>
                    <AccessDurationBadge
                      duration={course.accessDuration as AccessDuration}
                      variant="card"
                    />
                    <div className={styles.priceWrap}>
                      <span
                        className={styles.price}
                        style={{
                          color: course.price === 0 ? "#16a34a" : "#1a3a6b",
                        }}
                      >
                        {course.price === 0
                          ? "Free"
                          : `₹${(course.price / 100).toLocaleString("en-IN")}`}
                      </span>
                      {course.mrp > course.price && (
                        <span className={styles.mrp}>
                          ₹{(course.mrp / 100).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
