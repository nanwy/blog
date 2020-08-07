<template>
  <div class="catalogs">
    <div class="title" v-for="(item,index) in catalogs" :key="index">
      <div @click.stop="scroll(item.id,item.index)" :class="`d${item.deep}`">
        <div
          class="tree_item"
          :class="{'active':activeIndex == item.index}"
        >{{item.tag + item.title}}</div>
        <catalog :catalogs="item.children" :activeIndex="activeIndex"></catalog>
      </div>
    </div>
  </div>
</template>

<script>
if (process.browser) {
  // 在这里根据环境引入wow.js
  var { WOW } = require('wowjs')
  var scrollTo = require('../../utils/scroll.js').scrollTo
}
export default {
  name: 'catalog',
  props: {
    catalogs: {
      type: Array,
      defualt: [],
    },
    titleTop: {
      type: Array,
      defualt: [],
    },
    activeIndex: {
      typr: Number,
      defualt: -1,
    },
  },
  methods: {
    scroll(id, index) {
      let top = document.getElementById(id).getBoundingClientRect().top
      // this.activeIndex = index + 1
      top += document.body.scrollTop || document.documentElement.scrollTop
      console.log('top: ', top, document.documentElement.scrollTop, id)

      scrollTo(document.body, document.documentElement, top)
    },
  },
}
</script>

<style lang='scss' scoped>
@for $i from 1 through 6 {
  .d#{$i} {
    text-indent: (10px * $i);
  }
}
.catalogs {
  & .tree_item {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    margin: 5px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  .active {
    background-color: #ef5b9c;
    color: #feeeed;
    border-left: 2px solid #f69c9f;
  }
  & .tree_item:hover {
    background-color: #ef5b9c;
    color: #feeeed;
  }
}
</style>