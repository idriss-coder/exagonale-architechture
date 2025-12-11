## 🧩 Mini-projet : “Hexa Tasks”
`🎯 Fonctionnalités`

- Liste des tâches
- Ajouter une tâche
- Supprimer une tâche
- Stockage : API mock → fallback localStorage


## 🧊 Comment adapter l’architecture hexagonale au Front ?

┌────────────────────────────────┐
│   UI (React components)        │  ← Framework (Next.js)
└──────────────┬─────────────────┘
               │ appelle
┌──────────────▼─────────────────┐
│   Application / Domain         │  ← Use cases, services
└──────────────┬─────────────────┘
               │ dépend
┌──────────────▼─────────────────┐
│   Adapters (API, storage…)     │  ← Implémentations
└────────────────────────────────┘


## 📁 Structure complète recommandée
src
├── app
│   └── tasks
│       └── page.tsx               (ui)
├── ui
│   └── components/
│       └── TaskList.tsx           (ui)
│       └── TaskForm.tsx
├── core
│   ├── domain/
│   │   └── Task.ts                (entity)
│   │   └── TaskRepository.ts      (port)
│   ├── application/
│   │   └── GetTasksUseCase.ts
│   │   └── CreateTaskUseCase.ts
│   │   └── DeleteTaskUseCase.ts
│   └── services/
│       └── TaskService.ts         (orchestrateur)
├── infra
│   ├── api/
│   │   └── TaskApiAdapter.ts      (adapter)
│   └── storage/
│       └── TaskLocalAdapter.ts
└── shared/
    └── mapper/
        └── TaskMapper.ts
