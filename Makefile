GITMOJI_URL=https://raw.githubusercontent.com/carloscuesta/gitmoji/master/packages/gitmojis/src/gitmojis.json
GITMOJI_FILEPATH=./src/data/gitmojis.json.temp

sync:
	@curl ${GITMOJI_URL} --output ${GITMOJI_FILEPATH} --silent
	@echo "File synced..."
