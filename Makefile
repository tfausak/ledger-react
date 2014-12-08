BIN=node_modules/.bin/
COGS=$(BIN)cogs

dev:
	$(COGS) -w src

compress:
	$(COGS) -c
