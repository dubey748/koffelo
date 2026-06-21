"use client";

import { useRouter } from "next/navigation";

export default function BestSelling() {
  const router = useRouter();
  // Kept as a lightweight, optional bonus section component.
  // Not used on the home page (HowItWorks + LifestyleGrid replace its role).
  // Retained to avoid breaking any external imports.
  return (
    <section className="hidden">
      <button onClick={() => router.push("/")} type="button" aria-hidden />
    </section>
  );
}
