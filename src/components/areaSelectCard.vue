<template>
    <div class="outer">
        <!-- 导航栏 -->
        <van-nav-bar title="影院" :fixed="true">
            <template #left>
                <div class="cityBox" @click="jumpToCity">
                    <div class="text">{{ $store.state.cityName }}</div>
                    <img src="@/../public/img/arrow.svg" alt="arrow">
                </div>
            </template>
            <template #right>
                <van-icon name="search" size="18" @click="search"/>
            </template>
        </van-nav-bar>
        <!-- 地区选择 -->
        <div class="selCard">
                <van-dropdown-menu>
                    <van-dropdown-item :title="curArea" ref="item" class="dropItem">
                        <div class="areaList">
                            <div class="areaBox" :key="'全城'" @click="selectClick('全城')">
                                <div :class="curArea === '全城'?'active':''">全城</div>
                            </div>
                            <div v-for="item in area" :key="item" class="areaBox" @click="selectClick(item)">
                                <div :class="curArea === item?'active':''">{{ item }}</div>
                            </div>
                            <!-- <h1 @click="selectClick">点我</h1> -->
                        </div>
                    </van-dropdown-item>
                    <van-dropdown-item v-model="value2" :options="option2" />
                    <van-dropdown-item v-model="value3" :options="option3" />
                </van-dropdown-menu>
        </div>
        <!-- <div>{{ value1 }}</div> -->
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  data () {
    return {
      curArea: '全城'
    }
  },
  methods: {
    // 跳转至搜索界面
    search () {
      this.$router.push({
        path: '/cinema/search'
      })
    },
    selectClick (name) {
      this.$refs.item.toggle()
      this.curArea = name

      this.$emit('child-click', name)
    },
    jumpToCity () {
      this.$router.push({
        name: 'CitySelect'
      })
    }
  },
  props: {
    area: {
      type: Array,
      defalut: ['暂无地区']
    }
  },
  // 初始化下拉菜单
  setup () {
    // const item = ref(null)
    const value2 = ref(0)
    const value3 = ref(0)
    const option2 = [
      { text: 'App订票', value: 0 },
      { text: '前台兑换', value: 1 }
    ]
    const option3 = [
      { text: '最近去过', value: 0 },
      { text: '离我最近', value: 1 }
    ]
    // const selectCick = () => {
    //   item.value.toggle()
    // }
    const themeVars = reactive({
      dropdownMenuTitleActiveTextColor: '#797882'
    })

    return {
      value2,
      value3,
      option2,
      option3,
      themeVars
    }
  }
}
</script>

<style lang="scss" scoped>
$borderGrayColor: #E8EAED;
$fontGrayColor: #797882;
$orangeColor:#ff5f16;

.outer{
    position: fixed;
    width: 100%;
    height: 96px;
    // background-color: red;
    z-index:2;

    // overflow: hidden;

    .cityBox{
        width: 80px;
        height: 30px;
        // background-color: red;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .text{
            font-size: 14px;
            // background-color: #797882;
            height: 16px;
            line-height: 16px;
            text-align: center;
            width: 50px;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        img{
            margin-left: 4px;
            width: 8px;
        }
    }
    .selCard{
        position: fixed;
        width: 100%;
        height:50px;
        // background-color: red;
        // z-index: 6;
        top:44px;
        .areaList{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            // width: 100%;
            .areaBox{
                width: 25%;
                height: 45px;
                // background-color: red;

                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                div{
                    height: 30px;
                    width: 90%;
                    border: 1px solid $borderGrayColor;

                    line-height: 30px;
                    text-align: center;

                    font-size: 12px;
                    border-radius: 4px;
                    color: $fontGrayColor;
                }

                .active{
                    color: $orangeColor;
                    border: 1px solid $orangeColor;
                }
            }
        }
    }
}
</style>
