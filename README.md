# claude-count

A simple CLI tool to count tokens using the Anthropic API.

## Installation

```bash
npm install -g claude-count
```

Or use without installing:

```bash
npx claude-count [filename]
```

## Usage

First, set your Anthropic API key:

```bash
export ANTHROPIC_API_KEY=your_api_key_here
```

Count tokens in a file:

```bash
claude-count filename.txt
```

Count tokens from stdin:

```bash
cat filename.txt | claude-count
```

or

```bash
echo "Hello, world!" | claude-count
```

## License

Apache 2.0