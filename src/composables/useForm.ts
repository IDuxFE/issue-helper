import { useFormGroup, ValidatorFn, Validators } from '@idux/cdk/forms'

// 匹配预定复现网址
// tslint:disable-next-line:max-line-length
export const REP_LINK_REGEXP =
  /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*(stackblitz|github|codesandbox|idux|playground)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+/
// 现有网址不可完全复制
export const PREVENT_COPY_LINK =
  /^(https?:\/\/)?((stackblitz\.com\/edit\/idux-starter)|(idux-starter\.stackblitz\.io)|(codesandbox.io\/s\/idux-starter-7o9lv))\/?$/i

const repoLinkValidator: ValidatorFn = (value: string) => {
  if (!REP_LINK_REGEXP.test(value) || PREVENT_COPY_LINK.test(value)) {
    return { repLink: {} }
  }
  return undefined
}

export function useForm() {
  const { required } = Validators

  const formGroup = useFormGroup({
    repository: ['idux', [required]],
    type: ['bug', [required]],
    title: useFormGroup({
      package: ['', [required]],
      name: ['', [required]],
      content: ['', [required]],
    }),

    // bug
    link: ['', [required, repoLinkValidator]],
    environment: ['', [required]],
    step: ['', [required]],
    expectResult: ['', [required]],
    existResult: ['', [required]],
    additional: [''],

    // feature
    motivation: ['', [required]],
    proposal: ['', [required]],
  })

  const bugControls = ['link', 'environment', 'step', 'expectResult', 'existResult'] as const
  const featureControls = ['motivation', 'proposal'] as const

  formGroup.get('type').watchValue(
    type => {
      if (type === 'bug') {
        bugControls.forEach(name => {
          formGroup.get(name).enable()
        })
        featureControls.forEach(name => {
          formGroup.get(name).disable()
        })
      } else {
        bugControls.forEach(name => {
          formGroup.get(name).disable()
        })
        featureControls.forEach(name => {
          formGroup.get(name).enable()
        })
      }
    },
    { immediate: true },
  )

  return formGroup
}
