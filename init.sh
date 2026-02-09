#!/bin/bash
# For Crypto Mobile - Dev Environment Init
# Run this at the start of every coding session

set -e
cd ~/for-crypto-mobile

echo "=== Environment Check ==="
echo "Branch: $(git branch --show-current)"
echo "Last commit: $(git log --oneline -1)"
echo "Status:"
git status --short

echo ""
echo "=== Installing Dependencies ==="
npm install --silent 2>/dev/null || yarn install --silent 2>/dev/null

echo ""
echo "=== Starting Expo Dev Server ==="
npx expo start --tunnel &
EXPO_PID=$!
sleep 10

echo ""
echo "=== Smoke Test ==="
if curl -s http://localhost:8081 > /dev/null 2>&1; then
  echo "PASS: Expo dev server responding"
else
  echo "WARN: Expo dev server not responding on 8081 (may use different port with tunnel)"
fi

echo ""
echo "=== Progress Summary ==="
if [ -f progress.json ]; then
  python3 -c "
import json
with open('progress.json') as f:
    p = json.load(f)
print(f'Phase: {p[\"currentPhase\"]}')
print(f'Completed: {len(p[\"completedFeatures\"])} features')
print(f'In Progress: {p[\"inProgress\"]}')
print(f'Blocked: {len(p[\"blocked\"])} items')
print(f'Last updated: {p[\"lastUpdatedAt\"]} by {p[\"lastUpdatedBy\"]}')
"
fi

echo ""
echo "=== Feature Status ==="
if [ -f feature-list.json ]; then
  python3 -c "
import json
with open('feature-list.json') as f:
    features = json.load(f)
passing = sum(1 for f in features if f['passes'])
total = len(features)
print(f'{passing}/{total} features passing')
failing = [f for f in features if not f['passes']]
print(f'Next up: {failing[0][\"id\"]} - {failing[0][\"description\"]}' if failing else 'All done!')
"
fi

echo ""
echo "=== Ready to code. Pick ONE feature from feature-list.json and implement it. ==="
