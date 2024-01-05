# Style
- ~~`웹 컴포넌트` 기반의 접근이라는 lit의 특성을 고려, 개별 컴포넌트를 해당 단위 내에서 최대한 해결함~~
- ~~따라서 atomic css 등의 `라이브러리 사용`을 `지양`함(별도의 패키지, 전처리 등 필요)~~
- `Astro`에서 다수의 프레임워크를 통합한 뒤, 여러 프레임워크로 결과물을 출력하는 과정에서 통일성을 위해 tailwind 도입
- `tailwind integration`은 [web-components-tailwind-starter-kit](https://github.com/butopen/web-components-tailwind-starter-kit)을 참고함 
    - 해당 repo는 `TailwindComponent(style)`로 호출하는 방식으로 스타일을 추가
    - [공식 문서](https://lit.dev/docs/components/styles/#inheriting-styles-from-a-superclass)는 style의 상속을 권함
    - 본 프로젝트는 스타일의 상속을 권장하는 공식 문서를 따름
    - 하지만 인라인 스타일을 사용할 경우, 부모의 static 속성인 Styles를 오버라이딩을 하게 됨
    - 이 경우 부모의 스타일을 `복제`하는 과정에서 오버헤드 발생의 여지가 존재함

# Context
## 로컬 스토리지와 웹 컴포넌트 사이의 문제
- 기본적으로 LIT 3.0에서 제공되는 `Context`를 사용
- 단, `@provide` 데코레이터는 사용하지 않고 `@consume` 데코레이터만 사용
    - `@provide` 데코레이터를 사용할 경우, `로컬 스토리지 동기화`가 까다로움
    - `@lit/context`의 기능인 `ContextProvider`를 통해 상태 변화 관리
- 원칙(웹 컴포넌트)적으로는 `@provide`를 쓰고 미들웨어로 받거나 오버라이딩을 해야 함
    - 컴포넌트가 특정한 구조의 `ContextProvider`에 종속됨으로써 컴포넌트가 독립성을 상실함
    - 프로젝트의 규모가 커질 경우, 컴포넌트의 독립성(`벤더 독립성`)을 위해 구조 개선 필요