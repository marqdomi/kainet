#!/bin/bash

echo "🔍 Verificando workflows en todas las ramas..."

echo ""
echo "📋 Rama MAIN:"
git show origin/main:.github/workflows/ 2>/dev/null | grep -E "\.(yml|yaml)$" | while read file; do
  echo "  ✅ $file"
done

echo ""
echo "📋 Rama DEV:"
git show origin/dev:.github/workflows/ 2>/dev/null | grep -E "\.(yml|yaml)$" | while read file; do
  echo "  ✅ $file"
done

echo ""
echo "🎯 Workflows que deberían existir:"
echo "  ✅ generate-weekly-posts.yml (en main y dev)"

echo ""
echo "❌ Workflows que NO deberían existir:"
echo "  🚫 weekly-ai-news.yml (en ninguna rama)"

echo ""
echo "🔗 Para verificar en GitHub:"
echo "  https://github.com/marqdomi/kainet/actions"