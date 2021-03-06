<template>
  <div class="toolbarWrapper" v-click-outside="hideSubMenu">
      <div class="toolbarItem" v-for="item in items"
           v-bind:key="item.id" v-bind:class="[{dpn: item.visible === false},{disable: item.disable === true}]">
        <div class="toolbarItemLabel" v-on:click="onToolbarItemClick($event, item)">
          <div class="toolbarIcon" v-bind:class="item.icon"></div>
          <div class="toolbarName">{{item.label}}</div>
        </div>
        <div class="toolbarCustomSubPanel" v-if="item.hasCustomSubPanel" v-bind:class="{dpn: item.label != selectItem.label}">
          <slot :name="item.label"></slot>
        </div>
        <div class="toolbarSubMenu" v-if="item.subMenu != undefined" v-bind:class="{dpn: item.label != selectItem.label}">
          <div class="toolbarSubMenuItem"  v-for="subItems in item.subMenu"
               v-on:click="onToolbarSubItemClick($event, subItems, item)"
               v-bind:key="subItems.id"
               v-bind:class="[{dpn: subItems.visible === false},{disable: subItems.disable === true}]">
            <div class="iconArea" v-bind:class="subItems.icon"></div>
            <div class="textArea">{{subItems.label}}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelToolbar',
    props: ['items'],
    data: function(){
      return {
        selectItem:{label:"",icon:""}
      };
    },
    methods: {
      onToolbarItemClick: function(evt, oItem){
        this.selectItem = oItem;
        this.$emit("onToolbarItemClick", oItem);
      },
      onToolbarSubItemClick:function(evt, oItem, oParent){
        this.hideSubMenu();
        this.$emit("onToolbarSubItemClick", oItem, oParent);
      },
      hideSubMenu:function(){
        this.selectItem = {label:"",icon:""};
      }
    },
    directives:{
      'click-outside': {
        bind: function (el, binding, vnode) {
          el.event = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
              vnode.context[binding.expression](event);
            }
          };
          document.body.addEventListener('click', el.event);
        },
        unbind: function (el) {
          document.body.removeEventListener('click', el.event);
        }
      }
    }
  }

</script>

<style scoped>
.dpn{
  display: none;
}
.toolbarWrapper{
  width: 100%;
  height: 100%;
  padding: 0 10px;
}
.toolbarWrapper .toolbarItem{
  float: left;
  padding: 0 10px;
  height:30px;
  border: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.toolbarWrapper .toolbarItem .toolbarItemLabel{
  height:30px;
}
.toolbarWrapper .toolbarItem .toolbarItemLabel .toolbarIcon{
  height:100%;
  width: 16px;
  margin-right: 10px;
  line-height: 28px;
  text-align: center;
  font-size: 16px;
  color: #3399ff;
  float: left;
}
.toolbarWrapper .toolbarItem .toolbarItemLabel .toolbarName{
  height:100%;
  line-height: 28px;
  text-align: center;
  font-size: 14px;
  color: #666;
  float: left;
}
.toolbarWrapper .toolbarItem .toolbarCustomSubPanel{
  position: absolute;
  top: 30px;
  left: 0;
  background-color: #ffffff;
  min-width: 100%;
  box-shadow: 2px 3px 4px rgba(0,0,0,0.25);
  padding: 10px;
  box-sizing: border-box;
}
.toolbarWrapper .toolbarItem .toolbarSubMenu{
  position: absolute;
  top: 30px;
  left: 0;
  background-color: #ffffff;
  min-width: 100%;
  box-shadow: 2px 3px 4px rgba(0,0,0,0.25);
}
.toolbarWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem{
  height: 24px;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;
}
.toolbarWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem:hover .textArea{
  color: #3399ff;
}
.toolbarWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem .iconArea{
  height:24px;
  width: 16px;
  margin-right: 10px;
  line-height: 24px;
  text-align: center;
  font-size: 16px;
  color: #3399ff;
  display: inline-block;
}
.toolbarWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem .textArea{
  height:24px;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  color: #666;
  display: inline-block;
}
.toolbarWrapper .toolbarItem .toolbarSubMenu .disable{
  pointer-events: none;
}
.toolbarWrapper .toolbarItem .toolbarSubMenu .disable .iconArea{
  color: #999;
}
.toolbarWrapper .toolbarItem .toolbarSubMenu .disable .textArea{
  color: #999;
}
.toolbarWrapper .toolbarItem:hover{
  border: 1px solid #3399ff;
  background-color: rgba(51, 153, 255, 0.2);
}
.toolbarWrapper .disable{
  pointer-events: none;
}
.toolbarWrapper .disable .toolbarItemLabel .toolbarIcon{
  color: #999;
}
.toolbarWrapper .disable .toolbarItemLabel .toolbarName{
  color: #999;
}


/*region dark theme*/
.dark .toolbarItem .toolbarItemLabel .toolbarIcon{
  color: #3dcca6;
}
.dark .toolbarItem .toolbarItemLabel .toolbarName{
  color: #ffffff;
}
.dark .toolbarItem:hover{
  border: 1px solid #3dcca6;
  background-color: rgba(61, 204, 166, 0.2);
}
.toolbarWrapper .toolbarItem .toolbarCustomSubPanel{
  background-color: #000000;
  box-shadow: 2px 3px 4px rgba(0,0,0,0.25);
}
.dark .toolbarItem .toolbarSubMenu{
  background-color: #000000;
  box-shadow: 2px 3px 4px rgba(0,0,0,0.25);
}
.dark .toolbarItem .toolbarSubMenu .toolbarSubMenuItem{
}
.dark .toolbarItem .toolbarSubMenu .toolbarSubMenuItem:hover .textArea{
  color: #3dcca6;
}
.dark .toolbarItem .toolbarSubMenu .toolbarSubMenuItem .iconArea{
  color: #3dcca6;
}
.dark .toolbarItem .toolbarSubMenu .toolbarSubMenuItem .textArea{
  color: #fff;
}
.dark .toolbarWrapper .toolbarItem .toolbarSubMenu .disable{
  pointer-events: none;
}
.dark .toolbarWrapper .toolbarItem .toolbarSubMenu .disable .iconArea{
  color: #999;
}
.dark .toolbarWrapper .toolbarItem .toolbarSubMenu .disable .textArea{
  color: #999;
}
.dark .disable{
  pointer-events: none;
}
.dark .disable .toolbarItemLabel .toolbarIcon{
  color: #999;
}
.dark .disable .toolbarItemLabel .toolbarName{
  color: #999;
}

/*endregion*/
</style>
