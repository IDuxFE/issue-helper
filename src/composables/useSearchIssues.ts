import { ref } from 'vue'
import { debounce } from 'lodash-es'
import { AbstractControl } from '@idux/cdk/forms'
import { fetchIssues } from '../apis/github'

export function useSearchIssues(
  repositoryControl: AbstractControl,
  packageControl: AbstractControl,
  nameControl: AbstractControl,
  contentControl: AbstractControl,
) {
  const searchIssues = ref([])

  const onSearch = debounce(async value => {
    if (value) {
      const repository = repositoryControl.getValue()
      const packageName = packageControl.getValue()
      const name = nameControl.getValue()
      const keyword = `${packageName !== 'other' ? packageName : ''} ${
        name !== 'other' && name !== '*' ? name : ''
      } ${value}`

      const issues = await fetchIssues(repository, keyword)

      searchIssues.value = issues.items || []
    } else {
      searchIssues.value = []
    }
  }, 300)

  contentControl.watchValue(onSearch)

  return searchIssues
}
