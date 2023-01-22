import StarRating from './star-rating.vue'

export default {
  install (app) {
    app.component(StarRating.name, StarRating)
  }
}
