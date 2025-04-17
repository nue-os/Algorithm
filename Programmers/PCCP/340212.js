/* 퍼즐 게임 챌린지 */
function solution(diffs, times, limit) {
  // 이분 탐색으로 접근
  let minLevel = 1;
  let maxLevel = 100000;
  let midLevel = Math.floor((minLevel + maxLevel) / 2);

  while (minLevel < maxLevel) {
    let sum = times[0]; // 첫 번째 퍼즐은 무조건 틀리지 않으므로 그대로 시간 추가

    // 두 번째 퍼즐부터 끝까지 시뮬레이션
    for (let i = 1; i < diffs.length; i++) {
      sum += calTime(diffs[i], midLevel, times[i], times[i - 1]);
    }

    // 현재 숙련도(midLevel)로 시간 내에 가능한 경우 -> 더 낮은 숙련도도 가능한지 확인
    if (sum <= limit) {
      maxLevel = midLevel;
    } else {
      // 시간이 초과되면 숙련도를 높여야 하므로 범위를 오른쪽으로 좁힘
      minLevel = midLevel + 1;
    }

    // 새 이분 탐색 기준값 설정
    midLevel = Math.floor((minLevel + maxLevel) / 2);
  }
  // minLevel은 가능한 숙련도 중 최소값
  return minLevel;
}

// 퍼즐 하나를 푸는 데 걸리는 시간 계산 함수
function calTime(diff, level, currTime, prevTime) {
  if (diff <= level) return currTime;
  return (currTime + prevTime) * (diff - level) + currTime;
}

// 테스트 케이스
// console.log(solution([1, 5, 3], [2, 4, 7], 30)); // 3
// console.log(solution([1, 4, 4, 2], [6, 3, 8, 2], 59)); // 2
// console.log(solution([1, 328, 467, 209, 54], [2, 7, 1, 4, 3], 1723)); // 294
// console.log(
//   solution([1, 99999, 100000, 99995], [9999, 9001, 9999, 9001], 3456789012)
// ); // 39354
