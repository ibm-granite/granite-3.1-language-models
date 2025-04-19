# Contributing to Granite 3.0 Language Models
We want to make contributing to this project as straightfoward as possible.

## :memo: Issues
We use GitHub issues to track public bugs and inconsistencies. Plese follow these instructions to create an issue:
1. Create a bug/inconsistency issue by using [this](https://github.com/ibm-granite/granite-3.1-language-models/blob/main/.github/01_bug_inconsistency_report.md) template.
2. Make sure to provide all the information that the template requires. Please provide clear instructions on how to reproduce the issue.
3. For issues related to model evaluation, please include detailed information about the evaluation process, benchmarks used, and the results obtained.

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

## :bar_chart: Model Evaluation
We welcome contributions to the evaluation of our models. To ensure consistency and reliability in the evaluation process, please follow these guidelines:

1. **Evaluation Benchmarks**: Use established benchmarks and datasets relevant to the tasks the models are designed for, such as multilinguality, coding, reasoning, and tool usage.
2. **Evaluation Metrics**: Document the metrics used for evaluation, such as accuracy, F1 score, BLEU score, etc.
3. **Reproducibility**: Provide detailed instructions and scripts to reproduce the evaluation results.
4. **Reporting Results**: Clearly document the evaluation results, including any observations or insights gained during the evaluation process.
5. **Comparison with Baselines**: Where possible, compare the evaluation results with baseline models or previous versions of the Granite language models.
