<template>
  <div class="app-container">
    
    <el-button
      type="primary"
      @click="handleCreate"
    >
     New
    </el-button>


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
          <span>{{ row.categoryId }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Name"
      >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="is Deleted"
      >
        <template slot-scope="{row}">
          <span v-if="row.isDeleted" class="el-tag el-tag--success el-tag--medium el-tag--light">Yes</span>
          <span v-else class="el-tag el-tag--danger el-tag--medium el-tag--light">No</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Is Active"
      >
        <template slot-scope="{row}">
          <span v-if="row.isActive" class="el-tag el-tag--success el-tag--medium el-tag--light">Yes</span>
          <span v-else class="el-tag el-tag--danger el-tag--medium el-tag--light">No</span>

        </template>
      </el-table-column>

 

      <el-table-column
        align="center"
        label="Actions"
        width="300"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(row)"
          >
            {{ $t('permission.editPermission') }}
          </el-button>
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
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="Name">
          <el-input
            v-model="dataObj.name"
            placeholder="Name"
          />
        </el-form-item>
        <el-form-item label="isActive">

          <el-checkbox
               v-model="dataObj.isActive"                
                class="filter-item"
                style="margin-left:15px;"
              >
               IsActive
              </el-checkbox>

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
import { getCategories,addUpdateCategory,deleteCategory } from '@/api/category'
import { IArticleData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { cloneDeep } from 'lodash'

@Component({
  name: 'CategoryList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  
  private dataObj = {
    "name":"",
    "isActive": true
  }


  private total = 0
  private list: IArticleData[] = []
  private listLoading = true
  private dialogVisible = false
  private dialogType = 'new'

  private listQuery = {
    "page":0,
    "query": "",
  }

  created() {
    this.getList()
  }


  private handleCreate() {
    this.dataObj = {
      "name":"",
      "isActive": true
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
        await deleteCategory(row.categoryId)
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
    const { data } = await getCategories(this.listQuery)

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
      await addUpdateCategory(this.dataObj)

      this.$notify({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: "Updated succesfully",
      type: 'success'
    })
      
    } else {
      const { data } = await addUpdateCategory(this.dataObj)

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
</style>
