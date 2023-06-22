const selectedButton=document.querySelector('.container')
let p=document.querySelector('.parameters')
const result=document.querySelector('h1')
let text=""
let process=0,number=0
let control=false
selectedButton.addEventListener('click',(e)=>{
    e.preventDefault()
    let data=e.target.innerText
    if(data=='1' || data=='2' || data=='3' || data=='4' || data=='5' || data=='6' || data=='7' || data=='8' || data=='9' || data=='0'){
        text+=data
        result.innerText=text
    }
    
    switch(data){
        case '+':
            addOrMinusOrMultiply(data,add)
            break;    
        case '-':
            addOrMinusOrMultiply(data,minus)
            break;
        case 'X':
            addOrMinusOrMultiply(data,multiply)
            break;
        case 'CE':
            result.innerText="0"
            text=""
            break;
        case 'C':
            p.innerText=""
            result.innerText="0"
            process=0
            text=""
            break;            
    }
})
const add=_=> process+number
const minus=_=> process-number
const multiply=_=>process*number

function addOrMinusOrMultiply(data,callback){
    if(text=="" && data=='X'){
        text="1"
    }
    if(process==0 && !control && data=='X'){
        process=1
        control=true
    }
    if(text==""){
        text="0"
    } 
    number=parseInt(text)
    process=callback()
    writeDoc(data)
}
const writeDoc=(data)=>{
    text=process+data.toLowerCase()
    p.innerText=text
    result.innerText=process
    text=""
}
