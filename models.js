// Datos: genealogía de modelos LLM. Editar aquí para agregar modelos.
window.LLM_MODELS = {
  "meta": {
    "title": "Genealogía de modelos LLM",
    "updated": "2025-06",
    "note": "Relaciones 'genéticas': base = de quién desciende; relación puede ser derivación directa, inspiración o nueva arquitectura."
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
    }
  ]
};
