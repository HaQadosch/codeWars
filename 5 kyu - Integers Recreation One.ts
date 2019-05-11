/**
 * Divisors of 42 are : 1, 2, 3, 6, 7, 14, 21, 42. These divisors squared are: 1, 4, 9, 36, 49, 196, 441, 1764. The sum of the squared divisors is 2500 which is 50 * 50, a square!
 * Given two integers m, n (1 <= m <= n) we want to find all integers between m and n whose sum of squared divisors is itself a square. 42 is such a number.
 * The result will be an array of arrays or of tuples (in C an array of Pair) or a string, each subarray having two elements, first the number whose squared divisors is a square and then the sum of the squared divisors.
 * #Examples:
 * list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
 * list_squared(42, 250) --> [[42, 2500], [246, 84100]]
 * The form of the examples may change according to the language, see Example Tests: for more details.
 */
function listSquared(m: number, n: number): number[][] {
  const allDivs = [];
  function divisors(n: number): number[] {
    function inner(actual: number, divs: number[]) {
      if (n < actual) {
        return divs;
      }
      if (n % actual === 0) {
        divs.push(actual);
      }
      return inner(actual + 1, divs);
    }
    return inner(0, []);
  }

  let actual = m;
  while (actual <= n) {
    const divs = divisors(actual);
    const total = divs.reduce((total, actual) => actual * actual + total);
    if (isSquared(Math.sqrt(total))) {
      allDivs.push([actual, total]);
    }
    ++actual;
  }
  return allDivs;

  function isSquared(n: number): boolean {
    return (n | 0) === n;
  }
}
