<template>
    <div class="goodsComment-container">
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from "../../components/comment/"
export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    components:{
        comment
    }
}
</script>

<style lang="less">

</style>
