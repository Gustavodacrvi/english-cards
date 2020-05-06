<template>
    <card-privacy-vue title="Política de privacidade" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a metus eget risus tempus gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum nisi non massa commodo viverra. Etiam egestas orci congue dui vulputate placerat. Proin semper blandit ipsum, lacinia semper est efficitur vitae." :method="goBack"/>
</template>

<script>
import CardPrivacyVue from '../components/CardPrivacy.vue'

export default {
    components: {
        CardPrivacyVue
    },
    methods: {
        goBack() {
            this.$router.push('/')
        }
    }
}
</script>