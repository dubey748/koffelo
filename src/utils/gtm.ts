export const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push(data);
  } else {
    console.warn("GTM dataLayer not found");
  }
};
