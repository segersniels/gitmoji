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
    Refer to the provided git diff or code snippet and provide a suitable gitmoji commit message.

    Here is a list of gitmoji codes and their descriptions:
    ${list}

    When reviewing the diff or code, focus on identifying the main purpose of the changes.
    Are they fixing a bug, adding a new feature, improving performance or readability, or something else?
    Use this information to craft a concise and meaningful gitmoji commit message that clearly indicates what the provided snippet does.

    Use simple language and avoid technical jargon.
    A good commit message should provide enough information to understand the changes without being too verbose.

    When reviewing a diff, pay attention to the changed filenames and extract the context of the changes.
    This will help you create a more relevant and informative commit message.
    Here are some examples of how you can interpret some changed filenames:
      - Files or filepaths that reference testing are usually related to tests.
      - Markdown files are usually related to documentation.
      - Config file adjustments are usually related to configuration changes.

    Don't do this:
      - :bug: Fix issue with shopping cart checkout process
      - :zap: Improve performance of search functionality
      - :lipstick: Refactor styling for product details page
      - :memo: Update documentation for API endpoints

    Do this:
      - :bug: Fix issue in calculateTotalPrice function
      - :zap: Improve performance of calculateTopProducts function
      - :lipstick: Refactor styling for calculateCartTotal function
      - :memo: Update documentation for getProductById function

    Limit yourself to one sentence but don't end it in a punctuation mark.
    Always start your commit message with a gitmoji followed by the message starting with a capital letter.
    Never mention file names or function names in the message.

    Here is the provided git diff or code snippet: """
    ${diff}
    """
  `;
}
