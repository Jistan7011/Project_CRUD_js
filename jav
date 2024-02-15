console.log('작업 1');
console.log('작업 2');
console.log('작업 3');
// setTimeout(콜백함수,지연시간)은 비동기 함수이다.

console.log('작업 1');
// 함수도 호이스팅 된다.
print(); 
console.log('작업 3');
function print() {
  console.log('작업 2');
}

// setTimeout(콜백함수,지연시간)은 비동기 함수이다.
console.log('작업 1');
setTimeout(()=>{
  console.log('작업 2');
},3000); 

// setTimeout()은 비동기함수이므로 함수 시작해 놓고 다음 작업으로 넘어감
setTimeout(()=>{
  console.log('작업 2');
},3000);
console.log('작업 1');
console.log('작업 1');
setTimeout(()=>{
  console.log('작업 2');
},3000);
console.log('작업 3');
function print() {
  console.log('작업 2');
}
console.log('작업 1');
setTimeout(()=>{
  console.log('작업 2');
},3000);

Copy
// setTimeout()은 비동기함수이므로 함수 시작해 놓고 다음 작업으로 넘어감
setTimeout(()=>{
  console.log('작업 2');
},3000);
console.log('작업 1');
Copy
console.log('작업 1');
setTimeout(()=>{
  console.log('작업 2');
},3000);
console.log('작업 3');