import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
    state: () => ({
        signin: JSON.parse(localStorage.getItem('signin')) || false,
    }),
    getters: {
        isAdmin: (state) => state.signin,
    },
    actions: {
        login() {
            this.signin = true;
            localStorage.setItem('signin', JSON.stringify(this.signin));
        },
        logout() {
            this.signin = false;
            localStorage.removeItem('signin');
        },
    },
});