export default function getPrimeNumbers(upperLimit) {
    const primeNumbers = [];
    for(let i = 2; i < upperLimit; i++) {
      if(i === 2 || i === 3) {
        primeNumbers.push(i);
      }
      const testFactor = Math.sqrt(i);
      for(let j = 2; j <= testFactor; j++) {
        if(i % j === 0) {
          break;
        }
        if(j === Math.floor(testFactor)) {
          primeNumbers.push(i);
        }
      }
    }
    return primeNumbers;
}