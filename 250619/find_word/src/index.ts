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

// NOTE BaseNode의 count키와 스트링 충돌이 나서 일단은 이렇게 구현
type BaseNodeKey = `${string}__key`;

type BaseNode = {
  count: number;
  [key: BaseNodeKey]: BaseNode | null;
};

const linkedList = new Map<string, BaseNode>();

type BeforeKeyType = {
  [key: BaseNodeKey]: BeforeKeyType;
};

const 테스트와꾸2 = {
  a: {
    등장횟수: 2,
    다음노드: {
      a: {
        등장횟수: 1,
        다음노드: {
          p: {
            등장횟수: 1,
          },
        },
      },
      p: {
        등장횟수: 1,
        다음노드: {
          p: {
            등장횟수: 1,
            다음노드: {
              l: {
                등장횟수: 1,
                다음노드: {
                  l: {
                    등장횟수: 1,
                    다음노드: {
                      e: {
                        등장횟수: 1,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      i: {
        등장횟수: 1,
        다음노드: {
          r: {
            등장횟수: 1,
          },
        },
      },
    },
  },
  b: {
    등장횟수: 1,
  },
};

interface BaseNode2 {
  count: number;
  next?: Map<string, BaseNode>;
}
const linkedList2 = new Map<string, BaseNode2>();

const find = (value: string) => {
  const letters = value.split('');

  for (let index = 0; index < letters.length; index++) {
    const element = letters[index];
    const isExist = linkedList2.has(element);

    if (isExist) {
      const curNode = linkedList2.get(element);
      if (curNode?.next) {
        // note 그럼 넥스트에 있는 모든 노드의 조합을 찾고 넥스트 없을때까지 들어간다음 해당 노드의 카운트와 함꼐 반환하면 될듯?
      } else {
        return curNode?.count;
      }
    }
  }
};

const append = (target: string, beforeKeys: BeforeKeyType | undefined) => {
  // note 단어의 첫번째 알파벳
  if (!beforeKeys) {
    // note 만약에 타겟키가 이미 등록되어있지 않다면
    if (linkedList.has(target)) {
      linkedList.set(target, {
        count: 1,
      });
    }
    // note 만약에 타겟키가 이미 등록되어있다면
    const 기존값 = linkedList.get(target);
    const 덮어쓸값 = {
      ...기존값,
      count: 기존값?.count! + 1,
    };

    linkedList.set(target, 덮어쓸값);
  } else {
    const key = Object.keys(beforeKeys)[0];

    const 기존값 = linkedList.get(key)!;
    const 덮어쓸값 = {
      ...기존값,
      count: 기존값?.count! + 1,
    };
    linkedList.set(key, 덮어쓸값);

    // note 그리고 남은 것들은?
  }
};

// oneMilionDataWords.forEach((word)=>{
//   const letters = word.split("");
//   letters.forEach((letter, i)=>{
//     const key :BaseNodeKey= `${letter}__key`
//     if(!linkedList.has(key)){
//       linkedList.set(key)
//     }
//     if(linkedList.has(key))

//   })
// })

// apple, air, aap
// 리스트의 각 단어를 알파벳별로 쪼개서 결국엔 마지막껄 찾으면 해당 값이 등장순서 아닌가?
const 테스트와꾸 = {
  a: {
    등장횟수: 2,
    a: {
      등장횟수: 1,
      p: {
        등장횟수: 1,
      },
    },
    p: {
      등장횟수: 1,
      p: {
        등장횟수: 1,
        l: {
          등장횟수: 1,
          l: {
            등장횟수: 1,
            e: {
              등장횟수: 1,
            },
          },
        },
      },
    },
    i: {
      등장횟수: 1,
      r: {
        등장횟수: 1,
      },
    },
  },
};

function findWord(prefix: string): {
  duration: number;
  result: string[];
} {
  const startTime = performance.now();
  const result: string[] = [];

  // note 사전작업: 연결리스트 구현
  // note   - 각 노드는 해당하는 알파벳, 단어의 위치(이건 필요없을듯?), 해당위치에 등장하는 알파벳의 총갯수(apple, air 이렇게 있으면 첫번째 단어위치에 해당하는 a는 2겠지)
  // note   -  다음으로 연결되는 알파벳 포인터
  // note 인풋이 들어오면, 문자별로 쪼갠다?
  // note 쪼갠거의 첫번쨰 값을 슽
  // note
  // note
  // note

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
