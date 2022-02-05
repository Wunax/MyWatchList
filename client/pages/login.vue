<template>
  <div class="bg-gray-100 h-full">
    <LanguageSwitcher class="absolute language-switcher"></LanguageSwitcher>
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="font-bold text-2xl mb-6">{{ $t('login.title') }}</h1>
      <div class="w-5/6 lg:w-1/4 bg-white py-4 px-6 rounded-md shadow-md">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(login)">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('login.email').toLowerCase()"
              rules="required|email"
            >
              <div>
                <label class="custom-label">{{ $t('login.email') }}</label>
                <input v-model="email" class="custom-input w-full" />
              </div>
              <span class="help is-danger text-sm text-red-500">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('login.password').toLowerCase()"
              rules="required|min:4"
            >
              <div class="mt-4">
                <label class="custom-label">{{ $t('login.password') }}</label>
                <input
                  v-model="password"
                  class="custom-input w-full"
                  type="password"
                />
              </div>
              <span class="help is-danger text-sm text-red-500">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
            <button class="primary-button w-full mt-4">
              {{ $t('login.signIn') }}
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      try {
        await this.$axios.post('/auth/login', {
          email: this.email,
          password: this.password,
        });
      } catch (err) {
        if (err?.response?.status === 401) {
          this.$toast.error(this.$t('login.errors.invalidCredentials'));
        } else {
          this.$toast.error(this.$t('errors.internalError'));
        }
      }
    },
  },
};
</script>

<style scoped>
.language-switcher {
  top: 10px;
  right: 10px;
}
</style>
