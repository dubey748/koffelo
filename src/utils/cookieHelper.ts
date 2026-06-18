import Cookies from "universal-cookie";

const cookies = new Cookies();

interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
  httpOnly?: boolean;
}

const defaultOptions: CookieOptions = {
  path: "/",
  sameSite: "lax",
  secure: true,
  httpOnly: false,
};

const setCookie = (key: string, value: any, options: CookieOptions = {}) => {
  cookies.set(key, value, { ...defaultOptions, ...options });
};

const getCookie = (key: string): any => {
  return cookies.get(key);
};

const removeCookie = (key: string, options: CookieOptions = {}) => {
  cookies.remove(key, { ...defaultOptions, ...options });
};

export const cookieHelper = {
  set: setCookie,
  get: getCookie,
  remove: removeCookie,
};
