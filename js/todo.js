const toDoForm =document.querySelector(".memo-toDoForm"),
toDoInput=toDoForm.querySelector("input"),toDoList=document.querySelector(".memo-toDoList");
toDoneList=document.querySelector('.memo-doneList'),toDoingList=document.querySelector('.memo-doingList');
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
    done.innerText="✅";
    done.id="done";
    del.addEventListener("click",handleDeleteDoing);
    done.addEventListener("click",handleDone);

    const span=document.createElement("span");
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(del);
    li.appendChild(done);
    li.id=date_id
    toDoingList.appendChild(li);
    const doneObj={
        text:text,
        id:date_id
    }
    doingList.push(doneObj);
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
function handleDoing(e){
    const btn=e.target;
    const li = btn.parentNode;
    const ul = document.querySelector(".memo-toDoList");
    ul.removeChild(li);
    const cleanDo=toDos.filter((item)=>item.id!==parseInt(li.id));
    const cleanDoing=toDos.filter((item)=>item.id===parseInt(li.id));
    toDos=cleanDo;

    saveToDos();
    printDoing(cleanDoing[0].text);
}
function handleDone(e){
    const btn=e.target;
    const li = btn.parentNode;
    const ul = document.querySelector(".memo-doingList");
    ul.removeChild(li);
    const cleanDoing=doingList.filter((item)=>item.id!==parseInt(li.id));
    const cleanDone=doingList.filter((item)=>item.id===parseInt(li.id));
    doingList=cleanDoing;

    saveDoing();
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
function handleDeleteDoing(e){
    const btn=e.target;
    const li = btn.parentNode;
    const ul = document.querySelector(".memo-doingList");
    ul.removeChild(li);
    console.log(li.id);
    const cleanDone=doneList.filter((item)=>item.id!==parseInt(li.id))
    console.log(cleanDone);
    doneList=cleanDone; //replace toDos = cleanTodo
    saveDoing();  //then save ToDos
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
    const doing=localStorage.doing;
    const done=localStorage.done;
    console.log(toDo);
    if(toDo){
        const loaded=JSON.parse(toDo);
        loaded.forEach(element => {
            printTodo(element.text);
        });
    }
    if(doing){
        const loaded=JSON.parse(doing);
        loaded.forEach(element=>{
            printDoing(element.text);
        })
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