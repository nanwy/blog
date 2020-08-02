<template>
  <div>
    <div class="markdown-body" v-html="content"></div>
  </div>
</template>

<script>
import marked from 'marked'
// import hljs from "highlight.js";
import 'highlight.js/styles/github.css'
import * as hljs from 'highlight.js/lib/highlight'
import * as javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
import * as css from 'highlight.js/lib/languages/css'
// hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage('css', css)
export default {
  props: ['md'],
  data() {
    return {
      content: '',
    }
  },
  created() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight(code) {
        return hljs.highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    })
    this.initMarked()
  },
  methods: {
    initMarked() {
      var rendererMD = new marked.Renderer()
      rendererMD.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
        return (
          '<h' +
          level +
          '><a name="' +
          escapedText +
          '" class="anchor" href="#' +
          escapedText +
          '"><span class="header-link"></span></a>' +
          text +
          '</h' +
          level +
          '>'
        )
      }
      marked.setOptions({
        renderer: rendererMD,
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight(code) {
          return hljs.highlightAuto(code).value
        },
      })
      // console.log('this.content: ', this.md)
      this.content = marked(this.md)
    },
  },
  watch: {},
  computed: {},
}
</script>

<style scoped>
.markdown-body {
  text-align: left;
}
.markdown-body img {
  width: 50%;
  height: 50%;
}
</style>