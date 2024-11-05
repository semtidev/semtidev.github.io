// Vue App init
const { createApp, ref } = Vue

createApp({
    setup() {
        const name = ref('Tony Machado')
        const modeIcon = ref('mdi-white-balance-sunny')
        const changeMode = () => modeIcon.value = (modeIcon.value == 'mdi-white-balance-sunny') ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
        const openModal = () => {
            Swal.fire({
                title: 'Detalle del proyecto',
                text: 'Detalle del proyecto',
                showClass: {
                    popup: `
                      animate__animated
                      animate__fadeInUp
                      animate__faster
                    `
                  },
                  hideClass: {
                    popup: `
                      animate__animated
                      animate__fadeOutDown
                      animate__faster
                    `
                  }
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