export type Role = 'student' | 'instructor' | 'admin';
export interface User { id: string; email: string; first_name: string; last_name: string; role: Role; avatar_url?: string; bio?: string; phone?: string }
let accessToken: string | null = null;
let refreshRequest: Promise<{ accessToken: string; user: User }> | null = null;
export function setAccessToken(token: string | null) { accessToken = token; }
export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }
export async function refreshSession() {
  if (!refreshRequest) refreshRequest = fetch('/api/v1/auth/refresh', { method: 'POST', credentials: 'same-origin', headers: {'Content-Type':'application/json'}, body:'{}' })
    .then(async response => { const data = await response.json(); if (!response.ok) { accessToken = null; throw new ApiError(data.error || 'Please sign in', response.status); } accessToken = data.accessToken; return data; })
    .finally(() => { refreshRequest = null; });
  return refreshRequest;
}
export async function api<T = any>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
  const response = await fetch(`/api/v1${path}`, { ...options, credentials: 'same-origin', headers: { 'Content-Type':'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), ...options.headers } });
  if (response.status === 401 && retry && !path.startsWith('/auth/')) {
    try { await refreshSession(); } catch { if (typeof window !== 'undefined') window.dispatchEvent(new Event('session-expired')); throw new ApiError('Your session ended. Sign in again.',401); }
    return api<T>(path, options, false);
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(data.error || data.errors?.map((e: any) => e.msg).join(', ') || 'Request failed. Please try again.', response.status);
  return data;
}
export const post = <T = any>(path: string, body: unknown = {}) => api<T>(path, {method:'POST', body:JSON.stringify(body)});
export const patch = <T = any>(path: string, body: unknown) => api<T>(path, {method:'PATCH', body:JSON.stringify(body)});
export const money = (value: number | string, currency = 'INR') => new Intl.NumberFormat('en-IN', {style:'currency',currency,maximumFractionDigits:2}).format(Number(value));
