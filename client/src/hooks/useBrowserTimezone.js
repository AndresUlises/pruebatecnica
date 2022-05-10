export function useBrowserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
