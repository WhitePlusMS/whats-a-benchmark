/** Leave provenance paths unchanged; only explicit LIBERO retries bypass failed HTTP/media caches. */
export function liberoMediaUrl(base: string, path: string, token = "") {
  const local = `${base}${path}`;
  const isLibero = /^(?:videos|images)\/libero-episode0-/.test(path);
  return token && isLibero
    ? `${local}?libero_retry=${encodeURIComponent(token)}`
    : local;
}
let retrySequence = 0;
export function nextLiberoMediaRetryToken() {
  return `${Date.now()}-${++retrySequence}`;
}
/** Removed elements can emit an old error after a retry or observation switch. */
export function isCurrentMediaEvent(event?: Event) {
  const target = event?.target;
  return !target || !("isConnected" in target) || target.isConnected !== false;
}
