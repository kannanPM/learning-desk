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
          <span>{{ row.eventId }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Title"
      >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
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
        label="Event Type"
      >
        <template slot-scope="{row}">
          <span >{{row.eventType}}</span>
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
        label="Description"
      >
        <template slot-scope="{row}">
          <span>{{row.description}}</span>
        </template>
      </el-table-column>
 

      <el-table-column
        align="center"
        label="Actions"
        width="300"
      >
        <template slot-scope="{row}">

         <router-link
            :to="'/event/edit/'+row.eventId"
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
        <el-form-item label="Title">
          <el-input
            v-model="dataObj.title"
            placeholder="Title"
          />
        </el-form-item>


        <el-form-item label="Start Day">
          <el-input
            v-model="dataObj.startDay"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="Start Month">
          <el-input
            v-model="dataObj.startMonth"
            type="number"
          />
        </el-form-item>


                  <el-form-item label="Start Year">
          <el-input
            v-model="dataObj.startYear"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="Start Hour">
          <el-input
            v-model="dataObj.startHour"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="Start Minute">
          <el-input
            v-model="dataObj.startMinute"
            type="number"
          />
        </el-form-item>



        <el-form-item label="End Day">
          <el-input
            v-model="dataObj.endDay"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="End Month">
          <el-input
            v-model="dataObj.endMonth"
            type="number"
          />
        </el-form-item>


                  <el-form-item label="End Year">
          <el-input
            v-model="dataObj.endYear"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="End Hour">
          <el-input
            v-model="dataObj.endHour"
            type="number"
          />
        </el-form-item>

                  <el-form-item label="End Minute">
          <el-input
            v-model="dataObj.endMinute"
            type="number"
          />
        </el-form-item>


          <el-form-item label="Tags">
          <el-input
            v-model="dataObj.tags"
          />
        </el-form-item>


        <el-form-item label="Description">
          <el-input
            v-model="dataObj.description"
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
import { searchEvents,addUpdateEvent,deleteEvent } from '@/api/event'

import { IArticleData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { cloneDeep } from 'lodash'

@Component({
  name: 'CourseList',
  components: {
    Pagination,

  }
})
export default class extends Vue {
  
  private dataObj = {
    "title":"Test",
    "startDay":0,
    "startMonth":1,
    "startYear": 2020,
    "startMinute": 0,
    "startHour":0,
    "withDuration": true,
    "endDay":0,
    "endMonth":1,
    "endYear": 2020,
    "endMinute": 0,
    "endHour":0,
    "description": "",
    "eventType": 0,
    "tags": "",
  }


  private total = 0
  private list: IArticleData[] = []
  private listLoading = true
  private dialogVisible = false
  private dialogType = 'new'
  private activeCats = []
  private file = ""
  private listQuery = {
    "page":0,
    "query": "",
  }

  created() {
    this.getList()
  }


  private handleCreate() {
    this.dataObj = {
    "title":"Test",
    "startDay":0,
    "startMonth":1,
    "startYear": 2020,
    "startMinute": 0,
    "startHour":0,
    "withDuration": true,
    "endDay":0,
    "endMonth":1,
    "endYear": 2020,
    "endMinute": 0,
    "endHour":0,
    "description": "",
    "eventType": 0,
    "tags": "",
  }


    this.dialogType = 'new'
    this.dialogVisible = true
  }
  




  private handleEdit(scope: any) {
    this.dialogType = 'edit'
    this.dialogVisible = true

   

    this.dataObj = cloneDeep(scope)

    console.debug("Scope: ",this.dataObj)

    
  }

  private handleDelete(row: any) {
    this.$confirm('Confirm to remove?', 'Warning', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
      .then(async() => {
        await deleteEvent(row.eventId)
        this.$message({
          type: 'success',
          message: 'Deleted!'
        })


        this.getList();                                                                                                                   

      })
      .catch(err => { console.error(err) })
  }




  private async getList() {
    this.listLoading = true
    const { data } = await searchEvents(this.listQuery)

    this.list = data.items
    this.total = data.count
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  
  private async confirmAddUpdate() {
    const isEdit = this.dialogType === 'edit'


    if (isEdit) {
      await addUpdateEvent(this.dataObj)

      this.$notify({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: "Updated succesfully",
      type: 'success'
    })
      
    } else {
      const { data } = await addUpdateEvent(this.dataObj)

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
