<template>
    <card-vue title="Termos de uso" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a metus eget risus tempus gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum nisi non massa commodo viverra. Etiam egestas orci congue dui vulputate placerat. Proin semper blandit ipsum, lacinia semper est efficitur vitae." :method="goBack"/>
</template>

<script>
import CardVue from '../components/Card/Card.vue'

export default {
    components: {
        CardVue
    },
    methods: {
        goBack() {
            this.$router.push('/')
        }
    }
}
</script>