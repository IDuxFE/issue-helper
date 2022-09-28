export const playground_link_reg =
  /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*(playground)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+/

export function getBugTemplate(formValue: any) {
  const { link, step, expectResult, existResult, environment, additional } = formValue

  return `
### Reproduction link
[${playground_link_reg.test(link) ? 'playground' : link}](${link})

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
