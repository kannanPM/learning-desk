<template>
  <comp-detail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CompDetail from './components/CompDetail.vue'

@Component({
  name: 'CreateTeacher',
  components: {
    CompDetail
  }
})
export default class extends Vue {}
</script>
