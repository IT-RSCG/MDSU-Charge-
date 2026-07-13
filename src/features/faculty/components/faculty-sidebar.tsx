// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ROUTES } from "@/config/app";

// const navItems = [
//   { label: "Overview", href: ROUTES.faculty, icon: "ti-home" },
//   { label: "Profile", href: ROUTES.facultyProfile, icon: "ti-user" },
//   { label: "Settings", href: ROUTES.facultySettings, icon: "ti-settings" },
// ];

// export function FacultySidebar() {
//   const pathname = usePathname();

//   return (
//     <aside
//       style={{
//         width: "220px",
//         flexShrink: 0,
//         borderRight: "0.5px solid var(--color-border-tertiary)",
//         background: "var(--color-background-primary)",
//         display: "flex",
//         flexDirection: "column",
//         padding: "1.5rem 0",
//       }}
//     >
//       <div
//         style={{
//           padding: "0 1.25rem 1.5rem",
//           borderBottom: "0.5px solid var(--color-border-tertiary)",
//         }}
//       >
//         <p style={{ fontSize: "15px", fontWeight: 500, margin: 0 }}>
//           Faculty Portal
//         </p>
//         <p
//           style={{
//             fontSize: "12px",
//             color: "var(--color-text-secondary)",
//             margin: "2px 0 0",
//           }}
//         >
//           My SaaS
//         </p>
//       </div>

//       <nav
//         style={{
//           flex: 1,
//           padding: "1rem 0.75rem",
//           display: "flex",
//           flexDirection: "column",
//           gap: "2px",
//         }}
//         aria-label="Faculty navigation"
//       >
//         {navItems.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 padding: "8px 10px",
//                 borderRadius: "var(--border-radius-md)",
//                 fontSize: "13px",
//                 fontWeight: isActive ? 500 : 400,
//                 color: isActive
//                   ? "var(--color-text-info)"
//                   : "var(--color-text-secondary)",
//                 background: isActive
//                   ? "var(--color-background-info)"
//                   : "transparent",
//                 textDecoration: "none",
//               }}
//             >
//               <i
//                 className={`ti ${item.icon}`}
//                 style={{ fontSize: "16px" }}
//                 aria-hidden="true"
//               />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/app";
import Image from "next/image";

const navItems = [
  {
    label: "Overview",
    href: ROUTES.faculty,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Students",
    href: ROUTES.facultyStudents,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: ROUTES.facultyProfile,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: ROUTES.facultySettings,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
];

export function FacultySidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "232px",
        flexShrink: 0,
        background: "#fff",
        borderRight: "1px solid #e8edf2",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        boxShadow: "1px 0 0 0 #f1f5f9",
      }}
    >
      <div
        style={{
          padding: "0 1.25rem",
          borderBottom: "1px solid #f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafbfc",
        }}
      >
        <Image src="/mdssc-logo.svg" alt="MDSSC" width={148} height={148} />
      </div>

      <nav
        style={{
          flex: 1,
          padding: "1.25rem 0.875rem",
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          overflowY: "auto",
        }}
        aria-label="Faculty navigation"
      >
        <p
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#b0bec5",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            padding: "0 0.625rem",
            margin: "0 0 8px",
          }}
        >
          Navigation
        </p>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "9px",
                fontSize: "13.5px",
                fontWeight: isActive ? 600 : 450,
                color: isActive ? "#1d4ed8" : "#64748b",
                background: isActive
                  ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
                  : "transparent",
                textDecoration: "none",
                transition: "all 0.14s ease",
                border: isActive
                  ? "1px solid #bfdbfe"
                  : "1px solid transparent",
                position: "relative",
                letterSpacing: isActive ? "-0.1px" : "0",
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "3px",
                    height: "18px",
                    borderRadius: "0 3px 3px 0",
                    background: "#1d4ed8",
                  }}
                />
              )}

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "7px",
                  background: isActive ? "#dbeafe" : "#f8fafc",
                  flexShrink: 0,
                  transition: "background 0.14s",
                  color: isActive ? "#1d4ed8" : "#94a3b8",
                }}
              >
                {item.icon}
              </span>

              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "0 1.25rem", marginBottom: "12px" }}>
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, #f1f5f9, #e2e8f0, #f1f5f9)",
          }}
        />
      </div>

      <div
        style={{
          margin: "0 0.875rem 1.25rem",
          borderRadius: "11px",
          overflow: "hidden",
          border: "1px solid #bfdbfe",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 12px",
            background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            borderBottom: "1px solid #bfdbfe",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: "#fff",
              border: "1px solid #bfdbfe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                fontWeight: 700,
                color: "#1e3a8a",
              }}
            >
              Faculty
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "10.5px",
                color: "#1d4ed8",
                fontWeight: 500,
              }}
            >
              Faculty access
            </p>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <span
              style={{
                display: "block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#1d4ed8",
                boxShadow: "0 0 0 2px #dbeafe",
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
