export function formatTime(secounds: number) {
  const min = Math.floor(secounds / 60);
  const secs = (secounds % 60).toString().padStart(2, "0");
  return `${min}:${secs}`;
}
