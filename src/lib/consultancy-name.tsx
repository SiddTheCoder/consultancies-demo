import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getConsultancyProfile, type ConsultancyProfile } from "@/data/consultancies";

export const DEFAULT_CONSULTANCY_NAME = "Global Education Consultancy";

const STORAGE_KEY = "demo-consultancy-name";
const RESERVED_ROUTE_SEGMENTS = new Set(["sample-1", "sample-2", "sample-3"]);

type ConsultancyNameContextValue = {
  consultancyName: string;
  emailAddress: string;
  consultancyKey: string | null;
  consultancyProfile?: ConsultancyProfile;
  hasUrlConsultancyName: boolean;
  setConsultancyName: (name: string) => void;
};

const ConsultancyNameContext = createContext<ConsultancyNameContextValue | null>(null);

function createEmailAddress(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 28);

  return `hello@${slug || "consultancy"}.edu`;
}

function titleCaseName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

function decodeConsultancyName(value: string | null) {
  if (!value) return null;
  const decoded = decodeURIComponent(value)
    .replace(/[+_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return decoded ? titleCaseName(decoded) : null;
}

function normalizeConsultancyKey(value: string | null) {
  if (!value) return null;
  const decoded = decodeURIComponent(value).trim().toLowerCase();
  return decoded || null;
}

function getPathnameWithoutBase(pathname: string) {
  const base = import.meta.env.BASE_URL || "/";
  if (base !== "/" && pathname.startsWith(base)) {
    return `/${pathname.slice(base.length)}`;
  }
  return pathname;
}

function getFirstRouteSegment() {
  if (typeof window === "undefined") return null;

  const pathname = getPathnameWithoutBase(window.location.pathname);
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (!firstSegment || RESERVED_ROUTE_SEGMENTS.has(firstSegment)) return null;

  return firstSegment;
}

export function getUrlConsultancyKey() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const queryKey =
    normalizeConsultancyKey(params.get("consultancyKey")) ||
    normalizeConsultancyKey(params.get("key")) ||
    normalizeConsultancyKey(params.get("consultancy"));

  if (queryKey && getConsultancyProfile(queryKey)) return queryKey;

  const firstSegment = normalizeConsultancyKey(getFirstRouteSegment());
  if (firstSegment && getConsultancyProfile(firstSegment)) return firstSegment;

  return null;
}

export function getUrlConsultancyName() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const knownProfile = getConsultancyProfile(getUrlConsultancyKey());
  if (knownProfile) return knownProfile.name;

  const queryName =
    decodeConsultancyName(params.get("consultancy")) ||
    decodeConsultancyName(params.get("consultancyName")) ||
    decodeConsultancyName(params.get("name"));

  if (queryName) return queryName;

  const firstSegment = getFirstRouteSegment();
  if (!firstSegment) return null;

  return decodeConsultancyName(firstSegment);
}

export function ConsultancyNameProvider({ children }: { children: ReactNode }) {
  const [hasUrlConsultancyName] = useState(() => Boolean(getUrlConsultancyName()));
  const [consultancyKey] = useState(() => getUrlConsultancyKey());
  const [consultancyProfile] = useState(() => getConsultancyProfile(getUrlConsultancyKey()));
  const [consultancyName, setConsultancyNameState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_CONSULTANCY_NAME;
    const urlName = getUrlConsultancyName();
    if (urlName) return urlName;
    return window.localStorage.getItem(STORAGE_KEY) || DEFAULT_CONSULTANCY_NAME;
  });

  const value = useMemo<ConsultancyNameContextValue>(() => {
    const setConsultancyName = (name: string) => {
      const trimmed = name.trim() || DEFAULT_CONSULTANCY_NAME;
      setConsultancyNameState(trimmed);
      window.localStorage.setItem(STORAGE_KEY, trimmed);
    };

      return {
        consultancyName,
      emailAddress: consultancyProfile?.email || createEmailAddress(consultancyName),
      consultancyKey,
      consultancyProfile,
      hasUrlConsultancyName,
      setConsultancyName,
    };
  }, [consultancyKey, consultancyName, consultancyProfile, hasUrlConsultancyName]);

  return (
    <ConsultancyNameContext.Provider value={value}>
      {children}
    </ConsultancyNameContext.Provider>
  );
}

export function useConsultancyName() {
  const value = useContext(ConsultancyNameContext);
  if (!value) {
    throw new Error("useConsultancyName must be used inside ConsultancyNameProvider");
  }
  return value;
}
