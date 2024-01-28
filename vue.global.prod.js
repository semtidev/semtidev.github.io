// Vue App init
const { createApp, ref } = Vue

createApp({
    setup() {
        const name = ref('Tony Machado')
        const modeIcon = ref('mdi-white-balance-sunny')
        const changeMode = () => modeIcon.value = (modeIcon.value == 'mdi-white-balance-sunny') ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
        const openModal = () => {
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
        
        return {
            name,
            modeIcon,
            changeMode,
            openModal
        } 
    }
}).mount('#app');