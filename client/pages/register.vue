<template>
  <div class="bg-gray-100 h-full">
    <LanguageSwitcher class="absolute language-switcher"></LanguageSwitcher>
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="font-bold text-2xl mb-6">{{ $t('register.title') }}</h1>
      <div class="w-5/6 lg:w-1/4 bg-white py-4 px-6 rounded-md shadow-md">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(register)">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('register.email').toLowerCase()"
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
              :name="$t('register.password').toLowerCase()"
              rules="required|min:4"
              vid="password"
            >
              <div class="mt-4">
                <label class="custom-label">{{
                  $t('register.password')
                }}</label>
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
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('register.confirmPassword').toLowerCase()"
              rules="required|min:4|confirmed:password"
            >
              <div class="mt-4">
                <label class="custom-label">{{
                  $t('register.confirmPassword')
                }}</label>
                <input
                  v-model="passwordConfirmation"
                  class="custom-input w-full"
                  type="password"
                />
              </div>
              <span class="help is-danger text-sm text-red-500">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
            <button class="primary-button w-full mt-4">
              {{ $t('register.signup') }}
            </button>
          </form>
        </ValidationObserver>
        <div class="text-center mt-2">
          <NuxtLink to="/login" class="text-primary">{{
            $t('login.signIn')
          }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: null,
      password: null,
      passwordConfirmation: null,
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('/auth/register', {
          email: this.email,
          password: this.password,
        });
        await this.$router.push('/');
      } catch (err) {
        if (err?.response?.status === 409) {
          this.$toast.error(this.$t('register.errors.emailAlreadyExists'));
        } else {
          this.$toast.error(this.$t('errors.internalError'));
        }
      }
    },
  },
  meta: {
    notLoggedIn: true,
  },
};
</script>

<style scoped>
.language-switcher {
  top: 10px;
  right: 10px;
}
</style>
