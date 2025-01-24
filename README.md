# 🎞 Medal-React

## 📝 프로젝트 소개

<div>
  <img src="https://img.shields.io/badge/React-v18.3.1-blue" alt="React">
</div>
이 프로젝트는 **React**를 사용하여 구현한 **올림픽 메달 관리 애플리케이션** 입니다. 사용자는 각 국가의 메달 정보를 쉽게 관리하고 CRUD (생성, 조회, 수정, 삭제) 을 이용해 데이터를 조작할 수 있습니다.

<br/>
<br/>

## ⚙ 프로젝트 기능 소개

-   개발기간 : 2025년 01월 23일 - 25일(3일간)

-   로컬 스토리지 지원 : 기록을 로컬스토리지에 저장하고 편집할 수 있습니다.
-   메달 정렬 기능 : 금메달 수 또는 총 메달 수를 기준으로 국가를 정렬 할 수있으며, 기준값이 동일한 경우 국가명순으로 정렬됩니다.
-   유효성 검증 : 입력값에 대한 유효성 검증을 통해서, 예외 사항에서 발생할 수 있는 오작동을 방지합니다.
-   국가명 선택 : 올림픽 참가국 리스트를 통해 직접 국가명을 등록 할 수 있습니다.
-   컴파운드 컴퍼넌트 : 기존의 select 를 대신하여 컴파운트 패턴을 적용한 커스텀 selectBox 를 구현했습니다.

<br/>

## 🚀 트러블 슈팅

#### [검색 가능한 Custom Select 컴퍼넌트 만들기](https://aboard-particle-0d4.notion.site/React-Dropdown-Select-185ee001a71580d2b2efc7cc318b96d6?pvs=4)

#### [25년 1월 23일 코드리뷰 리펙토링](https://aboard-particle-0d4.notion.site/React-25-01-23-184ee001a71580e3a739d7c5e1f81ce0?pvs=4)

#### [input 입력시 0 이 지워지지 않는 문제](https://aboard-particle-0d4.notion.site/React-input-0-184ee001a71580dea0fad13342daf2f7?pvs=4)

<br/>

## 📁 프로젝트 구조

```markdown
📦
├─ .gitignore
├─ README.md
├─ eslint.config.js
├─ index.css
├─ index.html
├─ package.json
├─ src
│  ├─ App.jsx
│  ├─ component
│  │  ├─ Button.jsx
│  │  ├─ Input.jsx
│  │  ├─ MedalForm.jsx
│  │  ├─ MedalTable.jsx
│  │  └─ SelectBox.jsx
│  ├─ constant
│  │  ├─ constant.js
│  │  └─ type.js
│  ├─ main.jsx
│  └─ styles
│     ├─ App.module.css
│     ├─ Button.module.css
│     ├─ Input.module.css
│     ├─ MedalTable.module.css
│     ├─ SelectBox.module.css
│     └─ medalForm.module.css
└─ vite.config.js
```
