// Vue App init
const { createApp, ref } = Vue

createApp({
    setup() {
        const name = ref('Tony Machado')
        const modeIcon = ref('fa-sun')
        const changeMode = () => modeIcon.value = (modeIcon.value == 'fa-sun') ? 'fa-moon' : 'fa-sun'
        
        return {
            name,
            modeIcon,
            changeMode
        } 
    }
}).mount('#app');