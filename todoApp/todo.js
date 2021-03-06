const taskHeads = ["id", "title", "content", "taskType", "dueDate", "status", "important"]

const getAllData = () => JSON.parse(localStorage.getItem('tasks')) || []

const setAllData = (tasks) =>localStorage.setItem('tasks', JSON.stringify(tasks))

const createCustomElement = (parent, element, classes , attributes, text) => {
    const myElement = document.createElement(element)
    parent.appendChild(myElement)
    if(classes != '') myElement.className = classes
    if(text != '') myElement.textContent = text
    if(attributes.length != 0){    
        attributes.forEach(attribute=>{
            myElement.setAttribute(attribute.attrName, attribute.attValue)
        })
    }
    return myElement
}

const editTask = (id, newTitle, newContent) =>{
    findedIndex= tasks.findIndex(task => task.id==id)
    if(findedIndex === -1 ) return console.log('task not found')
    tasks= getAllData()
    tasks[findedIndex].title = newTitle
    tasks[findedIndex].content = newContent
    setAllData(tasks)
   
}

const drawTask = (task,i) =>{
    
    taskDiv = createCustomElement(rowContainer, 'div', 'col-4 ', [], '')
    innerDiv = createCustomElement(taskDiv, 'div', 'm-4 bg-primary p-3', [], '')
    taskHeads.forEach(h=>{
        h5 = createCustomElement(innerDiv, "h5", "", [], task[h])
    })
    delBtn = createCustomElement(innerDiv, 'button', 'btn btn-danger c', [], 'delete')
    delBtn.addEventListener('click', function(e){
        tasks = getAllData()
        tasks.splice(i,1)
        this.parentElement.parentElement.remove()      
        setAllData(tasks)
    })
    edtBtn = createCustomElement(innerDiv, 'button', 'btn btn-primary c', [], 'edit')
    edtBtn.addEventListener('click', function(e){
        tasks = getAllData()
        console.log(tasks[i]["id"])
        console.log(tasks[i]["title"])
        edtTask = document.querySelector('#edtTask')
        rowContainer = createCustomElement(edtTask, 'form', 'row', [{"attrName":"id","attValue" :"editTask" }], '')
        taskHeads.forEach(h=>{
            edtDiv = createCustomElement(rowContainer, 'input', 'col-4 ', [{"attrName":"value","attValue" : tasks[i][h] },{"attrName":"name","attValue" : h }],'')
        })
        btnDiv = createCustomElement(rowContainer, 'button', 'col-4 ', [{"attrName":"type","attValue" :"submit" }],'submit')
        document.querySelector('#editTask').addEventListener('submit', function(e){
            e.preventDefault()
            task=tasks[i]
            console.log(task)
            taskHeads.forEach((h,i) => {
                if(i!=0 && h!="status") task[h] = e.target.elements[h].value
                else if(h=="status") task[h] = e.target.elements[h].checked
            })
            
            editTask(task.id,task.title, task.content)
            location.reload();
            this.reset()
            
            
            
        })
    })

    //console.log(task.id)
}
const addTask = (task) =>{
    tasks = getAllData()
    tasks.push(task)
    setAllData(tasks)
}

// const updtTask = (newTask) =>{
//     tasks = getAllData()
//     tasks.forEach((task,i)=>{
//         if(task["id"] == newTask["id"]) task["title"] = newTask["title"]
        
//     })
    
//     console.log(task )
//     setAllData(tasks)
// }

const showAllTasks =()=>{
    tasks= getAllData()
    tasks.forEach(task => {
        console.log(`id: ${task.id} and title: ${task.title} and content: ${task.content}`)        
    });
}

const getSingleTaskIndex =(id)=>{
    tasks= getAllData()
    findedIndex= tasks.findIndex(task => task.id==id)
    return findedIndex
}


const deleteTask = (id) =>{
    findedIndex =  getSingleTaskIndex(id)
    if(findedIndex === -1 ) return console.log('task not found')
    tasks= getAllData()
    tasks.splice(findedIndex,1)
    setAllData(tasks)
}


let tasks = getAllData()
allTasks = document.querySelector('#allTasks')
rowContainer = createCustomElement(allTasks, 'div', 'row', [], '')
tasks.forEach((task,i)=>{
    drawTask(task,i)
    // taskDiv = createCustomElement(rowContainer, 'div', 'col-4 ', [], '')
    // innerDiv = createCustomElement(taskDiv, 'div', 'm-4 bg-primary p-3', [], '')
    // taskHeads.forEach(h=>{
    //     h5 = createCustomElement(innerDiv, "h5", "", [], task[h])
    // })
    // delBtn = createCustomElement(innerDiv, 'button', 'btn btn-danger c', [], 'delete')
    // delBtn.addEventListener('click', function(e){
    //     tasks = getAllData()
    //     tasks.splice(i,1)
    // this.parentElement.parentElement.remove()      
    //     setAllData(tasks)
    // })
})

document.querySelector('#addTask').addEventListener('submit', function(e){
    e.preventDefault()
    if(tasks.length==0) task = {id:1}
    else { task = { id: (tasks[tasks.length-1].id+1)} }
    console.log(task)
    taskHeads.forEach((h,i) => {
        if(i!=0 && h!="status") task[h] = e.target.elements[h].value
        else if(h=="status") task[h] = e.target.elements[h].checked
    })
    addTask(task) 
    drawTask(task,task.length-1)
    this.reset()
})



// dels = document.querySelectorAll('.c')
// dels.forEach((d, i)=>{
//     d.addEventListener('click', function(e){
//         console.log(i)
//         tasks = getAllData()
//         tasks.splice(i,1)
//     console.log(this.parentElement)  
//     this.parentElement.parentElement.remove()      
//         setAllData(tasks)
//     })
    
// })

//  showAllTasks();
//getSingleTaskIndex(3);
// editTask(2,'posts','nnnnnbbbb');
// deleteTask(6);

