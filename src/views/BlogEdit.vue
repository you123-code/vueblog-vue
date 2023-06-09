<template>
  <div>
    <headers></headers>
    <div class="m-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="desription">
          <el-input type="textarea" v-model="ruleForm.desription"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import headers from '../components/Header'
export default {
  name: 'BlogEdit',
  components: {headers},
  data() {
    return {
      ruleForm: {
        id: '',
        userId: '',
        title: '',
        desription: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        desription: [
          { required: true, message: '请选择摘要', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入博客内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          const _this = this
          _this.$axios.post('/edit',this.ruleForm,{
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then(res => {
            console.log(res)
            _this.$alert('添加博客成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push('/blogs')
              }
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    console.log(blogId)
    const  _this = this
    if(blogId) {
      this.$axios.get('/details?id=' + blogId).then(res => {
        const blog = res.data.data
        _this.ruleForm.id = blog.id
        _this.ruleForm.userId = blog.userId
        _this.ruleForm.title = blog.title
        _this.ruleForm.desription = blog.desription
        _this.ruleForm.content = blog.content
      })
    }
  }
}
</script>

<style scoped>

</style>
