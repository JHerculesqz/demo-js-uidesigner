<template>
  <ul id="demo" class="treeWrapper">
    <div v-for="(item, index) in treeNodes">
      <marvel-z-tree-item v-bind:model="item"
                          v-bind:key="item.key"
                          v-bind:treeItemOptions="treeItemOptions"
                          v-on:onCheckboxClick="onCheckboxClick"
                          v-on:onTreeNodeClick="onTreeNodeClick"></marvel-z-tree-item>
    </div>
  </ul>
</template>

<script>
  import MarvelZTreeItem from "./MarvelZTreeItem";

  export default {
    components: {
      MarvelZTreeItem
    },
    name: 'MarvelZTree',
    props: ["treeData", "options"],
    data: function () {
      return {
        //region zTreeItem
        treeNodes: [],
        treeItemOptions: {},
        //endregion
        //region inner
        treeMap: {}
        //endregion
      }
    },
    created: function () {
      this._handleOptions();
      this._handleTreeData();
    },
    methods: {
      //region inner
      _handleOptions() {
        Object.assign(this.treeItemOptions, {
          hasCheckbox: false,
          hasRadiobox: false,
          hasActiveStyle: false
        }, this.options);
      },
      _handleTreeData() {
        this.treeNodes = this.treeData.slice(0);
        this._setKey(this.treeNodes, "1");
      },
      _setKey(oTreeData, parentKey) {
        var self = this;
        oTreeData.forEach(function (oTreeNode, index) {
          oTreeNode.key = parentKey + "-" + index;
          //save
          self.treeMap[oTreeNode.key] = oTreeNode;

          if (oTreeNode.children && oTreeNode.children.length) {
            self._setKey(oTreeNode.children, oTreeNode.key);
          }
        });
      },
      //endregion
      //region callback
      onCheckboxClick: function (oTreeNode) {
        this._handle4TreeNodeClick(oTreeNode);
        this.$emit("onCheckboxClick", oTreeNode);
      },
      _handle4TreeNodeClick(oTreeNode) {
        //1.处理parent的check状态
        this._handleParent4Checkbox(oTreeNode);
        //2.处理children的check状态
        this._handleChild4Checkbox(oTreeNode);
      },
      _getParentKey(strChildKey) {
        var arr = strChildKey.split("-");
        arr.pop();
        if (arr.length == 1) {
          return "";
        }
        return arr.join("-");
      },
      _handleParent4Checkbox(oTreeNode) {
        var strParentKey = this._getParentKey(oTreeNode.key);
        if (strParentKey == "") {
          return;
        }
        var oParentNode = this.treeMap[strParentKey];
        if (oTreeNode.check) {
          oParentNode.check = true;
        }
        else {
          oParentNode.check = this._hasCheckedChild(oParentNode);
        }
        this._handleParent4Checkbox(oParentNode);
      },
      _hasCheckedChild(oParentNode) {
        if (oParentNode.children && oParentNode.children.length) {
          for (let i = 0, len = oParentNode.children.length; i < len; i++) {
            if (oParentNode.children[i].check) {
              return true;
            }
          }
        }
        return false;
      },
      _handleChild4Checkbox(oTreeNode) {
        if (oTreeNode.children && oTreeNode.children.length) {
          var self = this;
          oTreeNode.children.forEach(function (oChildNode, index) {
            oChildNode.check = oTreeNode.check;
            self._handleChild4Checkbox(oChildNode);
          });
        }
      },
      onTreeNodeClick: function (oTreeNode) {
        //1.setActiveStyle
        this._handle4ActiveStyle(oTreeNode);
        //2.emit
        this.$emit("onTreeNodeClick", oTreeNode);
      },
      _handle4ActiveStyle(oTreeNode) {
        if (this.treeItemOptions.hasActiveStyle) {
          for (let k in this.treeMap) {
            let val = this.treeMap[k];
            if (val.key !== oTreeNode.key) {
              val.active = false;
            }
          }
        }
      },
      //endregion
      //region 3rd
      getCheckNodes() {
        var arrRes = [];
        for (let k in this.treeMap) {
          if (this.treeMap[k].check === true) {
            arrRes.push(this.treeMap[k]);
          }
        }
        return arrRes;
      },
      getCheckLeafNodes() {
        var arrRes = [];
        for (let k in this.treeMap) {
          if (this.treeMap[k].check === true) {
            if (!this.treeMap[k].hasOwnProperty("children")) {
              arrRes.push(this.treeMap[k]);
            }
          }
        }
        return arrRes;
      },
      getActiveNodes() {
        let activeNodes = [];
        if (this.treeItemOptions.hasActiveStyle) {
          for (let k in this.treeMap) {
            let val = this.treeMap[k];
            if (val.active === true) {
              activeNodes.push(val);
            }
          }
        }
        return activeNodes;
      }
      //endregion
    },
    watch: {
      treeData: function (oNewTreeData, oOldTreeData) {
        this._handleTreeData();
      },
      options: function (oNewOptions, oOldOptions) {
        this._handleOptions();
      }
    }
  }
</script>

<style scoped>
  .treeWrapper {
    width: 100%;
    height: 100%;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 0;
  }

  .dark {
    border: 1px solid #04032a;
  }
</style>
