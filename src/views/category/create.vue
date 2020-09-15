<template>
  <category-detail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CategoryDetail from './components/CategoryDetail.vue'

@Component({
  name: 'CreateArticle',
  components: {
    CategoryDetail
  }
})
export default class extends Vue {}
</script>
