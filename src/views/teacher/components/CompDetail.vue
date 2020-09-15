<template>
  <div class="createPost-container">
    <el-form
      ref="teacherPostForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >

          <sticky
        :z-index="10"
        :class-name="'sub-navbar '+postForm.status"
      >

        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >
          Submit
        </el-button>
      </sticky>
      

      <div class="createPost-main-container">

        <el-row>

          <el-col :span="11" class="form-field-col">

    
               <el-form-item label="Email" prop="Email">
          <el-input
            v-model="postForm.Email"
            placeholder="Email" 
            type="email"
            required
          />
        </el-form-item>
        
        </el-col>

        
          <el-col :span="11" class="form-field-col">

                <el-form-item label="First Name" prop="FirstName">
          <el-input
            v-model="postForm.FirstName"
            placeholder="First Name"

            required
          />
        </el-form-item>

        </el-col>

        </el-row>

        <el-row>
 
          <el-col :span="11" class="form-field-col">

                <el-form-item label="Last Name">
          <el-input
            v-model="postForm.LastName"
            placeholder="Last Name"
          />
        </el-form-item>

        </el-col>

          <el-col :span="11" class="form-field-col">


                <el-form-item label="Password" prop="Password">
          <el-input
            v-model="postForm.Password"
            placeholder="Password"

            type="password"

            required
          />
        </el-form-item>

        </el-col>

        </el-row>
    

        <el-row>

          <el-col :span="11" class="form-field-col">

                <el-form-item label="Confirm Password" prop="ConfirmPassword">
          <el-input
            v-model="postForm.ConfirmPassword"
            placeholder="Confirm Password"
            type="password"

            required
          />
        </el-form-item>


        </el-col>

          <el-col :span="11" class="form-field-col">

                <el-form-item label="Phone Number">
          <el-input
            v-model="postForm.PhoneNumber"
            placeholder="Phone Number"
          />
        </el-form-item>

        </el-col>

        </el-row>


        <el-row>

          <el-col :span="11" class="form-field-col">


                <el-form-item label="Notes">
          <el-input
            v-model="postForm.Notes"
            placeholder="notes"
          />
        </el-form-item>

         </el-col>


          <el-col :span="11" class="form-field-col">


                <el-form-item label="Web Page">
          <el-input
            v-model="postForm.WebPage"
            placeholder="Web Page"
          />
        </el-form-item>

        </el-col>

        </el-row>

        <el-row>

          <el-col :span="11" class="form-field-col">




                <el-form-item label="Skype ID">
          <el-input
            v-model="postForm.SkypeId"
            placeholder="Skype ID"
          />
        </el-form-item>

        </el-col>


          <el-col :span="11" class="form-field-col">


                <el-form-item label="Mobile Phone">
          <el-input
            v-model="postForm.MobilePhone"
            placeholder="Mobile Phone"
          />
        </el-form-item>
    
        </el-col>

        </el-row>


            

        

        <el-row>

                    <el-col :span="24" class="form-field-col">

         <el-form-item >

                    <el-form-item
          prop="imageURL"
          style="margin-bottom: 30px;"
        >
          <upload-image v-model="postForm.Image" />
        </el-form-item>



        </el-form-item>

        </el-col>
        </el-row>

        <el-row>

                    <el-col :span="23" class="form-field-col">

        
        <el-form-item >

          <tinymce
            v-if="tinymceActive"
            ref="editor"
            v-model="postForm.Description"
            :height="400"
          />
        </el-form-item>

        </el-col>

        </el-row>

       


      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isValidURL } from '@/utils/validate'
import { defaultData,addUpdateTeacher,getTeachersDetails } from '@/api/teacher'



import { getUsers } from '@/api/users'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import MaterialInput from '@/components/MaterialInput/index.vue'
import Sticky from '@/components/Sticky/index.vue'
import Tinymce from '@/components/Tinymce/index.vue'
import UploadImage from '@/components/UploadImage/index.vue'
import Warning from './Warning.vue'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { Form } from 'element-ui'

@Component({
  name: 'TeacherDetail',
  components: {
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown,
    MaterialInput,
    Sticky,
    Tinymce,
    UploadImage,
    Warning
  }
})

export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean

  private validateRequire = (rule: any, value: string, callback: Function) => {

    if (value === '') {
      if (rule.field === 'Email') {
        this.$message({
          message: 'Email is required',
          type: 'error'
        })
      } else {
        this.$message({
          message: rule.field + ' is required',
          type: 'error'
        })
      }
      callback(new Error(rule.field + ' is required'))
    } else {
      callback()
    }
  }

  
  private postForm = Object.assign({}, defaultData)
  private loading = false
  private rules = {
    Email: [{ validator: this.validateRequire }],
    FirstName: [{ validator: this.validateRequire }],
    Password: [{ validator: this.validateRequire }],
    ConfirmPassword: [{ validator: this.validateRequire }],
  }

  private tinymceActive = true


  get lang() {
    return AppModule.language
  }

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }
  }

  deactivated() {
    this.tinymceActive = false
  }

  activated() {
    this.tinymceActive = true
  }

  private async fetchData(id: number) {
    try {
        const { data } = await getTeachersDetails(id)
        let userObj=data.user

        if (userObj){

           this.postForm.TeacherId=data.teacherId
            this.postForm.Email=userObj.email
            this.postForm.FirstName=userObj.firstName
            this.postForm.LastName=userObj.lastName
            this.postForm.Password=""
            this.postForm.ConfirmPassword=""
            this.postForm.PhoneNumber=userObj.phoneNumber
            this.postForm.Notes=""
            this.postForm.Address=userObj.address
            this.postForm.Description=userObj.description
            this.postForm.WebPage=userObj.webPage
            this.postForm.SkypeId=userObj.skypeId
            this.postForm.MobilePhone=userObj.mobilePhone
            this.postForm.Image=userObj.profileImage



        }



    } catch (err) {
      console.error(err)
    }

  }


  private submitForm() {


    (this.$refs.teacherPostForm as Form).validate( valid => {

      if (valid) {

    
        this.loading = true
        let formdata=new FormData()
         

        if (this.isEdit) {
            formdata.append("StudentId",this.postForm.TeacherId.toString())
        }

        formdata.append("Email",this.postForm.Email?this.postForm.Email.toString():"")
        formdata.append("FirstName",this.postForm.FirstName?this.postForm.FirstName.toString():"")
        formdata.append("LastName",this.postForm.LastName?this.postForm.LastName.toString():"")
        formdata.append("Password",this.postForm.Password?this.postForm.Password.toString():"")
        formdata.append("ConfirmPassword",this.postForm.ConfirmPassword?this.postForm.ConfirmPassword.toString():"")
        formdata.append("PhoneNumber",this.postForm.PhoneNumber?this.postForm.PhoneNumber.toString():"")
        formdata.append("Notes",this.postForm.Notes?this.postForm.Notes.toString() :"")
        formdata.append("Address",this.postForm.Address?this.postForm.Address.toString():"")
        formdata.append("Description",this.postForm.Description?this.postForm.Description.toString():"")
        formdata.append("WebPage",this.postForm.WebPage? this.postForm.WebPage.toString():"")
        formdata.append("SkypeId",this.postForm.SkypeId?this.postForm.SkypeId.toString():"")
        formdata.append("MobilePhone",this.postForm.MobilePhone?this.postForm.MobilePhone.toString():"")
        formdata.append("Image",this.postForm.Image?this.postForm.Image.toString():"")



        if (this.isEdit) {

            addUpdateTeacher(formdata).then((data)=>{


                  this.$notify({
                  title: 'Success',
                  dangerouslyUseHTMLString: true,
                  message: "Updated succesfully",
                  type: 'success'
                })

            })
          
        } else {

            addUpdateTeacher(formdata).then((data)=>{

                  this.$notify({
                  title: 'Success',
                  dangerouslyUseHTMLString: true,
                  message: "Added succesfully",
                  type: 'success'
                })


            })


        }



        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
      } else {
        console.error('Submit Error!')
        return false
      }
    })
  }


}
</script>

<style lang="scss">
.article-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>

<style lang="scss" scoped>
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
.form-field-col{
    margin-left:2px;
}


</style>
