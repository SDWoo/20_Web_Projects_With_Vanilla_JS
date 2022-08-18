# 기술 목록

1.  Fetch로 post 요청 보내기

- [o] - async/await Fetch 요청으로 데이터 받아오기
- [o] - 받아온 데이터 DOM요소 만들어 화면에 보여주기
- [o] - scroll 이벤트 받아서 스크롤이 끝이면 로딩 보여주기
- [o] - 그리고 몇 초 후 DOM요소 더 추가
- [o] - 검색하고 바로 filter

# 회고록

- 느낀점
  - Fetch데이터를 받아오는 것은 많이 익숙해졌다.
  - 그러나, 스크롤 이벤트는 좀 생소했어서 연습 해야될거 같다.
  - DOM요소가 받아와질때 setTimeout()을 써서 비동기로 처리됨
  - 그 비동기 처리 때문에 순서가 엮일 수 있다고 생각함
  - 그래서 showPosts()의 맨 아래에 filter를 또 하나 넣음
  - 이걸로 posts가 불러와질 때마다 filter를 할 수있게 됨.