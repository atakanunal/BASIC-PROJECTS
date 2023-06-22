const form=document.querySelector('#form')
const nameData=document.querySelector('.name-data')
const surName=document.querySelector('.surname-data')
const email=document.querySelector('.email-data')
const wrap=document.querySelector('.wrapper')
const ul=document.querySelector('.list')
const submitButton=document.querySelector('.submit')
const updateButton=document.querySelector('.update-atr')
document.addEventListener('DOMContentLoaded',readDataFromLocalStorage)
form.addEventListener('submit',addPerson)
ul.addEventListener('click',updateOrDelete)
function updateOrDelete(e){
    e.preventDefault()
    const element=e.target
    if(element.classList.contains("update")){
        const e=selectedElement(element.parentElement.previousSibling.previousSibling.previousSibling)
        nameData.value=e.element.name
        surName.value=e.element.surname
        email.value=e.element.email
        updateButton.addEventListener('click',a=>{
            a.preventDefault()
            const e=selectedElement(element.parentElement.previousSibling.previousSibling.previousSibling)
            
            const person={
                "name":nameData.value,
                "surname":surName.value,
                "email":email.value
            }
            const obj=JSON.parse(localStorage.getItem('person'))
            obj[e.index]=person
            localStorage.setItem("person",JSON.stringify(obj))
            removeDivElements()
            readDataFromLocalStorage() 
        })
        
    }
    if(element.classList.contains("delete")){
        element.parentElement.parentElement.classList.toggle("remove")
        removeDataFromLocalStorage(element.parentElement.previousSibling.previousSibling.previousSibling)
        removeDivElements()
        readDataFromLocalStorage()
    }
}
function selectedElement(element){
    const elementIndex=findElementFromLocalStorage(element)
    const obj=JSON.parse(localStorage.getItem('person'))
    const e=obj[elementIndex]
    return {"element":e,"index":elementIndex}
}
function removeDivElements(){
    const div=document.querySelector('.wrapper')
        while(div.firstChild){
            div.removeChild(div.firstChild)
        }
}
function findElementFromLocalStorage(name){
    const obj=JSON.parse(localStorage.getItem('person'))
    let i=0
    obj.forEach((e,index)=>{
        if(e.name===name.innerText){
            i=index
        }
    })
    return i
}
function removeDataFromLocalStorage(name){
    const i= findElementFromLocalStorage(name)
    const obj=JSON.parse(localStorage.getItem('person'))
    obj.splice(i,1)
    localStorage.setItem('person',JSON.stringify(obj))
}
function addPerson(e){
    e.preventDefault()
    if((nameData.value!=="" || surName.value!=="" || email.value!=="")){
        const control=emailControl(email.value)
        if(control){
            createElement(nameData.value,surName.value,email.value)
            addDataToLocalStorage(nameData.value,surName.value,email.value)
        }else{
            alert("Uygun formatta email giriniz.")
        }
    }else{
        alert('bos alanlari doldurunuz.')
    }
    
}
function emailControl(email){
    for(let i=0;i<email.length;i++){
        if(email[i]==="@"){
            const element=email.slice(i,email.length)
            if(element==="@gmail.com" || element==="@hotmail.com"){
                return true
            }
        }
    }
    return false
}
function createElement(name,surname,email){
    const div=document.createElement('div')
    div.classList.add('person')
    const div2=document.createElement('div')
    div2.classList.add('buttons')
    div2.innerHTML='<i class="fa-regular fa-pen-to-square update"></i>'
    div2.innerHTML+='<i class="fa-solid fa-trash-can delete"></i>'
    const li=document.createElement('li')
    li.classList.add('name')
    li.innerText=name
    const li2=document.createElement('li')
    li2.classList.add('surname')
    li2.innerText=surname
    const li3=document.createElement('li')
    li3.classList.add('email')
    li3.innerText=email
    div.appendChild(li)
    div.appendChild(li2)
    div.appendChild(li3)
    div.appendChild(div2)
    const div3=document.createElement('div')
    div3.classList.add('divider')
    wrap.appendChild(div)
    wrap.appendChild(div3)
    ul.appendChild(wrap)
}
function addDataToLocalStorage(name,surname,emaill){
    let array
    if(localStorage.getItem('person')===null){
        array=[]
    }else{
        array=JSON.parse(localStorage.getItem('person'))
    }
    const person={
        "name":name,
        "surname":surname,
        "email":emaill
    }
    array.push(person)
    localStorage.setItem('person',JSON.stringify(array))
    nameData.value=""
    surName.value=""
    email.value=""

}
function readDataFromLocalStorage(){
    const obj=JSON.parse(localStorage.getItem('person'))
    if(obj!==null){
        obj.forEach(e=>{
            createElement(e.name,e.surname,e.email)
        })
    }
}
