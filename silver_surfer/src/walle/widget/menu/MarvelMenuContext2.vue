<template>
  <div class="contextMenuWrapper_text"
       v-bind:class="{ dpn: !show }"
       v-bind:style="{ top: top + 'px', left: left + 'px'}"
       v-click-outside="hideSubMenu">
    <div v-for="item in items"
         class="contextMenuItem"
         v-bind:title="item.label"
         v-on:click="onMenuItemClick(item.label)">{{item.label}}</div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelMenuContext2',
    props: ["items"],
    data: function() {
        return {
          show: false,
          top: 0,
          left: 0,
        }
    },
    methods: {
      showSubMenu: function(iX, iY){
        //1.show subMenu
        this.show = true;
        this.top = iY;
        this.left = iX;
      },
      hideSubMenu: function(){
        this.show = false;
      },
      onMenuItemClick: function(strMenuItemLabel){
        this.$emit("onMenuItemClick", strMenuItemLabel);
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

  .contextMenuWrapper_text{
    position: fixed;
    overflow: hidden;
    background-color: #FFFFFF;
    border-radius: 4px;
    padding: 2px 0px;
    border: 1px solid #cccccc;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.15);
    z-index: 1000;
  }
  .contextMenuWrapper_text .contextMenuItem{
    height: 32px;
    text-align: left;
    line-height: 32px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    padding: 0 6px;
  }
  .contextMenuWrapper_text .contextMenuItem:hover{
    background-color: #f0f0f0;
    color: #3399ff;
  }

  /*region dark theme*/

  .dark .contextMenuWrapper_text{
    background-color: rgba(0,0,0,0.8);
    border: 1px solid #3dcca6;
    box-shadow: none;
  }
  .dark .contextMenuWrapper_text .contextMenuItem{
    color: #8b90b3;
  }
  .dark .contextMenuWrapper_text .contextMenuItem:hover{
    background-color: #1d3b60;
    color: #3dcca6;
  }

  /*endregion*/
</style>
