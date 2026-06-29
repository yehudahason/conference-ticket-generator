export function ticketNumber(): string {
  return `#${Math.round(Math.random() * 100000)}`;
}
