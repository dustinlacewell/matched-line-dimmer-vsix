# matched-line-dimmer

Use regular expressions to dim matched lines.

## Features

- Global regex patterns that match anywhere
- File-extension/Language scoped rules
- Configurable dimming opacity

## Extension Settings

Set `matched-line-dimmer.*` in your user JSON config:

```
{
    "matched-line-dimmer.enabled": false,
    "matched-line-dimmer.patterns": [],
    "matched-line-dimmer.rules": [],
    "matched-line-dimmer.opacity": 50;
}
```

### Enabled

Globally enable/disable matched-line dimming.

### Patterns

An array of strings containing regular expressions.

These patterns apply globally, to any file.

### Rules

An array of objects with the following attributes:

One of:
- `pattern`: A single regex pattern
- `patterns`: An array of regex patterns

And one of (or both):
- `extensions`: An array of file-extensions
- `languages`: An array of language identifiers

Matched lines will be dimmed in files matching the extension or language of any rule.

## Known Issues

When switching tabs, there is a 1 frame delay before the lines are dimmed. If anyone knows how to resolve this, please reach out on the github.

## Release Notes

Here are some noteworthy historical changes.

### 0.0.1

Initial release.