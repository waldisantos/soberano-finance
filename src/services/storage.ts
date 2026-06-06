export function saveData(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadData<T>(key: string, fallback: T): T {
  const data = localStorage.getItem(key);

  if (!data) return fallback;

  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}