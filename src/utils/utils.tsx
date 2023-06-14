export function Randomize(arr: any[], count: number): any[] {
  const randomItems: any[] = [];

  const copyArray = [...arr];

  if (count > copyArray.length) {
    throw new Error("Count cannot be greater than the array length");
  }
  // Select random items until the desired count is reached
  while (randomItems.length < count) {
    const randomIndex = Math.floor(Math.random() * copyArray.length);
    const randomItem = copyArray.splice(randomIndex, 1)[0];
    randomItems.push(randomItem);
  }
  return randomItems;
}
