let colum = new Array();
const ko = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
// colum = ['가','나나나','c']
let print

// let testObject =  {
// sub_num: 101,
// sub_name: '열역학',
// sub_professor: '김정수',
// sub_person: 40
// }
// let title = ['강의번호','강의명','담당교수','수강인원']

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
      console.log(str.padEnd(space,' '))
    }else{
      process.stdout.write(str.padEnd(space,' ')+'| ')
    }
  }
}
module.exports = {make_table}