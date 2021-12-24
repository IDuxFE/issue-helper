export function getBugTemplate(formValue: any) {
  const { link, step, expectResult, existResult, environment, additional } = formValue
  return `
### Reproduction link
[${link}](${link})

### Steps to reproduce
${step}

### What is expected?
${expectResult}

### What is actually happening?
${existResult}

### Environment Info 

\`\`\`shell
${environment}
\`\`\`

${additional ? `---\n${additional}` : ''}`
}

export function getFeatureTemplate(formValue: any) {
  const { motivation, proposal } = formValue
  return `
## What problem does this feature solve?
${motivation}

## What does the proposed API look like?
${proposal}`
}
