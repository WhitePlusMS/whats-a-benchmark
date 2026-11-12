/** One HumanEval entry (hash or saved position), after both async sections render.
 * This is a readiness handshake only: routing owns the scroll and cancellation.
 */
export function createDeferredDetailAnchor() {
  let sequence = 0;
  let active: {
    key: string;
    token: number;
    settled: Set<"pilot" | "samples">;
    resolve?: (ready: boolean) => void;
    promise?: Promise<boolean>;
  } | null = null;

  function cancel() {
    active?.resolve?.(false);
    active = null;
  }
  function begin(key: string) {
    cancel();
    active = { key, token: ++sequence, settled: new Set() };
  }
  function matches(key: string) {
    return active?.key === key;
  }
  function token(key: string) {
    return active?.key === key ? active.token : undefined;
  }
  function settled(key: string, section: "pilot" | "samples") {
    if (!active || active.key !== key) return;
    active.settled.add(section);
    if (active.settled.size === 2) active.resolve?.(true);
  }
  function wait(key: string): Promise<boolean> {
    if (!active || active.key !== key) return Promise.resolve(false);
    if (active.settled.size === 2) return Promise.resolve(true);
    if (!active.promise)
      active.promise = new Promise<boolean>((resolve) => {
        active!.resolve = resolve;
      });
    return active.promise;
  }
  return { begin, settled, wait, matches, token, cancel };
}

export const humanEvalInitialAnchor = createDeferredDetailAnchor();

/** Reload can carry an old pixel offset; real Back/Forward restoration still wins. */
export function preserveSavedDetailPosition(
  hasPreviousMatchedRoute: boolean,
  hasInitialAnchor: boolean,
  documentNavigationType?: string,
) {
  return (
    hasPreviousMatchedRoute ||
    !hasInitialAnchor ||
    documentNavigationType === "back_forward"
  );
}

/** Same-page changes have no entry request and must not wait for fresh fetches. */
export function shouldWaitForDetailLayout(
  hasEntryRequest: boolean,
  hasHash: boolean,
  restoreSaved: boolean,
) {
  return hasEntryRequest && (hasHash || restoreSaved);
}
