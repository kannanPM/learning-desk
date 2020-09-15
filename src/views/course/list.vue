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
          <span>{{ row.coursesId }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Short Name"
      >
        <template slot-scope="{row}">
          <span>{{ row.shortName }}</span>
        </template>
      </el-table-column>

            <el-table-column
        align="center"
        label="Full Name"
      >
        <template slot-scope="{row}">
          <span>{{ row.fullName }}</span>
        </template>
      </el-table-column>

                  <el-table-column
        align="center"
        label="Start On"
      >
        <template slot-scope="{row}">
          <span>{{ row.startDay }}/{{ row.startMonth}}/{{row.startYear}} - {{row.startHour}}:{{row.startMinute}}</span>
        </template>
      </el-table-column>


      <el-table-column
        align="center"
        label="End On"
      >
        <template slot-scope="{row}">
            <span>{{ row.endDay }}/{{ row.endMonth}}/{{row.endYear}} - {{row.endHour}}:{{row.endMinute}}</span>
        </template>
      </el-table-column>


       <el-table-column
        align="center"
        label="Category"
      >
        <template slot-scope="{row}">
          <span v-if="row.category">{{row.category.name}}</span>
          <span v-else >NULL</span>
        </template>
      </el-table-column>


             <el-table-column
        align="center"
        label="Tags"
      >
        <template slot-scope="{row}">
          <span>{{row.tags}}</span>
        </template>
      </el-table-column>

             <el-table-column
        align="center"
        label="New Price"
      >
        <template slot-scope="{row}">
          <span>{{row.newPrice}}</span>
        </template>
      </el-table-column>

              <el-table-column
        align="center"
        label="Old Price"
      >
        <template slot-scope="{row}">
          <span>{{row.oldPrice}}</span>
        </template>
      </el-table-column>

 

      <el-table-column
        align="center"
        label="Actions"
        width="300"
      >
        <template slot-scope="{row}">


          <router-link
            :to="'/course/edit/'+row.coursesId"
            class="link-type edit-nav-btn"
          >
            <span>Edit</span>
          </router-link>



          <el-button
            type="danger"
            size="small"
            @click="handleDelete(row)"
          >
            {{ $t('permission.delete') }}
          </el-button>

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
        <el-form-item label="Short Name">
          <el-input
            v-model="dataObj.ShortName"
            placeholder="Short Name"
          />
         <span style="color:red;" v-if="errors.ShortName">{{errors.ShortName[0]}}</span>
        </el-form-item>

                <el-form-item label="Full Name">
          <el-input
            v-model="dataObj.FullName"
            placeholder="Full Name"
          />
        </el-form-item>


        <el-form-item label="Start Day">
          <el-input
            v-model="dataObj.StartDay"
            type="number"
          />

         <span style="color:red;" v-if="errors.StartDay">{{errors.StartDay[0]}}</span>
        </el-form-item>

                  <el-form-item label="Start Month">
          <el-input
            v-model="dataObj.StartMonth"
            type="number"
          />
        </el-form-item>


                  <el-form-item label="Start Year">
          <el-input
            v-model="dataObj.StartYear"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="Start Hour">
          <el-input
            v-model="dataObj.StartHour"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="Start Minute">
          <el-input
            v-model="dataObj.StartMinute"
            type="number"
          />
        </el-form-item>



        <el-form-item label="End Day">
          <el-input
            v-model="dataObj.EndDay"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="End Month">
          <el-input
            v-model="dataObj.EndMonth"
            type="number"
          />
        </el-form-item>


                  <el-form-item label="End Year">
          <el-input
            v-model="dataObj.EndYear"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="End Hour">
          <el-input
            v-model="dataObj.EndHour"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="End Minute">
          <el-input
            v-model="dataObj.EndMinute"
            type="number"
          />
        </el-form-item>





        <el-form-item label="New Price">
          <el-input
            v-model="dataObj.NewPrice"
            type="number"
          />
        </el-form-item>





        <el-form-item label="Old Price">
          <el-input
            v-model="dataObj.OldPrice"
            type="number"
          />
        </el-form-item>

          <el-form-item label="Tags">
          <el-input
            v-model="dataObj.Tags"
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
import { searchCourses,addUpdateCourse,deleteCourse } from '@/api/course'
import { getActiveCategories } from '@/api/category'

import { IArticleData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { cloneDeep } from 'lodash'
import UploadImage from '@/components/UploadImage/index.vue'

@Component({
  name: 'CourseList',
  components: {
    Pagination,
        UploadImage,

  }
})
export default class extends Vue {
 
  private errors=[]
 
  private dataObj = {
    "ShortName":"Test",
    "FullName":"TEst TEst",
    "StartDay":0,
    "StartMonth":1,
    "StartYear": 2020,
    "StartMinute": 0,
    "StartHour":0,
    "EndDay":0,
    "EndMonth":1,
    "EndYear": 2020,
    "EndMinute": 0,
    "EndHour":0,
    "Tags": "",
    "Image":"",
    "CategoryId":1,
    "Description": "",
    "NewPrice": 0.0,
    "OldPrice": 0.0
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
    this.getACats()
  }


  private handleCreate() {
    this.dataObj = {
    "ShortName":"Test",
    "FullName":"Test TEst",
    "StartDay":0,
    "StartMonth":1,
    "StartYear": 2020,
    "StartMinute": 0,
    "StartHour":0,
    "EndDay":0,
    "EndMonth":1,
    "EndYear": 2020,
    "EndMinute": 0,
    "EndHour":0,
    "Image":"",
    "Tags": "",
    "CategoryId":1,
    "Description": "",
    "NewPrice": 0.0,
    "OldPrice": 0.0

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



    this.dataObj.ShortName=scope.shortName,
    this.dataObj.FullName=scope.fullName,
    this.dataObj.StartDay=scope.startDay,
    this.dataObj.StartMonth=scope.startMonth,
    this.dataObj.StartYear=scope.startYear,
    this.dataObj.StartMinute=scope.startMinute,
    this.dataObj.StartHour=scope.startHour,
    this.dataObj.EndDay=scope.endDay,
    this.dataObj.EndMonth=scope.endMonth,
    this.dataObj.EndYear=scope.endYear,
    this.dataObj.EndMinute=scope.endMinute,
    this.dataObj.EndHour=scope.endHour,
    this.dataObj.Image=scope.image,
    this.dataObj.Tags=scope.tags,
    this.dataObj.CategoryId=scope.categoryId,
    this.dataObj.Description=scope.description,
    this.dataObj.NewPrice=scope.newPrice,
    this.dataObj.OldPrice=scope.oldPrice


    console.debug("Scope: ",this.dataObj)

    
  }

  private handleDelete(row: any) {
    this.$confirm('Confirm to remove?', 'Warning', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
      .then(async() => {
        await deleteCourse(row.coursesId)
        this.$message({
          type: 'success',
          message: 'Deleted!'
        })


        this.getList();                                                                                                                   

      })
      .catch(err => { console.error(err) })
  }

    private async getACats() {
    this.listLoading = true
    const { data } = await getActiveCategories()

    this.activeCats = data
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }



  private async getList() {
    this.listLoading = true
    const { data } = await searchCourses(this.listQuery)

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
    /*
    for (var key in Object.keys(this.dataObj)) {
        let value = this.dataObj[key];

        formdata.append(key,value)
    }
    */
    
    formdata.append("ShortName",this.dataObj.ShortName?this.dataObj.ShortName.toString():"")
    formdata.append("FullName",this.dataObj.FullName?this.dataObj.FullName.toString():"")
    formdata.append("StartDay",this.dataObj.StartDay?this.dataObj.StartDay.toString():"")
    formdata.append("StartMonth",this.dataObj.StartMonth?this.dataObj.StartMonth.toString():"")
    formdata.append("StartYear",this.dataObj.StartYear?this.dataObj.StartYear.toString():"")
    formdata.append("StartMinute",this.dataObj.StartMinute?this.dataObj.StartMinute.toString():"")
    formdata.append("StartHour",this.dataObj.StartHour?this.dataObj.StartHour.toString():"")
    formdata.append("EndDay",this.dataObj.EndDay?this.dataObj.EndDay.toString():"")
    formdata.append("EndMonth",this.dataObj.EndMonth?this.dataObj.EndMonth.toString():"")
    formdata.append("EndYear",this.dataObj.EndYear?this.dataObj.EndYear.toString():"")
    formdata.append("EndMinute",this.dataObj.EndMinute? this.dataObj.EndMinute.toString(): "")
    formdata.append("EndHour", this.dataObj.EndHour?this.dataObj.EndHour.toString():"")
    formdata.append("Image",this.dataObj.Image?this.dataObj.Image.toString():"")
    formdata.append("Tags",this.dataObj.Tags?this.dataObj.Tags.toString():"")
    formdata.append("CategoryId",this.dataObj.CategoryId?this.dataObj.CategoryId.toString():"")
    formdata.append("Description", this.dataObj.Description? this.dataObj.Description.toString():"")
    formdata.append("NewPrice",this.dataObj.NewPrice?this.dataObj.NewPrice.toString():"")
    formdata.append("OldPrice",this.dataObj.OldPrice?this.dataObj.OldPrice.toString():"")


    if (isEdit) {
      const {data} = await addUpdateCourse(formdata)
      console.debug("DATA",data);
      if(data.errors){
         this.errors=data.errors
      }
      this.$notify({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: "Updated succesfully",
      type: 'success'
    })
      
    } else {
      const { data } = await addUpdateCourse(formdata)

      if(data.errors){
         this.errors=data.errors
      }

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
