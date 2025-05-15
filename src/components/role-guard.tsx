// components/RoleWrapper.tsx
"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function RoleWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  useEffect(() => {
    const checkAndSetRole = async () => {
      if (user && !user.unsafeMetadata?.role) {
        // Call your API to set default role
        await fetch("/api/user-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, role: "user" }),
        });
        // Optionally, refresh the page or do other logic
        // window.location.reload();
      }
    };
    checkAndSetRole();
  }, [user]);

  return <>{children}</>;
}
