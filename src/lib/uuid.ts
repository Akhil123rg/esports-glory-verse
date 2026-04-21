// Tiny helper to detect whether a string looks like a UUID.
// Used to differentiate hardcoded mock team IDs ("1", "12") from real DB rows.
export const isUuid = (value: string | undefined | null): boolean => {
  if (!value) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
};
