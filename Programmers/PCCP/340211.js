/* 충돌위험 찾기 */
function solution(points, routes) {
  const timeMap = {}; // {시간: {좌표: 로봇 수}}

  // 각 로봇의 경로를 따라 시뮬레이션
  routes.forEach((route) => {
    let currentPoint = points[route[0] - 1]; // 시작 위치
    let t = 0; // 시간 0초부터 시작

    // 출발 위치 기록
    recordTime(currentPoint[0], currentPoint[1], t, timeMap);

    // 경로의 다음 포인트들로 하나씩 이동
    for (let i = 1; i < route.length; i++) {
      let nextPoint = points[route[i] - 1];

      // 현재 위치에서 다음 포인트로 최단 거리 이동
      while (
        currentPoint[0] !== nextPoint[0] ||
        currentPoint[1] !== nextPoint[1]
      ) {
        // r 좌표 먼저 이동
        if (currentPoint[0] < nextPoint[0]) {
          currentPoint = [currentPoint[0] + 1, currentPoint[1]];
        } else if (currentPoint[0] > nextPoint[0]) {
          currentPoint = [currentPoint[0] - 1, currentPoint[1]];
        }
        // c 좌표 이동
        else if (currentPoint[1] < nextPoint[1]) {
          currentPoint = [currentPoint[0], currentPoint[1] + 1];
        } else if (currentPoint[1] > nextPoint[1]) {
          currentPoint = [currentPoint[0], currentPoint[1] - 1];
        }
        t++; // 시간 1초 증가
        recordTime(currentPoint[0], currentPoint[1], t, timeMap); // 이동 위치 기록
      }
    }
  });

  // 모든 로봇 이동 후 충돌 횟수 계산
  let answer = calCollisionNum(timeMap);
  return answer;
}

// 특정 시간과 위치에 로봇이 도달한 횟수를 기록
function recordTime(r, c, time, timeMap) {
  if (!timeMap[time]) timeMap[time] = {};
  if (!timeMap[time][`${r},${c}`]) timeMap[time][`${r},${c}`] = 0;
  timeMap[time][`${r},${c}`]++;
}

// 충돌 횟수 계산
function calCollisionNum(timeMap) {
  let sum = 0;

  for (const time in timeMap) {
    const posObj = timeMap[time];
    for (const pos in posObj) {
      const count = posObj[pos];
      if (count > 1) sum++;
    }
  }
  return sum;
}

// 테스트 케이스
// console.log(solution([[3,2],[6,4],[4,7],[1,4]], [[4,2],[1,3],[2,4]])); // 1
// console.log(solution([[3,2],[6,4],[4,7],[1,4]], [[4,2],[1,3],[4,2],[4,3]])); // 9
// console.log(solution([[2,2],[2,3],[2,7],[6,6],[5,2]], [[2,3,4,5],[1,3,4,5]])); // 0
