# Guía rápida — GitHub y Antigravity (TMS Colombia)
## Cuentas (todas del curso, independientes de tus cuentas personales de otros proyectos)
- **Google del curso:** la cuenta raíz que te indique el docente.
- **GitHub:** tu cuenta individual; el docente te invita como colaborador al repositorio oficial `tms-colombia`.
- **Supabase:** trabajarás contra el proyecto de **PRUEBAS** del curso; el docente te entrega la URL y la anon key para tu `.env.local`. Nunca tendrás la `service_role`.
- **Vercel:** el despliegue lo administra el docente desde `main`; verás las vistas previas de los Pull Request.

## Tu flujo, paso a paso
1. Clona el repositorio oficial: `git clone <url-del-repo>` y entra a la carpeta.
2. Copia `.env.example` a `.env.local` y completa la URL y la anon key del proyecto de pruebas. **Ese archivo nunca se sube.**
3. Abre el proyecto en **Antigravity** y pídele que lea `AGENTS.md` y tu brief en `docs/modules/` antes de cualquier cambio.
4. Crea tu rama: `git checkout -b feature/NN-tu-modulo` (el nombre exacto está en tu brief).
5. Instala y arranca: `npm install` · `npm run dev`.
6. Trabaja en pasos pequeños: construir → `npm run typecheck` → probar → `git add` + `git commit` con mensaje claro.
7. Sube tu rama: `git push -u origin feature/NN-tu-modulo`.
8. Abre el **Pull Request** hacia `main` con la plantilla del proyecto: qué pediste a la IA, qué aceptaste, qué corregiste a mano, qué probaste.
9. Atiende las observaciones del docente y vuelve a empujar la misma rama: el PR se actualiza solo.
10. Cuando el docente aprueba, tu módulo entra a `main` y al despliegue.

## Reglas de oro
- **Si no está en el repo, no existe.** Nada de código solo en tu máquina al cerrar la sesión.
- Nunca trabajes sobre `main` ni sobre la rama de un compañero.
- Nunca subas `.env.local` ni ninguna clave.
- Ante un conflicto de Git que no entiendas, detente y pregunta: un conflicto mal resuelto rompe el trabajo de todos.
