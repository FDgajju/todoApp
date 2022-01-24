import { useState } from "react";
import React from "react";
import './todo.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faTrash, faEdit, faPlus);

export function ToDoList() {
    const [toDoList, setToDoList] = useState([])
    const [value, setValue] = useState("")
    const [ind, setInd] = useState(false)
    const [deletedTasks, setDeletedTasks] = useState([]);

    function addTaskList() {
        if (!value)
            return

        let addTask = { 
            id: Date.now(), 
            task: value, 
            isDeleted: false, 
            isCompleted: false, 
            editing: false, 
            undoEdit: [],
            redoEdit: [],
            undoDelete: false,
        }

        console.log(toDoList)
        let find = toDoList.find(t => t.task === value)
        if (find) {
            alert(`'${(find.task).toUpperCase()}' Task already available`)
            return
        }
        setToDoList([...toDoList, addTask])
        console.log(toDoList)
        setInd(false)
        setValue("")
    }

    function buttonAppars() {
        setInd(true)
    }

    // console.log(toDoList.editing)
    function onChnageHandle(event) {
        setValue((event.target.value).trim())
    }

    function completeTask(id) {
        let cmtTask = toDoList.find(element => element.id === id)
        // console.log()
        cmtTask.isCompleted = true
        setToDoList([...toDoList])
    }

    // function removeTask(id) {
    //     setToDoList(toDoList.filter(element => element.id !== id))
    // }

    function editTask(id) {
        let makeEdit = toDoList.find(element => element.id === id)
        if (!makeEdit.editing) {
            makeEdit.editing = true
            makeEdit.undoDelete = false
        }
        // setEdit(true)
        // console.log(ToDoList)
        setToDoList([...toDoList])
        // console.log(ToDoList)
    }

    function doneTask(id) {
        let doneEdit = toDoList.find(element => element.id === id)
        doneEdit.editing = false
        setToDoList([...toDoList])
    }

    // function undoDeleteTask(id) {
    //     let undoDeleteEdit = toDoList.find(element => element.id === id)

    // }

    function removeTask(id) {
        let deleteTasks = toDoList.find(element => element.id === id);
        // setTodoList(deleteTasks)
        deleteTasks.isDeleted = true;
        setToDoList(toDoList.filter(setTask => setTask.id !== id));
        setDeletedTasks([...deletedTasks, deleteTasks]);
    }

    function undoDeleteItem(id) {
        setDeletedTasks(deletedTasks.filter(setTask => setTask.id !== id));
        let undoDeleteTask = deletedTasks.find(task => task.id === id);
        undoDeleteTask.isDeleted = false;
        // let find = toDoList.find(t => t.task === undoDeleteTask.task);
        // console.log(find.task)
        // if (find.task === undoDeleteTask.task)
        //     return

        setToDoList([...toDoList, undoDeleteTask]);
    }

    function dltTrs(id) {
        setDeletedTasks(deletedTasks.filter(setTask => setTask.id !== id));
    }

    function dltAll() {

        setDeletedTasks([])

    }

    return (
        <React.Fragment>
            <section className="counterCss">
                <div className="container">
                    <h1 className="header">TODO List </h1>
                    <h2>{toDoList.length === 0 ? `No Tasks yet` : `Tasks [${toDoList.length}]`}</h2>

                    {/*ind === false ?
                    <butto className="trs" onClick={buttonAppars} >
                        <FontAwesomeIcon icon="trash" ></FontAwesomeIcon>
                </butto> : false*/}
                    {toDoList.map(toDoElement => toDoElement.isDeleted === false &&
                        <div className="btnContainer" style={{ textDecoration: toDoElement.isCompleted === true ? 'line-through' : 'none' }}>
                            <span id="addNew" contentEditable={toDoElement.editing} >{toDoElement.task}</span>
                            {/*complete button*/}
                            <button id="complete" onClick={toDoElement.editing === false ? () => completeTask(toDoElement.id) : false} style={{ backgroundColor: toDoElement.editing === true ? "gray" : false }}>Completed</button>

                            {/*remove button*/}
                            <button id="x" className="btn btn-primary" onClick={toDoElement.editing === false ? () => removeTask(toDoElement.id) : false} style={{ backgroundColor: toDoElement.editing === true ? "gray" : false }} >
                                <span>
                                    <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                </span>
                            </button>

                            {/*edit button*/}
                            <button className="btn btn-primary" id="editTask" onClick={() => editTask(toDoElement.id)} style={{ backgroundColor: toDoElement.editing === true ? "gray" : false }} >
                                <span>
                                    <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                                </span>
                            </button>

                            {toDoElement.editing &&
                                <button id="DoneTask" onClick={() => doneTask(toDoElement.id)}>👍🏻</button>
                            }
                            {/*toDoElement.undoDelete &&
                        // <button id="undoDeleteTask" onClick={() => undoDeleteTask(toDoElement.id)}>undoDelete</button> {id="x"} */}
                        </div>
                    )}

                    <h3 id='taskDone'>
                    {toDoList.filter(element => element.isCompleted).length === 0 ? `Completed` : `Completed ✔️ ${toDoList.filter(element => element.isCompleted).length}`}
                    </h3>
                    <div className="input">

                        {ind === true ? <input id='toDoListCss' type='text' value={value} placeholder="  Add a New Task Here 📝" onChange={onChnageHandle} /> : false}
                        {ind === true ? <button className="center1" onClick={addTaskList}>ADD</button> : false}
                        {ind === false ? <butto className="addButton" onClick={buttonAppars} >+</butto> : false}
                    </div>

                    {/*=================================delete section============================================*/}

                </div>
                {deletedTasks.length >= 1 && (
                    <div className="dltContainer">
                        <div className="abc">
                            {/*<p className="hD">TRASH</p>*/}
                            {deletedTasks.map(task => task.isDeleted === true &&
                                <div className="border">
                                    <span className="task">{task.task}</span>
                                    <button className="undu" onClick={() => undoDeleteItem(task.id)}>
                                        UNDU
                                    </button>

                                    <button id="y" className="btn btn-primary" onClick={() => dltTrs(task.id)}>
                                        <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                    </button>
                                </div>
                            )}
                            {/*<button className="allDlt" onClick={dltAll}><FontAwesomeIcon icon="trash" ></FontAwesomeIcon></button>*/}
                        </div>
                    </div>
                )}
            </section>

        </React.Fragment>
    )
};


































// import { useState } from "react";

// function toDo() {
//     const [todoList, setTodoList] = useState([])

//     const hendelOnClickSubmit = () => {
//         let data = document.getElementById('text')
//         const upDateTodoList = [...todoList, data.value]
//         setTodoList(upDateTodoList)
//         data.value = ""
//     }

//     return (
//         <div class="app">
//             {todoList.map(todo => <p>{todo}</p>)}
//             <input id="text" type="text" placeholder="enter todo" />
//             <input type="submit" onClick={hendelOnClickSubmit} />
//         </div>
//     )
// };

// export default toDo
