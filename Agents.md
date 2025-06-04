# AgentFlow — Guía para Codex y colaboradores

Este **Agents.md** sirve como contrato de trabajo entre tú (Codex/autores de PR) y el equipo humano.  Aquí encuentras **qué estamos construyendo**, 
**qué hay ya en el repo** y **qué esperamos de cada próxima entrega**.
Mantén este documento vivo: cuando completes un hito, marca la casilla "+ \[x]" y empuja las secciones nuevas que crees.

---

## 1. Visión en una frase

> *Un constructor visual *low‑code* para componer **agentes LangChain**, arrastrar bloques al canvas y desplegarlos al instante como *workflows* de 
n8n locales o en AWS ECS; todo envuelto en un SaaS freemium con límites de tokens.*

---

## 2. Estructura actual del repositorio (`main`)

```
AgentFlow/
├─ backend/
│  ├─ __init__.py          # Expone la instancia FastAPI `app`            – ✅ hecho
│  ├─ main.py              # POST /deploy → adapta + publica en n8n       – ✅ hecho
│  ├─ adapter.py           # canvas_to_n8n_nodes(flow)                     – Básico → mejorar
│  ├─ models.py            # Pydantic: Block & CanvasFlow                  – Tal cual
│  └─ n8n_client.py        # Wrapper REST/activate workflow                – Básico
└─ frontend/
   ├─ main.tsx             # Punto de entrada React 18 + Vite             – Stub
   ├─ App.tsx              # (vacío por ahora)
   └─ index.css            # Tailwind reset
```

### Detalle de cada archivo y expectativas

| Path                       | Rol hoy                                                                                            |  Limitaciones                                                  
| Próxima meta                                             |
| -------------------------- | -------------------------------------------------------------------------------------------------- | 
-------------------------------------------------------------- | -------------------------------------------------------- |
| **backend/**init**.py**    | Reexporta `app` para Uvicorn/Gunicorn. fileciteturn1file0                                       | Ninguna.                                                       
| —                                                        |
| **backend/main.py**        | End‑point **/deploy**: recibe `CanvasFlow`, llama a adapter y a `N8NClient`. fileciteturn1file2 | Solo maneja 
error genérico.<br>Sin auth ni límites.            | Añadir middleware de rate/token‑limit (M‑4‑1).           |
| **backend/adapter.py**     | Traduce cada bloque del canvas a nodo n8n   fileciteturn1file3                                  | No posiciona 
nodos, no soporta edges, ni parámetros avanzados. | Soportar edges y catálogos LangChain (M‑2‑2).            |
| **backend/models.py**      | Schema mínimo: `Block`, `CanvasFlow`. fileciteturn1file4                                        | Sin 
validaciones de tipos de bloque.                           | Añadir discriminated‑union por `type`.                   |
| **backend/n8n\_client.py** | Crea y activa workflow con *retry*. fileciteturn1file1                                          | Sin auth, ni 
update/delete.                                    | Añadir Basic Auth y método `update_workflow(id, nodes)`. |
| **frontend/main.tsx**      | Bootstrap React. fileciteturn1file5                                                             | No hay UI; ni 
Zustand, ni React Flow.                          | Hitos M‑1‑1 al M‑1‑4.                                    |

> ⚠️ **Convención**: todos los nuevos ficheros de back deben vivir bajo `backend/`; los de front, bajo `frontend/`. Monorepo (pnpm+turbo) se crea en 
el hito M‑0‑1.

---

## 3. Roadmap granular (sinónimos de los issues)

Marca con **\[x]** cuando completes; Codex debe abrir PR por cada sub‑paso.

### M‑0 · Bootstrap

* [ ] **0‑1 Monorepo PNPM+Turborepo** (`feat/monorepo-setup`)
* [ ] **0‑2 Tooling** (`chore/tooling`)

### M‑1 · Canvas drag‑and‑drop

* [ ] 1‑1 React Flow demo (`feat/react-flow-setup`)
* [ ] 1‑2 Bloques palette (`feat/block-palette`)
* [ ] 1‑3 Zustand store (`feat/zustand-store`)
* [ ] 1‑4 Export JSON (`feat/flow-serialization`)

### M‑2 · Bloques LangChain

* [ ] 2‑1 Adapter LangChain (`feat/langchain-adapter`)
* [ ] 2‑2 Catálogo inicial (`feat/default-nodes`)
* [ ] 2‑3 Runner CLI (`feat/local-runner`)

### M‑3 · Orquestación n8n

* [ ] 3‑1 Docker‑Compose infra (`infra/docker-compose`)
* [ ] 3‑2 Export ↔ n8n (`feat/n8n-converter`)
* [ ] 3‑3 Sync API + Deploy (`feat/n8n-sync-api`)

### M‑4 · SaaS guardrails

* [ ] 4‑1 Token limits (`feat/token-middleware`)
* [ ] 4‑2 Auth + billing (`feat/auth-billing`)

### M‑5 · Deploy AWS ECS

* [ ] 5‑1 Dockerfiles (`infra/dockerfiles`)
* [ ] 5‑2 CDK stack (`infra/cdk`)
* [ ] 5‑3 GitHub Actions (`ci/deploy-ecs`)

### M‑6 · Observabilidad & tests

* [ ] 6‑1 E2E Playwright (`test/e2e`)
* [ ] 6‑2 Tracing & metrics (`feat/telemetry`)
* [ ] 6‑3 Docs (`docs/README.md`)

---

## 4. Expectativas de **cada PR**

1. **Título** = `[hito] Descripción breve`, ej. `[1-2] feat: sidebar palette`.
2. **Checklist** interno en la descripción:

   * [ ] Código compila (`pnpm build` o `docker build`).
   * [ ] Tests pasan.
   * [ ] `README.md` actualizado con nuevos comandos.
3. Añade **comentarios de línea** cuando el cambio sea "mágico".
4. No mezcles cambios de linter con lógica.

---

## 5. Guía de pruebas para el creador

| Contexto         | Comando                           | Resultado esperado                                            |
| ---------------- | --------------------------------- | ------------------------------------------------------------- |
| **Frontend dev** | `pnpm dev --filter frontend`      | `http://localhost:5173` muestra el canvas sin errores.        |
| **Runner local** | `pnpm flow ./examples/hello.json` | Devuelve texto de LLM en la terminal.                         |
| **Infra local**  | `docker compose up -d`            | n8n activo en `:5678`, Postgres & MinIO listos.               |
| **E2E**          | `pnpm playwright test`            | Todos los tests verdes.                                       |
| **ECS deploy**   | `cd infra/cdk && cdk deploy`      | Imprime `LoadBalancerDNS`; abrir en navegador muestra la app. |

---

## 6. Cómo levantar el stack end‑to‑end

```bash
# 1) Pre‑requisitos
brew install pnpm docker awscli
# Configura AWS creds & region

# 2) Clona repo y bootstrap
pnpm i                # instala dependencias
pnpm turbo run build  # builder full (front + back)

# 3) Infra local
cd infra && docker compose up -d
# 👉 localhost:5678 para n8n

# 4) Desarrollo frontend
pnpm dev --filter frontend  # Vite + HMR

# 5) Prueba de despliegue workflow
curl -X POST :8000/deploy -d @examples/hello.json \
     -H "Content-Type: application/json"
# Respuesta: { "url": "http://localhost:5678/workflow/42" }

# 6) Despliegue cloud (cuando M‑5 listo)
cd infra/cdk && cdk deploy
# Copia URL pública y prueba UI
```

---

## 7. Pautas para actualizar `README.md`

* **Sección Pre‑requisitos**: añade binarios o servicios nuevos.
* **Quick Start**: un bloque shell funcional desde `git clone` hasta "¡lo veo en el navegador!".
* **FAQ/Problemas comunes**: añade errores típicos de cada hito.
* Usa badges de CI y versión.

---

## 8. Futuras ideas (no scoped yet)

* Editor colaborativo en tiempo real (yjs + WebSocket).
* Marketplace de bloques (*premium*).
* Live cost estimation por ejecución.

> 🚀 **Go build!**

