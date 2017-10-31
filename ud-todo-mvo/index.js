
function createDiv(className, content){
    const div = document.createElement('div');
    div.classList.add(className);
    if(content){
        div.innerHTML = content
    };
    return div;
}

const model = {
    init: function(){
        if(!localStorage.notes){
            localStorage.notes = JSON.stringify([]); 
        }
    },

    add: function(content){
        const data = this.getAllNotes();
        const time = new Date().toDateString();
        data.push({
            content,
            time
        });
        localStorage.notes = JSON.stringify(data);
    },

    getAllNotes: function(){
        return JSON.parse(localStorage.notes);
    }
}

const view = {
    init: function(){
        this.containterNotes = document.querySelector('.container-notes');
        const form = document.querySelector('.container-form');
        const input = document.querySelector('.form-input');
        form.addEventListener('keydown', function(e){
            if(e.key !== 'Enter'){
                return;
            }
            octopus.addNote(input.value);
            input.value = '';
        });
        view.render();
    },

    render: function(){
        while (this.containterNotes.hasChildNodes()) {
            this.containterNotes.removeChild(this.containterNotes.lastChild);
        }
        octopus.getNotes().map(function(note){
        const item = createDiv('note-card');
        const title = createDiv('card-title', note.content);
        const details = createDiv('card-details', note.time);
        item.appendChild(title);
        item.appendChild(details);
        this.containterNotes.appendChild(item);
        }, this);
    }
}

const octopus = {
    addNote: function(content){
        model.add(content);
        view.render();
    },

    getNotes: function(){
        return model.getAllNotes();
    },

    init: function(){
        model.init();
        view.init();
    }
}

octopus.init();