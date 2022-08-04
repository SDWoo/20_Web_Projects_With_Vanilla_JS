# 기능목록

- 1. 카드 추가 기능
- [o] - add 버튼 누를 시, 카드만들 수있는 addContainer 띄워주기
- [o] - addContainer에서 입력받은 querstion과 answer를 관리하기
- [o] - 관리한 question과 answer를 localStorage에 저장한다.
- [o] - 새로고침으로 처음 화면으로 돌아와 localStorage에서 정보를 받아와 DOM요소로 바꾸어 보여주기

- 2. 카드 관리 기능
- [o] - front (question) 카드를 클릭하면 한바퀴 돌며 back (answer) 카드를 보여준다. (반대도 역시)
- [o] - 카드 목록이 더 있으면 이전, 다음 버튼으로 보여주기
- [o] - 카드 개수 만큼 목록 보여주고 해당 카드의 인덱스로 1/3 처럼 만들기
- [o] - Clear Cards 클릭 시 카드 없애기

<br>

# 회고록

- 카드를 뒤집는 애니메이션이 어려웠다.

  - 모든건 부모 요소의 perspective 로 부터 시작된다.
    - 3d 효과를 주기 위해 transform, transition등에 3D를 위한 설정해야할 속성
  - perspective를 적용시킬 부분이 어딘지 판단한다. (관찰자 시점의 투영점)
  - perspective 속성은 바로 아래의 자식 요소에게만 전달 됨
  - 바로 아래의 자식을 통해 그 아래의 자식으로 전달
    - `transform-style: preserve-3d;` 를 적용시켜야 함
    - 이게 없다면 적용 불가
  - `backface-visibilty: hidden;`을 적용시키지 않으면 요소의 뒷면을 못숨김
    - 적용시키지 않으면 앞면 뒷면이 함께 보여 이상하게 나옴

- 그 외에 z-index를 가지고 노는 부분이 신경쓰였다.
- js 코드 칠때에는 항상 먼저 에러날 부분을 신경쓰면서 치는 것을 연습해야겠다.
