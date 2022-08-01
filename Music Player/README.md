# 기능 목록

- HTML, CSS
- [o] 음악 이미지 rotate
- [o] pop up DOM 요소 만들기

- js
- 구현 목록
- 1. 처음 시작시 비디오랑 커버, 이름 받아오기
- [o] - audio.src에 비디오 추가.
- [o] - cover.src에 커버 추가.
- [o] - title에 이름 추가

- 2. 버튼 누를 시 음악 재생, 넘겨주기, 받아오기
- [o] - 시작 버튼 누르면 classList에 play 추가.
- [o] - 추가 되고, 그리고 그 pop-up 창 띄워주기.
- [o] - 프로그레스 바 클릭시 해당 초로 넘겨주기.
- [o] - 다음(이전) 버튼 누르면 다음 음악 받아오기 (비디오, 커버, 타이틀)
- [o] - 노래가 끝나면 다음 음악 받아오기

# 회고록

- 이번거는 js의 기능이 많이 없어서 좀 쉬웠다.
- 하지만 Css적인 부분에서 많이 어려워 아쉬웠다.
- progress bar에 대한 부분이 좀 어려웠다 .
  - e.srcElement(audio)의 duration, currentTime을 받아오기
  - 그 받아온걸로 ( cT / duration ) \* 100 + % 을 width로 해주기
