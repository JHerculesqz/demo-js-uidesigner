<template>
    <div class="wrapper">
        <marvel-leaflet ref="refGis" id="refGis"></marvel-leaflet>
    </div>
</template>

<script>
    import MarvelLeaflet from "@/walle/widget/leaflet/MarvelLeaflet";
    export default {
        components: {MarvelLeaflet},
        name: 'CompGis1',
        data: function () {
            return {
                //#region const
                debug: true,
                //#endregion
                //#region gis

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
                var self = this;

                //1._getData4Gis
                self._getData4Gis(function () {
                    self._draw4Gis();
                });
            },
            _getData4Gis: function (oCallback) {
                if (this.debug) {
                    oCallback();
                }
                else {
                    //TODO:
                }
            },
            _draw4Gis: function () {
                this.$refs.refGis.init(51.505, -0.09, 13, {
                    mapUrl: "https://api.mapbox.com/styles/v1/jherculesqz/cj99csbwi2bzy2qp3mhtqcrkx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamhlcmN1bGVzcXoiLCJhIjoiY2o4anNybjZqMDZnczMybXZxaHNhMDRlMyJ9.fR2DM7aypSp8q4AxE6uL5w",
                    //mapUrl: "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}",
                    hasZoomCtrl: true,
                    export: false,
                    mess: false,
                    messTmpLine: "#fff",
                    messResLine: "#fff",
                    pm: false,
                });
            },

            //#endregion

            //#region destroy

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
    .wrapper {
        width: 100%;
        height: 100%;
    }
</style>
