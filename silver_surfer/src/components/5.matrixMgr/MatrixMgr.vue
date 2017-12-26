<template>
    <div class="matrixMgrWrapper">
        <div class="toolbar">
            <marvel-toolbar v-bind:items="toolbarItems"
                            v-on:onToolbarItemClick="onToolbarItemClick">
            </marvel-toolbar>
        </div>
        <div class="contArea">
            <div class="part1">
                <div class="pageItem"
                     v-bind:class="{pageItemSelect: pageItem.pageId == pageItemCur.pageId}"
                     v-for="pageItem in pageItemLst"
                     v-on:click="onClickPageItem(pageItem)">
                    {{pageItem.pageLabel}}
                </div>
            </div>
            <div class="part2">
                <div class="part2Head"></div>
                <div class="cont">
                    <div class="mid">
                        <div class="addComponentBtn1">
                            <marvel-primary-button label="添加组件"
                                                   v-on:onClick="onClick4Mid">
                            </marvel-primary-button>
                        </div>
                        <div class="addComponentBtn2">
                            <marvel-primary-button label="添加组件"
                                                   v-on:onClick="onClick4MidBottomLeft">
                            </marvel-primary-button>
                        </div>
                        <div class="showCaseArea">
                            <component :is="compName4MidBottomLeft"
                                       v-on:onCompClick4MidBottomLeft="onCompClick4MidBottomLeft"></component>
                        </div>
                        <component :is="compName4Mid"></component>
                    </div>
                    <div class="right">
                        <div class="addComponentBtn3">
                            <marvel-primary-button label="添加折叠面板"
                                                   v-on:onClick="onClick4Right">
                            </marvel-primary-button>
                        </div>
                        <marvel-fold-panel
                                v-for="(folderPanel, iRightPanelIndex) in folderPanelLst"
                                :item="folderPanel"
                                style="margin-bottom: 10px"
                        >
                            <slot>
                                <marvel-primary-button label="添加组件"
                                                       v-on:onClick="onClick4RightDetails(iRightPanelIndex)">
                                </marvel-primary-button>
                                <div v-for="compName4Right in folderPanel.compNameLst">
                                    <component :is="compName4Right" v-on:onCompClick4Right="onCompClick4Right"></component>
                                </div>
                            </slot>
                        </marvel-fold-panel>
                    </div>
                </div>
            </div>
        </div>
        <matrix-dialog ref="refMatrixDialog"
                       v-on:afterApplyDialog="afterApplyDialog"></matrix-dialog>
    </div>
</template>

<script>
    import MarvelRouter from "@/walle/component/router";
    import MarvelToolbar from "@/walle/widget/toolbar/MarvelToolbar";
    import MarvelPrimaryButton from "@/walle/widget/button/MarvelPrimaryButton";
    import MarvelFoldPanel from "@/walle/widget/foldPanel/MarvelFoldPanel";
    import MatrixDialog from "./MatrixDialog";
    //#region code generation
    import CompGis1 from "./libs/CompGis1";
    import CompGisFilter1 from "./libs/CompGisFilter1";
    import CompGrid1 from "./libs/CompGrid1";
    import CompChart1 from "./libs/CompChart1";
    //#endregion

    export default {
        components: {
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
                    label: "新建指标",
                    icon: "icon-credit-card",
                    visible: true,
                    disable: false,
                }, {
                    id: 2,
                    label: "保存",
                    icon: "icon-drawer",
                    visible: true,
                    disable: false,
                }],
                //#endregion
                //#region left.pageItems
                pageItemLst: [{
                    pageId: "page1",
                    pageLabel: "页面1",
                }, {
                    pageId: "page4Add",
                    pageLabel: "+",
                }],
                pageItemCur: {
                    pageId: "page1",
                    pageLabel: "页面1",
                },
                //#endregion
                //#region mid
                compName4Mid: "",
                compName4MidBottomLeft: "",
                //#endregion
                //#region right
                folderPanelLst: [{
                    name: "指标",
                    height: "500px",
                    bIsExpand: true,
                    compNameLst: [],
                }],
                //#endregion
            };
        },
        mounted: function () {
            //#region custom

            //#endregion
        },
        methods: {
            //#region inner

            //#region toolbar

            onToolbarItemClick: function (oItem) {
                console.log(oItem);
            },

            //#endregion

            //#region left.pageItem

            onClickPageItem: function (oPageItem) {
                if (oPageItem.pageId == "page4Add") {
                    var iIndex = this.pageItemLst.length - 1;
                    var iId = iIndex + 1;
                    var oNew = {
                        pageId: "page" + iId,
                        pageLabel: "页面" + iId,
                    };
                    this.pageItemLst.splice(iIndex, 0, oNew);
                    this.pageItemCur = oNew;
                }
                else {
                    this.pageItemCur = oPageItem;
                }
            },

            //#endregion

            //#region mid

            onClick4Mid: function () {
                this.$refs.refMatrixDialog.showDialogEx("compName4Mid");
            },

            onClick4MidBottomLeft: function () {
                this.$refs.refMatrixDialog.showDialogEx("compName4MidBottomLeft");
            },

            onCompClick4MidBottomLeft: function (strCompName, oParams) {
                console.log(strCompName);
                console.log(oParams);
            },

            //#endregion

            //#region right

            onClick4Right: function () {
                this.folderPanelLst.push({
                    name: "折叠面板",
                    height: "500px",
                    bIsExpand: true,
                    compNameLst: [],
                });
            },

            onClick4RightDetails: function (iRightPanelIndex) {
                this.$refs.refMatrixDialog.showDialogEx(iRightPanelIndex);
            },

            onCompClick4Right: function (strCompName, oParams) {
                console.log(strCompName);
                console.log(oParams);
            },

            //#endregion

            //#region dialog

            afterApplyDialog: function (strFrom, strCompName) {
                console.log(strFrom);
                console.log(strCompName);
                if (strFrom == "compName4Mid") {
                    this.compName4Mid = strCompName;
                }
                else if (strFrom == "compName4MidBottomLeft") {
                    this.compName4MidBottomLeft = strCompName;
                }
                else if (strFrom == "compName4Right") {
                    this.compName4Right = strCompName;
                }
                else {
                    this.folderPanelLst[strFrom].compNameLst.push(strCompName);
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

<style>
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

    .part2 .part2Head {
        height: 77px;
        width: 100%;
        background: url("/static/demo/headBg3.png");
        background-size: contain;
        position: relative;
    }

    .part2 .part2Head:before {
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

    .part2 .part2Head:after {
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
</style>
