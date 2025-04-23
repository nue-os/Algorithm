/* 완전범죄 */

function solution(info, n, m) {
  const INF = Infinity;
  const maxA = n - 1;
  const maxB = m - 1;

  // DP 테이블 초기화
  // dp[a][b] = A 도둑이 a만큼, B 도둑이 b만큼 훔친 상태에서 A 도둑이 남긴 흔적의 최소값을 기록
  let dp = Array.from({ length: n }, () => Array(m).fill(INF)); // 아직 방문하지 않아서 값이 없고, 무한대로 큰 상태로 초기화
  dp[0][0] = 0;

  for (let [aTrace, bTrace] of info) {
    let newDp = Array.from({ length: n }, () => Array(m).fill(INF));

    for (let a = 0; a <= maxA; a++) {
      for (let b = 0; b <= maxB; b++) {
        if (dp[a][b] === INF) continue; // 불가능한 경우 건너뛰기

        // A 도둑이 훔치는 경우
        let newA = a + aTrace;
        let newB = b;
        if (newA <= maxA) {
          newDp[newA][newB] = Math.min(newDp[newA][newB], dp[a][b] + aTrace);
        }

        // B 도둑이 훔치는 경우
        newA = a;
        newB = b + bTrace;
        if (newB <= maxB) {
          newDp[newA][newB] = Math.min(newDp[newA][newB], dp[a][b]);
        }
      }
    }
    dp = newDp; // 업데이트
  }

  // 최소 A 도둑 흔적 찾기
  let answer = INF;
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < m; b++) {
      answer = Math.min(answer, dp[a][b]);
    }
  }

  return answer === INF ? -1 : answer;
}

// 테스트 케이스
// console.log(solution([[1, 2], [2, 3], [2, 1]], 4, 4)); // 2
// console.log(solution([[1, 2], [2, 3], [2, 1]], 1, 7)); // 0
// console.log(solution([[3, 3], [3, 3]], 7, 1)); // 6
// console.log(solution([[3, 3], [3, 3]], 6, 1)); // -1
