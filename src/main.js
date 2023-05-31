import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router';
import NoteList from "@/components/NoteList.vue";
import CreateNote from "@/components/CreateNote.vue";
import EditNote from "@/components/EditNote.vue";
import store from "@/store/store";


const routes = [
    {path: '/', name: 'note-list', component: NoteList},
    {path: '/create', name: 'note', component: CreateNote},
    {path: '/edit/:id', name: 'EditNote', component: EditNote,},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).use(store).mount('#app');
