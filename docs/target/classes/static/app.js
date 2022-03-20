let sugerencias = [];

let test = [];
for (let i = 0; i < 20; i++) {
    test.push({
        id: i,
        sug: `sugerencia  #${i}`,
    });
}

const showElement = (selector) => {
    // Add the class hidden to the element
    // with the passed selector
    const element = $(selector);
    if (element.hasClass("hidden")) {
        element.removeClass("hidden");
    }
};

const hideBodies = () => {
    // Hide both the tasks and the picture
    const bodies = $("#tasks-container > .col");
    for (let body of bodies) {
        if (!$(body).hasClass("hidden")) {
            $(body).addClass("hidden");
        }
    }
};

const showNothing = () => {
    // Show the picture of no-content
    hideBodies();
    showElement("#task-none");
};

const showSugs = () => {
    // Show the tasks
    hideBodies();
    showElement("#sugerencias");
};

const deleteSug = (sugerencia) => {
    let index = sugerencias.indexOf(sugerencia);
    if (index !== -1) {
        // Call server
        let request = await fetch("/app" + sugerencia.id, {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            dataType: "json",
        });

        if(request.status === 200){
            sugerencias.splice(index, 1);
            $(`#sugerencia-${sugerencia.id}`).remove();
            if (sugerencias.length == 0) {
                showNothing();
            }
    }
};

const addSug = (sugerencia) => {
    // Save task in memory
    sugerencias.push(sugerencia);

    // Create HTML, inserting information
    let html = `
        <div class="row task" id="task-${task.id}">
            <div class="col-8">
                <h3>${task.todo}</h3>
            </div>
            <div class="col-4">
                <button id="button-task-${task.id}" class="btn btn-outline-danger">Eliminar</button>
            </div>
        </div>
    `;

    // Add the HTML first, so it shows at the top
    $("#sugerencias").prepend(html);
    // Create an event for the button we have just created
    // so when we press it, it deletes the task
    // it is associated with
    $(`#button-task-${sugerencia.id}`).on("click", () => {
        deleteTask(task);
    });
};

const addSugerencias = (sugerenciasAdd) => {
    sugerenciasAdd.forEach((sugerencia) => addSug(sugerencia));
};

const getSugerencias = (todo) => { 
    let req = await fetch("/app");

    if (req.status === 200){
        let data = await req.json();
        addSugerencia(data);

    }
};

const postSugerencia = (todo) => {
    let request = await fetch("/app", {
        method: "POST",
        body: JSON.stringify({
            id: 0,
            sug : sug,
        }),
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        dataType: "json",
    });

    if(request.status === 200){
        let data = await request.json();
        addSug(data);
    }
};

const start = () => {
    getSugerencias();
    showSugs();
};

const parseTask = () => {
    const value = $("#sug").val();
    if (value.trim() == "") {
        return;
    }
    postSugerencia(value);
};

$("#add").on("click", () => {
    // When the button #add is clicked
    // get the task and call the server
    parseTask();
});

$(document).ready(() => {
    start();
})}