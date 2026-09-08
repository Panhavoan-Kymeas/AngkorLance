import { AxiosError } from "axios";

/**
 * RFC 7807 problem body returned by the backend for every error.
 */
export interface ProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  traceId?: string;
  errors?: Record<string, string>;
}

/**
 * Turn any thrown value from an API call into a user-facing message.
 * Prefers the first field-level validation error, then `detail`, then `title`.
 */
export function parseApiError(err: unknown, fallback = "Something went wrong. Please try again."): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as ProblemDetail | undefined;
    if (data) {
      if (data.errors) {
        const first = Object.values(data.errors)[0];
        if (first) return first;
      }
      if (data.detail) return data.detail;
      if (data.title) return data.title;
    }
    if (err.code === "ERR_NETWORK") return "Cannot reach the server. Check your connection.";
    return err.message || fallback;
  }
  if (err instanceof Error) return err.message || fallback;
  return fallback;
}

/** HTTP status of an API error, if available. */
export function errorStatus(err: unknown): number | undefined {
  return err instanceof AxiosError ? err.response?.status : undefined;
}
