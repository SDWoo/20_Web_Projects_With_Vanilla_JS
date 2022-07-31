# 구현 목록

- [o] text와 amount에 값을 입력하면 local Storage 저장한다.
  - local storage에 저장해야 될 떄 => addTransaction, removeTransaction
  - local Storage에서 받아올 때 => 처음 init 했을 때, add, remove, DOM 바꾸기 전
- [o] add transaction 버튼을 누르면 해당 정보를 갖고 history에 보여준다.

# 회고록

## 순서 정리

- 처음 화면 렌더링

1. 처음에 화면에 보여주기전에 localStorage에서 데이터를 받아와 배열에 저장한다.
2. 해당 배열의 정보를 통해 DOM요소를 만든다. (balance, income, expense, li 등)
3. 만든 DOM요소를 화면에 렌더링 한다.

- 새로운 요소 추가

1. 텍스트에 새로운 요소 추가하면 그 요소들을 배열에 저장한다.
2. 추가된 배열로 화면을 다시 구성한다.
3. 저장한 배열을 localStorage에 보낸다.

- 요소 제거

1. DOM요소를 구성할때, 배열을 map 메서드로 구성하는데, 그 배열의 아이디 값을 onClick의 인자로 넣어버려 해당 원소의 id를 받아온다.
2. 받아온 아이디를 통해 배열을 filter메서드로 구성하고 DOM요소를 업데이트한다.

## 몰랐던 점

- 배열의 ForEach 메서드로 콜백 함수를 넣어버리면, 그 배열 원소들이 하나씩 함수의 인자로 들어가 실행된다.
-
