# Context의 사용

> Context는 서로 다른 깊이로 중첩된 컴포넌트들에서 어떤 데이터에 접근할 목적으로 주로 사용됩니다. 컴포넌트 재사용을 어렵게 만드므로 가급적 필요한 경우에만 사용하십시오.
>
> Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.

- `React`의 공식 문서는 `context`에 관해 과거 공식 문서(레거시)에서 위와 같이 기술함
- 새로운 `React`의 공식 문서의 예시도 `theme`과 같은 경우만 제시됨
- 전역적 상태 관리 목적으로 `context`를 사용하는 일은 지양