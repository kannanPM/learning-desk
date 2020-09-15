<template>
  <div class="app-container">

    <!--    
    <el-button
      type="primary"
      @click="handleCreate"
    >
     New
    </el-button>
    -->

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top:30px;"
    >
      <el-table-column
        width="80"
        align="center"
        label="ID"
      >
        <template slot-scope="{row}">
          <span>{{ row.teacherId }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="First Name"
      >
        <template slot-scope="{row}">
          <span v-if="row.user">{{ row.user.firstName }}</span>
        </template>
      </el-table-column>

            <el-table-column
        align="center"
        label="Last Name"
      >
        <template slot-scope="{row}">

          <span v-if="row.user">{{ row.user.lastName }}</span>
        </template>
      </el-table-column>

                  <el-table-column
        align="center"
        label="Address"
      >
        <template slot-scope="{row}">

          <span v-if="row.user">{{ row.user.address }}</span>
        </template>
      </el-table-column>


      <el-table-column
        align="center"
        label="Description"
      >
        <template slot-scope="{row}">

            <span v-if="row.user">{{ row.user.description }}</span>
        </template>
      </el-table-column>


       <el-table-column
        align="center"
        label="Web Page"
      >
        <template slot-scope="{row}">

            <span v-if="row.user">{{ row.user.webPage }}</span>
        </template>
      </el-table-column>


             <el-table-column
        align="center"
        label="Skype Id"
      >
        <template slot-scope="{row}">

            <span v-if="row.user">{{ row.user.skypeId }}</span>
        </template>
      </el-table-column>

             <el-table-column
        align="center"
        label="Mobile"
      >
        <template slot-scope="{row}">

            <span v-if="row.user">{{ row.user.mobilePhone }}</span>
        </template>
      </el-table-column>

              <el-table-column
        align="center"
        label="Email"
      >
        <template slot-scope="{row}">
            <span v-if="row.user">{{ row.user.email }}</span>
        </template>
      </el-table-column>
              <el-table-column
        align="center"
        label="Phone number"
      >
        <template slot-scope="{row}">
            <span v-if="row.user">{{ row.user.phoneNumber }}</span>
        </template>
      </el-table-column>

 

      <el-table-column
        align="center"
        label="Actions"
        width="300"
      >
        <template slot-scope="{row}">

                  <router-link
            :to="'/teacher/edit/'+row.teacherId"
            class="link-type edit-nav-btn"
          >
            <span>Edit</span>
          </router-link>


        <!--
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(row)"
          >
            {{ $t('permission.editPermission') }}
          </el-button>
        -->

        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />



    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType==='edit'?'Edit':'New'"
    >
      <el-form
        :model="dataObj"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="Email">
          <el-input
            v-model="dataObj.Email"
            placeholder="Email"
          />
        </el-form-item>

                <el-form-item label="First Name">
          <el-input
            v-model="dataObj.FirstName"
            placeholder="First Name"
          />
        </el-form-item>

                <el-form-item label="Last Name">
          <el-input
            v-model="dataObj.LastName"
            placeholder="Last Name"
          />
        </el-form-item>

                <el-form-item label="Password">
          <el-input
            v-model="dataObj.Password"
            placeholder="Password"

            type="password"
          />
        </el-form-item>

                <el-form-item label="Confirm Password">
          <el-input
            v-model="dataObj.ConfirmPassword"
            placeholder="Confirm Password"
            type="password"
          />
        </el-form-item>



                <el-form-item label="Phone Number">
          <el-input
            v-model="dataObj.PhoneNumber"
            placeholder="Phone Number"
          />
        </el-form-item>

                <el-form-item label="Notes">
          <el-input
            v-model="dataObj.Notes"
            placeholder="notes"
          />
        </el-form-item>
                <el-form-item label="Web Page">
          <el-input
            v-model="dataObj.WebPage"
            placeholder="Web Page"
          />
        </el-form-item>

                <el-form-item label="Skype ID">
          <el-input
            v-model="dataObj.SkypeId"
            placeholder="Skype ID"
          />
        </el-form-item>

                <el-form-item label="Mobile Phone">
          <el-input
            v-model="dataObj.MobilePhone"
            placeholder="Mobile Phone"
          />
        </el-form-item>




         <el-form-item label="Image">

       <el-upload
          :data="dataObj"
          :multiple="false"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          class="image-uploader"
          drag
          action="https://httpbin.org/post"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            Upload Image
          </div>
        </el-upload>

        </el-form-item>


        <el-form-item label="Address">
          <el-input
            v-model="dataObj.Address"
            type="textarea"
          />
        </el-form-item>



        <el-form-item label="Description">
          <el-input
            v-model="dataObj.Description"
            type="textarea"
          />
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button
          type="danger"
          @click="dialogVisible=false"
        >
          {{ $t('permission.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="confirmAddUpdate"
        >
          {{ $t('permission.confirm') }}
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { searchTeachers,addUpdateTeacher } from '@/api/teacher'

import { IArticleData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { cloneDeep } from 'lodash'
import UploadImage from '@/components/UploadImage/index.vue'

@Component({
  name: 'TeacherList',
  components: {
    Pagination,
        UploadImage,

  }
})
export default class extends Vue {
  
  private dataObj = {
    "TeacherId": 0,
    "Email":"test@gmail.com",
    "FirstName":"Kannan",
    "LastName":"Pichai",
    "Password":"test@123",
    "ConfirmPassword":"test@123",
    "PhoneNumber": 9023902323,
    "Notes": "",
    "Address":"",
    "Description":"",
    "WebPage":"",
    "SkypeId": "",
    "MobilePhone": "",
    "Image":"",
  }


  private total = 0
  private list: IArticleData[] = []
  private listLoading = true
  private dialogVisible = false
  private dialogType = 'new'
  private activeCats = []
  private file=""
  private listQuery = {
    "page":0,
    "query": "",
  }

  created() {
    this.getList()
  }


  private handleCreate() {
    this.dataObj = {
    "TeacherId":0,
    "Email":"test@gmail.com",
    "FirstName":"Kannan",
    "LastName":"Pichai",
    "Password":"test@123",
    "ConfirmPassword":"test@123",
    "PhoneNumber": 9023902323,
    "Notes": "",
    "Address":"",
    "Description":"",
    "WebPage":"",
    "SkypeId": "",
    "MobilePhone": "",
    "Image":"",

  }


    this.dialogType = 'new'
    this.dialogVisible = true
  }
  


  private handleImageSuccess(res: any) {
    this.dataObj.Image=res.files.file

  }


  private handleEdit(scope: any) {
    this.dialogType = 'edit'
    this.dialogVisible = true


    let userObj=scope.user

    if (userObj){

        this.dataObj = {
        "TeacherId": scope.teacherId,
        "Email": userObj.email,
        "FirstName": userObj.firstName,
        "LastName": userObj.lastName,
        "Password":"",
        "ConfirmPassword":"",
        "PhoneNumber": userObj.phoneNumber,
        "Notes": "",
        "Address": userObj.address,
        "Description": userObj.description,
        "WebPage": userObj.webPage,
        "SkypeId": userObj.skypeId,
        "MobilePhone": userObj.mobilePhone,
        "Image": userObj.profileImage,

      }

   
    }    


    console.debug("Scope: ",this.dataObj)

    
  }



  private async getList() {
    this.listLoading = true
    console.debug("Get teachers");
    const { data } = await searchTeachers(this.listQuery)

    this.list = data.items
    this.total = data.count
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  
  private async confirmAddUpdate() {
    const isEdit = this.dialogType === 'edit'

    let formdata=new FormData()

    if (isEdit) {
        formdata.append("TeacherId",this.dataObj.TeacherId.toString())
    }

    formdata.append("Email",this.dataObj.Email?this.dataObj.Email.toString():"")
    formdata.append("FirstName",this.dataObj.FirstName?this.dataObj.FirstName.toString():"")
    formdata.append("LastName",this.dataObj.LastName?this.dataObj.LastName.toString():"")
    formdata.append("Password",this.dataObj.Password?this.dataObj.Password.toString():"")
    formdata.append("ConfirmPassword",this.dataObj.ConfirmPassword?this.dataObj.ConfirmPassword.toString():"")
    formdata.append("PhoneNumber",this.dataObj.PhoneNumber?this.dataObj.PhoneNumber.toString():"")
    formdata.append("Notes",this.dataObj.Notes?this.dataObj.Notes.toString() :"")
    formdata.append("Address",this.dataObj.Address?this.dataObj.Address.toString():"")
    formdata.append("Description",this.dataObj.Description?this.dataObj.Description.toString():"")
    formdata.append("WebPage",this.dataObj.WebPage? this.dataObj.WebPage.toString():"")
    formdata.append("SkypeId",this.dataObj.SkypeId?this.dataObj.SkypeId.toString():"")
    formdata.append("MobilePhone",this.dataObj.MobilePhone?this.dataObj.MobilePhone.toString():"")
    formdata.append("Image",this.dataObj.Image?this.dataObj.Image.toString():"")



    if (isEdit) {
      await addUpdateTeacher(formdata)

      this.$notify({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: "Updated succesfully",
      type: 'success'
    })
      
    } else {
      const { data } = await addUpdateTeacher(formdata)

      this.$notify({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: "Added succesfully",
      type: 'success'
    })

    }

    this.listQuery = {
      "page":0,
      "query": "",
    }

    this.getList()


    this.dialogVisible = false
    
  }



}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
    .edit-nav-btn{
        padding: 6px;
        background: blue;
        margin-right: 10px;
        padding-left: 20px;
        padding-right: 20px;
        color: white;
    }


</style>
