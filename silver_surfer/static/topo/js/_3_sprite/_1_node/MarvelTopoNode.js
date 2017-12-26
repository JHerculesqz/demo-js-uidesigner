(function ($) {
    $.MarvelTopoNode = function () {
        //region Const

        var ICON_WIDTH = 32;
        var ICON_HEIGHT = 32;

        //endregion

        //region Fields
        var self = this;

        //region createNode
        const STATUS_START = "start";
        const STATUS_FREE = "";
        var createNodeData = {
            status: STATUS_FREE,
            buObj: undefined,
            callback: undefined
        };
        //endregion

        //endregion

        //region draw

        this.draw = function (oBuObj, oTopo) {
            //region 1.getPos

            var oPos = _getPos(oBuObj);

            //endregion

            //region 2.node

            //0.1生成属性
            oTopo.Sprite.NodeGroup.generateProp(oBuObj, oTopo);

            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oPos.x,
                y: oPos.y,
                visible: oBuObj.uiHide == true ? false : true,
                opacity: oBuObj.uiOpacity != undefined ? oBuObj.uiOpacity : 1.0,
                draggable: true
            });
            oGroup.tag = oBuObj;

            //1.oImage
            var oImage = new Konva.Image({
                x: 0,
                y: 0,
                image: oTopo.Resource.m_mapImage[oBuObj.uiImgKey],
                opacity: oGroup.opacity(),
                width: ICON_WIDTH,
                height: ICON_HEIGHT
            });
            oGroup.add(oImage);

            //2.oLabel
            var oLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: oBuObj.uiLabel,
                opacity: oGroup.opacity(),
                fill: oTopo.Resource.getTheme().node.labelColor
            });
            oTopo.Sprite.NodeGroup._setLabelCenter(ICON_WIDTH, ICON_HEIGHT, oLabel);
            oGroup.add(oLabel);

            //endregion

            //region 3.parent

            oTopo.ins.layerNode.add(oGroup);

            //endregion

            //region 4.event

            oGroup.on('mouseover', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('mousedown', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeClick(oGroup, evt, oTopo);
                //evt.cancelBubble = true;
                //evt.evt.stopPropagation();
            });
            oGroup.on('dragmove', function (evt) {
                oTopo.Sprite.NodeGroup.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            //endregion

            return oGroup;
        };

        this.drawInGroup = function (oBuObj, oExpandGroupExists, oTopo) {
            //region 1.getPos

            var oPos = _getPos(oBuObj);

            //endregion

            //region 2.node

            //0.1生成属性
            oTopo.Sprite.NodeGroup.generateProp(oBuObj, oTopo);

            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oPos.x,
                y: oPos.y,
                draggable: true,
                visible: oBuObj.uiHide == true ? false : true,
                opacity: oBuObj.uiOpacity != undefined ? oBuObj.uiOpacity : 1.0,
                dragBoundFunc: function (pos) {
                    var x = oExpandGroupExists.getChildren()[0].x();
                    var y = oExpandGroupExists.getChildren()[0].y();
                    var radius = oExpandGroupExists.tag.uiRadius;
                    var scale = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
                    if (scale < 1) {
                        return {
                            y: Math.round((pos.y - y) * scale + y),
                            x: Math.round((pos.x - x) * scale + x)
                        };
                    }
                    else {
                        return pos;
                    }
                }
            });
            oGroup.tag = oBuObj;

            //1.oImage
            var oImage = new Konva.Image({
                x: 0,
                y: 0,
                image: oTopo.Resource.m_mapImage[oBuObj.uiImgKey],
                opacity: oGroup.opacity(),
                width: ICON_WIDTH,
                height: ICON_HEIGHT
            });
            oGroup.add(oImage);

            //2.oLabel
            var oLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: oBuObj.uiLabel,
                opacity: oGroup.opacity(),
                fill: oTopo.Resource.getTheme().node.labelColor
            });
            oTopo.Sprite.NodeGroup._setLabelCenter(ICON_WIDTH, ICON_HEIGHT, oLabel);
            oGroup.add(oLabel);

            //endregion

            //region 3.parent

            oExpandGroupExists.add(oGroup);

            //endregion

            //region 4.event

            oGroup.on('mouseover', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('mousedown', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeClick(oGroup, evt, oTopo);
                //evt.evt.cancelBubble = true;
                //evt.evt.stopPropagation();
            });
            oGroup.on('dragmove', function (evt) {
                oTopo.Sprite.NodeGroup.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            //endregion

            return oGroup;
        };

        var _getPos = function (oBuObj) {
            return {
                x: oBuObj.x,
                y: oBuObj.y
            };
        };

        //endregion

        //region event

        //endregion

        //region style

        //endregion

        //region imsg

        this.getCenterPos = function (oGroup) {
            var width = oGroup.children[0].width();
            var height = oGroup.children[0].height();
            var x = width / 2 + oGroup.x();
            var y = height / 2 + oGroup.y();
            for (; ;) {
                var oGroup = oGroup.getParent();
                if (oGroup && oGroup.nodeType === "Group") {
                    x = x + oGroup.x();
                    y = y + oGroup.y();
                }
                else {
                    break;
                }
            }
            return {
                x: x,
                y: y,
                width: width,
                height: height
            }
        };

        this.getAbsPos = function (oGroup) {
            var x = oGroup.x();
            var y = oGroup.y();
            for (; ;) {
                var oGroup = oGroup.getParent();
                if (oGroup && oGroup.nodeType === "Group") {
                    x = x + oGroup.x();
                    y = y + oGroup.y();
                }
                else {
                    break;
                }
            }
            return {
                x: x,
                y: y
            }
        };

        this.createNode = function (oBuObj, oAfterCallback, oTopo) {
            oTopo.Stage.updateModel(oTopo.Stage.MODEL_CREATE_NODE);
            //save cache
            createNodeData.buObj = oBuObj;
            createNodeData.status = STATUS_START;
            createNodeData.callback = oAfterCallback;
        };

        this.stageEventMouseOver = function (oEvent, oTopo) {
            //update buObj prop
            var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
            createNodeData.buObj.x = oPos.x;
            createNodeData.buObj.y = oPos.y;
            //绘制网元
            self.draw(createNodeData.buObj, oTopo);
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        this.stageEventMouseMove = function (oEvent, oTopo) {
            var oNode = oTopo.Stage.findOne(createNodeData.buObj.id, oTopo);
            if (oNode) {
                var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
                //更新网元坐标
                oNode.x(oPos.x);
                oNode.y(oPos.y);
                oTopo.Layer.reDraw(oTopo.ins.layerNode);
            }
        };

        this.stageEventMouseDown = function (oEvent, oTopo) {
            var oNode = oTopo.Stage.findOne(createNodeData.buObj.id, oTopo);
            if (oNode) {
                var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
                //保存原始坐标
                oNode.tag.oX = oPos.x;
                oNode.tag.oY = oPos.y;
                //保存坐标，在网元移动的时候会同步更新
                oNode.tag.x = oPos.x;
                oNode.tag.y = oPos.y;
                oNode.x(oPos.x);
                oNode.y(oPos.y);
                oTopo.Layer.reDraw(oTopo.ins.layerNode);
            }
            //createNodeEnd
            _createNodeEnd(oTopo, true);
        };

        var _createNodeEnd = function (oTopo, bCreatedSuccessful) {
            oTopo.Stage.updateModel(oTopo.Stage.MODEL_EMPTY);
            if (typeof createNodeData.callback == "function") {
                createNodeData.callback(createNodeData.buObj, bCreatedSuccessful);
            }
            //clear cache
            createNodeData.buObj = undefined;
            createNodeData.status = STATUS_FREE;
            createNodeData.callback = undefined;
        };

        this.stageEventMouseOut = function (oEvent, oTopo) {
            var oNode = oTopo.Stage.findOne(createNodeData.buObj.id, oTopo);
            if (oNode) {
                oNode.destroy();
                oTopo.Layer.reDraw(oTopo.ins.layerNode);
            }
        };

        this.eventEscPress = function (oEvent, oTopo) {
            if (createNodeData.status == STATUS_START) {
                var oNode = oTopo.Stage.findOne(createNodeData.buObj.id, oTopo);
                if (oNode) {
                    oNode.destroy();
                    oTopo.Layer.reDraw(oTopo.ins.layerNode);
                }
                //取消创建
                _createNodeEnd(oTopo, false);
            }
        };

        //endregion
    }
})(jQuery);