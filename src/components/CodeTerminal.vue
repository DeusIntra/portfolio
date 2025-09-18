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
    // { type: 'number', regex: /^\d*/ },
    { type: 'text', regex: /^\s+/ },
    { type: 'text', regex: /^./ },
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
  <div class="card code-terminal">
    <div v-for="(line, lineIndex) in tokenizedLines" :key="lineIndex">
      <span class="line-number">{{ lineIndex + 1 }}</span>
      <span v-for="(token, tokenIndex) in line.tokens" :key="tokenIndex" :class="`token-${token.type}`">
        {{ token.content }}
      </span>
    </div>
    <div class="terminal-prompt">
      <span class="line-number">{{ tokenizedLines.length + 1 }}</span>
      <span class="prompt-cursor"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.code-terminal {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  div {
    margin-bottom: 4px;
  }
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
