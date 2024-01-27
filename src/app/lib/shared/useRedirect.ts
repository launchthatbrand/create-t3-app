import { useAuth } from "~/app/context/AuthContext";
import { useEffect } from "react";
import { useRedirectParam } from "./useRedirectParams";
import { useRouter } from "next/navigation";

export function useRedirect() {
  const router = useRouter();
  const { user } = useAuth();
  const redirect = useRedirectParam();

  useEffect(() => {
    if (!user) {
      return;
    }

    router.push(redirect ?? "/");
  }, [user, router, redirect]);
}
