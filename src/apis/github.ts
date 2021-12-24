const apiUrl = 'https://api.github.com'

export function fetchReleases(repo: string) {
  return fetch(`${apiUrl}/repos/IduxFE/${repo}/releases`).then(res => res.json())
}

export function fetchIssues(repo: string, keyword: string) {
  return fetch(`${apiUrl}/search/issues?q=is:issue repo:IduxFE/${repo} ${keyword}&per_page=5`).then(
    res => res.json(),
  )
}

export function fetchContents(repo: string, path: string) {
  return fetch(`${apiUrl}/repos/IduxFE/${repo}/contents/${path}`).then(res => res.json())
}
