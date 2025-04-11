/* 동영상 재생기 */
function solution(video_len, pos, op_start, op_end, commands) {
  let curPos = pos;
  // 제일 처음: 현재 위치가 오프닝 범위 안에 있으면 오프닝 끝으로 건너뛰기
  if (curPos >= op_start && curPos <= op_end) {
    curPos = op_end;
  }

  for (const c of commands) {
    // "next" 명령어: 현재 위치 + 10초
    if (c === "next") {
      curPos = addTimes(curPos);
      // 영상 총 길이를 넘어가면 마지막 위치로 고정
      if (curPos > video_len) {
        curPos = video_len;
      }
    }
    // "prev" 명령어: 현재 위치 - 10초
    else {
      curPos = subtractTimes(curPos);
    }
    // 이동한 결과가 오프닝 범위에 있으면 오프닝 끝으로 건너뛰기
    if (curPos >= op_start && curPos <= op_end) {
      curPos = op_end;
    }
  }
  return curPos;
}

// 시간을 10초 더하는 함수
function addTimes(time) {
  const [mm, ss] = time.split(":").map(Number);
  let totalSs = ss + 10;
  const newMm = mm + Math.floor(totalSs / 60);
  totalSs %= 60;

  return `${String(newMm).padStart(2, "0")}:${String(totalSs).padStart(
    2,
    "0"
  )}`;
}

// 시간을 10초 빼는 함수
function subtractTimes(time) {
  const [mm, ss] = time.split(":").map(Number);
  let totalSs = mm * 60 + ss;
  totalSs -= 10;

  // 0초 미만이면 "00:00" 반환
  if (totalSs < 0) return "00:00";

  const newMm = Math.floor(totalSs / 60);
  const newSs = totalSs % 60;

  return `${String(newMm).padStart(2, "0")}:${String(newSs).padStart(2, "0")}`;
}

// 테스트 케이스
// console.log(solution("34:33", "13:00", "00:55", "02:55", ["next", "prev"])); // "13:00"
// console.log(
//   solution("10:55", "00:05", "00:15", "06:55", ["prev", "next", "next"])
// ); // "06:55"
// console.log(solution("07:22", "04:05", "00:15", "04:07", ["next"])); // "04:17"
