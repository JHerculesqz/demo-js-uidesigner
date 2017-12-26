<template>
    <div id="app">
        <div class="header">
            <div class="logo"></div>
            <ul>
                <li>
                    <router-link :to="{name:'matrixMgr'}" exact>指标管理</router-link>
                </li>
                <li>
                    <router-link :to="{name:'preview'}" exact>预览</router-link>
                </li>
            </ul>
        </div>
        <div class="content">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        name: 'app',
        data: function () {
            return {};
        },
        mounted: function () {
            //#region custom

            //#endregion
        },
        methods: {
            //#region inner

            //#endregion
            //#region callback

            //#endregion
            //#region 3rd

            //#endregion
        },
    }
</script>

<style>
    body {
        position: fixed;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    #app {
        height: 100%;
    }

    .header {
        height: 50px;
        background-color: #181b21;
    }

    .header .logo {
        width: 150px;
        height: 100%;
        float: left;
        /*background: url("/static/demo/logo.svg") no-repeat center;*/
    }

    .header ul {
        margin: 0;
        padding: 0
    }

    .header ul li {
        float: left;
        margin-right: 15px;
        margin-top: 0;
        list-style-type: none
    }

    .header ul li a {
        line-height: 50px;
        color: #ffffff;
        font-size: 16px;
        padding: 0 10px;
        text-decoration: none;
    }

    .header ul li .active {
        color: #00a0e9;
    }

    .content {
        height: calc(100% - 50px);
        position: relative;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateX(-430px);
        opacity: 0;
    }
</style>
