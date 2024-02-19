let str1 = '가가'
let str2 = '나'
let str3 = '000'
let str4 = 'asdf'
let ko = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
var num = /[0-9]/
let space

console.log(str1.length)
console.log(str2.length)
console.log(str3.length)
console.log(str4.length)

function make_table(object){
  let colum
  if(typeof object=='object'){
    colum = Object.values(object)
  }else{
    colum = object
  }
  let limit = 19

  for(let i=0; i<colum.length; i++){
    let str = colum[i].toString()
    let space = limit-str.length
    if(i==colum.length-1){
      console.log(str.padEnd(space,'*'))
    }else{
      process.stdout.write(str.padEnd(space,'*')+'| ')
    }
  }
}

if(ko.test(str1)){
  space = 10-(str1.length)*2
  console.log(space)
}else if(num.test(str1)){
  space = 10

}

