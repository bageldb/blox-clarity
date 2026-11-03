#!/bin/bash
# Netlify's Git-triggered builds do not receive build-hook metadata. Blox
# already stored a site build token in the environment, so use that as the
# hook payload when the incoming body is empty. A real hook body wins.
set -euo pipefail

if [ -z "${INCOMING_HOOK_BODY:-}" ]; then
	export INCOMING_HOOK_URL="${INCOMING_HOOK_URL:-https://api.netlify.com/build_hooks/blox}"
	export INCOMING_HOOK_TITLE="${INCOMING_HOOK_TITLE:-Blox publish}"
	printf -v INCOMING_HOOK_BODY '{"version":1,"source":"blox","website_id":"%s","grant":"%s"}' \
		"$BLOX_WEBSITE_ID" "$BLOX_BUILD_TOKEN"
	export INCOMING_HOOK_BODY
fi

bun run build
