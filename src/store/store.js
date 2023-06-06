import {createStore} from 'vuex';

const sessionStorageState = () => {
    const savedState = sessionStorage.getItem('notes');
    if (savedState) {
        return JSON.parse(savedState);
    } else {
        return {
            notes: [
                {
                    id: 1,
                    title: 'Заметка 1',
                    todos: [
                        {id: 1, text: 'Задача 1', completed: false},
                        {id: 2, text: 'Задача 2', completed: true},
                        {id: 3, text: 'Задача 3', completed: false},
                    ],
                },
            ],
        };
    }
};

export default createStore({
    state: sessionStorageState,
    getters: {
        allNotes: (state) => state.notes,
    },
    actions: {
        addNote({state}, note) {
            state.notes.push(note);
            sessionStorage.setItem('notes', JSON.stringify(state));
        },
        updateNote({state}, updatedNote) {
            const index = state.notes.findIndex((note) => note.id === updatedNote.id);
            if (index === -1) return;
            state.notes.splice(index, 1, updatedNote);
            sessionStorage.setItem('notes', JSON.stringify(state));
        },
        deleteNote({state}, noteId) {
            state.notes = state.notes.filter((note) => note.id !== noteId);
            sessionStorage.setItem('notes', JSON.stringify(state));
        },
        reassignIds({ state }) {
            state.notes.forEach((note, index) => {
                note.id = index + 1;
            });
            sessionStorage.setItem('notes', JSON.stringify(state));
        },
    },
});
