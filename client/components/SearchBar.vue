<template>
  <div class="flex items-center justify-center w-full">
    <div class="border rounded overflow-hidden flex w-full">
      <input
        v-model="searchText"
        type="text"
        class="px-4 py-2 focus:border-primary w-full"
        placeholder="Search..."
        @input="checkInput"
      />
      <button
        class="flex items-center justify-center px-4 border-l bg-primary"
        @click="search"
      >
        <svg
          class="h-4 w-4 text-white"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          />
        </svg>
      </button>
      <button
        class="flex items-center justify-center px-4 border-l border-gray-200 bg-primary"
        @click="clearSearch"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchText: null,
    };
  },
  methods: {
    search() {
      this.$emit('search', this.searchText);
    },
    clearSearch() {
      this.$emit('clearSearch');
    },
    checkInput() {
      if (!this.searchText) {
        this.$emit('clearSearch');
      }
    },
  },
};
</script>
