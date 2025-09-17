<script setup lang="ts">
import { computed, onMounted } from 'vue'

interface Token {
  type: string
  content: string
}

interface TokenLine {
  tokens: Token[]
}

const props = defineProps({
  lines: { type: Array<string>, required: true },
  delay: { type: Number, default: 0 },
})

function parseLine(line: string): Token[] {
  const tokens: Token[] = []
  let remaining = line

  const patterns = [
    { type: 'keyword', regex: /^(const|let|var|function|return|if|else|for|while|switch|case|break|default)\b/ },
    { type: 'string', regex: /^("[^"]*"|'[^']*')/ },
    { type: 'property', regex: /^(\w+):/ },
    { type: 'punctuation', regex: /^(\{|\}|\[|\]|\(|\)|;|,|=)/ },
    { type: 'identifier', regex: /^(developer|name|role|skills|location)\b/ },
    { type: 'text', regex: /^\s+/ },
  ]

  while (remaining.length > 0) {

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex)
      if (match) {
        const content = match[0]
        tokens.push({ type: pattern.type, content: content.replace(/ /g, '\u00a0') })
        remaining = remaining.slice(content.length)
        break
      }
    }

  }
  return tokens
}

const tokenizedLines = computed((): TokenLine[] => {
  return props.lines.map(line => ({
    tokens: parseLine(line)
  }))
})

onMounted(() => console.log(tokenizedLines.value))
</script>

<template>
  <div class="code-terminal">
    <div class="terminal-content">
      <div v-for="(line, lineIndex) in tokenizedLines" :key="lineIndex" class="code-line">
        <span class="line-number">{{ lineIndex + 1 }}</span>
        <span v-for="(token, tokenIndex) in line.tokens" :key="tokenIndex" :class="`token-${token.type}`">
          {{ token.content }}
        </span>
      </div>
      <div class="terminal-prompt">
        <span class="prompt-cursor"></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.code-terminal {
  background: var(--code-bg, #1e1e1e);
  border-radius: 8px;
  border: 1px solid var(--code-border, #333);
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.terminal-content {
  padding: 12px;
  min-height: 160px;
}

.code-line {
  margin-bottom: 4px;
}

.line-number {
  color: var(--code-line-number, #6e7681);
  margin-right: 12px;
  user-select: none;
  min-width: 24px;
  text-align: right;
  font-size: 12px;
}

.terminal-prompt {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.prompt-cursor {
  width: 8px;
  height: 16px;
  background: var(--code-cursor, #569cd6);
  animation: blink 1s infinite;
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

.token-keyword {
  color: var(--code-keyword, #569cd6);
}

.token-string {
  color: var(--code-string, #ce9178);
}

.token-property {
  color: var(--code-property, #9cdcfe);
}

.token-punctuation {
  color: var(--code-punctuation, #d4d4d4);
}

.token-identifier {
  color: var(--code-identifier, #4ec9b0);
}

.token-technology {
  color: var(--code-technology, #c586c0);
  font-weight: 500;
}

.token-text {
  color: var(--code-text, #d4d4d4);
}

/* Медиазапросы для мобильных */
@media (max-width: 768px) {
  .code-terminal {
    font-size: 12px;
  }

  .terminal-content {
    padding: 10px;
  }

  .line-number {
    min-width: 20px;
    margin-right: 8px;
  }
}

@media (max-width: 480px) {
  .code-terminal {
    font-size: 11px;
  }

  .terminal-header {
    padding: 6px 8px;
  }

  .terminal-button {
    width: 10px;
    height: 10px;
  }
}
</style>
