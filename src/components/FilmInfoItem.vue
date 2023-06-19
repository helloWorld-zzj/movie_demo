 <template>
    <div class="outerBox">
       <div class="picArea"  @click="jumpToDetail(filminfo.filmId)">
        <img :src="filminfo.poster" alt="pic">
       </div>
       <div class="infoArea" @click="jumpToDetail(filminfo.filmId)">
            <!-- 头部信息区 -->
            <div class="headerLine">
                <span class="title">{{ filminfo.name }}</span>
                <span class="dimension">{{ filminfo.filmType.name }}</span>
            </div>
            <!-- 评分信息区 -->
            <div class="scoreLine fontOne">观众评分
                <span v-if="filminfo.grade">{{ filminfo.grade }}</span>
                <span v-else>暂无评分</span>
            </div>
            <!-- 主演区 -->
             <div class="actorLine fontOne">主演：{{ filminfo.director }}</div>

             <!-- 底部区 -->
            <div class="footLine fontOne">{{ filminfo.nation }} | {{ filminfo.runtime }}分钟</div>
        </div>

        <div class="buyArea">
            <span @mousedown="buyTicketClickDown" @mouseup="buyTicketClickUp" @mouseleave="buyTicketClickUp" :class="active?'active':''">购票</span>
        </div>
    <!--
        <div class="headerLine">
            <span class="title">{{ filminfo.name }}</span>
            <span class="dimension">{{ filminfo.filmType.name }}</span>
        </div>
        <div class="scoreLine"></div>
        <div class="actorLine"></div>
        <div class="footLine"></div>
 </div> -->

    </div>
</template>

<script>
export default {
  props: {
    filminfo: {
      type: Object
    }
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    buyTicketClickDown () {
      this.active = true
    },
    buyTicketClickUp () {
      this.active = false
    },
    jumpToDetail (id) {
      this.$router.push({
        name: 'FilmDetail',
        params: {
          filmid: id
        }
      })
    }
  }
//   mounted () {
//     // console.log(this.filminfo)
//   }
}
</script>

<style lang="scss" scoped>
    $gradeColor:#ffb232;
    $fontGrayColor:#797D82;
    $orangeColor:#ff5f16;
    $lineGrayColor:#EDEDED;

    .fontOne{
        font-size: 13px;
        color: $fontGrayColor;
    }

    .active{
            background-color: $orangeColor;
            color: white !important;

       }
    // 下边线
    .outerBox{
        height: 100px;

        // border-bottom: 1px solid $lineGrayColor;
        padding: 15px 0px;
        // padding-bottom: 0px;

        margin: 0px 15px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        // background-color: aqua;
         // 图片展示区
         .picArea{
            cursor: pointer;
            width: 70px;
            min-width: 70px;
            // background-color: antiquewhite;

            display: flex;
            align-items: center;
            img{
                width: 100%;
            }
            overflow: hidden;

        }

        // 信息展示区
        .infoArea{
            cursor: pointer;
            flex-grow: 1;
            // background-color: aquamarine;
            overflow: hidden;

            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            padding: 5px;
            .headerLine{
                // height: 20px;
                // background-color: red;
                display: flex;
                flex-direction: row;
                align-items: baseline;
                .title{

                    font-size: 16px;
                    max-width: 60%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    // background-color: white;
                }
                .dimension{

                    font-size: 10px;
                    margin-left: 5px;

                    height: 14px;
                    line-height: 14px;
                    padding: 0 2px;
                    background-color: #d2d6dc;
                    border-radius: 2px;
                    color: #fff;

                }
            }

            //评分区
            .scoreLine{
                span{
                     color: $gradeColor;
                }
            }
            // 主演区
             .actorLine{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                line-height: 16px;
             }
          }
         // 购票区域
         .buyArea{
            width: 50px;
            min-width: 50px;
            // background-color: antiquewhite;

            display: flex;
            flex-direction: column;
            justify-content: center;

            span{
                cursor: pointer;

                display: block;

                width: 50px;
                height: 25px;
                border: 1px solid $orangeColor;
                color: $orangeColor;

                border-radius: 4px;

                line-height: 25px;
                text-align: center;

                font-size: 13px;
            }
        }
    }
</style>

<!--
<style lang="scss" scoped>
    .outerBox{
        height: 100px;

        padding: 15px;
        padding-bottom: 0px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        background-color: aqua;

        // 图片展示区
        .picArea{
            width: 90px;
            min-width: 90px;
            background-color: antiquewhite;

            display: flex;
            align-items: center;
            img{
                width: 100%;
            }
            overflow: hidden;
        }

        //信息区域
        .infoArea{
            // width: 60%;
            flex-grow: 1;
            max-width: 60%;
            background-color: aquamarine;

            display: flex;
            flex-direction: column;

            padding: 5px;
            .headerLine{
                display: flex;
                flex-direction: row;
                align-items: baseline;
                .title{
                    display: block;

                    font-size: 16px;
                    max-width: 60%;

                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                }
                .dimension{
                    font-size: 10px;
                    margin-left: 5px;

                    background-color: #d2d6dc;
                    border-radius: 2px;
                    color: #fff;
                }
            }

        }
        // 购票区域
        .buyArea{
            width: 5rem;
            min-width: 50px;
            max-width: 120px;
            background-color: antiquewhite;
        }
    }
</style> -->
