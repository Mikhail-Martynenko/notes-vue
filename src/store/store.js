import {createStore} from 'vuex';

const store = createStore({
    state() {
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
    },
    // getters: {
    //     allNotes(state) {
    //         return state.notes;
    //     }
    // },
    mutations: {

        addNote(state, note) {
            state.notes.push(note);
        },
        updateNote(state, updatedNote) {
            const index = state.notes.findIndex((note) => note.id === updatedNote.id);
            if (index !== -1) {
                state.notes.splice(index, 1, updatedNote);
            }
        },
        deleteNote(state, noteId) {
            state.notes = state.notes.filter((note) => note.id !== noteId);
        }
    },
});

export default store;
