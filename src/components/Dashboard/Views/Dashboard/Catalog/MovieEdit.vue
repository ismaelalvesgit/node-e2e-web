<template>
  <div class="row">
      <div class="col-lg-4 col-md-5">
        <user-card></user-card>
      </div>
      <div class="col-lg-8 col-md-7">
        <div class="card">
          <form>
            <div class="card-header">
              <h4 class="card-title">
                Editar Tarefa
              </h4>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label>Título da tarefa</label>
                <fg-input  type="email" name="title" v-model="form.title">
                </fg-input>
              </div>


              <div class="form-group">
                <label class="card-title">Data de entrega</label>
                <el-date-picker v-model="form.due_date" type="date" placeholder="Escolha ou informe uma data"
                    :picker-options="pickerOptions1">
                </el-date-picker>
              </div>

            </div>
            <div class="card-footer text-right">
              <p-checkbox class="pull-left" v-model="form.done">Finalizar</p-checkbox>
              <p-button type="info" @click.prevent="update">Atualizar</p-button>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>
<script>
  import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
  export default {
    components: {
      [DatePicker.name]: DatePicker,
      [TimeSelect.name]: TimeSelect
    },
    data () {
      return {
        form: {
          title: '',
          dueDate: ''
        },
        pickerOptions1: {
          shortcuts: [{
            text: 'Today',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: 'Yesterday',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: 'A week ago',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    methods: {
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      update () {
        let id = this.$route.params.id
        window.axios.put('/movies/' + id, this.form)
          .then(() => {
            this.$router.push('/movie')
          })
          .catch(error => {
            console.log(error.response)
          });
      },
      getMovie () {
        let id = this.$route.params.id
        window.axios.get('/movies/' + id).then((res) => {
          this.form = res.data
        })
      }
    },
    mounted () {
      this.getMovie()
    }
  }
</script>
<style>
</style>
