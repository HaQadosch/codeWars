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
  [...getAllDivisors(1, 50)]; /*?*/
  return [...getAllDivisors(m, n)]
    .map(addTotal)
    .filter(({ total }) => isSquared(Math.sqrt(total)))
    .map(({ val, total }) => [val, total]);

  type DivisorsType = {
    val: number;
    divs?: number[];
    total?: number;
  };

  function* getAllDivisors(
    start: number,
    end: number
  ): IterableIterator<DivisorsType> {
    function divisors(n: number): number[] {
      function inner(actual: number, divs: number[]) {
        if (n < actual) {
          return divs;
        }
        return inner(actual + 1, n % actual === 0 ? divs.concat(actual) : divs);
      }
      return inner(0, []);
    }

    let actual = start;
    while (actual <= end) {
      yield { val: actual, divs: divisors(actual) };
      ++actual;
    }
  }

  function isSquared(n: number): boolean {
    return (n | 0) === n;
  }

  function addTotal({ val, divs }: DivisorsType): DivisorsType {
    return {
      val,
      divs,
      total: divs.reduce((total, actual) => actual * actual + total)
    };
  }
}

listSquared(1, 50); /*?*/
