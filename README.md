# Prac 03. useEffect 및 API fetch

이번 주차는 현재 Branch를 기점으로 본인의 branch를 생성하여 진행합니다.

## Mission - 아래 동작 구현하기 (사진 클릭 시 동작 영상 나옴)
[![예시 사진](/images/image.png)](/images/Study-02.mp4)
1. 내 게이지 정보를 API를 이용해 서버에 저장 (게이지 올릴 때, 리셋할 때)
2. 다른 사람의 게이지 정보를 API를 이용해 불러오기
3. 페이지를 나갔다가 다시 돌아와도 게이지가 유지되어야 한다!
4. 본인의 게이지는 본인의 페이지에서만 올릴 수 있음!
- 아래 `사용할 API 목록`의 API를 이용해 구현하자.
- `http://localhost:3000/본인이름`에 구현하기. 템플릿이 구현되어 있음!
- 꼭 repository를 clone 해서 branch 생성 후 진행하기!!
- 완성된 app은 Pull request를 올려주시면 됩니다. 모르면 스터디오기🥳
- CSS 똑같이 할 필요는 없지만 비슷하게 구현하기! `module.css`활용. 본인의 테마에 맞게 꾸미면 됩니당.
### ⚠️ 주의 ⚠️: 본인페이지를 잘 완성해도 다른 사람의 페이지가 완성되지 않아, 다른 사람의 게이지를 올려도 서버에 저장이 되지 않음! 다른 사람은 항상 한칸일거임. 서버도 개인 PC에서 실행 됨.

### 🥇 목표 🥇: 각자의 페이지를 모두 합쳤을 때 다같이 잘 돌아가도록 만들어 보자!

## 사용할 API 목록
- API는 이미 구현되어있으니 사용하기만 하면 됩니다.
### `GET` `/api/progress`
- 요청 시, 서버에 저장된 각 사용자의 ProgressBar 데이터를 불러옵니다.
- `Request` 형식
    - `Path parameters`: 없음
    - `Request Header`: 없음 (기본 값)
    - `Request Body`: 없음
- `Response` 예제
    - `status`: 200 - 성공
        ```JSON
        {
            "hoon": {
                "progress":1,
                "icon":"🦀"
            },
            "jhyun": {
                "progress":5,
                "icon":"⛄"
            },
            "seungjae": {
                "progress":1,
                "icon":"🖐️"
            },
            "tae": {
                "progress":1,
                "icon":"🍕"
            }
        }
        ```
### `POST` `/api/progress`
- 요청 시, 서버에 한 사람의 게이지 정보를 저장합니다.
- `Request` 형식
    - `Path parameters`: 없음
    - `Request Header`:
        - "Content-Type": "application/json"
    - `Request Body`:
        ```JSON
        {
            "name": "hoon", // string type | 'hoon', 'jhyun', 'seungjae', 'tae' 중 하나여야 함!!
            "progress": 6 // number(int) type | 1~10 사이의 정수.
        }
        ```
- `Response` 예제
    - `status`: 201 - 성공
        ```JSON
        {"name":"hoon","progress":6}
        ```

## Hint
### 0. `package.json`파일에 현재 app이 필요한 라이브러리가 전부 기록되어있으므로 `npm i` 또는 `npm install`을 입력하여 라이브러리를 설치해주면 됩니다.
### 1. `useEffect`: 할당된 변수의 state 변화가 감지되면 지정된 동작을 실행하는 React Hook.
### 2. `fetch()`: JS, TS에서 사용하는 API 통신 도구. [Fetch API 설명서](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)
### 3. Chrome에 `F12` 키보드 버튼을 누르면 개발자 도구가 나옴! 여기서 `Network` 탭에 들어가면 순서대로 어떤 API와 통신했는지 자세히 볼 수 있다! Edge도 비슷한거 있을거임.
### 4. API body엔 `JSON string`만 들어갈 수 있음!
```ts
JSON.stringify(object) // JS 또는 TS의 Object 타입을 JSON string 형식으로 변환한다.
JSON.parse(string) // JSON string 타입을 JS 또는 TS의 Object 타입으로 변환한다.
```
### 5. 비동기 처리에는 `async`와 `await` 키워드가 사용된다! [async와 await 설명서](https://ko.javascript.info/async-await)
