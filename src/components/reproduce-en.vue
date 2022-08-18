<template>
  <div class="paragraph">
    <p>A bug reproduction is a piece of code that can run and demonstrate how a bug can happen.</p>
    <h5 id="text-is-not-enough">Text is not enough</h5>
    <p>
      It's impossible to fix a bug from mere text descriptions. First, it's very difficult to
      precisely describe a technical problem while keeping it easy to follow; Second, the real cause
      may very well be something that you forgot to even mention. A reproduction is the only way
      that can reliably help us understand what is going on, so please provide one.
    </p>
    <h5 id="a-repro-must-be-runnable">A repro must be runnable</h5>
    <p>
      Screenshots or videos are <strong>NOT</strong> reproductions! They only show that the bug
      exists, but do not provide enough information on why it happens. Only runnable code provides
      the most complete context and allows us to properly debug the scenario. That said, in some
      cases videos/gifs can help explain interaction issues that are hard to describe in text.
    </p>
    <h5 id="a-repro-should-be-minimal">A repro should be minimal</h5>
    <p>
      Some users would give us a link to a real project and hope we can help them figure out what is
      wrong. We generally do not accept such requests because:
    </p>
    <ul>
      <li>
        <p>
          You are already familiar with your codebase, but we are not. It is extremely
          time-consuming to hunt a bug in a big and unfamiliar codebase.
        </p>
      </li>
      <li>
        <p>
          The problematic behavior may very well be caused by your code rather than by a bug in
          iDux.
        </p>
      </li>
    </ul>
    <p>
      A <strong>minimal</strong> reproduction means it demonstrates the bug, and the bug only. It
      should only contain the bare minimum amount of code that can reliably cause the bug. Try your
      best to get rid of anything that aren't directly related to the problem.
    </p>
  </div>
</template>
