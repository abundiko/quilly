export default function formatNumbers(num: number): string {
  if (num < 1000) {
    return num.toString();
  } else if (num >= 1000 && num < 1000000) {
    const shortenedNum = (num / 1000).toFixed(1);
    return shortenedNum.toString() + "k";
  } else {
    const shortenedNum = (num / 1000000).toFixed(1);
    return shortenedNum.toString() + "m";
  }
}
