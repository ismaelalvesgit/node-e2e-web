<template>
  <tr>
    <td class="text-left">{{movie.id}}</td>
    <td class="text-left">{{movie.title}}</td>
    <td class="text-left">{{movie.status}}</td>
    <td class="text-left">{{movie.year}}</td>
    <td class="text-right">Estreia em: {{ movie.release_date | moment("DD/MM/YYYY") }}</td>
    <td class="td-actions text-right">
      <el-tooltip placement="top" content="Apagar filme">
        <p-button type="danger" round icon class="btn-icon-mini btn-neutral btn-trash" @click="handleDeleteClick">
          <i class="nc-icon nc-simple-remove"></i>
        </p-button>
      </el-tooltip>
    </td>
  </tr>
</template>
<script>
  import { Tooltip } from 'element-ui'

  export default {
    components: {
      [Tooltip.name]: Tooltip
    },
    props: {
      movie: {
        type: Object,
        default: () => {
          return {
            title: ''
          }
        }
      },
      index: Number
    },
    methods: {
      handleDeleteClick() {
        this.$emit('on-delete', this.index)
      }
    }
  }
</script>
<style>
</style>
