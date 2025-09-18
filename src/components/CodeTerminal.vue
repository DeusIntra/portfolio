<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'


interface Token {
  type: string
  content: string
}

interface AnimatedToken extends Token {
  animatedContent: string
  isVisible: boolean
}

interface TokenLine {
  tokens: AnimatedToken[]
  isComplete: boolean
}

type RegExGroup = { type: string, name: number }
type TokenPattern = {
  groups: string | RegExGroup[],
  regex: RegExp
}

const props = defineProps({
  lines: { type: Array<string>, required: true },
  delay: { type: Number, default: 0 },
  typingSpeed: { type: Number, default: 50 },
})

const isVisible = ref(false);
const animatedLines = ref<TokenLine[]>([])
const isTypingComplete = ref(false)
const currentLineIndex = ref(0)
const currentTokenIndex = ref(0)
const currentCharIndex = ref(0)

const showCursor = computed(() => {
  return !isTypingComplete.value &&
    currentLineIndex.value < animatedLines.value.length &&
    currentTokenIndex.value < animatedLines.value[currentLineIndex.value].tokens.length
})

function parseLine(line: string): Token[] {
  const tokens: Token[] = []
  let remaining = line

  const patterns: TokenPattern[] = [
    {
      regex: /^(const|let|var)(\s+)(.*)\b/,
      groups: [
        { type: 'keyword', name: 1 },
        { type: 'text', name: 2 },
        { type: 'identifier', name: 3 }
      ]
    },
    {
      regex: /^(function|return|if|else|for|while|switch|case|break|default)\b/,
      groups: 'keyword',
    },
    { groups: 'string', regex: /^("[^"]*"|'[^']*')/ },
    { groups: 'property', regex: /^(\w+):/ },
    { groups: 'punctuation', regex: /^(\(|\)|;|,|=)/ },
    { groups: 'brackets', regex: /^(\{|\}|\[|\])/ },
    { groups: 'number', regex: /^\d+(\.\d+)?/ },
    { groups: 'text', regex: /^\s+/ },
    { groups: 'text', regex: /^./ },
  ]

  while (remaining.length > 0) {
    let matched = false
    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex)

      if (match) {
        const groups: RegExGroup[] = typeof (pattern.groups) === 'string' ?
          [{ type: pattern.groups, name: 0 }] : pattern.groups
        const fullContent = match[0]
        for (const group of groups) {
          tokens.push({ type: group.type, content: match[group.name] })
        }
        matched = true
        remaining = remaining.slice(fullContent.length)
        break
      }
    }

    if (!matched) {
      tokens.push({ type: 'text', content: remaining[0] })
      remaining = remaining.slice(1)
    }
  }
  if (tokens.length > 0) {
    const match = tokens[0].content.match(/^\s+/)
    if (match) {
      tokens[0].content = tokens[0].content.replace(/\s/g, '\u00a0')
    }
  }
  return tokens
}

function initializeAnimatedLines() {
  animatedLines.value = props.lines.map(line => ({
    tokens: parseLine(line).map(token => ({
      ...token,
      animatedContent: '',
      isVisible: false
    })),
    isComplete: false
  }))
  isTypingComplete.value = false
}

function startTypingAnimation() {
  const typeNextCharacter = () => {
    if (currentLineIndex.value >= animatedLines.value.length) {
      isTypingComplete.value = true
      return
    }

    const currentLine = animatedLines.value[currentLineIndex.value]
    const currentToken = currentLine.tokens[currentTokenIndex.value]

    if (currentCharIndex.value < currentToken.content.length) {
      currentToken.animatedContent += currentToken.content[currentCharIndex.value]
      currentCharIndex.value++
    } else {
      currentToken.isVisible = true
      currentTokenIndex.value++
      currentCharIndex.value = 0

      if (currentTokenIndex.value >= currentLine.tokens.length) {
        currentLine.isComplete = true
        currentLineIndex.value++
        currentTokenIndex.value = 0
      }
    }

    if (currentLineIndex.value < animatedLines.value.length) {
      setTimeout(typeNextCharacter, props.typingSpeed)
    } else {
      isTypingComplete.value = true
    }
  }

  setTimeout(typeNextCharacter, props.delay)
}


onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
    initializeAnimatedLines()
    startTypingAnimation()
  }, props.delay)
})

</script>

<template>
  <div class="card code-terminal" :class="{ 'code-terminal--visible': isVisible }">
    <div v-for="(line, lineIndex) in animatedLines" :key="lineIndex" class="code-terminal__line">
      <span class="code-terminal__line-number">
        {{
          line.tokens.some((t: AnimatedToken) =>
            t.animatedContent.length > 0) || lineIndex === 0 ?
            lineIndex + 1 : ''
        }}
      </span>
      <div>
        <span v-for="(token, tokenIndex) in line.tokens" :key="tokenIndex"
          :class="`code-terminal__token code-terminal__token--${token.type}`">
          <span v-if="token.isVisible">{{ token.content }}</span>
          <span v-else>{{ token.animatedContent }}</span>

          <span v-if="showCursor && lineIndex === currentLineIndex && tokenIndex === currentTokenIndex"
            class="code-terminal__cursor code-terminal__cursor--typing"></span>
        </span>
      </div>
    </div>
    <div v-if="isTypingComplete" class="code-terminal__prompt">
      <span class="code-terminal__line-number">{{ animatedLines.length + 1 }}</span>
      <span class="code-terminal__cursor code-terminal__cursor--prompt"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.code-terminal {
  font-family: 'Fira Code', monospace;
  overflow: hidden;
  text-align: left;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &__line {
    margin-bottom: 4px;
    display: flex;
    align-items: flex-start;
    min-height: 1.1rem;
    position: relative;
    padding: 0 12px;
  }

  &__line-number {
    color: var(--code-line-number, #6e7681);
    margin-right: 12px;
    margin-top: 4px;
    user-select: none;
    min-width: 24px;
    text-align: right;
    font-size: 12px;
    flex-shrink: 0;
  }

  &__cursor {
    width: 0.6em;
    height: 1.1em;
    background: var(--code-cursor, #569cd6);
    vertical-align: text-top;
    margin-left: -1px;
    margin-top: 2px;

    &--typing {
      display: inline-block;
    }

    &--prompt {
      animation: blink 1s infinite;
    }
  }

  &__prompt {
    display: flex;
    align-items: center;
    padding: 0 12px;
  }

  $tokenColors: (
    keyword: #569cd6,
    string: #ce9178,
    property: #9cdcfe,
    punctuation: #d4d4d4,
    brackets: #d4d4d4,
    identifier: #4ec9b0,
    text: #d4d4d4,
    number: #d4d4d4,
  );

  @each $type, $clr in $tokenColors {
    &__token--#{$type} {
      color: var(--code-#{$type}, #{$clr});
    }
  }
}

@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .code-terminal {
    font-size: 12px;

    &__line {
      padding: 0 10px;
    }

    &__line-number {
      min-width: 20px;
      margin-right: 8px;
    }
  }
}

@media (max-width: 480px) {
  .code-terminal {
    font-size: 11px;

    &__line {
      padding: 0 8px;
    }

    &__line-number {
      min-width: 18px;
      margin-right: 6px;
      font-size: 10px;
    }
  }
}
</style>
