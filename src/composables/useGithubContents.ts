import { ref } from 'vue'
import { AbstractControl } from '@idux/cdk/forms'
import { fetchContents } from '../apis/github'

export function useGithubContents(
  repositoryControl: AbstractControl,
  packageControl: AbstractControl,
  nameControl: AbstractControl,
) {
  const packages = ref<any[]>([])
  const packageDirnames = ref<any[]>([])

  repositoryControl.watchValue(
    async value => {
      const contents = (await fetchContents(value, 'packages')) as any[]
      const dirNames = contents.filter(item => item.type === 'dir').map(item => item.name)

      dirNames.push('other')

      packages.value = dirNames.map(name => ({
        key: name,
        label: name,
        value: name,
      }))

      packageControl.setValue(dirNames[0])
    },
    { immediate: true },
  )

  packageControl.watchValue(async value => {
    let dirNames: any[] = []
    if (value !== 'site' && value !== 'other') {
      nameControl.enable()
      const contents = (await fetchContents(
        repositoryControl.getValue(),
        `packages/${value}`,
      )) as any[]
      dirNames = contents
        .filter(item => item.type === 'dir' && item.name !== '_private')
        .map(item => item.name)

      dirNames.push('other')
    } else {
      nameControl.disable()
    }

    dirNames.push('*')
    packageDirnames.value = dirNames.map(name => ({
      key: name,
      label: name,
      value: name,
    }))

    nameControl.setValue(dirNames[0])
  })

  return { packages, packageDirnames }
}
