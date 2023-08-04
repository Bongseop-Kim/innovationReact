# 이노베이션 코딩테스트

#### 참가자 : 김봉섭

#### 기술 스택 : jdk 11, Mysql 8, Mybatis, React

<br>

## API

### GET : 전체 리스트 조회

http://localhost:8080/list

### CREATE : 리스트 생성

http://localhost:8080/list

### DELETE : 리스트 삭제

http://localhost:8080/list

### UPDATE : 리스트 수정

http://localhost:8080/list/update

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

## 코드

### 유효성 검사

```java
// validation 사용
// 인자 값이 배열인 경우 유효성 검사를 위해 ValidList 클래스 사용
 @PostMapping("")
    public ResponseEntity insertList(@RequestBody @Valid ValidList<ListReq> listReqs, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            //유효성 검사
            DefaultRes<List<String>> errorResponse = processErrors(bindingResult);
            return ResponseEntity.badRequest().body(errorResponse);
        }

        if (listReqs.size() > 10) {
            // 선택 사항이 10개 이상이면 에러를 반환하는 로직
            return ResponseEntity.badRequest().body(DefaultRes.res(false, StatusCode.BAD_REQUEST, "항목은 최대 10개 까지 선택 가능합니다."));
        }

        listSvc.doInsert(listReqs);

        return new ResponseEntity(DefaultRes.res(true,StatusCode.CREATED, ResponseMessage.CREATE_LIST), HttpStatus.OK);
    }
```

### 인자가 배열인 경우 에러 메시지

```java
private DefaultRes<List<String>> processErrors(BindingResult bindingResult) {
        //에러 메시지를 배열에 담는 로직
        Set<String> uniqueErrorMessages = new HashSet<>();
        //중복된 메시지는 Set를 이용해 중복을 제거

        for (FieldError error : bindingResult.getFieldErrors()) {
            uniqueErrorMessages.add(error.getDefaultMessage());
        }

        return DefaultRes.res(false, StatusCode.BAD_REQUEST, String.join(", ", uniqueErrorMessages));
    }

```

### 에러처리 : 선택 항목 10개 초과시

```java
if (listReqs.size() > 10) {
            // 선택 사항이 10개 이상이면 에러를 반환하는 로직
            return ResponseEntity.badRequest().body(DefaultRes.res(false, StatusCode.BAD_REQUEST, "항목은 최대 10개 까지 선택 가능합니다."));
        }
```

### 에러처리 : 존재하지 않는 Id

```java
List<Integer> nonExistentIds = new ArrayList<>();

        for (Integer id : ids) {
            // id에 해당하는 데이터가 존재하는지 확인하는 로직
            if (!listSvc.existId(id)) {
                nonExistentIds.add(id);
            }
        }
        // 존재 하지 않는 id를 배열에 넣는 로직
        String nonExistentIdsAsString = nonExistentIds.stream()
                .map(Object::toString)
                .collect(Collectors.joining(", "));

        if (!nonExistentIds.isEmpty()) {
            return new ResponseEntity(DefaultRes.res(false,StatusCode.NOT_FOUND,"일치하지 않는 아이디: " + nonExistentIdsAsString),HttpStatus.NOT_FOUND);
        }
```

## 배포

http://15.164.228.220:8080/home

https://f2fc-112-221-41-90.ngrok-free.app/
