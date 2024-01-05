# 레포지토리 소개
- 여러 프레임워크(lit, preact, react, solid, svelte, vue)로 만든 간단한 `투두 리스트`를 메타 프레임워크인 astro로 함께 렌더링합니다.
- `레거시 코드 베이스`를 유지하면서 `신규 기능`을 타 프레임워크로 추가해야 하는 상황을 가정합니다.
- 처음부터 `Astro`를 통해 통합하는 것을 상정하지 않았기 때문에 기술적 한계와 문제들이 존재합니다.


# 제한 사항
## 유효성 검증 및 기능적 완성도
- 이미 존재하는 `할 일 제목`과 `태그 제목`을 중복해서 생성할 수 있습니다.
    - 일반적으로 `유효성 검증`이 필요하지만, 저장소의 목적과 다르기에 최소화합니다. 
- 일부 프레임워크에서 `0일 주기`의 경우 추가적인 완료처리가 되지 않지만, 일부에서는 가능합니다.
    - 이는 `POJO`로 상태를 관리하는 경우와 `Class`의 인스턴스로 상태를 관리하는 경우의 차이로 인해 발생합니다.
- 일부 프레임워크의 경우 `태그 추가`의 `태그 색상` 항목의 배경에 색이 있습니다.
- 프레임워크에 따라 `완료 처리`의 `prompt`에서 출력되는 메시지가 다르고, 공백을 입력할 경우 추가되는 메시지가 다른 경우도 있습니다.
- `Lit`으로 작성된 컴포넌트의 경우 `Shadow DOM`을 사용하므로 `Tailwind CSS`의 `space-y-[]` 속성이 적용되지 않았습니다.

## Qwik의 제외 - local storage 문제
> In other UI frameworks, a hydration directive would be needed for interactivity, such as client:only or client:load. These are not needed with Qwik, because there is no hydration! [Qwik 공식 문서](https://qwik.builder.io/docs/integrations/astro/)

> 다른 UI 프레임워크에서는, 반응성을 위해 `client:only`나 `client:load`와 같은 `hydration directive`가 필요하겠지만, 이것들은 Qwik에서는 필요없습니다. 왜냐하면 `hydration`이 없으니까요! (*resumability만 존재함)

- 로컬 스토리지를 쓰는 이상, 자바스크립트는 클라이언트 사이드에 도달해야 합니다.
- `Astro`의 경우, 클라이언트 사이드에서 자바스크립트를 사용하기 위해서는 특수한 `directive`가 필요합니다.
- 현재 `qwikDev`가 제공하는 통합에서는 이러한 `directive`가 제공되지 않습니다.
- `directive` 없이 `window`와 같은 `브라우저 api`, `전역 객체`에 에 접근할 경우 `Astro`는 에러를 발생시킵니다. [Astro 공식 문서](https://docs.astro.build/en/guides/troubleshooting/#document-or-window-is-not-defined)
- 이는 빌드를 마친 결과물에서도 동일하게 발견되는 현상으로, `client` 디렉티브가 추가되어야 `window.localstorage`를 사용할 수 있습니다.