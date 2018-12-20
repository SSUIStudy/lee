## 인자

* 인자는 Mixin 안에서만 사용되는 지역변수를 의미
* 인자는 기본 값을 가질 수 있다

## @MIXIN

* 선택자와 속성을 재활용할 수 있도록 해주는 방법 
* 선언할 때는 '@mixin'으로 시작하고, 호출할 때는 '@include'을 사용한다.




1. mixin 명으로 불러오기

````


@mixin title_style {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}


h1 {
    @include title_style;
}

````

2. 인자값으로 전달


````

// mixin에 인자값 으로 전달
@mixin title_style($size, $color) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: $size; // 인자값 사용할 곳
    color: $color; // 인자값 사용할 곳
}


h1 {
    // minin  호출하는 동시에 사용할 인자값 설정 (자바스크립트 함수호출과 같음)
    @include title_style(16px, #000)
}

````