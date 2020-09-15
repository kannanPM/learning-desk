<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
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

            <el-col :span="19" class="form-field-col">


                <el-form-item label="Title">
                  <el-input
                    v-model="postForm.title"
                    placeholder="Title"
                  />
                </el-form-item>

            </el-col>

        </el-row>

        <el-row>

            <el-col :span="11" class="form-field-col">

       

        <el-form-item label="Start Day" class="form-ele">
        

            <el-select

                v-model="postForm.startDay"
            placeholder="Start Day"
            clearable
            class="filter-item"
          >
            <el-option
              v-for="item in 31"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>

        </el-form-item>



        </el-col>


                    <el-col :span="11" class="form-field-col">

    

                  <el-form-item label="Start Month"   class="form-ele">

               <el-select


            v-model="postForm.startMonth"
        placeholder="Start Month"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>


        </el-form-item>
        
        </el-col>


        </el-row>

                    <el-col :span="11" class="form-field-col">

                  <el-form-item label="Start Year" class="form-ele">

           <el-select
            v-model="postForm.startYear"
        placeholder="Start year"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in 100"
          :key="item+2019"
          :label="item+2019"
          :value="item+2019"
        />
      </el-select>


        </el-form-item>


        </el-col>

        
       <el-col :span="11" class="form-field-col">
                  <el-form-item label="Start Hour"  class="form-ele">


           <el-select
            v-model="postForm.startHour"
        placeholder="Start Hour"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in 24"
          :key="item-1"
          :label="item-1"
          :value="item-1"
        />
      </el-select>


        </el-form-item>

        </el-col>

        </el-row>

        <el-row>

        
       <el-col :span="11" class="form-field-col">
      
            <el-form-item label="Start Minute"  class="form-ele">


           <el-select
            v-model="postForm.startMinute"
        placeholder="Start Minute"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in 60"
          :key="item-1"
          :label="item-1"
          :value="item-1"
        />
      </el-select>


        </el-form-item>


        </el-form-item>

        </el-col>

        
       <el-col :span="11" class="form-field-col">


        <el-form-item label="End Day"  class="form-ele">

            <el-select

            v-model="postForm.endDay"
        placeholder="End Day"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in 31"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>

        </el-form-item>

        </el-col>

        </el-row>

        <el-row>


           <el-col :span="11" class="form-field-col">

                      <el-form-item label="End Month"  class="form-ele">

            <el-select

                v-model="postForm.endMonth"
        placeholder="End Month"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>


            </el-form-item>


            </el-col>

            
           <el-col :span="11" class="form-field-col">

                      <el-form-item label="End Year"  class="form-ele">


           <el-select

                v-model="postForm.endYear"
        placeholder="End year"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in 100"
          :key="item+2019"
          :label="item+2019"
          :value="item+2019"
        />
      </el-select>


            </el-form-item>

            </el-col>
        
        </el-row>
        
        <el-row>

        <el-col :span="11" class="form-field-col">

                  <el-form-item label="End Hour"  class="form-ele">


            <el-select

                v-model="postForm.endHour"
        placeholder="End Hour"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in 60"
          :key="item-1"
          :label="item-1"
          :value="item-1"
        />
      </el-select>




        </el-form-item>

        </el-col>


        <el-col :span="11" class="form-field-col">
    
                  <el-form-item label="End Minute"  class="form-ele">


            <el-select

            v-model="postForm.endMinute"
        placeholder="End Minute"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="item in 60"
          :key="item-1"
          :label="item-1"
          :value="item-1"
        />
      </el-select>



        </el-form-item>
        
        </el-col>


       <el-col :span="11" class="form-field-col">

          <el-form-item label="Tags">
          <el-input
            v-model="postForm.tags"
          />
        </el-form-item>

        </el-col>

        </el-row>


        <el-row>

                    <el-col :span="19" class="form-field-col">

        
        <el-form-item >

          <tinymce
            v-if="tinymceActive"
            ref="editor"
            v-model="postForm.description"
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
import { defaultData,addUpdateEvent } from '@/api/event'



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
  name: 'CategoryDetail',
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
      if (rule.field === 'imageURL') {
        this.$message({
          message: 'Upload cover image is required',
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

  private validateSourceUrl = (rule: any, value: string, callback: any) => {
    if (value) {
      if (isValidURL(value)) {
        callback()
      } else {
        this.$message({
          message: 'Invalid URL',
          type: 'error'
        })
        callback(new Error('Invalid URL'))
      }
    } else {
      callback()
    }
  }
  
  private postForm = Object.assign({}, defaultData)
  private loading = false
  private rules = {
    description: [{ validator: this.validateRequire }],
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
    /*
    try {
      const { data } = await getData(id, { })
      this.postForm = data.article
      // Just for test
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
    } catch (err) {
      console.error(err)
    }
    */

  }


  private submitForm() {
    (this.$refs.postForm as Form).validate( async (valid) => {
      if (valid) {

    
        this.loading = true

        if (this.isEdit) {
          const {data} = await addUpdateEvent(this.postForm)
          console.debug("DATA",data);
          this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: "Updated succesfully",
          type: 'success'
        })
          
        } else {
          const { data } = await addUpdateEvent(this.postForm)


          this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: "Added succesfully",
          type: 'success'
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

.form-ele{
    width: 400px;
    text-align:left;
}

</style>
