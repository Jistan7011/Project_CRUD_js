// let a = '가가가가가eeeee'
// let b = '가가가'
// let c = 'ekeeeeeeeedeeee'
// let d = '2'

// console.log(a.padEnd(10,' ')+'|'+b.padEnd(10,' ')+'|'+c.padEnd(10,' ')+'|'+d.padEnd(10,' ')+'|')
// console.log(c.padEnd(10,' ')+'|'+b.padEnd(10,' ')+'|'+c.padEnd(10,' ')+'|'+d.padEnd(10,' ')+'|')


let colum = new Array();
const ko = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
colum = ['가','나나나','c']
let print =''
function make_table(colum){

  for(let i=0; i<colum.length; i++){

    if(i==colum.length-1){
      if(ko.test(colum[i])){
        let space = 15-((colum[i].length)*2)
        print+=`${colum[i]}.padNum(${space},' ')`
      }else{
        let space = 15-(colum[i].length)
        print+=`${colum[i]}.padNum(${space},' ')`
      }
    }else{
      if(ko.test(colum[i])){
        let space = 15-((colum[i].length)*2)
        print+=`${colum[i]}.padNum(${space},' ')+'|'+`
      }else{
        let space = 15-(colum[i].length)
        print+=`${colum[i]}.padNum(${space},' ')+'|'+`
      }
    }
  }
  console.log(`'${print}'`)
}
make_table(colum)
module.exports = {make_table};

