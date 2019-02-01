````
1. input 기본스타일 지정 사이즈 변경

@mixin inputStyle{
    height: 30px;
    padding-left: 10px;
    font-size: 14px;
    border: 1px solid #000;
    background:#fff;
    box-sizing: border-box;
}

input[type="text"],
input[type="password"]{
    @include inputStyle;
    &.size1{
        width: 100px;
    }
    &.size2{
        width: 400px;
    }
}

↓ complie

input[type="text"],
input[type="password"] {
  height: 30px;
  padding-left: 10px;
  font-size: 14px;
  border: 1px solid #000;
  background: #fff;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

input[type="text"].size1,
input[type="password"].size1 {
  width: 100px;
}

input[type="text"].size2,
input[type="password"].size2 {
  width: 400px;
}
````
````

2. 백그라운드 변경

@mixin background-image($filename, $base-dir: '../images/',$position:0 0) {
    background-image: url($base-dir + $filename);
    background-position:$position;
    background-repeat: no-repeat;
}

p{
    @include background-image(ico + '.png',$position:50% 0)
}

↓ complie

p {
  background-image: url("../images/ico.png");
  background-position: 50% 0;
  background-repeat: no-repeat;
}

````
````
3. calc의 사용

@mixin calc($property, $value) {
    #{$property}: calc(#{$value});   
}
p{
    @include calc( width, '100% - 2px');
}

↓ complie

p {
  width: calc(100% - 2px);
}

````