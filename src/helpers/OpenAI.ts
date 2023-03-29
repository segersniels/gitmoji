import { Configuration, OpenAIApi } from 'openai';
import Gitmoji from 'types/Gitmoji';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export async function generatePrompt(diff: string, gitmojis: Gitmoji[]) {
  const list = gitmojis.map(
    gitmoji => `${gitmoji.code} - ${gitmoji.description}`,
  );

  return `
    Refer to the provided git diff or code snippet and provide a suitable commit message.

    When reviewing the diff or code, focus on identifying the main purpose of the changes.
    Are they fixing a bug, adding a new feature, improving performance or readability, or something else?
    Use this information to craft a concise and detailed gitmoji commit message that clearly describes what the provided code or diff does.

    When reviewing a diff, pay attention to the changed filenames and extract the context of the changes.
    This will help you create a more relevant and informative commit message.
    Here are some examples of how you can interpret some changed filenames:
      - Files or filepaths that reference testing are usually related to tests.
      - Markdown files are usually related to documentation.
      - Config file adjustments are usually related to configuration changes.

    Here is a list of gitmoji codes and their descriptions of what they mean when they are used: """
    ${list}
    """

    Try to match the generated message to a fitting emoji using its description from the provided list above.
    Always start your commit message with a gitmoji followed by the message starting with a capital letter.
    Limit yourself to one sentence but don't end it in a punctuation mark and try to stay within 80 characters.
    Never mention file names or function names in the message.

    Don't do this:
      - :bug: Fix issue in calculateTotalPrice function
      - :zap: Improve performance of calculateTopProducts function
      - :lipstick: Refactor styling for calculateCartTotal function
      - :memo: Update documentation for getProductById function

    Do this:
      - :bug: Fix issue with shopping cart checkout process
      - :zap: Improve performance of search functionality
      - :lipstick: Refactor styling for product details page
      - :memo: Update documentation for API endpoints

    Here is the provided git diff or code snippet: """
    ${diff}
    """
  `;
}
