// let a = '가가가가가eeeee'
// let b = '가가가'
// let c = 'ekeeeeeeeedeeee'
// let d = '2'

// console.log(a.padEnd(10,' ')+'|'+b.padEnd(10,' ')+'|'+c.padEnd(10,' ')+'|'+d.padEnd(10,' ')+'|')
// console.log(c.padEnd(10,' ')+'|'+b.padEnd(10,' ')+'|'+c.padEnd(10,' ')+'|'+d.padEnd(10,' ')+'|')

let colum = new Array();
let row = new Array();
let ko = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
// colum = ['가','나나나','c']
let print =''

function make_table(colum){
  for(let i=0; i<colum.length; i++){
  
    if(ko.test(colum[i])){
      let space = 15-(colum[i].length)
      print+=`${colum[i]}.padNum(${space},' ')+'|'+`
    }
    if(i==colum.length-1){
      print+=`padNum(15,' ')`
    }
  }
  console.log(`'${print}'`)
}

module.exports = {make_table};

