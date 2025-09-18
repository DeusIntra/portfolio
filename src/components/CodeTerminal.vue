<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const props = defineProps({
  lines: { type: Array<string>, required: true },
  delay: { type: Number, default: 0 },
  typingSpeed: { type: Number, default: 50 },
})

const animatedLines = ref<TokenLine[]>([])
const isTypingComplete = ref(false)

type RegExGroup = {type: string, name: number}
type TokenPattern = {
  groups: string | RegExGroup[],
  regex: RegExp
}

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
          [{type: pattern.groups, name: 0}] : pattern.groups
        const fullContent = match[0]
        for (const group of groups) {
            tokens.push({ type: group.type, content: match[group.name].replace(/ /g, '\u00a0') })
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
  return tokens
}

// Инициализация анимированных строк
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

// Запуск анимации печатания
const startTypingAnimation = () => {
  let currentLineIndex = 0
  let currentTokenIndex = 0
  let currentCharIndex = 0

  const typeNextCharacter = () => {
    if (currentLineIndex >= animatedLines.value.length) {
      isTypingComplete.value = true
      return
    }

    const currentLine = animatedLines.value[currentLineIndex]
    const currentToken = currentLine.tokens[currentTokenIndex]

    if (currentCharIndex < currentToken.content.length) {
      // Печатаем следующий символ
      currentToken.animatedContent += currentToken.content[currentCharIndex]
      currentCharIndex++
    } else {
      // Переходим к следующему токену
      currentToken.isVisible = true
      currentTokenIndex++
      currentCharIndex = 0

      if (currentTokenIndex >= currentLine.tokens.length) {
        currentLine.isComplete = true
        currentLineIndex++
        currentTokenIndex = 0
      }
    }

    if (currentLineIndex < animatedLines.value.length) {
      setTimeout(typeNextCharacter, props.typingSpeed)
    } else {
      isTypingComplete.value = true
    }
  }

  setTimeout(typeNextCharacter, props.delay)
}

onMounted(() => {
  initializeAnimatedLines()
  startTypingAnimation()
})

</script>

<template>
  <div class="card code-terminal">
    <div v-for="(line, lineIndex) in animatedLines" :key="lineIndex" class="code-line">
      <template
        v-for="(token, tokenIndex) in line.tokens"
        :key="tokenIndex"
      >
        <span v-if="tokenIndex === 0" class="line-number">
          {{ token.isVisible || lineIndex === 0 ? lineIndex + 1 : '' }}
        </span>
        <span :class="`token-${token.type}`">
          {{ token.isVisible ? token.content : token.animatedContent }}
        </span>
      </template>
    </div>
    <div v-if="isTypingComplete" class="terminal-prompt">
      <span class="line-number">{{ animatedLines.length + 1 }}</span>
      <span class="prompt-cursor"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.code-terminal {
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: left;

  .code-line {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    height: 1.1rem;
  }
}

.line-number {
  color: var(--code-line-number, #6e7681);
  margin-right: 12px;
  margin-top: 4px;
  user-select: none;
  min-width: 24px;
  text-align: right;
  font-size: 12px;
}

.terminal-prompt {
  display: flex;
}

.prompt-cursor {
  width: 8px;
  height: 1.1rem;
  align-self: center;
  background: var(--code-cursor, #569cd6);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
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
  .token-#{$type} {
    color: var(--code-#{$type}, #{$clr});
  }
}

/* Медиазапросы для мобильных */
@media (max-width: 768px) {
  .code-terminal {
    font-size: 12px;
    padding: 12px;
  }

  .line-number {
    min-width: 20px;
    margin-right: 8px;
  }
}

@media (max-width: 480px) {
  .code-terminal {
    font-size: 11px;
    padding: 8px;
  }

  .line-number {
    min-width: 18px;
    margin-right: 6px;
    font-size: 10px;
  }
}
</style>
