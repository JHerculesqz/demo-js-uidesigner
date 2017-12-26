<template>
    <div class="matrixDialogWrapper">
        <marvel-dialog :showDialog="showDialog"
                       title="组件库"
                       width="800" height="600"
                       v-on:onClickDialogClose="onClickDialogClose">
            <div slot="dialogCont" class="contArea">
                <marvel-tab :tabItems="tabItems">
                    <marvel-tab-item :isActive="tabItems[0].isActive">
                        <marvel-list3 :listItems="listItems[0]"
                                      v-on:onBtnClick4List="onBtnClick4List"></marvel-list3>
                    </marvel-tab-item>
                    <marvel-tab-item :isActive="tabItems[1].isActive">
                        <marvel-list3 :listItems="listItems[1]"
                                      v-on:onBtnClick4List="onBtnClick4List"></marvel-list3>
                    </marvel-tab-item>
                    <marvel-tab-item :isActive="tabItems[2].isActive">
                        <marvel-list3 :listItems="listItems[2]"
                                      v-on:onBtnClick4List="onBtnClick4List"></marvel-list3>
                    </marvel-tab-item>
                    <marvel-tab-item :isActive="tabItems[3].isActive">
                        <marvel-list3 :listItems="listItems[3]"
                                      v-on:onBtnClick4List="onBtnClick4List"></marvel-list3>
                    </marvel-tab-item>
                    <marvel-tab-item :isActive="tabItems[4].isActive">
                        <marvel-list3 :listItems="listItems[0]"
                                       v-on:onBtnClick4List="onBtnClick4List"></marvel-list3>
                    </marvel-tab-item>
                </marvel-tab>
            </div>
        </marvel-dialog>
    </div>
</template>

<script>
    import MarvelDialog from "@/walle/widget/dialog/MarvelDialog";
    import MarvelTab from "@/walle/widget/tab/MarvelTab";
    import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
    import MarvelList3 from "@/walle/widget/list/MarvelList3";
    import LibUtilsEx from "../0.common/lib";
    export default {
        components: {
            MarvelList3,
            MarvelTabItem,
            MarvelTab,
            MarvelDialog

        },
        name: 'MatrixDialog',
        data: function () {
            return {
                //#region const
                debug: true,
                //#endregion
                //#region dialog

                showDialog: false,
                from: "",
                compName: "XXXX",

                //#endregion
                //#region dialog.tab

                tabItems: [{
                    label: "常用组件",
                    isActive: true
                }, {
                    label: "地图",
                    isActive: false
                }, {
                    label: "工具",
                    isActive: false
                }, {
                    label: "表格",
                    isActive: false
                }, {
                    label: "图例",
                    isActive: false
                }],

                //#endregion
                //#region dialog.list

                listItems: [],

                //#endreigon
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
                //2._getData4LibLst
                this._getData4LibLst();
            },

            //#endregion

            //#region destroy

            _killMe: function () {
                this.showDialog = false;
            },

            //#endregion

            //#region dialog

            _getData4LibLst: function () {
                if(this.debug){
                    this.listItems = LibUtilsEx.mock();
                }
                else{
                    //TODO:post
                }
            },

            onClickDialogClose: function () {
                this._killMe();
            },

            //#endregion

            //#region dialog.list

            onBtnClick4List: function (oListItem) {
                this.compName = oListItem.id;
                this._killMe();
                this.afterApplyDialog();
            },

            //#endregion

            //#endregion
            //#region callback
            afterApplyDialog: function () {
                this.$emit("afterApplyDialog", this.from, this.compName);
            },
            //#endregion
            //#region 3rd

            showDialogEx: function (strFrom) {
                this._initEx();
                this.from = strFrom;
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
