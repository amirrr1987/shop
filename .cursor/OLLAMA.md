# Ollama + Cursor (local free model)

**Current local model:** `gemma3:1b` (Ollama Desktop).

This is a **tiny** model (~1B). Use only for trivial text/rename/explain.
Hard shop work (payments, auth, migrations, multi-file) → Composer / Auto / frontier models.

## 1) Ollama Desktop

- App open + model `gemma3:1b` selected is enough (API usually on `11434`).
- Optional check in Cmder/cmd:

```bat
ollama list
```

Optional upgrade later (still local, better coding; you run it):

```bat
ollama pull qwen2.5-coder:3b
```

## 2) Cursor Settings (you do this in UI)

1. `Ctrl+,` → **Models**
2. Enable **Override OpenAI Base URL**
3. Base URL: `http://127.0.0.1:11434/v1`
4. OpenAI API Key: any non-empty string (e.g. `ollama`)
5. **Add Custom Model** → name exactly: `gemma3:1b`
6. Select `gemma3:1b` only for trivial Chat / short asks

## 3) When to use `gemma3:1b`

| OK on gemma3:1b | Never gemma3:1b alone |
|-----------------|------------------------|
| Rename / typo ideas | Agent multi-file edits |
| Explain one short snippet | TypeORM migrations |
| Draft a short commit message | Zarinpal / refunds / stock |
| Persian ↔ English phrasing | Auth / JWT / guest tokens |
| Tiny CSS class suggestion | Nest service logic |

## 4) Warnings

- Override Base URL sends OpenAI-compatible traffic to Ollama. Turn override **off** when using Cursor-hosted OpenAI models again.
- Do **not** set `gemma3:1b` as default Agent model.
- If answers are nonsense, switch to Composer — the model is too small for real coding.

## 5) Token stack in this project

- `.cursorignore`
- `.cursor/rules/*`
- `.cursor/skills/shop-stack`
