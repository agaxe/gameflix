![겜플릭스 배너](https://user-images.githubusercontent.com/54921653/113965136-cdfe9880-9867-11eb-9a53-ad1b328894fd.jpg)

평소 게임을 좋아해서 API 를 활용하여 사이트를 만들어보면 어떨까 생각이 들어 제작한 게임 정보 사이트 '겜플릭스'입니다.   
IGDB API 를 사용하여 게임 정보들을 가져왔고, 인기 게임들의 실시간 게임방송 목록들을 보여주기 위해 인터넷 방송 플랫폼인 Twitch의 API를 사용하였습니다.

## 사용 기술 

- [React](https://ko.reactjs.org/)
- [Next.Js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Styled Component](https://styled-components.com/)
- [Twitch API](https://dev.twitch.tv/docs/)
- [IGDB API](https://api-docs.igdb.com/#about)


## 디자인 시안

[Figma](https://www.figma.com/file/U8L2gnaCl5aOTIjL4M4laI/%EA%B2%9C%ED%94%8C%EB%A6%AD%EC%8A%A4?node-id=0%3A1) 에서 확인 가능합니다.


## 개발환경 설치 및 실행

#### 설치

- npm 실행을 위해 작업 환경에 [Node.js](https://nodejs.org/ko/) 가 설치되어있어야 합니다.


```bash
npm install
```

#### 실행

메인 페이지

```bash
npm run build && npm start
```

스토리북

```bash
npm run storybook
```
