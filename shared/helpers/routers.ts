import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function PushRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const pushRoute = useCallback(
    (path: string) => {
      // router.push(path);
      if (pathname !== path) {
        router.push(path);
      }
    },
    [router, pathname],
  );

  return pushRoute;
}

export function ReplaceRouter() {
  const router = useRouter();
  const pathname = usePathname();

  const replaceRoute = useCallback(
    (path: string) => {
      // router.replace(path);
      if (pathname !== path) {
        router.replace(path);
      }
    },
    [router, pathname],
  );

  return replaceRoute;
}
