import packageJson from '../../package.json'

export const environment = {
  production: true,
  version: packageJson.version,
  dataUrl: 'https://raw.githubusercontent.com/pawcoding/RandomSaber/main/packs',
}
