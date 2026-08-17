export function formatMoney(amount) {
  if (amount === undefined || amount === null) return "$0.00";
  if (typeof amount === "number") return `$${amount.toFixed(2)}`;
  const numeric = parseFloat(amount);
  if (isNaN(numeric)) return "$0.00";
  // Only divide by 100 if the value looks like minor units (e.g. "1800" for $18.00).
  // If the string is 5 chars or fewer it's already in dollar units (e.g. "18").
  return `$${(numeric / (String(amount).length > 5 ? 100 : 1)).toFixed(2)}`;
}
