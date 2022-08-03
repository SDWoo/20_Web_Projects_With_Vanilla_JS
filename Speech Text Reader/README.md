# 기능 목록

- 처음 기능
- [o] - image와 text받아와서 화면에 grid 구조로 띄워주기

- Text Box 기능
- [o] - Toggle Text Bar 버튼으로 .show toggle하기
- [o] - voice 받아와서 Text Bar의 select 태그에 option으로 넣기
- [o] - voice가 정해지면 정해지면 해당 value를 message.voice에 넣기
- [o] - Read Text 버튼을 누르면 textarea에 입력된 value를 message.text에 넣기
- [o] - speechSynthesis.speak(message 객체)로 speak 하기

- 아이템 클릭 시
- [o] - item 클릭하면 text를 받아와서 message객체의 text로 정하기
- [o] - voice 정해지면 새로 생성해논 message 객체의 text로 정하기
- [o] - speechSynthesis.speak(message 객체)로 speak 하기

# CSS 정리

- 가운데 정렬하는 많은 방식이 있다.

  - display: block; 후 margin: auto;
  - text-align: center; -> 그 요소가 바로 영향받을 수 있게 해야함
  - display: flex; 후 justify-content나 align-items;
    - 이 flex의 경우 바로 아래 자식들에게만 영향을 줌.

- 하나의 요소만 따로 가지고 노는 경우

  - position: absolute 로 가지고 놀기.
    - 부모의 position: relative이면 그 안에서 놀고아니면 밖에서 논다.
  - float: right; 등으로도 가지고 놀 수 있다.

- 조건부로 화면에 보이게 하기

  - transform: translate() 화면의 밖으로 내보넀다가 클릭 시 다시 오게하기
  - class요소를 추가해서 (show 등) toggle로 display: none; 하기.

# 회고록

- speechSynthesis라는 객체를 처음봐서 신기했다.
  - 사용법이 너무 다양해서 좀 안을 파고들고 싶었다.
  - 특히 const message = new SpeechSynthesisUtterance(); 처럼 생성자 함수로 사용해서 .text, .voice, .name등을 정하고 쓰는것이 재미있었다.
  - 여기만 해당하는 것 같은 voicechange 이벤트도 생소했다.
  - 한번 더 해보며 감을 더 익혀 봐야곘다.
