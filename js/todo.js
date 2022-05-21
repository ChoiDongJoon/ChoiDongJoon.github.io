const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
let toDos = []; // todo를 기억하게 let으로 

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)) //localstorage에 저장
} // JSON.stringify(toDos) : toDos 배열을 문자열로 만들어줌

function deleteToDo(event) {
    const li = event.target.parentElement; //지울(버튼이 클릭된) 리스트 저장
    
    li.remove(); // toDo.id 는 숫자 li.id는 문자 
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //버튼이 클릭된 것의 id와 다른 것만 나타나게 
    saveToDos();
}

function paintTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span"); //버튼 만드려고 span 추가 
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.className = "todoBtn"
    button.addEventListener("click",deleteToDo);
    li.appendChild(span); // li 안에 span 넣기
    li.appendChild(button); //li 안에 button 넣기 
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newTodo,
        id: Date.now(),
    }; // todo들을 구분하기 위해 id를 넣어줌
    toDos.push(newToDoObj); //toDos 배열에 newTodo 추가 
    paintTodo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);
if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos); //살아있는 배열로 
    toDos = parsedToDos; //toDos 배열이 todo를 기억하게
    parsedToDos.forEach(paintTodo); //배열 각각의 아이템들에 함수 실행
}