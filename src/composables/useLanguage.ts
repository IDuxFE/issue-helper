import { computed, ref } from 'vue'

function getLocale() {
  const cache = window.localStorage.getItem('locale')

  if (cache) {
    return cache
  }

  return window.navigator.language.toLowerCase().includes('zh') ? 'zh' : 'en'
}

export function useLanguage() {
  const lang = ref(getLocale())

  const changeLanguage = () => {
    lang.value = lang.value === 'zh' ? 'en' : 'zh'
    window.localStorage.setItem('locale', lang.value)
  }

  return { language: computed(() => lang.value), changeLanguage }
}
