const toDoForm =document.querySelector(".memo-toDoForm"),
toDoInput=toDoForm.querySelector("input"),toDoList=document.querySelector(".memo-toDoList");
toDoneList=document.querySelector('.memo-doneList');
let toDos=[];
let doingList=[];
let doneList=[];
function printTodo(text){
    const li=document.createElement("li");
    const del=document.createElement("button");
    const done=document.createElement("button");
    const date_id=new Date().getTime();
    del.innerText="❌";
    del.id="del";
    done.innerText="✅";
    done.id="done";
    del.addEventListener("click",handleDeleteToDo);
    done.addEventListener("click",handleDoing);

    const span=document.createElement("span");
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(del);
    li.appendChild(done);
    li.id=date_id;
    toDoList.appendChild(li);
    const toDoObj={
        text:text,
        id:date_id
    }
    toDos.push(toDoObj);
    saveToDos();
}
function printDoing(text){
    const li=document.createElement("li");
    const del=document.createElement("button");
    const done=document.createElement("button");
    const date_id=new Date().getTime();

    del.innerText="❌";
    del.id="del";
    del.addEventListener("click",handleDeleteDone);
    const span=document.createElement("span");
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(del);
    li.id=date_id
    toDoneList.appendChild(li);
    const doneObj={
        text:text,
        id:date_id
    }
    doneList.push(doneObj);
    saveDoing();
}
function printDone(text){
    const li=document.createElement("li");
    const del=document.createElement("button");
    const done=document.createElement("button");
    const date_id=new Date().getTime();

    del.innerText="❌";
    del.id="del";
    del.addEventListener("click",handleDeleteDone);
    const span=document.createElement("span");
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(del);
    li.id=date_id
    toDoneList.appendChild(li);
    const doneObj={
        text:text,
        id:date_id
    }
    doneList.push(doneObj);
    saveDone();
}

function saveToDos(){
    localStorage.toDo=JSON.stringify(toDos);
}
function saveDoing(){
    localStorage.doing=JSON.stringify(doingList);
}
function saveDone(){
    localStorage.done=JSON.stringify(doneList);
}
function handleSubmit(e){
    e.preventDefault();
    if(toDoInput.value!==""){
        const currentValue=toDoInput.value;
        printTodo(currentValue);
        toDoInput.value="";
    }
}
function handleDone(e){
    const btn=e.target;
    const li = btn.parentNode;
    const ul = document.querySelector(".memo-toDoList");
    ul.removeChild(li);
    const cleanDo=toDos.filter((item)=>item.id!==parseInt(li.id));
    const cleanDone=toDos.filter((item)=>item.id===parseInt(li.id));
    toDos=cleanDo;

    saveToDos();
    printDone(cleanDone[0].text);
} 
function handleDeleteToDo(e){
    const btn=e.target;
    const li = btn.parentNode;
    const ul = document.querySelector(".memo-toDoList");
    ul.removeChild(li);
    console.log(li.id);
    const cleanToDo=toDos.filter((item)=>item.id!==parseInt(li.id))
    toDos=cleanToDo; //replace toDos = cleanTodo
    saveToDos();  //then save ToDos
}
function handleDeleteDone(e){
    const btn=e.target;
    const li = btn.parentNode;
    const ul = document.querySelector(".memo-doneList");
    ul.removeChild(li);
    console.log(li.id);
    const cleanDone=doneList.filter((item)=>item.id!==parseInt(li.id))
    console.log(cleanDone);
    doneList=cleanDone; //replace toDos = cleanTodo
    saveDone();  //then save ToDos
}
function loadToDo(){
    const toDo=localStorage.toDo;
    const done=localStorage.done;
    console.log(toDo);
    if(toDo){
        const loaded=JSON.parse(toDo);
        loaded.forEach(element => {
            printTodo(element.text);
        });
    }
    if(done){
        const loaded=JSON.parse(done);
        loaded.forEach(element=>{
            printDone(element.text);
        })
    }
}
function init(){
    loadToDo();
    toDoForm.addEventListener('submit',handleSubmit);
}
init();