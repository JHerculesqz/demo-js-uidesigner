<template>
    <div class="matrixMgrWrapper">
        <div class="toolbar">
            <marvel-toolbar v-bind:items="toolbarItems"
                            v-on:onToolbarItemClick="onToolbarItemClick">
            </marvel-toolbar>
        </div>
        <div class="contArea"
             v-show="pageType == 'matrix'">
            <div class="part1">
                <div class="pageItem"
                     v-for="pageItem in pageItemLst"
                     v-bind:class="{pageItemSelect: pageItem.pageId == curPageItem.pageId}"
                     v-on:click="onClickPageItem(pageItem)">
                    {{pageItem.pageLabel}}
                </div>
            </div>
            <div class="part2">
                <div class="browserHead"></div>
                <div class="cont">
                    <div class="mid">
                        <div class="addComponentBtn1">
                            <marvel-primary-button label="添加组件"
                                                   v-on:onClick="onClick4Mid">
                            </marvel-primary-button>
                            <marvel-primary-button label="添加联动关系"
                                                   v-on:onClick="onClick4MsgMap">
                            </marvel-primary-button>
                        </div>
                        <div class="goUp icon-undo2"
                             v-show="showGoUp"
                             v-on:click="onGoUpClick"></div>
                        <div class="addComponentBtn2">
                            <marvel-primary-button label="添加组件"
                                                   v-on:onClick="onClick4MidBottomLeft">
                            </marvel-primary-button>
                        </div>
                        <div class="showCaseArea">
                            <component :is="curPageItem.compName4MidBottomLeft"
                                       :ref="curPageItem.compName4MidBottomLeft"
                                       v-on:onCompClick4MidBottomLeft="onCompClick4MidBottomLeft"></component>
                        </div>
                        <component :is="curPageItem.compName4Mid"
                                   :ref="curPageItem.compName4Mid"
                                   id="CompGis1"
                                   v-on:onCompClick4Mid="onCompClick4Mid"
                                   v-on:onCompGoDown4Mid="onCompGoDown4Mid"></component>
                    </div>
                    <div class="right">
                        <div class="addComponentBtn3">
                            <marvel-primary-button label="添加折叠面板"
                                                   v-on:onClick="onClick4Right">
                            </marvel-primary-button>
                        </div>
                        <marvel-fold-panel
                                v-for="folderPanel in curPageItem.folderPanelLst"
                                :item="folderPanel"
                                style="margin-bottom: 10px">
                            <slot>
                                <marvel-primary-button label="添加组件"
                                                       v-on:onClick="onClick4RightDetails(folderPanel)">
                                </marvel-primary-button>
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
        </div>
        <div class="contArea2"
             v-show="pageType == 'conf'">
            <div class="browserHead"></div>
            <div class="cont">
                <div class="addComponentBtn1">
                    <marvel-primary-button label="添加配置页组件"
                                           v-on:onClick="onClick4MidConf">
                    </marvel-primary-button>
                </div>
                <component :is="compName4MidConf"></component>
            </div>
        </div>
        <div class="contArea3"
             v-show="pageType == 'result'">
            <div class="browserHead"></div>
            <div class="cont">
                <div class="addComponentBtn1">
                    <marvel-primary-button label="添加结果页组件"
                                           v-on:onClick="onClick4MidResult">
                    </marvel-primary-button>
                </div>
                <component :is="compName4MidResult"></component>
            </div>
        </div>
        <matrix-dialog ref="refMatrixDialog"
                       v-on:afterApplyDialog="afterApplyDialog"></matrix-dialog>
        <matrix-msg-map-dialog ref="refMatrixMsgMapDialog"
                               :msgMap="curPageItem.msgMap"
                               v-on:afterMatrixMsgMapDialogClose="afterMatrixMsgMapDialogClose">
        </matrix-msg-map-dialog>
    </div>
</template>

<script>
    import MarvelRouter from "@/walle/component/router";
    import MarvelToolbar from "@/walle/widget/toolbar/MarvelToolbar";
    import MarvelPrimaryButton from "@/walle/widget/button/MarvelPrimaryButton";
    import MarvelFoldPanel from "@/walle/widget/foldPanel/MarvelFoldPanel";
    import MatrixDialog from "./MatrixDialog";
    import MatrixMsgMapDialog from "./MatrixMsgMapDialog";
    //#region code generation
    import CompGis1 from "./libs/CompGis1";
    import CompGisFilter1 from "./libs/CompGisFilter1";
    import CompGrid1 from "./libs/CompGrid1";
    import CompChart1 from "./libs/CompChart1";
    //#endregion

    export default {
        components: {
            MatrixMsgMapDialog,
            MarvelFoldPanel,
            MatrixDialog,
            MarvelPrimaryButton,
            MarvelToolbar,
            //#region code generation
            CompGis1,
            CompGisFilter1,
            CompGrid1,
            CompChart1,
            //#endregion
        },
        name: 'MatrixMgr',
        data: function () {
            return {
                //#region toolbar
                toolbarItems: [{
                    id: 1,
                    label: "新建指标页",
                    icon: "icon-credit-card",
                    visible: true,
                    disable: false,
                }, {
                    id: 2,
                    label: "新建配置页",
                    icon: "icon-credit-card",
                    visible: true,
                    disable: false,
                }, {
                    id: 3,
                    label: "新建结果页",
                    icon: "icon-credit-card",
                    visible: true,
                    disable: false,
                }, {
                    id: 4,
                    label: "保存",
                    icon: "icon-drawer",
                    visible: true,
                    disable: false,
                }, {
                    id: 5,
                    label: "预览",
                    icon: "icon-camera",
                    visible: true,
                    disable: false,
                }],
                pageType: "matrix",//"matrix","conf","result",
                res: {},
                //#endregion
                //#region matrix
                pageItemLst: [],
                curPageItem: {
                    pageId: "page1",
                    pageLabel: "页面1",
                    compName4Mid: "",
                    compName4MidBottomLeft: "",
                    folderPanelLst: [{
                        name: "指标",
                        height: "500px",
                        bIsExpand: true,
                        compNameLst: [],
                    }],
                    msgMap: {
                        bottom: [
                            ["compName4Mid"],
                            ["compName4Right", 0, 0],
                            ["compName4Right", 0, 1],
                        ],
                        right: "compName4Mid",
                        mid: [
                            ["compName4Right", 0, 0],
                            ["compName4Right", 0, 1],
                        ],
                    },
                },
                //#endregion
                //#region conf
                compName4MidConf: "",
                //#endregion
                //#region result
                compName4MidResult: "",
                //#endregion
            };
        },
        computed: {
            showGoUp: function () {
                var iCurPageItemIndex = 0;
                for (var i = 0; i < this.pageItemLst.length; i++) {
                    var oPageItem = this.pageItemLst[i];
                    if (oPageItem.pageId == this.curPageItem.pageId) {
                        iCurPageItemIndex = i;
                        break;
                    }
                }

                if(iCurPageItemIndex != 0){
                    return true;
                }
                else{
                    return false;
                }
            },
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
                this.pageItemLst.push(this.curPageItem);
                this.pageItemLst.push({
                    pageId: "page4Add",
                    pageLabel: "+",
                });
            },

            //#endregion

            //#region toolbar

            onToolbarItemClick: function (oToolbarItem) {
                if (oToolbarItem.id == 1) {
                    this.pageType = "matrix";
                }
                else if (oToolbarItem.id == 2) {
                    this.pageType = "conf";
                }
                else if (oToolbarItem.id == 3) {
                    this.pageType = "result";
                }
                else if (oToolbarItem.id == 4) {
                    this.res = {
                        matrix: this.pageItemLst,
                        conf: this.compName4MidConf,
                        result: this.compName4MidResult
                    };
                    window.res = this.res;
                    window.pageType = this.pageType;
                    console.log(this.res);
                }
                else if (oToolbarItem.id == 5) {
                    this.res = {
                        matrix: this.pageItemLst,
                        conf: this.compName4MidConf,
                        result: this.compName4MidResult
                    };
                    window.res = this.res;
                    window.pageType = this.pageType;
                    MarvelRouter.to(this.$router, "preview");
                }
            },

            //#endregion

            //#region matrix

            //#region left

            onClickPageItem: function (oPageItem) {
                if (oPageItem.pageId == "page4Add") {
                    var iIndex = this.pageItemLst.length - 1;
                    var iId = iIndex + 1;
                    var oNew = {
                        pageId: "page" + iId,
                        pageLabel: "页面" + iId,
                        compName4Mid: "",
                        compName4MidBottomLeft: "",
                        folderPanelLst: [{
                            name: "指标",
                            height: "500px",
                            bIsExpand: true,
                            compNameLst: [],
                        }],
                        msgMap: {},
                    };
                    this.pageItemLst.splice(iIndex, 0, oNew);
                    this.curPageItem = oNew;
                }
                else {
                    this.curPageItem = oPageItem;
                }
            },

            //#endregion

            //#region mid

            onClick4Mid: function () {
                this.$refs.refMatrixDialog.showDialogEx("compName4Mid");
            },

            //#endregion

            //#region midBottomLeft

            onClick4MidBottomLeft: function () {
                this.$refs.refMatrixDialog.showDialogEx("compName4MidBottomLeft");
            },

            //#endregion

            //#region right

            onClick4Right: function () {
                this.curPageItem.folderPanelLst.push({
                    name: "折叠面板",
                    height: "500px",
                    bIsExpand: true,
                    compNameLst: [],
                });
            },

            onClick4RightDetails: function (folderPanel) {
                this.$refs.refMatrixDialog.showDialogEx(folderPanel);
            },

            //#endregion

            //#region msg

            onClick4MsgMap: function () {
                this.$refs.refMatrixMsgMapDialog.showDialogEx();
            },
            afterMatrixMsgMapDialogClose: function (oRes) {
                this.curPageItem.msgMap = oRes;
            },

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
                this._goDown(oParams);
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
                this._goDown(oParams);
            },

            onGoUpClick: function () {
                this._goUp();
            },

            _goDown: function (oParams) {
                var iCurPageItemIndex = 0;
                for (var i = 0; i < this.pageItemLst.length; i++) {
                    var oPageItem = this.pageItemLst[i];
                    if (oPageItem.pageId == this.curPageItem.pageId) {
                        iCurPageItemIndex = i;
                        break;
                    }
                }

                if (iCurPageItemIndex + 1 < this.pageItemLst.length - 1) {
                    this.curPageItem = this.pageItemLst[iCurPageItemIndex + 1];
                    console.log("GoDown...", oParams);
                }
            },
            _goUp: function (oParams) {
                var iCurPageItemIndex = 0;
                for (var i = 0; i < this.pageItemLst.length; i++) {
                    var oPageItem = this.pageItemLst[i];
                    if (oPageItem.pageId == this.curPageItem.pageId) {
                        iCurPageItemIndex = i;
                        break;
                    }
                }

                if (iCurPageItemIndex - 1 < this.pageItemLst.length - 1 &&
                    iCurPageItemIndex - 1 >= 0) {
                    this.curPageItem = this.pageItemLst[iCurPageItemIndex - 1];
                    console.log("GoUp...", oParams);
                }
            },

            //#endregion

            //#endregion

            //#region conf

            onClick4MidConf: function () {
                this.$refs.refMatrixDialog.showDialogEx("compName4MidConf");
            },

            //#endregion

            //#region result

            onClick4MidResult: function () {
                this.$refs.refMatrixDialog.showDialogEx("compName4MidResult");
            },

            //#endregion

            //#region dialog

            afterApplyDialog: function (oFromWho, strCompName) {
                if (oFromWho == "compName4Mid") {
                    this.curPageItem.compName4Mid = strCompName;
                }
                else if (oFromWho == "compName4MidBottomLeft") {
                    this.curPageItem.compName4MidBottomLeft = strCompName;
                }
                else if (oFromWho == "compName4Right") {
                    this.curPageItem.compName4Right = strCompName;
                }
                else if (oFromWho == "compName4MidConf") {
                    this.compName4MidConf = strCompName;
                }
                else if (oFromWho == "compName4MidResult") {
                    this.compName4MidResult = strCompName;
                }
                else {
                    oFromWho.compNameLst.push(strCompName);
                }
            },

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

    .browserHead {
        height: 77px;
        width: 100%;
        background: url("/static/demo/headBg3.png");
        background-size: contain;
        position: relative;
    }

    .browserHead:before {
        content: "";
        display: block;
        width: 295px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url("/static/demo/headBg1.png") no-repeat;
        background-size: 100%;
    }

    .browserHead:after {
        content: "";
        display: block;
        width: 65px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: url("/static/demo/headBg2.png") no-repeat;
        background-size: 100%;
    }

    .contArea {
        width: 100%;
        height: calc(100% - 32px);
    }

    .part1 {
        float: left;
        width: 200px;
        height: 100%;
        background-color: rgb(28, 34, 61);
        padding: 10px 10px 0 10px;
        box-sizing: border-box;
        overflow-y: auto;
    }

    .part1 .pageItem {
        height: 82px;
        margin-bottom: 10px;
        background-color: rgb(41, 49, 82);
        color: #3dcca6;
        text-align: center;
        line-height: 82px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 26px;
        border: 3px solid transparent;
    }

    .part1 .pageItemSelect {
        border: 3px solid rgb(245, 152, 4);
    }

    .part2 {
        float: left;
        width: calc(100% - 200px);
        height: 100%;
        background-color: #d5d5d5;
        padding: 20px;
        box-sizing: border-box;
    }

    .part2 .cont {
        width: 100%;
        height: calc(100% - 77px);
    }

    .part2 .cont .mid {
        width: calc(100% - 400px);
        float: left;
        height: 100%;
        background-color: rgb(41, 49, 82);
        position: relative;
    }

    .part2 .cont .mid .goUp {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        background-color: #2dcca6;
        float: right;
        position: absolute;
        top: 10px;
        right: 244px;
        color: #ffffff;
        font-size: 18px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        z-index: 1001;
    }

    .part2 .cont .mid .addComponentBtn1 {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1001;
    }

    .part2 .cont .mid .addComponentBtn2 {
        position: absolute;
        bottom: 10px;
        left: 10px;
        z-index: 1001;
    }

    .part2 .cont .mid .showCaseArea {
        position: absolute;
        width: 200px;
        height: 100px;
        bottom: 52px;
        left: 10px;
        border: 1px dashed #d5d5d5;
        z-index: 1001;
    }

    .part2 .cont .right {
        width: 400px;
        float: left;
        height: 100%;
        background-color: rgb(28, 34, 61);
        position: relative;
        padding: 52px 10px 0 10px;
        box-sizing: border-box;
        overflow-y: auto;
    }

    .part2 .cont .right .addComponentBtn3 {
        position: absolute;
        top: 10px;
        left: 10px;
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

    .contArea2 .cont .addComponentBtn1 {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1001;
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

    .contArea3 .cont .addComponentBtn1 {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1001;
    }
</style>
