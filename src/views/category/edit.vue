<template>
  <category-detail :is-edit="true" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CategoryDetail from './components/CategoryDetail.vue'

@Component({
  name: 'EditArticle',
  components: {
    CategoryDetail
  }
})
export default class extends Vue {}
</script>
