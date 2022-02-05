<template>
  <div @mouseover="showLang = true" @mouseleave="showLang = false">
    <button class="flex items-center p-2 text-sm">
      <span class="mx-1">{{ otherLocaleName.name }}</span>
      <svg
        class="w-5 h-5 mx-1"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>

    <div
      v-show="showLang"
      class="absolute flex flex-col justify-center shadow-xl rounded-md"
    >
      <label
        v-for="lang in $i18n.locales"
        :key="lang.code"
        class="block px-4 py-3 text-sm transition-colors duration-200 transform bg-white cursor-pointer hover:bg-gray-200"
        :class="{ 'bg-gray-200': otherLocaleName.code === lang.code }"
        @click="switchLocale(lang.code)"
      >
        {{ lang.name }}
      </label>
    </div>
  </div>
</template>

<script>
import { localize } from 'vee-validate/dist/vee-validate.full.esm';
import fr from 'vee-validate/dist/locale/fr.json';
import en from 'vee-validate/dist/locale/en.json';

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      showLang: false,
    };
  },
  computed: {
    otherLocaleName() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale);
    },
  },
  methods: {
    switchLocale(code) {
      this.$i18n.setLocale(code);
      this.showLang = !this.showLang;
      const localesVeeValidate = { fr, en };
      localize(code, localesVeeValidate.code);
      localStorage.setItem('lang', code);
    },
  },
};
</script>
