<template>
  <div>
    <headers></headers>
    <div class="mblog">
      <h2>{{blog.title}}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name: 'BlogAdd',params: {blogId: blog.id}}">
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Headers from "../components/Header";
import "github-markdown-css"
export default {
  name: 'BlogDetail',
  components: {Headers},
  data() {
    return {
      blog: {
        id: '',
        title: '默认',
        content: '内容'
      },
      ownBlog: false
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    const _this = this
    this.$axios.get('/details?id=' + blogId).then(res => {
      const blog = res.data.data
      _this.blog.id = blog.id
      _this.blog.userId = blog.userId
      _this.blog.title = blog.title
      _this.blog.desription = blog.desription
      //md渲染
      var markdownIt = require('markdown-it')
      var md = new markdownIt()
      var result = md.render(blog.content)
      _this.blog.content = result
      _this.ownBlog = (blog.userId === this.$store.getters.getUser.id)
    })
  }
}
</script>

<style scoped>
  .mblog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
  }
</style>
