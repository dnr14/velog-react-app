<h2 align=center>벨로그 클론 프로젝트 📚</h2>

<p align=center> 📆 2021.11.02 ~ 2021.11.09</p>

<div align=center>
    <img src="https://img.shields.io/badge/17.0.2-React-61DAFB?style=flat&logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/5.61.0-Webpack-8DD6F9?style=flat&logo=webpack&logoColor=8DD6F9"/>
    <img src="https://img.shields.io/badge/5.3.0-React router dom-CA4245?style=flat&logo=react router&logoColor=CA4245"/>
    <img src="https://img.shields.io/badge/7.2.6-Redux-764ABC?style=flat&logo=redux&logoColor=764ABC"/>
    <img src="https://img.shields.io/badge/5.3.3-Styled components-DB7093?style=flat&logo=styled-components&logoColor=DB7093"/>
    <img src="https://img.shields.io/badge/7.32.0-Eslint-4B32C3?style=flat&logo=eslint&logoColor=4B32C3"/>
    <img src="https://img.shields.io/badge/2.4.1-Prettier-F7B93E?style=flat&logo=Prettier&logoColor=F7B93E"/>
    <img src="https://img.shields.io/badge/Amazon Aws-232F3E?style=flat&logo=Amazon Aws&logoColor=FFF"/>
    <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat&logo=Amazon S3&logoColor=FFF"/>
</div>
<br>
<p align=center><img src=./src/assets/images/velogClone.gif  width=60% /></p>
<p align=center> 🏠 <a href=https://d3kinchzmkbtue.cloudfront.net>웹 페이지</a></p>
<p align=center> 💼 <a href=https://github.com/dnr14/velog-react-app/wiki/%ED%99%94%EB%A9%B4-%EA%B5%AC%EC%84%B1-%EB%B0%8F-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%84%A4%EB%AA%85> 화면 구성 및 주요 기능 설명</a></p>

## 1. 프로젝트 살펴보기 🔎

### 🔥 개요

[DevFoliOh](https://devfolio.kr/), [Couch Coding](https://couchcoding.kr/) 에서 개최하는 리액트 토이 프로젝트입니다. 프로젝트를 위한 Backend는 이미 구축되어있고 제공되는 API를 사용하여 일주일 동안 개발을 하는 프로젝트입니다.

### 👨‍💻 주요 기능

- 사용자가 작성한 게시글을 보여줍니다.
- 사용자가 게시글을 작성할 수 있습니다.
- 작성한 게시글을 수정, 삭제가 가능합니다.
- 사용자는 게시글에 댓글을 작성, 수정, 삭제가 가능합니다.
- 사용자는 제목, 태그, 내용을 이용하여 게시글을 검색 할 수 있습니다.

### 💻 기술 스택

- `React` : 웹UI 라이브러리
- `Redux` : 클라이언트 전역상태 관리 라이브러리
- `Styled-components` : css-in-js을 통해 컴포넌트 스타일을 관리하기 위해 사용했습니다.
- `ESLint` : 코드의 컨벤션 검사를 위해 사용했습니다.
- `Prettier` : 코드의 컨벤션 유지를 위해 사용했습니다.
- `Webpack` : 모듈을 병합하여 하나의 결과물을 만들기 위해 사용했습니다.

<br>

> #### ⚙ 프로젝트 실행 해보기

```js
git clone https://github.com/dnr14/velog-react-app.git
cd velog-react-app
npm install
npm start
브라우저 localhost:3000 접속
```

<br>

> #### 📁 프로젝트 구조

```js
├─api        // 백엔드와 통신을위한 axios를 모듈화 시켜놓은 모음
├─assets     // 프로젝트에 이용되는 이미지,스타일을 정의해놓은 폴더
│  ├─images  // 프로젝트에 이용되는 이미지 모음
│  └─style   // 프로젝트에 이용되는 styled-components 모음
├─Components // 재사용하는 컴포넌트들 모음
│  └─common  // 최소단위,재사용 컴포넌트 모음
├─hoc        // HOC 컴포넌트 모음
├─hooks      // Custom Hooks
├─modules    // redux의 reducer 모음
├─pages      // 사이트에 보여주는 페이지 컴포넌트 모음
│  ├─404
│  ├─Insert
│  ├─Main
│  ├─Post
│  ├─Search
│  └─Update
└─utils      // 프로젝트에 사용되는 유틸함수 모음
```

<br>

# 2. 협업 👤

### 🪚 협업을 위한 툴

- Slack
  - 개최자와 개발 진행 상황 공유하기 위해 사용했습니다.
- 게더타운
  - 코로나로 만나지 못하여서 비대면 회의를 위해 이용했습니다.
- 스웨거
  - 사용되는 API를 확인하기위해 사용하였습니다.
  - [API 문서확인하기](https://limitless-sierra-67996.herokuapp.com/v1/docs/)
- Git, Github
  - 개발자들의 코드 버전 관리 및 공유하기 위해 사용했습니다.

### 👨‍💻 Git Conventions

- 브랜치 종류

  - main: main 브랜치를 기준으로 배포를 진행합니다.
  - develop: 개발을 진행하는 중심 브랜치입니다.
  - release: QA를 진행하는 브랜치입니다.
  - feature: 새로운 기능을 개발하는 브랜치입니다.

- Feature 브랜치 네이밍 규칙
  - `{브랜치 종류}/{{기능이름}}`
  - ex) `feature/login`

<br>

# 3. 배포

#### 배포 환경 그림

<div align=center>
    <img src=./src/assets/images/deploy.png  width=80%  />
</div>
<br>

> #### 📜 배포 과정 설명

1. 개발이 완료된 `main branch`에서 deploy를 진행 합니다.
2. aws에서 제공하는 cli를 이용하여 빌드된 리액트 프로젝트를 s3에 배포합니다.
3. 배포가 완료되고 사용자는 `CloudFront`를 통해 배포된 사이트([velogClone 사이트](https://d3kinchzmkbtue.cloudfront.net))를 접속합니다.
