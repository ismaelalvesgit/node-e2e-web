<template>
  <card>
    <template slot="header">
      <div class="row">
        <div class="col-sm-7">
          <h4 class="card-title">
            <p-button
              @click.prevent="handleMovieAdd()"
              slot="footer-right"
              type="danger"
              round
              icon
              size="sm"
              class="mr-2 movie-add"
            >
              <i class="nc-icon nc-simple-add"></i>
            </p-button>Cadastro de filmes
          </h4>
          <p class="category">Cadastre um novo filme e encontre bugs escondidos</p>
        </div>
        <div class="col-sm-5">
          <div class="pull-right mt-3">
            <form class="search-form">
              <div class="input-group no-border">
                <input
                  type="text"
                  v-model="searchValue"
                  v-on:keyup.enter="handleMovieSearch()"
                  class="form-control"
                  placeholder="Pesquisar..."
                >
                <div class="input-group-append">
                  <div class="input-group-text">
                    <i
                      @click.prevent="handleMovieSearch()"
                      id="search-movie"
                      class="nc-icon nc-zoom-split"
                    ></i>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </template>
    <div class="table-full-width table-movies" v-show="movies.length > 0" v-if="preloader == false">
      <table class="table">
        <thead class="has-gutter">
          <tr class="text-primary">
            <th colspan="1" rowspan="1" class="el-table_27_column_131 is-leaf">
              <div class="cell">#</div>
            </th>
            <th colspan="1" rowspan="1" class="el-table_27_column_132 is-leaf">
              <div class="cell">Titulo</div>
            </th>
            <th colspan="1" rowspan="1" class="el-table_27_column_133 is-leaf">
              <div class="cell">Status</div>
            </th>
            <th colspan="1" rowspan="1" class="el-table_27_column_134 is-leaf">
              <div class="cell">Ano</div>
            </th>
            <th colspan="1" rowspan="1" class="el-table_27_column_134 is-leaf text-right">
              <div class="cell">Data de Estreia</div>
            </th>
            <th
              colspan="1"
              rowspan="1"
              class="el-table_27_column_135 is-right action-buttons td-actions is-leaf text-right"
            >
              <div class="cell">Ações</div>
            </th>
            <th class="gutter" style="width: 0px; display: none;"></th>
          </tr>
        </thead>
        <tbody>
          <movie
            v-for="(movie, index) in movies"
            :key="movie.title"
            :movie="movie"
            :index="index"
            @on-delete="handleMovieDelete"
          ></movie>
        </tbody>
      </table>
    </div>
    <div class="text-center" v-show="preloader">
      <img src="/static/img/preloader.gif" alt width="100px">
    </div>
    <div
      class="alert alert-danger alert-dismissible fade show"
      v-show="movies.length == 0"
      v-if="preloader == false"
    >
      <span>
        <b>Puxa!</b> não encontramos nada aqui :(
      </span>
    </div>
    <template slot="footer">
      <hr>
      <div class="stats"></div>
    </template>
  </card>
</template>
<script>
import Movie from "./Movie.vue";
import { Card } from "src/components/UIComponents";
import swal from "sweetalert2";
export default {
  components: {
    Movie,
    Card
  },
  data() {
    return {
      preloader: false,
      movies: [],
      searchValue: ""
    };
  },
  methods: {
    handleMovieAdd() {
      this.$router.push("add");
    },
    handleMovieDelete(index) {
      var context = this;
      swal({
        title: "Tem certeza?",
        text: "Apagando é headshot!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, headshot!",
        cancelButtonText: "Não, hahaha!",
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        buttonsStyling: false
      }).then(
        function() {
          window.axios
            .delete("/movies/" + context.movies[index].id)
            .then(() => {
              context.preloader = true;
              setTimeout(function() {
                context.getMovies();
                context.preloader = false;
              }, 1000);
              // swal({
              //   title: "Removido!",
              //   text: context.movies[index].title + " removido com sucesso.",
              //   type: "success",
              //   confirmButtonClass: "btn btn-success btn-fill",
              //   buttonsStyling: false
              // });
            });
        },
        function(dismiss) {
          if (dismiss === "cancel") {
            console.log("nao removeu");
            // window.axios
            // .delete("/movies/" + context.movies[index].id)
            // .then(() => {
            //   context.getMovies();
            //   swal({
            //     title: "Cancelado!",
            //     text: "Você desistiu e o filme não foi removido.",
            //     type: "error",
            //     confirmButtonClass: "btn btn-info btn-fill",
            //     buttonsStyling: false
            //   });
            // });
          }
        }
      );
    },
    handleMovieSearch() {
      var context = this;
      if (context.searchValue.length == 0) context.getMovies();
      else {
        context.preloader = true;
        setTimeout(function() {
          window.axios.get("/movies?title=" + context.searchValue).then(res => {
            context.movies = res.data.data;
            context.preloader = false;
          });
        }, 1000);
      }
    },
    getMovies() {
      var context = this;
      context.preloader = true;
      setTimeout(function() {
        window.axios.get("/movies").then(res => {
          context.movies = res.data.data;
          context.preloader = false;
        })
      }, 500);
    }
  },
  mounted() {
    this.getMovies();
  }
};
</script>
<style>
</style>
