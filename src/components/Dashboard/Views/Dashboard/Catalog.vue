<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="row" v-show="movies.length > 0">
          <div class="col-lg-3 col-md-4 col-sm-6" v-for="movie in movies" v-bind:key="movie.id">
            <card type="catalog" class="card-movie">
              <badge slot="header" type="danger">{{ movie.status }}</badge>
              <img :src="getImagePath(movie.cover)" :alt="movie.title" v-show="movie.cover">
              <img
                src="/static/img/default-cover.png"
                :alt="movie.title"
                v-show="movie.cover === ''"
              >
              <h6 class="mt-3">{{movie.title}}</h6>
              <p-button type="primary" @click.native="modals.classic = true" @click.prevent="handleShowMovie(movie)">Ver Sinopse</p-button>
            </card>
          </div>
        </div>
        <div class="alert alert-danger alert-dismissible fade show" v-show="movies.length == 0">
          <span>
            <b>Então,</b> o catálogo está vazio. Bora cadastrar uns filmes?
          </span>
        </div>
      </div>

      <!-- Classic Modal -->
      <modal :show.sync="modals.classic" headerClasses="justify-content-center">
        <h4 slot="header" class="title title-up">{{showMovie.title}}</h4>
        <p>{{showMovie.overview}}</p>
        <badge slot="header" type="danger">{{ showMovie.status }}</badge>

        <h5>Atores</h5>
        <el-tag :key="tag" v-for="tag in showMovie.cast" type="primary">{{tag}}</el-tag>

        <p class="mt-3">Data de estreia: {{ showMovie.release_date | moment("DD/MM/YYYY") }}</p>
        <p class="mt-3">Data de entrada: {{ showMovie.createdAt | moment("DD/MM/YYYY") }}</p>
        <p class="mt-3">Ano de lançamento: {{ showMovie.year }}</p>

        <template slot="footer">
          <div class="left-side">
            <p-button type="default" link @click="modals.classic = false">Voltar</p-button>
          </div>
          <div class="divider"></div>
          <div class="right-side">
            <p-button type="danger" link @click="modals.classic = false">Comprar (Em breve)</p-button>
          </div>
        </template>
      </modal>
    </div>
  </div>
</template>
<script>
import { Card, Badge, Button, Modal } from "src/components/UIComponents";
import { Table, TableColumn, Upload, Tag } from "element-ui";

export default {
  components: {
    [Upload.name]: Upload,
    [Button.name]: Button,
    [Tag.name]: Tag,
    Modal,
    Card,
    Badge
  },
  data() {
    return {
      movies: [],
      image: "",
      modals: {
        classic: false
      },
      showMovie: {}
    };
  },
  methods: {
    handleShowMovie(movie) {
      this.showMovie = movie;
    },
    getMovies() {
      window.axios.get("/movies").then(res => {
        this.movies = res.data.data;
      });
    },
    getImagePath(cover) {
      return process.env.VUE_APP_API.replace("3000", "3000") + "/images/" + cover
    }
  },
  mounted() {
    this.getMovies();
  }
};
</script>
<style>
.card .alert {
  position: relative !important;
  width: 100%;
}
</style>
