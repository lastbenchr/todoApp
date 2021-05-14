// Select the Elements
  const list = document.getElementById("list");
  const input = document.getElementById("input");

  // Clasess names
  const CHECK = "check_box";
  const UNCHECK = "check_box_outline_blank";
  const LINE_THROUGH = "lineThrough";

  // Variables
  var LIST, id;
 
// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data present in local storage 
if(data){
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
}else{
  // if data is not present in localstorage
  LIST = [];
  id = 0;
}

// load item's to the user's interface
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  });
}


  // add to do function
  function addToDo(toDo, id, done, trash) {

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

  const item =  ` <li class="item">
                  <i class="material-icons ${DONE} co" job="complete" id="${id}">${DONE}</i>
                  <p class="text ${LINE}"> ${toDo} </p>
                  <span class="material-icons de " job="delete" id="${id}">delete_outline</span>
                  </li>

                 `;
  
  const position = "beforeend";

  list.insertAdjacentHTML(position,item);
  }
  
  // add an item to the list user the enter key 
  document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
     const toDo = input.value;
     
     // if the input isn't empty
      if(toDo){
        addToDo(toDo, id, false, false);

        LIST.push({
          name : toDo,
          id : id,
          done : false,
          trash : false
        });

        // add item to the localStorage ( this code must be added where the LIST array is updated)
        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
      }
      input.value = "";
    }
  });

  // Complete to do
  function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
  } 

  // remove to do
  function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
  }

// target the items created dynamically
  list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
      completeToDo(element);
    }else if(elementJob == "delete"){
      removeToDo(element);
    }
    // add item to the localStorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
  });