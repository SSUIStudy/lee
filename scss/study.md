
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
</br>
</br>


## 인자(Argument)
    * 사스에서 (믹스인,함수 ..) 호출할때 
    사용하게되는 일련의 값

    1.전달인자

    * 호출 할때 전달되는 실제 값
    * 믹스인이나 함수를 호출할때 넣어주는 값

````
1.

$box-width:500px;

@mixin set-width($n){
	background-color:#000;
	width:($box-width) / ($n); //인자값 생성
}
.list-box{
	@include set-width(2) 
}


2.

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

</br>
</br>

    2.키워드 인자
    * 변수:값 형태
    * 값이 명확하고, 순서에 관계없이 전달

````
@mixin con2($bg: #fff, $pad: 10px) {
  background: $bg;
  border: 1px solid #ccc;
  padding: $pad;
}
 
.box1 {
  @include con2();
}
.box2 {
  @include con2($bg: #797979, $pad: 20px);
}
````

</br>
</br>



## 연산 

* 사스에서 넓이를 계산, 값을 나눌 경우 등 유용

1. 산술연산자

| 연산자 | 기능 | 예시 | 
|:--------|:--------:|:--------:|
| + | 더하기 | 5+3 =8 |
| - | 빼기 | 5-3 =2 |
| * | 곱하기 | 5*3 =15 |
| / | 나누기 | 8/4 =2 |
| ** | 지수 | 2**3 =8 | 
<br>

*- 사스에서 지수는 뒤에서 연산*

````
// 예시

li{
	width: 200px / 1200px * 100%;
	height: 100px;
}


$half:2;

div{
    width:570px/$half;
}

//주의

  .box-medium {
        font-size: 30px / 5px; // 옳지 않은 코드
        width:  24px/ 4;

    }

    .box-medium {
        font-size: (30px / 5px); // 올바른 코드
        width:  (24px/ 4);

    }


````
*나누기의 경우 값을 괄호를 감싸거나 변수 , 덧셈을 사용해야 적용이 된다*



2. 비교연산자

| 연산자 | 기능 | 예시 | 
|:--------|:--------:|:--------:|
| = | 같다 | 3=2 =0 |
| ^= | 같지 않다 | 3^=2 1 |
| > | 크다 | 3>2 1 |
| < | 작다 | 3<2 0 |
| >= | 3>=2 | 1 | 
| <= | 3<=2 | 0 | 
<br>
*- true = 1 반환 <br>- false = 0 반환*


````
//예시

$width:100px;

@mixin box($width){
    @if $width == 100px {
        background:rgb(0,0,0);
    }@else{
        background:rgb(255,255,255); 
    }
}
````


3. 논리연산자

| 연산자 | 기능 | 예시 | 
|:--------|:--------:|:--------:|
| & (AND) | 둘 다 참이면 1 | 3=2 & 3^=2  0 |
| ㅣ (OR) | 둘 중 하나 참이면 1 | 3=2 & 3^=2 1 |
| ^ (NOT) | 거짓이면 1 | 	^(3=2) 1 | 
<br>

````
//예시

$width:100px;
$heigth:200px;

@mixin box($width){
    @if $width == 100px | $heigth == 100px{
        display:block;
    }@else{
        display:none; 
    }
}
````

</br>
</br>



##  보간법(Interpolation)

* #{} 구문을 사용하여 선택기와 속성 이름에 SassScript 변수를 제공
*  중괄호 안에 변수 또는 속성 이름을 지정할 수 있다

````
@mixin border($side) {
    border-#{$side}: solid 1px #000;
}
.header {
    @include border("top");
}

````



</br>
</br>



## 함수(function)
* sass 에서 함수는 mixin과 흡사, 인수를 허용함
* 함수를 반환할때 @return 호출
* 스타일의 속성값으로 작동하기때문에 재사용해야하는 값을 계산할때 유용

````
@function rem($px){
    @return ($px/10)+rem;
}

.tit{font-size:rem(24);}

@function smallbox($width){
    @return (1200/$width)*100+"%";
}
"calc" + ($wrap - $pxx) 

.box__tit{
    width: smallbox(2);
}
````


