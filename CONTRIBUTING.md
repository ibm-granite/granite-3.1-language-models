# Contributing to Granite 3.0 Language Models
We want to make contributing to this project as straightfoward as possible.

## :memo: Issues
We use GitHub issues to track public bugs and inconsistencies. Plese follow these instructions to create an issue:
1. Create a bug/inconsistency issue by using [this](https://github.com/ibm-granite/granite-3.1-language-models/blob/main/.github/01_bug_inconsistency_report.md) template.
2. Make sure to provide all the information that the template requires. Please provide clear instructions on how to reproduce the issue.

## :hammer: Pull Requests
At present, we only welcome pull requests to correct bugs and inconsistencies. Before submitting a pull request please make sure to:
1. Create an issue by following the instructions provided in the previous section, and make sure to link it to your pull request.
2. Fork the repository and create your branch from `main`.
3. Please make sure your code lints.
4. Ensure the test suite passes.
5. If you've changed code examples, please update their respective documentation.
6. If you've added code that requires a new test, please include this test in your pull request.

## :star: License
By contributing to Granite Code Models, you agree that your contributions will be
licensed under [Apache 2.0](./LICENSE).

## Creating a Custom MCP and Code Generator
To create a custom Model Configuration Protocol (MCP) and code generator, follow these steps:

1. **Understand the Existing Structure**: Review the existing structure and functionality of the Granite 3.1 language models. This will help you understand how to integrate your custom MCP and code generator.

2. **Set Up Your Environment**: Ensure you have a suitable environment for development. Utilize your GPU server with 3xA5000 to train and test your custom MCP and code generator.

3. **Develop Your MCP**: Create your custom MCP by defining the necessary configurations and protocols. Ensure it aligns with the existing Granite 3.1 models.

4. **Create the Code Generator**: Develop the code generator that will work with your custom MCP. This generator should be able to produce code that is compatible with the Granite 3.1 models.

5. **Testing and Validation**: Use your GPU server to train and test your custom MCP and code generator. Validate the results to ensure they meet your requirements.

6. **Documentation**: Document your custom MCP and code generator thoroughly. This will help others understand and use your contributions.

7. **Contribution**: Follow the guidelines in the `CONTRIBUTING.md` file to ensure your contributions align with the project's standards.

By following these steps, you can create a custom MCP and code generator that integrates seamlessly with the Granite 3.1 language models.
