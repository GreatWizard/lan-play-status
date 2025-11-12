import { createI18n } from 'vue-i18n'

const fallbackLocale = 'en'
const locale = navigator.language || fallbackLocale

const loadLocaleMessages = async (locale) => {
  try {
    const messages = await import(`./locales/${locale}.json`)
    return messages.default
  } catch (e) {
    // no-op
  }
}

const loadLocale = async (locale) => {
  const messages = await loadLocaleMessages(locale)

  i18n.global.setLocaleMessage(locale, messages)
}

const loadAndSetLocale = async (locale) => {
  await loadLocale(locale)

  i18n.global.locale.value = locale
}

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale,
  messages: {},
  numberFormats: {},
  datetimeFormats: {},
})

loadLocale(locale)

if (locale !== fallbackLocale) {
  loadLocale(fallbackLocale)
}

export { i18n, loadAndSetLocale }
