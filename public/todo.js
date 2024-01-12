const showdropdown = document.getElementById("showtodolist")
const selectdropdown = document.getElementById("selecttodofolder")
console.log(showdropdown);
console.log(selectdropdown);

let AllData = [] // sare todos hai iske andr

document.getElementById("btn_todolistform").addEventListener("click", (e) => {
    const catform = document.getElementById("catform")
    if (catform.style.display == "none") {
        catform.style.display = "flex";
    } else {
        catform.style.display = "none";
    }
})

document.getElementById("showtodolist").addEventListener("change", showTodoList)

document.getElementById("addnewtodofolder").addEventListener("click", (e) => {
    const newlist = document.getElementById("newtodofolder");
    if (newlist.value == "") {
        alert("please enter the item")
        return
    }
    fetch("http://localhost:2000/todofolder", {
        method: "post",
        headers: {
            "content-type": "application/JSON",
        },
        body: JSON.stringify({
            todofolder: newlist.value,
        })
    }).then(res => {
        return res.json();
    }).then(data => {
        selectdropdown.appendChild(createdropdownoption(data))
        showdropdown.appendChild(createdropdownoption(data))
        newlist.value = ""
    })
        .catch(err => {
            console.log(err);
        })
})
function createdropdownoption(opt) {
    const op = document.createElement("option");
    op.value = opt._id
    op.innerText = opt.foldername
    return op
}
document.getElementById("addtodofile").addEventListener("click", (e) => {
    const task = document.getElementById("task")
    const foldername = document.getElementById("selecttodofolder")
    if (task.value == "") {
        alert("add the task")
        return
    }
    if (foldername.value == "") {
        alert("choose a list")
        return
    }
    console.log(task.value, foldername.value);
    fetch("http://localhost:2000/todofile", {
        method: "post",
        headers: {
            "content-type": "application/JSON"
        },
        body: JSON.stringify({
            task: task.value,//
            fid: foldername.value
        })

    }).then(result => {

    }).catch(err => {

    })
    // const ob = {
    //     _id: Date.now(),
    //     task: task.value,
    //     status: false
    // }
    //createTodofile(ob);
})

function deletetodofile(id) {
    document.getElementById("todoitem-" + id).remove();
    return
    fetch("http://localhost:2000/todofile?todofile=" + id, {
        method: "delete"
    }).then((result) => {
        if (result.status == 200) {
            document.getElementById("todoitem-" + id).remove();
        } else {
            alert("something went worng");
        }
    }).catch((err) => {
    });
}


function marktodofile(id) {
    const checkbox = document.getElementById("chk-" + id);
    //console.log(checkbox);
    const p = document.getElementById("p-" + id);
    if (checkbox.checked) {
        p.style.color = "grey";
        p.style.textDecoration = "line-through";
        //  checkbox.checked = false;
    } else {
        p.style.textDecoration = "none";
        p.style.color = "black"
        //checkbox.checked = true;
    }
    fetch("http://localhost:2000/todofile?todo="+ id, {
        method:'PATCH'
    }).then(res => {
        if (res.status == 200) {
            const checkbox = document.getElementById("chk-" + id);
            if (checkbox.check) {
                checkbox.check = false
            } else {
                checkbox.check = true
            }
        }
    }).catch(err => {
        alert(err);
    })
}

function createTodofile(data) {
    const todoitem = document.createElement("div")
    todoitem.id = "todoitem-" + data._id;
    todoitem.className = "todoitem";
    todoitem.innerHTML = `<p id="p-${data._id}"> ${data.task}</p>
      <div class="action">
        <button onclick="deletetodofile('${data._id}')"> delete </button>
        <button> edit</button>
        <input type="checkbox" onchange="marktodofile('${data._id}')" id="chk-${data._id}" >
      </div>`
    document.getElementById("todo_container").appendChild(todoitem);
}


function showTodoList(e) {
    const arr = AllData.filter(item => {
        return item._id === e.target.value
    })
    document.getElementById("todo_container").innerHTML = ""
    arr[0].files.forEach(todo => {
        createTodofile(todo)
    })
}

window.addEventListener("load", () => {
    fetch("http://localhost:2000/todofile")
        .then((result) => {
            return result.json();
        }).then(data => {
            console.log(data);
            AllData = [...data]
            data[0].files.forEach(ele => {
                createTodofile(ele)
            })
            data.forEach(element => {
                console.log(element.files);
                filloption(element);

            });
        })
        .catch((err) => {
            console.log(err);
        });
})
function filloption(data) {
    showdropdown.appendChild(createdropdownoption(data))
    selectdropdown.appendChild(createdropdownoption(data))
}



(() => {
    console.log("this is a page,===hello");
})()