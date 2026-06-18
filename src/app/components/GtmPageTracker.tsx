"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pushToDataLayer } from "@/utils/gtm";

export function GTMPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fullUrl = `${pathname}?${searchParams.toString()}`;
    pushToDataLayer({
      event: "PageView",
      page_url: fullUrl,
      page_title: document.title,
    });
  }, [pathname, searchParams]);
  return null;
}
