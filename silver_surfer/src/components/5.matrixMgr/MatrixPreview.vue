<template>
    <div class="matrixMgrWrapper">
        <div class="toolbar">
            <marvel-toolbar v-bind:items="toolbarItems"
                            v-on:onToolbarItemClick="onToolbarItemClick">
            </marvel-toolbar>
        </div>
        <div class="contArea"
             v-show="pageType == 'matrix'">
            <div class="cont">
                <div class="mid">
                    <div class="showCaseArea">
                        <component :is="curPageItem.compName4MidBottomLeft"
                                   :ref="curPageItem.compName4MidBottomLeft"
                                   v-on:onCompClick4MidBottomLeft="onCompClick4MidBottomLeft"></component>
                    </div>
                    <component :is="curPageItem.compName4Mid"
                               :ref="curPageItem.compName4Mid"
                               id="CompGis1Preview"
                               v-on:onCompClick4Mid="onCompClick4Mid"
                               v-on:onCompGoDown4Mid="onCompGoDown4Mid"></component>
                </div>
                <div class="right">
                    <marvel-fold-panel
                            v-for="folderPanel in curPageItem.folderPanelLst"
                            :item="folderPanel"
                            style="margin-bottom: 10px">
                        <slot>
                            <div v-for="compName4Right in folderPanel.compNameLst">
                                <component :is="compName4Right"
                                           :ref="compName4Right"
                                           v-on:onCompClick4Right="onCompClick4Right"
                                           v-on:onCompGoDown4Right="onCompGoDown4Right"></component>
                            </div>
                        </slot>
                    </marvel-fold-panel>
                </div>
            </div>
        </div>
        <div class="contArea2"
             v-show="pageType == 'conf'">
            <div class="cont">
                <component :is="compName4MidConf"></component>
            </div>
        </div>
        <div class="contArea3"
             v-show="pageType == 'result'">
            <div class="cont">
                <component :is="compName4MidResult"></component>
            </div>
        </div>
    </div>
</template>

<script>
    import MarvelRouter from "@/walle/component/router";
    import MarvelToolbar from "@/walle/widget/toolbar/MarvelToolbar";
    import MarvelFoldPanel from "@/walle/widget/foldPanel/MarvelFoldPanel";
    //#region code generation
    import CompGis1 from "./libs/CompGis1";
    import CompGisFilter1 from "./libs/CompGisFilter1";
    import CompGrid1 from "./libs/CompGrid1";
    import CompChart1 from "./libs/CompChart1";
    //#endregion

    export default {
        components: {
            MarvelToolbar,
            MarvelFoldPanel,
            //#region code generation
            CompGis1,
            CompGisFilter1,
            CompGrid1,
            CompChart1,
            //#endregion
        },
        name: 'MatrixPreview',
        data: function () {
            return {
                //#region toolbar
                toolbarItems: [{
                    id: 1,
                    label: "返回",
                    icon: "icon-credit-card",
                    visible: true,
                    disable: false,
                }],
                pageType: "matrix",//"matrix","conf","result"
                //#endregion
                //#region matrix
                pageItemLst: [],
                curPageItem: {},
                //#endregion
                //#region conf
                compName4MidConf: "",
                //#endregion
                //#region result
                compName4MidResult: "",
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
                this.pageType = window.pageType;
                this.pageItemLst = window.res.matrix;
                this.curPageItem = window.res.matrix[0];
                this.compName4MidConf = window.res.conf;
                this.compName4MidResult = window.res.result;
            },

            //#endregion

            //#region toolbar

            onToolbarItemClick: function (oToolbarItem) {
                if (oToolbarItem.id == 1) {
                    MarvelRouter.to(this.$router, "matrixMgr");
                }
            },

            //#endregion

            //#region matrix

            //#region msg

            onCompClick4MidBottomLeft: function (oParams) {
                for (var i = 0; i < this.curPageItem.msgMap.bottom.length; i++) {
                    var oSub = this.curPageItem.msgMap.bottom[i];
                    //1.如果是联动compName4Mid
                    if (oSub.length != 3) {
                        var strTo = this.curPageItem[oSub[0]];
                        var strMsg = "[cmd]" + strTo + ".doSth";
                        console.log(strMsg, oParams);
                        this.$refs[strTo].doSth(oParams);
                    }
                    //2.如果是联动compName4Right
                    else {
                        var strTo = this.curPageItem.folderPanelLst[oSub[1]].compNameLst[oSub[2]];
                        var strMsg = "[cmd]" + strTo + ".doSth";
                        console.log(strMsg, oParams);
                        this.$refs[strTo][0].doSth(oParams);
                    }
                }
            },

            onCompClick4Right: function (oParams) {
                var oSub = this.curPageItem.msgMap.right;
                var strTo = this.curPageItem[oSub];
                var strMsg = "[cmd]" + strTo + ".doSth";
                console.log(strMsg, oParams);
                this.$refs[strTo].doSth(oParams);
            },
            onCompGoDown4Right: function (oParams) {
                this._setNextLevelPageItem(oParams);
            },

            onCompClick4Mid: function (oParams) {
                for (var i = 0; i < this.curPageItem.msgMap.mid.length; i++) {
                    var oSub = this.curPageItem.msgMap.mid[i];
                    //1.如果是联动compName4Right
                    if (oSub.length == 3) {
                        var strTo = this.curPageItem.folderPanelLst[oSub[1]].compNameLst[oSub[2]];
                        var strMsg = "[cmd]" + strTo + ".doSth";
                        console.log(strMsg, oParams);
                        this.$refs[strTo][0].doSth(oParams);
                    }
                }
            },
            onCompGoDown4Mid: function (oParams) {
                this._setNextLevelPageItem(oParams);
            },

            _setNextLevelPageItem: function (oParams) {
                var iCurPageItemIndex = 0;
                for (var i = 0; i < this.pageItemLst.length; i++) {
                    var oPageItem = this.pageItemLst[i];
                    if(oPageItem.pageId == this.curPageItem.pageId){
                        iCurPageItemIndex = i;
                        break;
                    }
                }

                if(iCurPageItemIndex + 1 < this.pageItemLst.length - 1){
                    this.curPageItem = this.pageItemLst[iCurPageItemIndex + 1];
                    console.log("GoDown...", oParams);
                }
            },

            //#endregion

            //#endregion

            //#region conf



            //#endregion

            //#region result



            //#endregion

            //#endregion
            //#region callback

            //#endregion
            //#region 3rd

            //#endregion
        }
    }
</script>

<style scoped>
    .matrixMgrWrapper {
        height: 100%;
    }

    .toolbar {
        height: 32px;
        background-color: #40495c;
    }

    .contArea {
        width: 100%;
        height: calc(100% - 32px);
    }

    .contArea .cont {
        width: 100%;
        height: 100%;
    }

    .contArea .cont .mid {
        width: calc(100% - 400px);
        float: left;
        height: 100%;
        background-color: rgb(41, 49, 82);
        position: relative;
    }

    .contArea .cont .mid .showCaseArea {
        position: absolute;
        width: 200px;
        height: 100px;
        bottom: 10px;
        left: 10px;
        border: 1px dashed #d5d5d5;
        z-index: 1001;
    }

    .contArea .cont .right {
        width: 400px;
        float: left;
        height: 100%;
        background-color: rgb(28, 34, 61);
        position: relative;
        padding: 10px 10px 0 10px;
        box-sizing: border-box;
        overflow-y: auto;
    }

    .contArea2 {
        height: calc(100% - 32px);
        background-color: #d5d5d5;
        padding: 20px;
        box-sizing: border-box;
    }

    .contArea2 .cont {
        width: 100%;
        height: calc(100% - 77px);
        background-color: rgb(41, 49, 82);
        position: relative;
    }

    .contArea3 {
        height: calc(100% - 32px);
        background-color: #d5d5d5;
        padding: 20px;
        box-sizing: border-box;
    }

    .contArea3 .cont {
        width: 100%;
        height: calc(100% - 77px);
        background-color: rgb(41, 49, 82);
        position: relative;
    }
</style>
