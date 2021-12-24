<script setup lang="ts">
import { inject } from 'vue'
const {
  formGroup,
  repositories,
  searchIssues,
  types,
  packages,
  packageDirnames,
  issueType,
  showIntro,
  showReprod,
  preview,
} = inject('appContext')!
</script>

<template>
  <div class="intro paragraph">
    <div>
      <h2>Before You Start ...</h2>
      <p>
        The issue list is reserved exclusively for bug reports and feature requests. That means we
        do not accept usage questions. If you open an issue that does not conform to the
        requirements,
        <strong>it will be closed immediately.</strong>。
        <a @click="showIntro">Why are we so strict about this?</a>
      </p>
      <p>For usage questions, please use the following resources:</p>
      <ul>
        <li>
          Read the
          <a href="http://idux.site/docs/introduce/en" target="_blank">docs</a>
        </li>
        <li>
          Look for / ask questions on
          <a href="https://stackoverflow.com/questions/ask?tags=idux" target="_blank">
            StackOverflow
          </a>
        </li>
      </ul>
      <p>
        Also try to search for your issue - it may have already been answered or even fixed in the
        development branch. However, if you find that an old, closed issue still persists in the
        latest version, you should open a new issue using the form below instead of commenting on
        the old issue.
      </p>
    </div>
    <div>
      <IxForm :control="formGroup" layout="vertical">
        <IxRow>
          <IxCol span="11">
            <IxFormItem
              label="I am opening an issue for"
              labelTooltip="Please make sure to file the issue at appropriate repo"
            >
              <IxSelect control="repository" :options="repositories"></IxSelect>
            </IxFormItem>
          </IxCol>
          <IxCol span="12" offset="1">
            <IxFormItem label="This is a">
              <IxRadioGroup control="type" buttoned :options="types"></IxRadioGroup>
            </IxFormItem>
          </IxCol>
          <IxCol span="24">
            <IxFormItem control="title.content" label="Title" required message="Title is required">
              <IxRow>
                <IxCol span="3">
                  <IxSelect control="title.package" :options="packages"></IxSelect>
                </IxCol>
                <IxCol span="5">
                  <IxSelect control="title.name" :options="packageDirnames" searchable></IxSelect>
                </IxCol>
                <IxCol span="16">
                  <IxInput control="title.content" />
                </IxCol>
              </IxRow>
            </IxFormItem>
          </IxCol>
          <IxCol span="24" v-if="searchIssues.length > 0">
            <IxFormItem>
              <h3>Similar Issues：</h3>
              <ul>
                <li v-for="issue in searchIssues">
                  <a target="_blank" :href="issue.html_url">{{ issue.title }}</a>
                </li>
              </ul>
            </IxFormItem>
          </IxCol>
          <template v-if="issueType == 'bug'">
            <IxCol span="24">
              <IxFormItem required message="Environment information is required">
                <template #label>
                  <span>
                    Environment
                    <IxTooltip title="Vue version, @idux version and browser version, etc">
                      <IxIcon name="question-circle" />
                    </IxTooltip>
                  </span>
                  <span>
                    Output of:
                    <code>
                      npx envinfo --system --npmPackages '{vue,@idux/*}' --binaries --browsers
                    </code>
                  </span>
                </template>
                <IxTextarea control="environment" rows="4" :autosize="{ minRows: 4 }"></IxTextarea>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem
                label="Link to minimal reproduction"
                required
                message="A CodeSandbox, StackBlitz or github link is required"
              >
                <IxInput control="link" />
                <p>
                  Please provide a link by forking the link
                  <a href="https://codesandbox.io/s/idux-starter-7o9lv" target="_blank">
                    CodeSandbox
                  </a>
                  or
                  <a href="https://stackblitz.com/edit/idux-starter" target="_blank">
                    StackBlitz
                  </a>
                  .
                  <a @click="showReprod">What is a minimal reproduction, and why is it required?</a>
                </p>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem label="Step to reproduce" required message="Reproduce step is required">
                <IxTextarea control="step" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
                <p>
                  Clear and concise reproduction instructions are important for us to be able to
                  triage your issue in a timely manner. Note that you can use
                  <a href="https://guides.github.com/features/mastering-markdown/" target="_blank">
                    Markdown
                  </a>
                  to format lists and code.
                </p>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem label="What is expected?" required message="Expected is required">
                <IxTextarea control="expectResult" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem label="What is actually happening?" required message="Actual is required">
                <IxTextarea control="existResult" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem
                label="Any additional comments? (optional)"
                labelTooltip="e.g. some background/context of how you ran into this bug"
              >
                <IxTextarea control="additional" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
              </IxFormItem>
            </IxCol>
          </template>
          <template v-if="issueType == 'feature'">
            <IxCol span="24">
              <IxFormItem
                label="What problem does this feature solve?"
                required
                message="This is required"
              >
                <IxTextarea rows="2" control="motivation" :autosize="{ minRows: 2 }"></IxTextarea>
                <p class="explain-paragraph">
                  Explain your use case, context, and rationale behind this feature request. More
                  importantly, what is the <strong>end user experience</strong> you are trying to
                  build that led to the need for this feature?
                </p>
                <p>
                  An important design goal of @idux is keeping the API surface small and
                  straightforward. In general, we only consider adding new features that solve a
                  problem that cannot be easily dealt with using existing APIs (i.e. not just an
                  alternative way of doing things that can already be done). The problem should also
                  be common enough to justify the addition.
                </p>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem
                label="What does the proposed API look like?"
                required
                message="This is required"
              >
                <IxTextarea control="proposal" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
                <p>
                  Describe how you propose to solve the problem and provide code samples of how the
                  API would work once implemented. Note that you can use
                  <a href="https://guides.github.com/features/mastering-markdown/" target="_blank"
                    >Markdown
                  </a>
                  to format your code blocks.
                </p>
              </IxFormItem>
            </IxCol>
          </template>
          <IxCol span="12" offset="11">
            <IxFormItem>
              <IxButton mode="primary" size="lg" @click="preview()">Preview and Submit</IxButton>
            </IxFormItem>
          </IxCol>
        </IxRow>
      </IxForm>
    </div>
  </div>
</template>
