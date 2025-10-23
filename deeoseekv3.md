### Install SGLang with Docker for DeepSeek-V3.2-Exp

Source: https://github.com/deepseek-ai/deepseek-v3.2-exp/blob/main/README.md

Provides Docker pull commands for installing SGLang with DeepSeek-V3.2-Exp support. Different tags are available for various hardware configurations like H200, MI350, and NPUs.

```docker
# H200
docker pull lmsysorg/sglang:dsv32

# MI350
docker pull lmsysorg/sglang:dsv32-rocm

# NPUs
docker pull lmsysorg/sglang:dsv32-a2
docker pull lmsysorg/sglang:dsv32-a3
```

--------------------------------

### Launch SGLang Server for DeepSeek-V3.2-Exp

Source: https://github.com/deepseek-ai/deepseek-v3.2-exp/blob/main/README.md

Launches the SGLang server to serve the DeepSeek-V3.2-Exp model. This command specifies the model name and tensor/pipeline parallelism degrees. It also enables deep speed attention optimization.

```bash
python -m sglang.launch_server --model deepseek-ai/DeepSeek-V3.2-Exp --tp 8 --dp 8 --enable-dp-attention
```

--------------------------------

### Launch DeepSeek V3.2 Interactive Chat Interface (Bash)

Source: https://github.com/deepseek-ai/deepseek-v3.2-exp/blob/main/inference/README.md

This command launches the interactive chat interface for DeepSeek V3.2. It requires setting environment variables for the configuration file and the model save path. The script uses `torchrun` for distributed training/inference, specifying the number of processes per node based on the model parallelism setting.

```bash
export CONFIG=config_671B_v3.2.json
torchrun --nproc-per-node ${MP} generate.py --ckpt-path ${SAVE_PATH} --config ${CONFIG} --interactive
```

--------------------------------

### Convert HuggingFace Model Weights for DeepSeek V3.2 (Bash)

Source: https://github.com/deepseek-ai/deepseek-v3.2-exp/blob/main/inference/README.md

This script converts HuggingFace model weights to the format required for the DeepSeek V3.2 inference demo. It requires setting environment variables for the model path, save path, number of experts, and model parallelism (GPU count).

```bash
cd inference
export EXPERTS=256
python convert.py --hf-ckpt-path ${HF_CKPT_PATH} --save-path ${SAVE_PATH} --n-experts ${EXPERTS} --model-parallel ${MP}
```

--------------------------------

### BibTeX Citation for DeepSeek-V3.2-Exp

Source: https://github.com/deepseek-ai/deepseek-v3.2-exp/blob/main/README.md

BibTeX entry for citing the DeepSeek-V3.2-Exp model and its associated paper. This format is commonly used in academic publications.

```bibtex
@misc{deepseekai2024deepseekv32,
      title={DeepSeek-V3.2-Exp: Boosting Long-Context Efficiency with DeepSeek Sparse Attention},
      author={DeepSeek-AI},
      year={2025},
}
```