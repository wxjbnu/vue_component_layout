<template>
  <div class="cda">
    <!-- :options="{group:'people'}" -->
    <div class="container"
      style="">
      <p>
        <a href="javascript:void(0);" @click="clearLayout">清除</a>
      </p>
      <draggable v-model="layList"
        @start="drag=true"
        @end="drag=false">
        <div class="div-box" style=""
          v-for="(l, index) in layList"
          :key="index"
          :class="`${divClass[l.div]} ${layIndex == index ? 'hover' : ''}`"
          @click="layIndex = index">
          <component
             v-for="(e, i) in l.com"
            :key="i"
            :is="e"></component>
        </div>
      </draggable>
    </div>

    <div class="tool-wrap layout-tool"
      style="">
      <h3>布局组件</h3>
      <ul>
        <li v-for="(e, i) in layoutList"
          :key="i"
          @click="setLayout(e)">{{e}}</li>
      </ul>
      <!-- <div>
        <button @click="goLayout(1)">去布局1</button>
      </div> -->
      {{layCompList}}
    </div>

    <div class="tool-wrap component-tool"
      style="">
      <h3>组件列表</h3>
      <ul>
        <li v-for="(e, i) in componentsList"
          :key="i"
          @click="setCom(e)">{{e}}</li>
      </ul>
      <!-- <div>
        <button @click="goLayout(1)">去布局1</button>
      </div> -->
      {{layCompList}}
    </div>

    <div class="tool-wrap detail-tool"
      style="">
      <h3>详细设置</h3>
      <p>组件名称{{comName}}</p>
      
    </div>
    
    

    
    <!-- <div class="photo-list" id="photoList">
      <div v-for="(i, index) in 3" :key="index">
        <component
          :is="'Photohandle'"
          :initImg="{}"></component>
      </div>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
// import * as utils from "./../utils"
import Vue from 'vue'
import draggable from 'vuedraggable'

export default {
  name: 'cda',
  data () {
    return {
      msg: '首页',
      loading: true,
      searchInputValue: '',
      showAsyncCom: false, // 异步组件
      layout: ``,
      drag: true,
      layIndex: 0, // 组件添加到哪个布局上
      divClass: {
        defualt: 'div-defualt',
        flex: 'div-flex',
        abs: 'div-abs',
      },
      layList: [
        {div: 'defualt', com: [

        ]}
      ],
      layoutList: [
        'defualt',
        'flex',
        'abs'
      ],
      componentsList: [
        'Photohandle',
        'Topmenu',
      ],
      comName: '', // 组件名词
      layCompList: [ // 布局

      ],
      myArray: [
        {id: 4, name: 'ww', bg: '#2aa'},
        {id: 5, name: 'ww', bg: '#22a'},
      ]
    }
  },
  components: {
    draggable
    // asyncCom: resolve => {require(['./../components/asyncCom.vue'], resolve)}
    // 'asyncCom': () => import('./../components/asyncCom')
  },
  methods: {
    // fetchPostList() {
    //   console.log(111)
    // },
    // ===============清除当前布局===============
    clearLayout() {
      this.layList = []
    },
    setCom(e) {
      if (this.layList.length > 0) {
        this.comName = e
        this.layList[this.layIndex].com.push(e)
      } else {
        alert('先新建盒子')
      }
      
    },
    setLayout(e) {
      // this.comName = e
      // this.layCompList.push(e)
      this.layList.push({
        div: e,
        com: []
      })
    },
    goLayout(i) {
      this.$router.push({
        name: 'layout',
        query: {},
        params: {id: i}
      })
    },
    loadSingle(com) {
      Vue.component(com.id, (resolve, reject) => {

      })
    },
    registerComponent() {
      let host = 'http://192.168.31.79:8000/'
      let params = [
        // {name: 'Topmenu', id: 'Topmenu', url: `${host}topmenu.js`,
        //  var: [
        //    {key: 'menuList', valModel: []}
        //  ]},
        // {name: 'Photohandle', id: 'Photohandle', url: `${host}photohandle.js`},
      ]
      this.componentsList.map((e) => {
        params.push({
          name: e,
          id: e,
          url: `${host}${e.toLowerCase()}.js`})
      })

      this.$store.dispatch('registerComponent',  params )
      .then(data => {
        resolve(data)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    },
    loadCom() {
      console.log('loadCom')
      let host = 'http://192.168.31.79:8000/'
      let components = [
        {name: 'Topmenu', id: 'Topmenu', url: `${host}topmenu.js`},
        {name: 'Photohandle', id: 'Photohandle', url: `${host}photohandle.js`},
      ]
      for(let i = 0; i < components.length; i++) {
        let co = components[i]
        console.log(co)
        // Vue.use(co.id)
        let params = {mn: co.name, url: co.url}
        Vue.component(co.id, (resolve, reject) => {
          setTimeout(() => {
            this.loading = false
          }, 1111)
          if (this.$store.state.modules[co.id]) {
            resolve(this.$store.state.modules[co.id])
            console.log('已经加载组件')
            return
          }
          this.$store.dispatch('loadScript',  params )
          .then(data => {
            resolve(data)
          }).catch((err) => {
            console.log(err)
            reject(err)
          })
        })

      }
    },
    addCom() {
      // const menu = Vue.extend({
      //   template: this.pageHtml
      // })
      // if(menu)new MyComponent().$mount('#menu')
      let menuCom = Vue.extend(e.default)
      new menuCom().$mount('#menu')
    }
  },
  watch: {
    // searchInputValue: {
    //   // 马上执行watch
    //   handler: 'fetchPostList',
    //   immediate: true
    // }
  },
  created() { // 初始化组件时候
    this.registerComponent()
  },
  mounted() {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
li{
  list-style: none;
  text-align: left;
}
div.hover {
  border: 2px solid salmon;
}
.div-box{
  min-height: 120px;
  border: 1px solid #111;
}
.div-defualt{
  display: block;
}
.div-flex{
  display: flex;
  flex-direction: row;
}
.div-abs{
  display: block;
  position: relative;
}
.container{
  margin-right: 600px;
  box-sizing: border-box;
}
.tool-wrap{
  position: fixed;
  right: 0;
  width: 200px;
  top: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  border-left: 1px solid rgb(3, 21, 77);
  box-sizing: border-box;
  &.layout-tool{
    right: 400px;
  }
  &.component-tool{
    right: 200px;
  }
  &.detail-tool{
  }
}
</style>
