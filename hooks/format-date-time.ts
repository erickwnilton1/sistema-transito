export function formatDateTime(dateString?: string | null, showTime = true) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return showTime
    ? date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
}
