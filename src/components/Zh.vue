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
      <h2>在你开始之前...</h2>
      <p>
        @idux 的 issue 列表只接受 bug 报告或是新功能请求 (feature requests)。这意味着
        <strong>我们不接受用法问题</strong>。如果你开的 issue不符合规定，它将会被
        <strong>立刻关闭</strong>。
        <a @click="showIntro">为什么要这么严格？</a>
      </p>
      <p>对于使用中遇到的问题，请使用以下资源：</p>
      <ul>
        <li>
          仔细阅读
          <a href="http://idux.site/docs/introduce/zh" target="_blank">文档</a>
        </li>
        <li>
          在
          <a href="https://stackoverflow.com/questions/ask?tags=idux" target="_blank">
            StackOverflow
          </a>
          (英文)
          <a href="https://segmentfault.com/t/idux" target="_blank">SegmentFault</a>
          (中文) 搜索和提问
        </li>
      </ul>
      <p>
        最后，在开 issue 前，可以先搜索一下以往的旧 issue -
        你遇到的问题可能已经有人提了，也可能已经在最新版本中被修正。注意：如果你发现一个已经关闭的旧
        issue 在最新版本中仍然存在，请不要在旧 issue 下面留言，而应该用下面的表单开一个新的 issue。
      </p>
    </div>
    <div>
      <IxForm :control="formGroup" layout="vertical">
        <IxRow>
          <IxCol span="11">
            <IxFormItem label="相关仓库" labelTooltip="请确保将 issue 发往相关的仓库">
              <IxSelect control="repository" :options="repositories"></IxSelect>
            </IxFormItem>
          </IxCol>
          <IxCol span="12" offset="1">
            <IxFormItem label="这是一个">
              <IxRadioGroup control="type" buttoned :options="types"></IxRadioGroup>
            </IxFormItem>
          </IxCol>
          <IxCol span="24">
            <IxFormItem control="title.content" label="Issue 标题" required message="请填写标题">
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
              <h3>相关 Issue：</h3>
              <ul>
                <li v-for="issue in searchIssues">
                  <a target="_blank" :href="issue.html_url">{{ issue.title }}</a>
                </li>
              </ul>
            </IxFormItem>
          </IxCol>
          <template v-if="issueType == 'bug'">
            <IxCol span="24">
              <IxFormItem required message="请填写环境信息">
                <template #label>
                  <span>
                    环境信息
                    <IxTooltip title="Vue 版本/@idux版本/浏览器版本/等信息">
                      <IxIcon name="question-circle" />
                    </IxTooltip>
                  </span>
                  <span>
                    输入命令：
                    <code> npx envinfo --npmPackages '{vue,@idux/*}' --browsers </code>
                  </span>
                </template>
                <IxTextarea control="environment" rows="4" :autosize="{ minRows: 4 }"></IxTextarea>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem
                label="重现链接"
                required
                message="请填写 CodeSandbox, StackBlitz 或者 GitHub 链接"
              >
                <IxInput control="link" />
                <p>
                  请提供一个尽可能精简的链接
                  <a href="https://codesandbox.io/s/idux-starter-7o9lv" target="_blank">
                    CodeSandbox
                  </a>
                  或者
                  <a href="https://stackblitz.com/edit/idux-starter" target="_blank">
                    StackBlitz
                  </a>
                  的链接。
                  <a @click="showReprod">什么是最小化重现，为什么这是必需的？</a>
                </p>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem label="重现步骤" required message="请填写重现步骤">
                <IxTextarea control="step" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
                <p>
                  简洁清晰的重现步骤能够帮助我们更迅速地定位问题所在。支持使用
                  <a href="https://guides.github.com/features/mastering-markdown/" target="_blank">
                    Markdown
                  </a>
                  来格式化列表或是代码片段。
                </p>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem label="期望的结果是什么？" required message="请填写期望的结果">
                <IxTextarea control="expectResult" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem label="实际的结果是什么？" required message="请填写实际的结果">
                <IxTextarea control="existResult" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem
                label="补充说明（可选）"
                labelTooltip="比如：遇到这个 bug 的业务场景、上下文"
              >
                <IxTextarea control="additional" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
              </IxFormItem>
            </IxCol>
          </template>
          <template v-if="issueType == 'feature'">
            <IxCol span="24">
              <IxFormItem label="这个功能解决了什么问题？" required message="请填写此项">
                <IxTextarea rows="2" control="motivation" :autosize="{ minRows: 2 }"></IxTextarea>
                <p class="explain-paragraph">
                  请尽可能详尽地说明这个需求的用例和场景。最重要的是：解释清楚是怎样的
                  <strong>用户体验需求</strong>催生了这个功能上的需求。
                </p>
                <p>
                  @idux 的一个重要设计原则是保持 API 的简洁和直接。通常来说，我们只考虑添加在现有的
                  API 下无法轻松实现的功能。新功能的用例应当足够常见。
                </p>
              </IxFormItem>
            </IxCol>
            <IxCol span="24">
              <IxFormItem label="你期望的 API 是怎样的？" required message="请填写此项">
                <IxTextarea control="proposal" rows="2" :autosize="{ minRows: 2 }"></IxTextarea>
                <p>
                  描述一下你期望这个新功能的 API 是如何使用的，并提供一些代码示例。请用
                  <a href="https://guides.github.com/features/mastering-markdown/" target="_blank">
                    Markdown
                  </a>
                  格式化你的代码片段。
                </p>
              </IxFormItem>
            </IxCol>
          </template>
          <IxCol span="12" offset="11">
            <IxFormItem>
              <IxButton mode="primary" size="lg" @click="preview()">预览和提交</IxButton>
            </IxFormItem>
          </IxCol>
        </IxRow>
      </IxForm>
    </div>
  </div>
</template>
