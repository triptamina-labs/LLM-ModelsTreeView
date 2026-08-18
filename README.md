# LLM-ModelsTreeView

Visor genealógico ("genético") de modelos de lenguaje: un árbol interactivo que muestra **qué modelo deriva de cuál**, por empresa, año y tipo.

![vista](https://raw.githubusercontent.com/triptamina-labs/LLM-ModelsTreeView/main/screenshot.png)

## Características

- **Árbol de linaje** izquierda→derecha: cada modelo desciende de su ancestro (arquitectura raíz a la izquierda).
- **Color por empresa** (OpenAI, Google, Meta, Anthropic, etc.).
- **Detalle al hacer clic**: empresa, fecha, tipo, parámetros y de quién desciende (navegable).
- **Búsqueda** y **filtros** por empresa, tipo y año — siempre conserva los ancestros del resultado para no romper el árbol.
- **Tema claro/oscuro** (botón ◐), UI minimalista estilo Apple.
- **Cero build y cero dependencias locales**: `vis-network` y los datos son todo lo que hay; abrís `index.html` (o servís la carpeta) y funciona.

## Uso

```bash
# Opción A — abrir directo
open index.html

# Opción B — servir local
python3 -m http.server 8080
# → http://localhost:8080
```

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | UI y estructura |
| `app.js` | Lógica del grafo (vis-network) y filtros |
| `models.js` | **La data**: agregar un modelo = añadir un objeto a `LLM_MODELS.models` |

## Cómo agregar un modelo

En `models.js`, dentro del array `models`, añade:

```js
{
  "id": "mi_modelo",                 // único
  "name": "Mi Modelo",
  "company": "OpenAI",               // debe existir en `companies` (o agrégala con color)
  "date": "2025-08",
  "type": "Base",                    // Arquitectura | Base | Fine-tune | Instruct | Chat | Code | Multimodal | Distill | Dialogue | Replica
  "parents": ["gpt4o"],              // id(s) de quién deriva; [] si es raíz
  "params": "7B",                    // opcional
  "note": "Descripción corta."       // opcional
}
```

La empresa nueva (si no existe) se registra en el objeto `companies` con su color.

## Observación sobre los datos

Los linajes son una representación razonable, no definitiva. Algunas relaciones son **inspiración** (p. ej. Mistral 7B está inspirada en LLaMA pero es arquitectura propia); otras son **arquitectura nueva** (Mamba). Cada nodo lleva ese matiz en su nota. Si ves una relación que quieras corregir o ampliar, es un cambio de una línea en `models.js`.

## Licencia

GPL-3.0 — ver `LICENSE`.
