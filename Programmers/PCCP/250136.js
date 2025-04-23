/* 석유 시추 */

const directions = [
  [-1, 0], // 위
  [1, 0], // 아래
  [0, -1], // 왼쪽
  [0, 1], // 오른쪽
];

function solution(land) {
  const n = land.length;
  const m = land[0].length;
  const visited = Array.from({ length: n }, () => Array(m).fill(false)); // 방문 여부 체크
  const oilCluster = []; // 석유 덩어리 정보 저장

  // 전체 칸 순회하면서 DFS 수행
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (land[i][j] !== 0 && !visited[i][j]) {
        const cluster = { size: 0, columns: new Set() };
        dfs(i, j, land, visited, cluster);
        oilCluster.push(cluster);
      }
    }
  }

  // 각 열에서 얻을 수 있는 석유량 계산
  const maxOil = Array(m).fill(0);

  for (const cluster of oilCluster) {
    for (const column of cluster.columns) {
      maxOil[column] += cluster.size;
    }
  }

  return Math.max(...maxOil);
}

function dfs(x, y, land, visited, cluster) {
  const n = land.length;
  const m = land[0].length;
  const stack = [[x, y]];

  while (stack.length > 0) {
    const [cx, cy] = stack.pop();

    // 범위를 벗어나거나 이미 방문했거나 석유가 없는 칸이면 무시
    if (
      cx < 0 ||
      cx >= n ||
      cy < 0 ||
      cy >= m ||
      visited[cx][cy] ||
      land[cx][cy] === 0
    ) {
      continue;
    }

    visited[cx][cy] = true; // 방문 처리
    cluster.size++; // 석유 덩어리 크기 증가
    cluster.columns.add(cy); // 현재 열 저장

    // 네 방향 탐색
    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;
      stack.push([nx, ny]);
    }
  }
}

// 테스트 케이스
// console.log(
//   solution([
//     [0, 0, 0, 1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 1, 1, 0, 0],
//     [1, 1, 0, 0, 0, 1, 1, 0],
//     [1, 1, 1, 0, 0, 0, 0, 0],
//     [1, 1, 1, 0, 0, 0, 1, 1],
//   ])
// ); // 9

// console.log(
//   solution([
//     [1, 0, 1, 0, 1, 1],
//     [1, 0, 1, 0, 0, 0],
//     [1, 0, 1, 0, 0, 1],
//     [1, 0, 0, 1, 0, 0],
//     [1, 0, 0, 1, 0, 1],
//     [1, 0, 0, 0, 0, 0],
//     [1, 1, 1, 1, 1, 1],
//   ])
// ); // 16
