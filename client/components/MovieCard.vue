<template>
  <div class="w-full bg-white rounded-lg p-2">
    <div class="flex">
      <div class="flex flex-shrink-0">
        <img class="poster" :src="imgUrl" alt="poster" />
      </div>
      <div class="flex flex-col ml-5">
        <h1 class="text-xl font-semibold justify-self-start flex-1">
          {{ title }}<span class="ml-2 text-gray-400">({{ getYear }})</span>
        </h1>
        <p class="justify-self-center flex-1">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    posterPath: { type: String, required: true },
    releaseDate: { type: String, required: true },
  },
  computed: {
    getYear() {
      return this.releaseDate.substring(0, 4);
    },
    imgUrl() {
      return `https://image.tmdb.org/t/p/w500${this.posterPath}`;
    },
  },
};
</script>

<style scoped>
.poster {
  max-height: 200px;
  width: 100%;
}
</style>
