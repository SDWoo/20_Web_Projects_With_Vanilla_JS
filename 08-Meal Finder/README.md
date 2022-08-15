# step 1. 검색

- [o] input에 입력 -> form에 submit으로 eventListener를 받아오기
- [o] 입력한 정보에 대한 데이터를 받아오기
- [o]해당 정보들 화면에 띄워주기
- [o]사진 클릭하면 그 메뉴에 대한 자세한 정보 띄워주기

# step 2. random 버튼

- [o] random 버튼 누르면 랜덤 메뉴 자세한 정보 띄워주기

# 회고록

- 전체 정리

1. 검색해서 해당 정보 받아오기

   - input에 입력하고 submit을 하면, event객체가 받아와진다.
   - 해당 input.value를 가지고 async/await fetch 함수로 데이터 요청
   - 해당 데이터로 DOM요소들 구성해서 resultHeading 과 mealsEl innerHTML에 추가
   - innerHTML에 추가할 때, map으로 배열 형태이니까 다시 join()메서드로 쭉 이어지게 만듬
   - 해당 이미지들로 grid 구조 repeat(4,1fr)으로 만들어 화면에 표시

2. 이미지 클릭시 해당 id로 구체적인 정보 가져와 화면에 보여주기

   - 이미지 클릭 전에 이 모든 정보들을 가지고 있으면 좋지만 그럴 필요는 없으므로 이미지 클릭시로 바꿈
   - 이미지 클릭 시, 해당 이벤트 객체의 composedPath()를 써서 해당 요소부터 window까지의 상위요소를 받음
   - find()메서드로 그 상위 요소 중에 classList에 meal-info가 있으면 true인 요소를 저장
   - 그 요소의 ID를 통해 다시 async/awiat fetch 요청을 해 데이터 받아옴
   - 해당 데이터들로 DOM요소 구성해서 화면에 표시

3. 랜덤 버튼 클릭 시 랜덤한 음식 정보 가져와 화면에 보여주기

   - 랜덤 버튼 클릭 시 지금까지 있던 mealEl과 result-heading 비워주기
   - 그리고 랜덤으로 api 요청
   - 그 데이터로 위에 썻던 이미지 클릭시 화면 표시 처럼 한 메뉴에 대한 정보 표시

- 잘 몰랐었던 점
  - 이벤트 클릭시 해당 객체의 상위 요소를 배열로 가져오는 composedPath()
  - find()메소드: true 이면 해당 요소 가져오고 false면 무시
