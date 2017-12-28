<template>
    <div class="wrapper"
         v-on:click="onCompClick4MidBottomLeft">
        所有<br>
        大型企业<br>
    </div>
</template>

<script>
    export default {
        components: {},
        name: 'CompGisFilter1',
        data: function () {
            return {
                //#region const
                debug: true,
                //#endregion
                //#region foldPanel
                foldPanel: [{
                    name: "行业选择",
                    height: "200px",
                    bIsExpand: true
                }]
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

            onCompClick4MidBottomLeft: function () {
                this.$emit("onCompClick4MidBottomLeft", {a:1});
            },

            //#endregion
            //#region 3rd
            doSth: function (oParams) {
                console.log("CompGisFilter1", oParams);
            },
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
