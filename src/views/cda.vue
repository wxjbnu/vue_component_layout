<template>
  <div class="cda">
    <!-- :options="{group:'people'}" -->
    <div style="margin-right: 410px;border-right:1px solid #222;box-sizing: border-box;">
      <draggable v-model="layCompList"
        @start="drag=true"
        @end="drag=false">
        <div style="border: 1px solid #111;"
          v-for="(e, i) in layCompList"
          :key="i">
          <component
            :is="e"></component>
        </div>
      </draggable>
    </div>

    <div style="position: fixed;right:0;width: 200px;top:0;right: 200px;bottom:0;background: #eee;">
      <h3>组件列表</h3>
      <ul>
        <li v-for="(e, i) in componentsList"
          :key="i"
          @click="setLayout(e)">{{e}}</li>
      </ul>
      <div>
        <button @click="goLayout(1)">去布局1</button>
      </div>
      {{layCompList}}
    </div>

    <div style="position: fixed;right:0;width: 200px;top:0;bottom:0;background: #eee;">
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
    setLayout(e) {
      this.comName = e
      this.layCompList.push(e)
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border-bottom: 1px solid darkblue;
}
a {
  color: #42b983;
}
</style>
