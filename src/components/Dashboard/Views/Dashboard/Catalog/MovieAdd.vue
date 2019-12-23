
<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <form id="movie-form">
          <div class="card-header">
            <h4 class="card-title">Novo titulo</h4>
          </div>
          <div class="card-body">
            <div class="col-sm-12">
              <div class="alert alert-info alert-dismissible fade show" v-show="alertInfo">
                <span>
                  <b>Oops -</b>
                  {{alertInfo}}
                </span>
              </div>

              <div class="alert alert-danger alert-dismissible fade show" v-show="alertError">
                <span>
                  <b>Oops -</b>
                  {{alertError}}
                </span>
              </div>
            </div>
            <div class="form-group column-sizing">
              <label class="col-sm-12 control-label">Titulo</label>

              <div class="col-sm-12">
                <div class="row">
                  <div class="col-sm-8">
                    <fg-input
                      type="text"
                      name="title"
                      placeholder="Qual o título do filme?"
                      v-model="model.title"
                    ></fg-input>
                  </div>
                  <div class="col-sm-4">
                    <el-select
                      class="select-primary movie-status"
                      size="large"
                      placeholder="Status"
                      v-model="model.status"
                    >
                      <el-option
                        v-for="option in selects.status"
                        class="select-primary"
                        :value="option.value"
                        :label="option.label"
                        :key="option.label"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group column-sizing">
              <label class="col-sm-2 control-label">Datas</label>
              <div class="col-sm-12">
                <div class="row">
                  <div class="col-md-4">
                    <fg-input
                      type="number"
                      name="year"
                      placeholder="Ano do lançamento"
                      v-model="model.year"
                    ></fg-input>
                  </div>
                  <div class="col-md-8">
                    <el-date-picker
                      type="date"
                      name="release_date"
                      v-model="model.release_date"
                      placeholder="Data de estréia"
                      :picker-options="pickerOptions1"
                      format="dd/MM/yyyy"
                    ></el-date-picker>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group column-sizing">
              <label class="col-sm-2 control-label">Atores</label>
              <div class="col-sm-12">
                <div class="row">
                  <div class="col-md-12">
                    <el-tag
                      :key="tag"
                      v-for="tag in model.cast"
                      type="primary"
                      :closable="true"
                      :close-transition="false"
                      @close="handleClose(tag)"
                    >{{tag}}</el-tag>

                    <input
                      type="text"
                      placeholder="Adicione um ator"
                      class="form-control input-new-tag cast"
                      v-model="cast.inputValue"
                      ref="saveTagInput"
                      size="mini"
                      @keyup.enter="handleInputConfirm"
                      @blur="handleInputConfirm"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">Sinopse</label>
              <div class="col-sm-12">
                <textarea
                  v-model="model.overview"
                  name="overview"
                  class="form-control"
                  placeholder="Fale mais sobre o filme :)"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="picture-container">
                <el-upload
                  id="upcover-box"
                  class="picture"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="handleCover"
                  :auto-upload="false"
                  :show-file-list="false"
                >
                  <img
                    v-if="coverImageUrl"
                    :src="coverImageUrl"
                    class="picture-src pull-left mt-3"
                    width="100px" height="auto"
                  >
                </el-upload>
                <p class="description">Upload da capa do filme. Máximo 200KB</p>
              </div>
            </div>

            <div class="card-footer text-right">
              <p-button id="create-movie" type="info" @click.prevent="create">Cadastrar</p-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DatePicker,
  TimeSelect,
  Slider,
  Tag,
  Input,
  Button,
  Select,
  Option,
  Upload
} from "element-ui";
import moment from "moment";

export default {
  components: {
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Tag.name]: Tag,
    [Option.name]: Option,
    [Select.name]: Select,
    [Upload.name]: Upload
  },
  data() {
    return {
      model: {
        title: "",
        status: "",
        year: "",
        cast: [],
        release_date: "",
        overview: "",
        cover: "",
        cover_binary: null
      },
      coverImageUrl: "/static/img/upload.gif",
      cast: {
        inputVisible: false,
        inputValue: ""
      },
      selects: {
        simple: "",
        status: [
          { value: "Disponível", label: "Disponível" },
          { value: "Pré-venda", label: "Pré-venda" },
          { value: "Em breve", label: "Em breve" }
        ]
      },
      alertInfo: "",
      alertError: "",
      pickerOptions1: {
        shortcuts: [
          {
            text: "Hoje",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "Amanhã",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "7 Dias",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    setAlert(type, text) {
      this.alertMessage.type = type;
      this.alertMessage.text = text;
    },
    handleInputConfirm() {
      let inputValue = this.cast.inputValue;
      if (inputValue) {
        this.model.cast.push(inputValue);
      }
      this.cast.inputVisible = false;
      this.cast.inputValue = "";
    },
    handleClose(tag) {
      this.model.cast.splice(this.model.cast.indexOf(tag), 1);
    },
    handleCover(file) {
      this.coverImageUrl = URL.createObjectURL(file.raw);
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = function(e) {
        // console.log(e);
        vm.model.cover_binary = e.target.result;
      };
      reader.readAsBinaryString(file.raw);
      this.model.cover = file.raw.name;
    },
    create() {
      this.alertInfo = "";
      this.alertError = "";

      if (this.model.title.length === 0) {
        this.alertInfo = "Filme sem titulo. Pode isso Arnaldo?";
        return false;
      }

      if (this.model.status.length === 0) {
        this.alertInfo = "O status deve ser informado!";
        return false;
      }

      if (this.model.year.length === 0) {
        this.alertInfo = "Faltou o ano de lançamento também!";
        return false;
      }

      if (this.model.release_date.length === 0) {
        this.alertInfo = "Quase lá, só falta a data de estréia!";
        return false;
      }

      // console.log(this.model.due_date);
      // this.model.due_date = moment(this.model.due_date).format("h:mm:ss");
      // console.log(this.model);

      window.axios
        .post("/movies", this.model)
        .then(() => {
          this.model = {};
          this.$router.push("/movie");
        })
        .catch(error => {
          switch (error.response.data.msg) {
            case "release_date is past!":
              this.alertError = "Ainda não temos uma máquina do tempo. hahaha";
              return false;
            case "title must be unique":
              this.alertError = "Este titulo já existe no ZombiePlus.";
              return false;
            default:
              console.log(error.response);
              this.alertError = "Puxa, ocorreu um erro estranho :(";
          }
        });
    }
  },
  mounted() {
    document.getElementsByClassName('el-upload__input')[0].setAttribute("id", "upcover");
  }
};
</script>
<style lang="scss">
.card-wizard .picture-container .picture {
  input[type="file"] {
    display: none;
  }
}
</style>