<template>
  <header class="text-gray-600 body-font bg-white">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <a
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
        <span class="ml-3 text-xl">MyWatchlist</span>
      </a>
      <nav
        class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center"
      >
        <NuxtLink to="/" class="mr-5 hover:text-gray-900">{{
          $t('navbar.movies')
        }}</NuxtLink>
        <NuxtLink to="/watchlist" class="mr-5 hover:text-gray-900">{{
          $t('navbar.watchlist')
        }}</NuxtLink>
        <NuxtLink to="/watchlist/seen" class="mr-5 hover:text-gray-900">{{
          $t('navbar.seen')
        }}</NuxtLink>
      </nav>
      <LanguageSwitcher class="mr-2" />
      <button
        class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-2 md:mt-0"
        @click="$router.push('/logout')"
      >
        {{ $t('navbar.logout') }}
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply text-primary;
}
</style>
