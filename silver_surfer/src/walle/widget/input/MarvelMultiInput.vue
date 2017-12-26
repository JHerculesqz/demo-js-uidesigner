<template>
  <div class="inputWrapper" v-bind:class="[status, size]"
       v-bind:style="{height: height + 'px'}">
    <textarea :placeholder="placeHolder"
              v-model="inputMsg"
              @input="onInput"></textarea>
  </div>
</template>

<script>
  import _ from "lodash"

  export default {
    name: 'MarvelMultiInput',
    props: ["status", "placeHolder", "size", "height"],
    data: function () {
      return {
        inputMsg: ""
      }
    },
    methods: {
      setInputMsg: function (strInputMsg) {
        this.inputMsg = strInputMsg;
      },
      getInputMsg: function () {
        return this.inputMsg;
      },
      onInput: _.debounce(function (event) {
        this.$emit("onInput", this.inputMsg);
      }, 1000)
    }
  }
</script>

<style scoped>
  .inputWrapper {
    width: 100%;
    height: 100%;
  }

  .inputWrapper textarea {
    padding: 0 10px;
    height: 100%;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    background-color: transparent;
  }

  .inputWrapper textarea:hover, .inputWrapper textarea:focus {
    border: 1px solid #3399ff;
  }

  .error textarea {
    border: 1px solid #ff4c4c !important;
  }

  .disable textarea {
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .mini textarea {
    height: 32px;
    line-height: 22px;
    font-size: 12px;
  }

  /*region dark theme*/
  .dark textarea {
    border: 1px solid #8b90b3;
    font-size: 14px;
    color: #8b90b3;
  }

  .dark textarea:hover, .dark textarea:focus {
    border: 1px solid #3dcca6;
    box-shadow: none;
  }

  /*endregion*/

</style>
