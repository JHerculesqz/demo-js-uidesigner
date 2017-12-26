<template>
    <div class="wrapper" v-on:click="onCompClick4Right">
        我是一个Chart
    </div>
</template>

<script>
    export default {
        components: {},
        name: 'CompChart1',
        data: function () {
            return {
                //#region const
                debug: true,
                //#endregion
                //#region compName

                //#endregion
            };
        },
        mounted: function () {
            //#region custom

            this._initEx();

            //#endregion
        },
        methods: {
            //#region inner

            //#region init

            _initEx: function () {

            },

            //#endregion

            //#region destroy

            _killMe: function () {

            },

            //#endregion

            //#endregion
            //#region callback

            onCompClick4Right: function () {
                this.$emit("onCompClick4Right", "CompChart1", "一块饼");
            },

            //#endregion
            //#region 3rd

            //#endregion
        }
    }
</script>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
        color: #fff;
    }
</style>
