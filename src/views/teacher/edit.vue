<template>
  <comp-detail :is-edit="true" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CompDetail from './components/CompDetail.vue'

@Component({
  name: 'EditTeacher',
  components: {
    CompDetail
  }
})
export default class extends Vue {}
</script>
