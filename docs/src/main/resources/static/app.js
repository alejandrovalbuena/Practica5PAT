let sugerencias = [];

const showElement = (selector) => {
    const element = $(selector);
    if (element.hasClass("hidden")) {
        element.removeClass("hidden");
    }
};

const hideBodies = () => {
    const bodies = $("#sugs-container > .col");
    for (let body of bodies) {
        if (!$(body).hasClass("hidden")) {
            $(body).addClass("hidden");
        }
    }
};

const showSugs = () => {
    hideBodies();
    showElement("#sugerencias");
};


$("#add").on("click", () => {
    parseTask();
});

$(document).ready(() => {
    start();
});

const deleteSug = (sugerencia) => {
    let index = sugerencias.indexOf(sugerencia);
    if (index !== -1) {
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
    sugerencias.push(sugerencia);
    let html = `
        <div class="row sug" id="sug-${sugerencia.id}">
            <div class="col-8">
                <h3>${sugerencia.sug}</h3>
            </div>
            <div class="col-4">
                <button id="button-sugerencia-${sugerencia.id}" class="btn btn-outline-danger">Eliminar</button>
            </div>
        </div>
    `;
    $("#sugerencias").prepend(html);
    $(`#button-sugerencia-${sugerencia.id}`).on("click", () => {
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

const showNothing = () => {
    hideBodies();
    showElement("#task-none");
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
}};
