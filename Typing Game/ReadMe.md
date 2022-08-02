# 기능 목록

- [o] - 난이도 정하기 (Easy, Medium, Hard)
- [o] - 커서 바로 input으로 가서 칠 수 있게 하기 // input.focus();
- [o] - 난이도에 따른 타임과 스코어
- [o] - 단어 무작위로 띄워주기 -> API가 아니라 좀 그럼
- [o] - 단어 입력시 문제 바꾸고 맞으면 score + 1
- [o] - 시간 다 지나면 Time run out 페이지 띄워주기

# 회고록

- 이번 미니 프로젝트는 뭔가 쉬운듯 했다.
- 하지만 form 태그를 넣는 이유가 궁금했다.
  - change 이벤트를 갖고 오는 것은 select에서도 충분
  - 솔직히 div 태그로 걍 감싸는것과의 차이는 잘 모르겠다.
  - 한번 더 고민해보고 찾아봐야겠다.
- end-game-container를 그냥 position: absolute로 해당 요소 앞에 표시 해버리던것이 좀 색달랐다. 모든 DOM요소를 안바꿔도 됬기 떄문이다.
- setIntever(functiom, 1000) 으로 1초씩 지나가게 한다.
- function으로 해당 DOM 요소를 관리한다.
