<p align="center">
  <img src="https://github.com/ibm-granite/granite-3.1-language-models/blob/main/figures/granite-3_1-language-models-3x-v1.png" />
</p>

<p align="center">
  :books: <a href="https://github.com/ibm-granite/granite-3.1-language-models/">Paper (comming soon)</a>&nbsp | :hugs: <a href="https://huggingface.co/collections/ibm-granite/granite-31-language-models-6751dbbf2f3389bec5c6f02d">HuggingFace Collection</a>&nbsp | 
  :speech_balloon: <a href="https://github.com/orgs/ibm-granite/discussions">Discussions Page</a>&nbsp | 📘 <a href="https://www.ibm.com/granite/docs/">IBM Granite Docs</a>
<br>

---
## Introduction to Granite 3.1 Language Models
Granite 3.1 language models are lightweight, state-of-the-art, open foundation models that natively support multilinguality, coding, reasoning, and tool usage, including the potential to be run on constrained compute resources. All the models are publicly released under an Apache 2.0 license for both research and commercial use. The models' data curation and training procedure were designed for enterprise usage and customization, with a process that evaluates datasets for governance, risk and compliance (GRC) criteria, in addition to IBM's standard data clearance process and document quality checks.

Granite 3.1 language models extend the context length of Granite 3.0 language models from 4K to 128K using a progressive training strategy by increasing the supported context length in increments while adjusting RoPE theta until the models successfully adapt to the desired length of 128K. This long-context pre-training stage was performed using approximately 500B tokens. Moreover, Granite 3.1 instruction models provide an improved developer experience for function-calling and RAG generation tasks.

Granite 3.1 models come in 4 varying sizes and 2 architectures:
- Dense Models: 2B and 8B parameter models, trained on 12 trillion tokens in total.
- Mixture-of-Expert (MoE) Models: Sparse 1B and 3B MoE models, with 400M and 800M activated parameters respectively, trained on 10 trillion tokens in total.

Accordingly, these options provide a range of models with different compute requirements to choose from, with appropriate trade-offs with their performance on downstream tasks. At each scale, we release base model — checkpoints of models after pretraining, as well as instruct checkpoints — models finetuned for dialogue, instruction-following, helpfulness, and safety.

Evaluation results show that Granite-3.1-8B-Instruct outperforms models of similar parameter sizes in [Hugging Face's OpenLLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard#/) (see Figure 1). 

<figure>
  <img src="https://github.com/ibm-granite/granite-3.1-language-models/blob/main/figures/granite-3_1-8b-instruct.png"
  alt=" Granite-3.1-8B-Instruct">
  <figcaption>
  Figure 1. Evaluation results from Granite-3.1-8B-Instruct in Hugging Face's OpenLLM Leaderboard.</figcaption>
</figure>

Comprehensive evaluation results for all model variants, as well as other relevant information will be available in Granite 3.1 Language Models technical report.

## How to Use our Models?
To use any of our models, pick an appropriate `model_path` from:
1. `ibm-granite/granite-3.1-2b-base`
2. `ibm-granite/granite-3.1-2b-instruct`
3. `ibm-granite/granite-3.1-8b-base`
4. `ibm-granite/granite-3.1-8b-instruct`
5. `ibm-granite/granite-3.1-1b-a400m-base`
6. `ibm-granite/granite-3.1-1b-a400m-instruct`
7. `ibm-granite/granite-3.1-3b-a800m-base`
8. `ibm-granite/granite-3.1-3b-a800m-instruct`

### Inference
This is a simple example of how to use Granite-3.1-1B-A400M-Instruct model.

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

device = "auto"
model_path = "ibm-granite/granite-3.1-1b-a400m-instruct"
tokenizer = AutoTokenizer.from_pretrained(model_path)
# drop device_map if running on CPU
model = AutoModelForCausalLM.from_pretrained(model_path, device_map=device)
model.eval()
# change input text as desired
chat = [
    { "role": "user", "content": "Please list one IBM Research laboratory located in the United States. You should only output its name and location." },
]
chat = tokenizer.apply_chat_template(chat, tokenize=False, add_generation_prompt=True)
# tokenize the text
input_tokens = tokenizer(chat, return_tensors="pt").to(device)
# generate output tokens
output = model.generate(**input_tokens, 
                        max_new_tokens=100)
# decode output tokens into text
output = tokenizer.batch_decode(output)
# print output
print(output)
```
## How to Download our Models?
The model of choice (granite-3.1-1b-a400m-instruct in this example) can be cloned using:
```shell
git clone https://huggingface.co/ibm-granite/granite-3.1-1b-a400m-instruct
```

## How to Contribute to this Project?
Plese check our [Guidelines](/CONTRIBUTING.md) and [Code of Conduct](/CODE_OF_CONDUCT.md) to contribute to our project.

## Model Cards
The model cards for each model variant are available in their respective HuggingFace repository. Please visit our collection [here](https://huggingface.co/collections/ibm-granite/granite-31-language-models-6751dbbf2f3389bec5c6f02d).

## License 
All Granite 3.0 Language Models are distributed under [Apache 2.0](./LICENSE) license.

## Would you like to provide feedback?
Please let us know your comments about our family of language models by visiting our [collection](https://huggingface.co/collections/ibm-granite/granite-31-language-models-6751dbbf2f3389bec5c6f02d). Select the repository of the model you would like to provide feedback about. Then, go to *Community* tab, and click on *New discussion*. Alternatively, you can also post any questions/comments on our [github discussions page](https://github.com/orgs/ibm-granite/discussions).

<!-- ## Citation
If you find granite models useful, please cite:

```
@misc{granite2024granite,
  title={Granite 3.0 Language Models},
  url={},
  author={Granite Team, IBM},
  month={October},
  year={2024}
}
``` -->