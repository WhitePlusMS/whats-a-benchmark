/** Read an existing text field without flattening or changing a source record. */
export function sampleSourceText(
  raw: unknown,
  field?: string,
): string | undefined {
  if (typeof raw === "string") return raw;
  if (!field) return undefined;
  // Existing simple field names remain valid; JSON Pointer supports nested source records.
  const keys = field.startsWith("/")
    ? field
        .slice(1)
        .split("/")
        .map((key) => key.replace(/~1/g, "/").replace(/~0/g, "~"))
    : [field];
  let value: unknown = raw;
  for (const key of keys) {
    if (
      value === null ||
      typeof value !== "object" ||
      !Object.hasOwn(value, key)
    )
      return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return typeof value === "string" ? value : undefined;
}
