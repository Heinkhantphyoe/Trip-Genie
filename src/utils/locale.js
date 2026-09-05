import i18n from '../i18n'

export function isBurmese() {
  return i18n.language?.split('-')[0] === 'my'
}

export function getLocale() {
  return isBurmese() ? 'my' : 'en-US'
}
