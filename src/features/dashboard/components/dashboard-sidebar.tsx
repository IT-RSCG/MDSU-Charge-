// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ROUTES } from "@/config/app";
// import { getInitials } from "@/lib/utils";
// import type { SessionUser } from "@/types";
// import { LayoutDashboard, User, Settings } from "lucide-react";
// import Image from "next/image";

// const navItems = [
//   { label: "Overview", href: ROUTES.dashboard, icon: LayoutDashboard },
//   { label: "Profile", href: ROUTES.profile, icon: User },
//   { label: "Settings", href: ROUTES.settings, icon: Settings },
// ];

// export function DashboardSidebar({ user }: { user: SessionUser }) {
//   const pathname = usePathname();

//   return (
//     <>
//       <aside
//         style={{
//           width: "240px",
//           flexShrink: 0,
//           borderRight: "1px solid #e2e8f0",
//           background: "#CFE0F5",
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "100vh",
//           position: "sticky",
//           top: 0,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             borderBottom: "1px solid #e2e8f0",
//           }}
//         >
//           <Image src="/mdssc-logo.svg" alt="MDSSC" width={160} height={160} />
//         </div>

//         <nav
//           style={{
//             flex: 1,
//             padding: "1rem 0.75rem",
//             display: "flex",
//             flexDirection: "column",
//             gap: "2px",
//           }}
//         >
//           <p
//             style={{
//               fontSize: "15px",
//               fontWeight: 900,
//               color: "#111111",
//               textTransform: "uppercase",
//               letterSpacing: "0.08em",
//               padding: "0 0.75rem",
//               margin: "0 0 6px",
//             }}
//           >
//             Menu
//           </p>
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                   padding: "9px 12px",
//                   borderRadius: "8px",
//                   fontSize: "13px",
//                   fontWeight: isActive ? 600 : 400,
//                   color: isActive ? "#1d4ed8" : "#475569",
//                   background: isActive ? "#eff6ff" : "transparent",
//                   textDecoration: "none",
//                   transition: "all 0.15s",
//                 }}
//               >
//                 <item.icon size={16} />
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         <div
//           style={{
//             padding: "1rem 1.25rem",
//             borderTop: "1px solid #e2e8f0",
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           <div
//             style={{
//               width: "34px",
//               height: "34px",
//               borderRadius: "50%",
//               background: "#eff6ff",
//               border: "1.5px solid #bfdbfe",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "12px",
//               fontWeight: 700,
//               color: "#1d4ed8",
//               flexShrink: 0,
//             }}
//           >
//             {getInitials(user.name ?? null)}
//           </div>
//           <div style={{ minWidth: 0, flex: 1 }}>
//             <p
//               style={{
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 color: "#0f172a",
//                 margin: 0,
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {user.name ?? "User"}
//             </p>
//             <p
//               style={{
//                 fontSize: "11px",
//                 color: "#94a3b8",
//                 margin: 0,
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {user.email}
//             </p>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/app";
import { getInitials } from "@/lib/utils";
import type { SessionUser } from "@/types";
import {
  LayoutDashboard,
  User,
  Settings,
  BookOpen,
  Award,
  Receipt,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Overview", href: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "My Courses", href: ROUTES.myCourses, icon: BookOpen },
  { label: "Certificates", href: ROUTES.certificates, icon: Award },
  { label: "Orders", href: ROUTES.orders, icon: Receipt },
  { label: "Profile", href: ROUTES.profile, icon: User },
  { label: "Settings", href: ROUTES.settings, icon: Settings },
];

export function DashboardSidebar({ user }: { user: SessionUser }) {
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
              {/* Active left accent bar */}
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

              {/* Icon box */}
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
                <item.icon size={14} strokeWidth={isActive ? 2.2 : 1.8} />
              </span>

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ padding: "0 1.25rem", marginBottom: "12px" }}>
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, #f1f5f9, #e2e8f0, #f1f5f9)",
          }}
        />
      </div>

      {/* User Card */}
      <div
        style={{
          margin: "0 0.875rem 1.25rem",
          padding: "10px 12px",
          borderRadius: "11px",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          border: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "9px",
            background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
            letterSpacing: "-0.3px",
            boxShadow: "0 1px 3px rgba(29,78,216,0.25)",
          }}
        >
          {getInitials(user.name ?? null)}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              fontSize: "12.5px",
              fontWeight: 700,
              color: "#0f172a",
              margin: "0 0 1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              letterSpacing: "-0.1px",
            }}
          >
            {user.name ?? "User"}
          </p>
          <p
            style={{
              fontSize: "10.5px",
              color: "#94a3b8",
              margin: 0,
              fontWeight: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.email}
          </p>
        </div>

        <span
          style={{
            display: "block",
            width: "7px",
            height: "7px",
            flexShrink: 0,
            borderRadius: "50%",
            background: "#16a34a",
            boxShadow: "0 0 0 2px #dcfce7",
          }}
        />
      </div>
    </aside>
  );
}
