<template>
  <div class="bg-gray-100 h-full">
    <LanguageSwitcher class="absolute language-switcher"></LanguageSwitcher>
    <div class="flex flex-col items-center justify-center h-full">
        <h1 class="font-bold text-2xl">{{ $t('login.title') }}</h1>
        <div class="w-5/6 lg:w-1/4 bg-white py-4 px-6 rounded-md shadow-md">
          <label class="custom-label">{{ $t('login.email')}}</label>
          <input class="custom-input w-full"/>

          <label class="custom-label">{{ $t('login.password')}}</label>
          <input class="custom-input w-full"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.language-switcher {
  top: 10px;
  right: 10px;
}
</style>
