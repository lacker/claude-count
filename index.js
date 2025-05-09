#!/usr/bin/env node

const fs = require("fs");
const { program } = require("commander");
const { Anthropic } = require("@anthropic-ai/sdk");

// Parse command line arguments
program
  .name("claude-count")
  .description("Count Claude API tokens in a file or stdin")
  .version("1.0.0")
  .argument(
    "[filename]",
    "File to count tokens from (optional, defaults to stdin)"
  )
  .parse(process.argv);

async function countTokens(apiKey, text) {
  const anthropic = new Anthropic({
    apiKey,
  });

  try {
    const result = await anthropic.messages.countTokens({
      model: "claude-3-7-sonnet-20250219",
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
    });

    return result.input_tokens;
  } catch (error) {
    console.error("Error counting tokens:", error.message);
    process.exit(1);
  }
}

async function main() {
  const filename = program.args[0];

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === "") {
    console.error("Error: ANTHROPIC_API_KEY environment variable is required");
    process.exit(1);
  }

  let text;

  if (filename) {
    try {
      text = fs.readFileSync(filename, "utf8");
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
      process.exit(1);
    }
  } else {
    // Read from stdin
    const chunks = [];
    process.stdin.setEncoding("utf8");

    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }

    text = chunks.join("");
  }

  const tokenCount = await countTokens(apiKey, text);
  console.log(tokenCount);
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
