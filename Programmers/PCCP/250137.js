/* 붕대 감기 */
function solution(bandage, health, attacks) {
  const [t, x, y] = bandage; // [시전 시간, 초당 회복량, 추가 회복량]
  let currHp = health; // 현재 체력
  let count = 0; // 연속 성공 카운트
  let k = 0; // attacks 배열 탐색을 위한 인덱스 포인터

  const lastAttackTime = Math.max(...attacks.map((sub) => sub[0])); // 마지막 공격 시간

  // 1초부터 마지막 공격 시간까지
  for (let i = 1; i <= lastAttackTime; i++) {
    // 공격 받는 경우
    if (i === attacks[k][0]) {
      currHp -= attacks[k][1];
      count = 0;
      k++;

      if (currHp <= 0) return -1;
    }
    // 공격 안받는 경우
    else {
      currHp += x;
      count++;

      // 연속 붕대 감기
      if (count === t) {
        currHp += y;
        count = 0;
      }
    }

    // 최대 체력 넘어가는 경우 처리
    if (currHp > health) currHp = health;
  }

  return currHp;
}

// 테스트케이스
// console.log(solution([5, 1, 5], 30, [[2, 10], [9, 15], [10, 5], [11, 5]])); // 5
// console.log(solution([3, 2, 7], 20, [[1, 15], [5, 16], [8, 6]])); // -1
// console.log(solution([4, 2, 7], 20, [[1, 15], [5, 16], [8, 6]])); // -1
// console.log(solution([1, 1, 1], 5, [[1, 2], [3, 2]])); // 3
