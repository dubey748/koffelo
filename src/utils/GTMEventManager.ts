import crypto from "crypto";

export class GTMTracker {
  /**
   * Push data to the GTM dataLayer
   */
  static push(data: Record<string, any>) {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push(data);
      console.log("🟢 GTM Push:", data);
    } else {
      console.warn("⚠️ GTM dataLayer not found");
    }
  }

  /**
   * Hash sensitive info (SHA-256)
   */

  static hash(value?: string): string | undefined {
    if (!value) return undefined;
    return crypto
      .createHash("sha256")
      .update(String(value).trim().toLowerCase())
      .digest("hex");
  }

  // ---------- 🔹 PAGE VIEW ----------
  static trackPageView({
    page_url,
    page_title,
  }: {
    page_url: string;
    page_title?: string;
  }) {
    this.push({
      event: "PageView",
      page_url,
      page_title,
    });
  }

  // ---------- 🔹 VIEW CONTENT ----------
  static trackViewContent({
    content_ids,
    contents,
    content_type,
    value,
    currency,
    num_items,
    page_url,
    page_title,
  }: {
    content_ids: string[];
    contents?: Array<{ id: number; quantity?: number; item_price?: string }>;
    content_type: string;
    value?: number;
    currency?: string;
    num_items?: number;
    page_url?: string;
    page_title?: string;
  }) {
    this.push({
      event: "ViewContent",
      content_ids,
      contents,
      content_type,
      value,
      currency,
      num_items,
      page_url,
      page_title,
    });
  }

  // ---------- 🔹 ADD TO CART ----------
  static trackAddToCart({
    content_ids,
    contents,
    value,
    currency,
    num_items,
  }: {
    content_ids: string[];
    contents?: Array<{ id: string; quantity?: number; item_price?: string }>;
    value?: string;
    currency?: string;
    num_items?: number;
  }) {
    this.push({
      event: "AddToCart",
      content_ids,
      contents,
      value,
      currency,
      num_items,
    });
  }

  // ---------- 🔹 INITIATE CHECKOUT ----------
  static trackInitiateCheckout({
    content_ids,
    contents,
    value,
    currency,
    num_items,
    coupon,
  }: {
    content_ids: string[];
    contents?: Array<{ id: string; quantity?: number; item_price?: number }>;
    value?: number;
    currency?: string;
    num_items?: number;
    coupon?: string;
  }) {
    this.push({
      event: "InitiateCheckout",
      content_ids,
      contents,
      value,
      currency,
      num_items,
      coupon,
    });
  }

  // ---------- 🔹 ADD ADDRESS INFO (CUSTOM) ----------
  static trackAddAddressInfo({
    content_ids,
    contents,
    phone,
    value,
    currency,
    user_id,
    num_items,
  }: {
    content_ids?: string[];
    contents?: Array<{ id: string; quantity?: number; item_price?: number }>;
    phone?: string;
    value?: number;
    currency?: string;
    user_id?: string;
    num_items?: number;
  }) {
    this.push({
      event: "AddAddressInfo",
      content_ids,
      contents,
      phone: GTMTracker.hash(phone),
      value,
      currency,
      user_id: GTMTracker.hash(user_id),
      num_items,
    });
  }

  // ---------- 🔹 ADD PAYMENT INFO ----------
  static trackAddPaymentInfo({
    content_ids,
    contents,
    value,
    currency,
    phone,
    user_id,
    num_items,
    first_name,
    last_name,
    city,
    state,
    zip,
    country,
  }: {
    content_ids?: string[];
    contents?: Array<{ id: string; quantity?: number; item_price?: number }>;
    value?: number;
    currency?: string;
    phone?: string;
    user_id?: string;
    num_items?: number;
    first_name?: string;
    last_name?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  }) {
    this.push({
      event: "AddPaymentInfo",
      content_ids,
      contents,
      value,
      currency,
      phone: GTMTracker.hash(phone),
      user_id: GTMTracker.hash(user_id),
      num_items,
      first_name: GTMTracker.hash(first_name),
      last_name: GTMTracker.hash(last_name),
      city: GTMTracker.hash(city),
      state: GTMTracker.hash(state),
      zip: GTMTracker.hash(zip),
      country: GTMTracker.hash(country),
    });
  }

  // ---------- 🔹 PURCHASE ----------
  static trackPurchase({
    transaction_id,
    content_ids,
    contents,
    value,
    currency,
    num_items,
    phone,
    first_name,
    last_name,
    city,
    state,
    zip,
    country,
    coupon,
    payment_method,
    user_id,
  }: {
    transaction_id: string;
    content_ids: string[];
    contents?: Array<{ id: string; quantity?: number; item_price?: number }>;
    value: number;
    currency: string;
    num_items?: number;
    phone?: string;
    first_name?: string;
    last_name?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    coupon?: string;
    payment_method?: string;
    user_id?: string;
  }) {
    this.push({
      event: "Purchase",
      transaction_id,
      content_ids,
      contents,
      value,
      currency,
      num_items,
      phone: GTMTracker.hash(phone),
      first_name: GTMTracker.hash(first_name),
      last_name: GTMTracker.hash(last_name),
      city: GTMTracker.hash(city),
      state: GTMTracker.hash(state),
      zip: GTMTracker.hash(zip),
      country: GTMTracker.hash(country),
      coupon,
      payment_method,
      user_id: GTMTracker.hash(user_id),
    });
  }
}
