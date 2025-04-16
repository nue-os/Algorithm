/* 멀리 뛰기 */

function solution(n) {
  const dp = [1, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1234567;
  }
  return dp[n];
}

/*
    n-1칸까지 간 후 + 1칸 뛰기
    n-2칸까지 간 후 + 2칸 뛰기
*/
