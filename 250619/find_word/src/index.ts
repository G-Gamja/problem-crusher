import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

const oneMilionData = fs.readFileSync(path.join(__dirname, '../input/1m.csv'));
const oneMilionDataWords = oneMilionData
  .toString()
  .split('\n')
  .map((line) => line.trim());

const queryData = fs.readFileSync(path.join(__dirname, '../input/queries.csv'));
const queryWords = queryData
  .toString()
  .split('\n')
  .map((line) => line.trim());

const uniqueOneMilionDataWordsList = [...new Set(oneMilionDataWords)];

function compareIsNotStartWith(element: string, parsedPrefixList: string[]) {
  for (let index = 0; index < parsedPrefixList.length; index++) {
    if (element[index] !== parsedPrefixList[index]) {
      return true;
    }
  }

  return false;
}

function findWord(prefix: string): {
  duration: number;
  result: string[];
} {
  const startTime = performance.now();
  const result: string[] = [];
  const limit = 10;

  const parsedPrefixList: string[] = [];

  for (let index = 0; index < prefix.length; index++) {
    parsedPrefixList.push(prefix[index]);
  }

  for (const element of uniqueOneMilionDataWordsList) {
    if (result.length === limit) {
      break;
    }

    const isWrong = compareIsNotStartWith(element, parsedPrefixList);
    if (isWrong) continue;

    result.push(element);
  }

  result.sort((a, b) => {
    const a등장횟수 = oneMilionDataWords.filter((arrItem) => arrItem === a).length;
    const b등장횟수 = oneMilionDataWords.filter((arrItem) => arrItem === b).length;

    if (a등장횟수 > b등장횟수) return -1;

    if (a등장횟수 < b등장횟수) return 1;

    if (a등장횟수 === b등장횟수) {
      const a인덱스 = uniqueOneMilionDataWordsList.findIndex((uniqueItem) => uniqueItem === a);
      const b인덱스 = uniqueOneMilionDataWordsList.findIndex((uniqueItem) => uniqueItem === b);

      if (b인덱스 > a인덱스) return 1;
      if (b인덱스 < a인덱스) return -1;
      if (b인덱스 === a인덱스) return 0;
    }

    return 0;
  });

  const duration = performance.now() - startTime;

  return {
    duration,
    result,
  };
}

function testWords() {
  const aa = queryWords.map((query) => {
    return findWord(query);
  });

  console.log('🚀 ~ aa ~ aa:', aa);
}

testWords();
