#!/bin/sh
# Wrapper para cron: acha o Node (inclusive o ea-nodejs do cPanel) e roda o script.
# Uso:  bash run.sh check-token.js      |      bash run.sh run-due.js
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR" || exit 1

# procura um node disponível, em ordem de preferência
NODE="$(command -v node 2>/dev/null)"
[ -z "$NODE" ] && NODE="$(ls /opt/cpanel/ea-nodejs*/bin/node 2>/dev/null | sort -V | tail -1)"
[ -z "$NODE" ] && NODE="$(ls /opt/alt/alt-nodejs*/root/usr/bin/node 2>/dev/null | sort -V | tail -1)"
[ -z "$NODE" ] && NODE="$(ls /usr/local/bin/node /usr/bin/node 2>/dev/null | head -1)"

if [ -z "$NODE" ]; then
  echo "ERRO: Node.js nao encontrado no servidor."
  echo "Voce tem root (WHM): instale o Node (ex.: pacote ea-nodejs20) ou peca ao provedor."
  exit 1
fi

echo "Node: $NODE ($("$NODE" -v 2>&1))"
echo "Pasta: $DIR"
echo "-----"
exec "$NODE" "$@"
