// Datos: genealogía de modelos LLM. Editar aquí para agregar modelos.
window.LLM_MODELS = {
  "meta": {
    "title": "Genealogía de modelos LLM",
    "updated": "2025-08",
    "note": "Relaciones 'genéticas': base = de quién desciende; relación puede ser derivación directa, inspiración o nueva arquitectura. Dataset expandido (~2025-08): familias open-weight, fine-tunes y reasoning."
  },
  "companies": {
    "Google": {
      "color": "#4285F4"
    },
    "OpenAI": {
      "color": "#10A37F"
    },
    "Meta": {
      "color": "#0866FF"
    },
    "Microsoft": {
      "color": "#00A4EF"
    },
    "Anthropic": {
      "color": "#D97757"
    },
    "Hugging Face": {
      "color": "#FF9D00"
    },
    "TII": {
      "color": "#7C3AED"
    },
    "Mistral": {
      "color": "#B76E00"
    },
    "Stanford": {
      "color": "#8C1515"
    },
    "LMSYS": {
      "color": "#2F4F4F"
    },
    "Alibaba": {
      "color": "#FF6A00"
    },
    "xAI": {
      "color": "#1DA1F2"
    },
    "Cohere": {
      "color": "#39D98A"
    },
    "01.AI": {
      "color": "#E63946"
    },
    "Zhipu": {
      "color": "#6B4C9A"
    },
    "DeepSeek": {
      "color": "#0066FF"
    },
    "SenseTime": {
      "color": "#FF4500"
    },
    "NousResearch": {
      "color": "#E0218A"
    },
    "Intel": {
      "color": "#0071C5"
    },
    "CognitiveComputations": {
      "color": "#8B4513"
    },
    "Berkeley": {
      "color": "#003262"
    },
    "OpenChat": {
      "color": "#2196F3"
    }
  },
  "models": [
    {
      "id": "transformer",
      "name": "Transformer",
      "company": "Google",
      "date": "2017-06",
      "type": "Arquitectura",
      "parents": [],
      "params": null,
      "note": "Arquitectura base de todos los LLM modernos (attention is all you need)."
    },
    {
      "id": "gpt1",
      "name": "GPT-1",
      "company": "OpenAI",
      "date": "2018-06",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "117M",
      "note": "Primer GPT: decoder de Transformer con pretraining generativo."
    },
    {
      "id": "gpt2",
      "name": "GPT-2",
      "company": "OpenAI",
      "date": "2019-02",
      "type": "Base",
      "parents": [
        "gpt1"
      ],
      "params": "1.5B",
      "note": "Escalado del pretraining autorregresivo."
    },
    {
      "id": "bert",
      "name": "BERT",
      "company": "Google",
      "date": "2018-10",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "110M",
      "note": "Encoder bidireccional, masked LM."
    },
    {
      "id": "roberta",
      "name": "RoBERTa",
      "company": "Meta",
      "date": "2019-07",
      "type": "Fine-tune",
      "parents": [
        "bert"
      ],
      "params": "125M",
      "note": "Retuning robusto de BERT."
    },
    {
      "id": "distilbert",
      "name": "DistilBERT",
      "company": "Hugging Face",
      "date": "2019-10",
      "type": "Distill",
      "parents": [
        "bert"
      ],
      "params": "66M",
      "note": "Destilación de BERT a mitad de tamaño."
    },
    {
      "id": "albert",
      "name": "ALBERT",
      "company": "Google",
      "date": "2019-12",
      "type": "Fine-tune",
      "parents": [
        "bert"
      ],
      "params": "12M",
      "note": "Parámetros compartidos."
    },
    {
      "id": "deberta",
      "name": "DeBERTa",
      "company": "Microsoft",
      "date": "2020-02",
      "type": "Fine-tune",
      "parents": [
        "bert"
      ],
      "params": "1.5B",
      "note": "Embedding mejorado (disentangled attention)."
    },
    {
      "id": "gpt3",
      "name": "GPT-3",
      "company": "OpenAI",
      "date": "2020-06",
      "type": "Base",
      "parents": [
        "gpt2"
      ],
      "params": "175B",
      "note": "Escalado masivo + few-shot."
    },
    {
      "id": "t5",
      "name": "T5",
      "company": "Google",
      "date": "2020",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "11B",
      "note": "Encoder-decoder todo-con-texto."
    },
    {
      "id": "mt5",
      "name": "mT5",
      "company": "Google",
      "date": "2020-09",
      "type": "Fine-tune",
      "parents": [
        "t5"
      ],
      "params": "13B",
      "note": "T5 multilingüe."
    },
    {
      "id": "lamda",
      "name": "LaMDA",
      "company": "Google",
      "date": "2021-05",
      "type": "Dialogue",
      "parents": [
        "transformer"
      ],
      "params": "137B",
      "note": "Afinado a diálogo."
    },
    {
      "id": "codex",
      "name": "Codex",
      "company": "OpenAI",
      "date": "2021-08",
      "type": "Code",
      "parents": [
        "gpt3"
      ],
      "params": "12B",
      "note": "Fine-tune de GPT-3 a código."
    },
    {
      "id": "t0",
      "name": "T0",
      "company": "Hugging Face",
      "date": "2021-12",
      "type": "Instruct",
      "parents": [
        "t5"
      ],
      "params": "11B",
      "note": "Instruction-tuned sobre P3."
    },
    {
      "id": "instructgpt",
      "name": "InstructGPT",
      "company": "OpenAI",
      "date": "2022-01",
      "type": "Instruct",
      "parents": [
        "gpt3"
      ],
      "params": "175B",
      "note": "RLHF: pionero del alineamiento."
    },
    {
      "id": "palm",
      "name": "PaLM",
      "company": "Google",
      "date": "2022-04",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "540B",
      "note": "Pretraining a escala Pathways."
    },
    {
      "id": "opt",
      "name": "OPT",
      "company": "Meta",
      "date": "2022-05",
      "type": "Replica",
      "parents": [
        "gpt3"
      ],
      "params": "175B",
      "note": "Réplica abierta de GPT-3."
    },
    {
      "id": "gpt35",
      "name": "GPT-3.5",
      "company": "OpenAI",
      "date": "2022-11",
      "type": "Instruct",
      "parents": [
        "instructgpt"
      ],
      "params": "—",
      "note": "Base de ChatGPT."
    },
    {
      "id": "flant5",
      "name": "FLAN-T5",
      "company": "Google",
      "date": "2022-12",
      "type": "Instruct",
      "parents": [
        "t5"
      ],
      "params": "11B",
      "note": "Instruction-tuned FLAN."
    },
    {
      "id": "gpt4",
      "name": "GPT-4",
      "company": "OpenAI",
      "date": "2023-03",
      "type": "Base",
      "parents": [
        "gpt35"
      ],
      "params": "—",
      "note": "Pretrain + RLHF a gran escala."
    },
    {
      "id": "claude1",
      "name": "Claude",
      "company": "Anthropic",
      "date": "2023-03",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "—",
      "note": "RLHF desde cero, alineamiento constitucional."
    },
    {
      "id": "llama",
      "name": "LLaMA",
      "company": "Meta",
      "date": "2023-03",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "65B",
      "note": "Pretraining abierto que desató la ola open-source."
    },
    {
      "id": "alpaca",
      "name": "Alpaca",
      "company": "Stanford",
      "date": "2023-04",
      "type": "Instruct",
      "parents": [
        "llama"
      ],
      "params": "7B",
      "note": "Fine-tune instructivo sobre LLaMA."
    },
    {
      "id": "vicuna",
      "name": "Vicuna",
      "company": "LMSYS",
      "date": "2023-04",
      "type": "Chat",
      "parents": [
        "llama"
      ],
      "params": "13B",
      "note": "Fine-tune de chat sobre LLaMA."
    },
    {
      "id": "palm2",
      "name": "PaLM 2",
      "company": "Google",
      "date": "2023-05",
      "type": "Base",
      "parents": [
        "palm"
      ],
      "params": "340B",
      "note": "Pretraining mejorado."
    },
    {
      "id": "llama2",
      "name": "LLaMA 2",
      "company": "Meta",
      "date": "2023-07",
      "type": "Base",
      "parents": [
        "llama"
      ],
      "params": "70B",
      "note": "Pretraining mejorado + licencia comercial."
    },
    {
      "id": "claude2",
      "name": "Claude 2",
      "company": "Anthropic",
      "date": "2023-07",
      "type": "Fine-tune",
      "parents": [
        "claude1"
      ],
      "params": "—",
      "note": "Iteración del modelo."
    },
    {
      "id": "falcon40b",
      "name": "Falcon-40B",
      "company": "TII",
      "date": "2023-07",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "40B",
      "note": "Pretraining abierto (Emiratos)."
    },
    {
      "id": "claudeinstant",
      "name": "Claude Instant",
      "company": "Anthropic",
      "date": "2023-07",
      "type": "Distill",
      "parents": [
        "claude1"
      ],
      "params": "—",
      "note": "Versión ligera/optimizada."
    },
    {
      "id": "codellama",
      "name": "CodeLLaMA",
      "company": "Meta",
      "date": "2023-08",
      "type": "Code",
      "parents": [
        "llama2"
      ],
      "params": "70B",
      "note": "Fine-tune a código sobre LLaMA 2."
    },
    {
      "id": "falcon180b",
      "name": "Falcon-180B",
      "company": "TII",
      "date": "2023-09",
      "type": "Base",
      "parents": [
        "falcon40b"
      ],
      "params": "180B",
      "note": "Escalado del Falcon."
    },
    {
      "id": "mistral7b",
      "name": "Mistral 7B",
      "company": "Mistral",
      "date": "2023-09",
      "type": "Base",
      "parents": [
        "llama"
      ],
      "params": "7B",
      "note": "Inspirada en LLaMA pero arquitectura propia (sliding window)."
    },
    {
      "id": "gemini",
      "name": "Gemini",
      "company": "Google",
      "date": "2023-12",
      "type": "Multimodal",
      "parents": [
        "palm"
      ],
      "params": "—",
      "note": "Modelo multimodal que hereda del linaje PaLM + Transformer."
    },
    {
      "id": "claude3",
      "name": "Claude 3",
      "company": "Anthropic",
      "date": "2024-03",
      "type": "Fine-tune",
      "parents": [
        "claude2"
      ],
      "params": "—",
      "note": "Familia Opus/Sonnet/Haiku."
    },
    {
      "id": "falcon2",
      "name": "Falcon 2",
      "company": "TII",
      "date": "2024-03",
      "type": "Fine-tune",
      "parents": [
        "falcon40b"
      ],
      "params": "11B",
      "note": "Multilingüe, versión compacta."
    },
    {
      "id": "mamba7b",
      "name": "Mamba 7B",
      "company": "TII",
      "date": "2024-04",
      "type": "Arquitectura",
      "parents": [
        "transformer"
      ],
      "params": "7B",
      "note": "Nueva arquitectura (state space), no transformer puro."
    },
    {
      "id": "gpt4o",
      "name": "GPT-4o",
      "company": "OpenAI",
      "date": "2024-05",
      "type": "Multimodal",
      "parents": [
        "gpt4"
      ],
      "params": "—",
      "note": "Multimodal nativo 'omni'."
    },
    {
      "id": "claude4",
      "name": "Claude 4",
      "company": "Anthropic",
      "date": "2025-03",
      "type": "Fine-tune",
      "parents": [
        "claude3"
      ],
      "params": "—",
      "note": "Última generación de Anthropic."
    },
    {
      "id": "codex_chatgpt",
      "name": "Codex (ChatGPT+)",
      "company": "OpenAI",
      "date": "2025-06",
      "type": "Code",
      "parents": [
        "gpt4o"
      ],
      "params": "—",
      "note": "Asistente de código."
    },
    {
      "id": "llama3",
      "name": "Llama 3",
      "company": "Meta",
      "date": "2024-04",
      "type": "Base",
      "parents": [
        "llama2"
      ],
      "params": "70B",
      "note": "Pretraining mejorado, 8B y 70B. Tokens de entrenamiento: 15T.",
      "license": "Llama 3 Community",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/meta-llama",
      "family": "Llama"
    },
    {
      "id": "llama3_1",
      "name": "Llama 3.1",
      "company": "Meta",
      "date": "2024-07",
      "type": "Base",
      "parents": [
        "llama3"
      ],
      "params": "405B",
      "note": "Primer open-source a escala 405B. Contexto de 128K.",
      "license": "Llama 3.1 Community",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/meta-llama",
      "family": "Llama"
    },
    {
      "id": "llama3_2",
      "name": "Llama 3.2",
      "company": "Meta",
      "date": "2024-09",
      "type": "Base",
      "parents": [
        "llama3_1"
      ],
      "params": "90B",
      "note": "Vision (11B, 90B) y texto liviano (1B, 3B) para edge/mobile.",
      "license": "Llama 3.2 Community",
      "open": true,
      "arch": "Decoder",
      "source": "https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/",
      "family": "Llama"
    },
    {
      "id": "mixtral",
      "name": "Mixtral 8x7B",
      "company": "Mistral",
      "date": "2023-12",
      "type": "Base",
      "parents": [
        "mistral7b"
      ],
      "params": "46.7B",
      "note": "Sparse Mixture-of-Experts: 8 expertes de 7B, 12.9B activos por token. Supera a Llama 2 70B en benchmarks.",
      "license": "Apache-2.0",
      "open": true,
      "arch": "MoE",
      "source": "https://huggingface.co/mistralai/Mixtral-8x7B-v0.1",
      "family": "Mistral"
    },
    {
      "id": "mistral_large",
      "name": "Mistral Large",
      "company": "Mistral",
      "date": "2024-02",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "123B",
      "note": "Modelo flagship, accesible vía API (no open-weight).",
      "license": "Proprietary",
      "open": false,
      "arch": "Decoder",
      "source": "https://mistral.ai/news/mistral-large/",
      "family": "Mistral"
    },
    {
      "id": "codestral",
      "name": "Codestral",
      "company": "Mistral",
      "date": "2024-05",
      "type": "Code",
      "parents": [
        "mistral_large"
      ],
      "params": "22B",
      "note": "Modelo de código especializado, 80+ lenguajes. Apache 2.0.",
      "license": "Apache-2.0",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/mistralai/Codestral-22B-v0.1",
      "family": "Mistral"
    },
    {
      "id": "ministral",
      "name": "Ministral 8B",
      "company": "Mistral",
      "date": "2024-10",
      "type": "Base",
      "parents": [
        "mistral7b"
      ],
      "params": "8B",
      "note": "Optimizado para edge/latency baja. Licencia de investigación.",
      "license": "Research License",
      "open": true,
      "arch": "Decoder",
      "source": "https://mistral.ai/news/ministraux/",
      "family": "Mistral"
    },
    {
      "id": "qwen1_5",
      "name": "Qwen 1.5",
      "company": "Alibaba",
      "date": "2024-02",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "72B",
      "note": "Iteración mejorada de Qwen. Tamaños: 0.5B a 72B. Apache 2.0.",
      "license": "Apache-2.0",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/Qwen",
      "family": "Qwen"
    },
    {
      "id": "qwen2",
      "name": "Qwen 2",
      "company": "Alibaba",
      "date": "2024-06",
      "type": "Base",
      "parents": [
        "qwen1_5"
      ],
      "params": "72B",
      "note": "Familia dense + MoE. Rivaliza con modelos propietarios. Apache 2.0.",
      "license": "Apache-2.0",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/Qwen",
      "family": "Qwen"
    },
    {
      "id": "qwen2_5",
      "name": "Qwen 2.5",
      "company": "Alibaba",
      "date": "2024-09",
      "type": "Base",
      "parents": [
        "qwen2"
      ],
      "params": "72B",
      "note": "Mejoras en código, matemáticas y razonamiento. 0.5B a 72B.",
      "license": "Apache-2.0",
      "open": true,
      "arch": "Decoder",
      "source": "https://qwenlm.github.io/blog/qwen2.5/",
      "family": "Qwen"
    },
    {
      "id": "gemma1",
      "name": "Gemma 1",
      "company": "Google",
      "date": "2024-02",
      "type": "Base",
      "parents": [
        "gemini"
      ],
      "params": "7B",
      "note": "Modelos ligeros derivados de Gemini. 2B y 7B.",
      "license": "Gemma License",
      "open": true,
      "arch": "Decoder",
      "source": "https://ai.google.dev/gemma",
      "family": "Gemma"
    },
    {
      "id": "gemma2",
      "name": "Gemma 2",
      "company": "Google",
      "date": "2024-06",
      "type": "Base",
      "parents": [
        "gemma1"
      ],
      "params": "27B",
      "note": "Segunda generación: 9B y 27B. Mejor que Mistral 7B y Llama 2.",
      "license": "Gemma License",
      "open": true,
      "arch": "Decoder",
      "source": "https://ai.google.dev/gemma",
      "family": "Gemma"
    },
    {
      "id": "phi1_5",
      "name": "Phi-1.5",
      "company": "Microsoft",
      "date": "2023-09",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "1.3B",
      "note": "SLM: razonamiento y conocimiento general con datos sintéticos.",
      "license": "MIT",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/microsoft/phi-1_5",
      "family": "Phi"
    },
    {
      "id": "phi2",
      "name": "Phi-2",
      "company": "Microsoft",
      "date": "2023-12",
      "type": "Base",
      "parents": [
        "phi1_5"
      ],
      "params": "2.7B",
      "note": "Supera a modelos 25x más grandes en razonamiento.",
      "license": "MIT",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/microsoft/phi-2",
      "family": "Phi"
    },
    {
      "id": "phi3",
      "name": "Phi-3",
      "company": "Microsoft",
      "date": "2024-04",
      "type": "Base",
      "parents": [
        "phi2"
      ],
      "params": "14B",
      "note": "Familia Mini (3.8B), Small (7B), Medium (14B). Rivaliza con GPT-3.5.",
      "license": "MIT",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/microsoft",
      "family": "Phi"
    },
    {
      "id": "deepseek_v2",
      "name": "DeepSeek-V2",
      "company": "DeepSeek",
      "date": "2024-05",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "236B",
      "note": "MoE: 236B totales, 21B activos por token. Multi-head Latent Attention.",
      "license": "DeepSeek License",
      "open": true,
      "arch": "MoE",
      "source": "https://github.com/deepseek-ai/DeepSeek-V2",
      "family": "DeepSeek"
    },
    {
      "id": "deepseek_v3",
      "name": "DeepSeek-V3",
      "company": "DeepSeek",
      "date": "2024-12",
      "type": "Base",
      "parents": [
        "deepseek_v2"
      ],
      "params": "671B",
      "note": "MoE: 671B totales, 37B activos. Generación a 60 tok/s. Entrenamiento por $5.5M.",
      "license": "MIT",
      "open": true,
      "arch": "MoE",
      "source": "https://github.com/deepseek-ai/DeepSeek-V3",
      "family": "DeepSeek"
    },
    {
      "id": "grok1",
      "name": "Grok-1",
      "company": "xAI",
      "date": "2024-03",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "314B",
      "note": "MoE open-source de xAI. Apache 2.0. Pesos + arquitectura publicados.",
      "license": "Apache-2.0",
      "open": true,
      "arch": "MoE",
      "source": "https://huggingface.co/xai-org/grok-1",
      "family": "Grok"
    },
    {
      "id": "command_r",
      "name": "Command R",
      "company": "Cohere",
      "date": "2024-03",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "35B",
      "note": "Optimizado para RAG, tool use y citations. Contexto 128K.",
      "license": "CC-BY-NC",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/CohereForAI/c4ai-command-r-v01",
      "family": "Command R"
    },
    {
      "id": "command_r_plus",
      "name": "Command R+",
      "company": "Cohere",
      "date": "2024-04",
      "type": "Base",
      "parents": [
        "command_r"
      ],
      "params": "104B",
      "note": "Flagship de Cohere. RAG avanzado, multi-step tool use.",
      "license": "CC-BY-NC",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/CohereForAI/c4ai-command-r-plus-08-2024",
      "family": "Command R"
    },
    {
      "id": "yi",
      "name": "Yi-34B",
      "company": "01.AI",
      "date": "2023-11",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "34B",
      "note": "Bilingüe (EN/ZH). Primer en el leaderboard open-source al lanzarse.",
      "license": "Yi License",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/01-ai/Yi-34B",
      "family": "Yi"
    },
    {
      "id": "internlm2",
      "name": "InternLM2",
      "company": "SenseTime",
      "date": "2024-01",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "20B",
      "note": "Desarrollado por Shanghai AI Lab + SenseTime. 7B y 20B.",
      "license": "Apache-2.0",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/internlm",
      "family": "InternLM"
    },
    {
      "id": "glm4",
      "name": "GLM-4-9B",
      "company": "Zhipu",
      "date": "2024-06",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "9B",
      "note": "Open-weight de GLM-4. Atención GLM propia (no decoder puro).",
      "license": "GLM-4 License",
      "open": true,
      "arch": "Decoder",
      "source": "https://huggingface.co/THUDM/glm-4-9b",
      "family": "GLM"
    },
    {
      "id": "llama31",
      "name": "LLaMA 3.1",
      "company": "Meta",
      "date": "2024-07",
      "type": "Base",
      "parents": [
        "llama3"
      ],
      "params": "405B",
      "note": "Contexto 128K, 8 idiomas. Primera frontier-level open de 405B."
    },
    {
      "id": "qwen1",
      "name": "Qwen",
      "company": "Alibaba",
      "date": "2023-08",
      "type": "Base",
      "parents": [
        "transformer"
      ],
      "params": "7B",
      "note": "Primer modelo base de la familia Qwen (Alibaba Cloud)."
    },
    {
      "id": "wizardlm",
      "name": "WizardLM",
      "company": "Microsoft",
      "date": "2023-05",
      "type": "Instruct",
      "parents": [
        "llama"
      ],
      "params": "7B",
      "note": "Evol-Instruct: evolución automática de instrucciones simples a complejas."
    },
    {
      "id": "koala",
      "name": "Koala",
      "company": "Berkeley",
      "date": "2023-04",
      "type": "Chat",
      "parents": [
        "llama"
      ],
      "params": "13B",
      "note": "Fine-tune con datos web y respuestas de ChatGPT (UC Berkeley BAIR)."
    },
    {
      "id": "orca",
      "name": "Orca",
      "company": "Microsoft",
      "date": "2023-06",
      "type": "Instruct",
      "parents": [
        "llama"
      ],
      "params": "13B",
      "note": "Imitación de razonamiento paso a paso de GPT-4."
    },
    {
      "id": "dolphin",
      "name": "Dolphin",
      "company": "CognitiveComputations",
      "date": "2023-08",
      "type": "Chat",
      "parents": [
        "llama"
      ],
      "params": "7B",
      "note": "Uncensored/uncorrupted, sin filtros de alineamiento. Eric Hartford."
    },
    {
      "id": "nous_hermes1",
      "name": "Nous-Hermes",
      "company": "NousResearch",
      "date": "2023-09",
      "type": "Instruct",
      "parents": [
        "llama"
      ],
      "params": "13B",
      "note": "300K+ instrucciones custom, general-purpose. Teknium + Karan4D."
    },
    {
      "id": "wizardlm70b",
      "name": "WizardLM 70B",
      "company": "Microsoft",
      "date": "2023-09",
      "type": "Instruct",
      "parents": [
        "llama2"
      ],
      "params": "70B",
      "note": "Evol-Instruct V2 sobre LLaMA 2 70B."
    },
    {
      "id": "dolphin2",
      "name": "Dolphin 2.0",
      "company": "CognitiveComputations",
      "date": "2023-09",
      "type": "Chat",
      "parents": [
        "llama2"
      ],
      "params": "13B",
      "note": "Uncensored sobre LLaMA 2, más datos de alineamiento."
    },
    {
      "id": "mistral7b_instruct",
      "name": "Mistral 7B Instruct",
      "company": "Mistral",
      "date": "2023-09",
      "type": "Instruct",
      "parents": [
        "mistral7b"
      ],
      "params": "7B",
      "note": "Primera versión instruct de Mistral 7B, liberada junto al base."
    },
    {
      "id": "neural_chat",
      "name": "Neural-Chat",
      "company": "Intel",
      "date": "2023-10",
      "type": "Chat",
      "parents": [
        "mistral7b"
      ],
      "params": "7B",
      "note": "DPO sobre SlimOrca, optimizado para hardware Intel (Gaudi2)."
    },
    {
      "id": "zephyr7b",
      "name": "Zephyr 7B",
      "company": "Hugging Face",
      "date": "2023-11",
      "type": "Instruct",
      "parents": [
        "mistral7b"
      ],
      "params": "7B",
      "note": "DPO con UltraFeedback, supera modelos más grandes en MT-Bench."
    },
    {
      "id": "openchat",
      "name": "OpenChat 3.5",
      "company": "OpenChat",
      "date": "2023-11",
      "type": "Chat",
      "parents": [
        "mistral7b"
      ],
      "params": "7B",
      "note": "C-RLFT (reinforcement learning offline), supera ChatGPT Mar 2023."
    },
    {
      "id": "openhermes25",
      "name": "OpenHermes 2.5",
      "company": "NousResearch",
      "date": "2023-11",
      "type": "Instruct",
      "parents": [
        "mistral7b"
      ],
      "params": "7B",
      "note": "~1M ejemplos GPT-4 + 100K código. Teknium (NousResearch)."
    },
    {
      "id": "mixtral_instruct",
      "name": "Mixtral Instruct",
      "company": "Mistral",
      "date": "2023-12",
      "type": "Instruct",
      "parents": [
        "mixtral"
      ],
      "params": "46.7B",
      "note": "Versión instruct del MoE Mixtral 8x7B."
    },
    {
      "id": "dolphin_mixtral",
      "name": "Dolphin-Mixtral",
      "company": "CognitiveComputations",
      "date": "2024-01",
      "type": "Chat",
      "parents": [
        "mixtral"
      ],
      "params": "46.7B",
      "note": "Uncensored sobre Mixtral. Datasets: Synthia, OpenHermes, PureDove."
    },
    {
      "id": "qwen15_chat",
      "name": "Qwen 1.5 Chat",
      "company": "Alibaba",
      "date": "2024-02",
      "type": "Chat",
      "parents": [
        "qwen1_5"
      ],
      "params": "7B",
      "note": "Chat instruct multilingüe, mejorado sobre Qwen 1.0."
    },
    {
      "id": "gemma1_instruct",
      "name": "Gemma Instruct",
      "company": "Google",
      "date": "2024-02",
      "type": "Instruct",
      "parents": [
        "gemma1"
      ],
      "params": "7B",
      "note": "Instruction-tuned oficial de Google para Gemma."
    },
    {
      "id": "starling",
      "name": "Starling LM 7B",
      "company": "Berkeley",
      "date": "2024-03",
      "type": "Instruct",
      "parents": [
        "openchat"
      ],
      "params": "7B",
      "note": "RLAIF con reward model GPT-4, MT-Bench 8.09. UC Berkeley BAIR."
    },
    {
      "id": "llama3_instruct",
      "name": "Llama 3 Instruct",
      "company": "Meta",
      "date": "2024-04",
      "type": "Instruct",
      "parents": [
        "llama3"
      ],
      "params": "70B",
      "note": "RLHF sobre LLaMA 3, versiones 8B y 70B."
    },
    {
      "id": "llama31_instruct",
      "name": "Llama 3.1 Instruct",
      "company": "Meta",
      "date": "2024-07",
      "type": "Instruct",
      "parents": [
        "llama3_1"
      ],
      "params": "405B",
      "note": "Primera frontier-level open instruct de 405B, RLHF."
    },
    {
      "id": "hermes3",
      "name": "Hermes 3",
      "company": "NousResearch",
      "date": "2024-08",
      "type": "Instruct",
      "parents": [
        "llama3_1"
      ],
      "params": "405B",
      "note": "Full-parameter fine-tuning de LLaMA 3.1, versiones 8B/70B/405B."
    },
    {
      "id": "gpt4_turbo",
      "name": "GPT-4 Turbo",
      "company": "OpenAI",
      "date": "2023-11",
      "type": "Fine-tune",
      "parents": [
        "gpt4"
      ],
      "params": "—",
      "note": "Variante optimizada de GPT-4 con 128k contexto, ventanas más grandes y parámetros de funciones.",
      "open": false,
      "arch": "Decoder",
      "source": "https://openai.com/index/gpt-4-turbo-and-gpts-in-api/",
      "family": "GPT"
    },
    {
      "id": "gpt4_1",
      "name": "GPT-4.1",
      "company": "OpenAI",
      "date": "2025-04",
      "type": "Fine-tune",
      "parents": [
        "gpt4o"
      ],
      "params": "—",
      "note": "Modelo API-only con mejora sustancial en código y seguimiento de instrucciones; no disponible en ChatGPT.",
      "open": false,
      "arch": "Decoder",
      "source": "https://openai.com/index/gpt-4-1/",
      "family": "GPT"
    },
    {
      "id": "o1",
      "name": "o1",
      "company": "OpenAI",
      "date": "2024-09",
      "type": "Reasoning",
      "parents": [
        "gpt4"
      ],
      "params": "—",
      "note": "Primer modelo de razonamiento de OpenAI. Piensa antes de responder (chain-of-thought interno).",
      "open": false,
      "arch": "Decoder",
      "source": "https://openai.com/index/introducing-openai-o1-preview/",
      "family": "GPT"
    },
    {
      "id": "o1_mini",
      "name": "o1-mini",
      "company": "OpenAI",
      "date": "2024-09",
      "type": "Reasoning",
      "parents": [
        "o1"
      ],
      "params": "—",
      "note": "Versión más rápida y económica de o1, optimizada para STEM y código.",
      "open": false,
      "arch": "Decoder",
      "source": "https://openai.com/index/openai-o1-mini-available-in-api/",
      "family": "GPT"
    },
    {
      "id": "o3_mini",
      "name": "o3-mini",
      "company": "OpenAI",
      "date": "2025-01",
      "type": "Reasoning",
      "parents": [
        "o1"
      ],
      "params": "—",
      "note": "Evolución de o1-mini con mejor desempeno en matemáticas y programación a menor costo.",
      "open": false,
      "arch": "Decoder",
      "source": "https://openai.com/index/introducing-o3-mini/",
      "family": "GPT"
    },
    {
      "id": "o3",
      "name": "o3",
      "company": "OpenAI",
      "date": "2025-04",
      "type": "Reasoning",
      "parents": [
        "o1"
      ],
      "params": "—",
      "note": "Modelo de razonamiento más avanzado de OpenAI hasta la fecha, con acceso a herramientas y visión.",
      "open": false,
      "arch": "Decoder",
      "source": "https://openai.com/index/o3-and-o4-mini/",
      "family": "GPT"
    },
    {
      "id": "o4_mini",
      "name": "o4-mini",
      "company": "OpenAI",
      "date": "2025-04",
      "type": "Reasoning",
      "parents": [
        "o3"
      ],
      "params": "—",
      "note": "Sucesor de o3-mini; supera a o3 en benchmarks AIME 2025 con mejor costo-eficiencia.",
      "open": false,
      "arch": "Decoder",
      "source": "https://openai.com/index/o3-and-o4-mini/",
      "family": "GPT"
    },
    {
      "id": "deepseek_r1",
      "name": "DeepSeek-R1",
      "company": "DeepSeek",
      "date": "2025-01",
      "type": "Reasoning",
      "parents": [
        "deepseek_v3"
      ],
      "params": "671B (37B MoE)",
      "note": "Modelo de razonamiento open-weight con pipeline de RL que supera a o1-preview en benchmarks.",
      "open": true,
      "arch": "MoE",
      "source": "https://github.com/deepseek-ai/DeepSeek-R1",
      "family": "DeepSeek"
    },
    {
      "id": "deepseek_r1_distill",
      "name": "DeepSeek-R1-Distill",
      "company": "DeepSeek",
      "date": "2025-01",
      "type": "Distill",
      "parents": [
        "deepseek_r1"
      ],
      "params": "1.5B–70B",
      "note": "Familia de 6 modelos destilados (Qwen/Llama) de R1 con capacidades de razonamiento heredadas.",
      "open": true,
      "arch": "Decoder",
      "source": "https://github.com/deepseek-ai/DeepSeek-R1",
      "family": "DeepSeek"
    },
    {
      "id": "claude35_sonnet",
      "name": "Claude 3.5 Sonnet",
      "company": "Anthropic",
      "date": "2024-06",
      "type": "Fine-tune",
      "parents": [
        "claude3"
      ],
      "params": "—",
      "note": "Supera a Claude 3 Opus con mejor velocidad y costo. Primer modelo con Computer Use (beta).",
      "open": false,
      "arch": "Decoder",
      "source": "https://www.anthropic.com/news/claude-3-5-sonnet",
      "family": "Claude"
    },
    {
      "id": "claude37_sonnet",
      "name": "Claude 3.7 Sonnet",
      "company": "Anthropic",
      "date": "2025-02",
      "type": "Reasoning",
      "parents": [
        "claude35_sonnet"
      ],
      "params": "—",
      "note": "Primer modelo de razonamiento híbrido del mercado; piensa de forma extensa o breve según la tarea.",
      "open": false,
      "arch": "Decoder",
      "source": "https://www.anthropic.com/news/claude-3-7-sonnet",
      "family": "Claude"
    },
    {
      "id": "claude_opus4",
      "name": "Claude Opus 4",
      "company": "Anthropic",
      "date": "2025-05",
      "type": "Fine-tune",
      "parents": [
        "claude37_sonnet"
      ],
      "params": "—",
      "note": "Modelo más capaz de Anthropic para razonamiento profundo y agentes complejos.",
      "open": false,
      "arch": "Decoder",
      "source": "https://www.anthropic.com/news/claude-opus-4",
      "family": "Claude"
    },
    {
      "id": "claude_sonnet4",
      "name": "Claude Sonnet 4",
      "company": "Anthropic",
      "date": "2025-05",
      "type": "Fine-tune",
      "parents": [
        "claude37_sonnet"
      ],
      "params": "—",
      "note": "Equilibrado entre velocidad y capacidad; hereda razonamiento híbrido de 3.7.",
      "open": false,
      "arch": "Decoder",
      "source": "https://www.anthropic.com/news/claude-sonnet-4",
      "family": "Claude"
    },
    {
      "id": "gemini_1_5_pro",
      "name": "Gemini 1.5 Pro",
      "company": "Google",
      "date": "2024-02",
      "type": "Multimodal",
      "parents": [
        "gemini"
      ],
      "params": "—",
      "note": "Contexto de 1M tokens; multimodal nativo (texto, imagen, audio, video).",
      "open": false,
      "arch": "MoE",
      "source": "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/",
      "family": "Gemini"
    },
    {
      "id": "gemini_1_5_flash",
      "name": "Gemini 1.5 Flash",
      "company": "Google",
      "date": "2024-05",
      "type": "Multimodal",
      "parents": [
        "gemini_1_5_pro"
      ],
      "params": "—",
      "note": "Variante liviana y rapida de 1.5 Pro para altos volumenes.",
      "open": false,
      "arch": "MoE",
      "source": "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-gemma-developer-updates-may-2024/",
      "family": "Gemini"
    },
    {
      "id": "gemini_2_0_flash",
      "name": "Gemini 2.0 Flash",
      "company": "Google",
      "date": "2024-12",
      "type": "Multimodal",
      "parents": [
        "gemini_1_5_pro"
      ],
      "params": "—",
      "note": "Doble de velocidad que 1.5 Pro con entrada/salida multimodal y comprension de largo contexto.",
      "open": false,
      "arch": "MoE",
      "source": "https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/",
      "family": "Gemini"
    },
    {
      "id": "gemini_2_5_pro",
      "name": "Gemini 2.5 Pro",
      "company": "Google",
      "date": "2025-03",
      "type": "Reasoning",
      "parents": [
        "gemini_2_0_flash"
      ],
      "params": "—",
      "note": "Modelo mas avanzado de Google con capacidades de razonamiento (thinking) integradas.",
      "open": false,
      "arch": "MoE",
      "source": "https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/",
      "family": "Gemini"
    },
    {
      "id": "mistral_large_2",
      "name": "Mistral Large 2",
      "company": "Mistral",
      "date": "2024-07",
      "type": "Fine-tune",
      "parents": [
        "mistral_large"
      ],
      "params": "123B",
      "note": "Modelo cerrado tier de Mistral con 123B parámetros, 128k contexto, multilingüe.",
      "open": false,
      "arch": "Decoder",
      "source": "https://mistral.ai/news/mistral-large-2/",
      "family": "Mistral"
    },
    {
      "id": "grok3",
      "name": "Grok-3",
      "company": "xAI",
      "date": "2025-02",
      "type": "Reasoning",
      "parents": [
        "transformer"
      ],
      "params": "—",
      "note": "Modelo de razonamiento de xAI; supera o3-mini-high en benchmarks incluyendo AIME 2025.",
      "open": false,
      "arch": "Decoder",
      "source": "https://x.ai/news/grok-3",
      "family": "Grok"
    }
  ]
};
