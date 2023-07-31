# 이노베이션 코딩테스트

#### 참가자 : 김봉섭

#### 기술 스택 : jdk 11, Mysql 8, Mybatis, React

<br>

## API

### GET : 전체 리스트 조회

http://13.125.31.169:8080/list

### POST : 리스트 생성

http://13.125.31.169:8080/list

### DELETE : 리스트 삭제

http://13.125.31.169:8080/list

### UPDATE : 리스트 수정

http://13.125.31.169:8080/list/update

<br>

## 내용

### 에러처리

- 에러처리는 spring 에서만 구현했습니다. react 에서는 catch를 사용해 에러시 서버로 받은 responseMessage만 보여줍니다.
  1. 선택 항목 10개 초과시
  2. 유효성 검사 (공백 불가, income 양수만 가능)
  3. update, delete 해당하는 id 확인

### reponseDefault

- 프로트엔드와 소통을 편하게 하기 위해 response 형태를 만들어 사용했습니다. (Nest.js 에서 자동으로 되던 작업이 없어서 추가했습니다.)

  {
  "success": true,
  "statusCode": 200,
  "responseMessage": "리스트 조회 성공",
  "data": null
  }

### 배포

- 프리티어 버전 이용시 서버가 성능이 좋지 못해 한 서버에 프론트, 백 모두 올리는 것은 무리라고 생각하여 따로 배포 하였습니다. 이를 위해 cors 에러 방지를 위한 작업을 했습니다.
