<template>
    <div class="matrixDialogWrapper">
        <marvel-dialog :showDialog="showDialog"
                       title="联动关系"
                       width="600" height="400"
                       v-on:onClickDialogClose="onClickDialogClose">
            <div slot="dialogCont" class="contArea">
                <marvel-multi-input ref="refInput"
                                    :inputMsg="msgMap"
                                    size="mini">
                </marvel-multi-input>
            </div>
        </marvel-dialog>
    </div>
</template>

<script>
    import MarvelDialog from "@/walle/widget/dialog/MarvelDialog";
    import MarvelMultiInput from "@/walle/widget/input/MarvelMultiInput";
    export default {
        components: {
            MarvelMultiInput,
            MarvelDialog,
        },
        name: 'MatrixMsgMapDialog',
        props: ["msgMap"],
        data: function () {
            return {
                //#region const

                //#endregion
                //#region dialog

                showDialog: false,

                //#endregion
            };
        },
        mounted: function () {
            //#region custom

            //#endregion
        },
        methods: {
            //#region inner

            //#region init

            _initEx: function () {
                //1.
                this.showDialog = true;

                //2.
                this.$refs.refInput.setInputMsg(JSON.stringify(this.msgMap));
            },

            //#endregion

            //#region destroy

            _killMe: function () {
                this.showDialog = false;
            },

            //#endregion

            //#endregion
            //#region callback
            onClickDialogClose: function () {
                this._killMe();
                var oRes = JSON.parse(this.$refs.refInput.getInputMsg());
                this.$emit("afterMatrixMsgMapDialogClose", oRes);
            },
            //#endregion
            //#region 3rd

            showDialogEx: function () {
                this._initEx();
            },

            //#endregion
        }
    }
</script>

<style>
    .contArea {
        height: 100%;
    }
</style>
