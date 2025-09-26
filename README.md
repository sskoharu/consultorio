# Consultorio Odontológico – Gestión de Citas

Repositorio oficial del proyecto **“Gestión de Citas Odontológicas”**, desarrollado con **Ionic + Angular** para el frontend y **PHP + SQL Server** para el backend. La plataforma permite a pacientes y odontólogos gestionar citas, acceder a historiales y recibir notificaciones.

---

##  Alcance y Supuestos
- Aplicación móvil para pacientes y odontólogos.
- Funcionalidades principales: registro de usuarios, agendamiento y reprogramación de citas, notificaciones, historial médico.
- Código gestionado en GitHub con entornos de desarrollo, pruebas y producción.
- Configuración incluye: frontend, backend, scripts de base de datos y documentación.

---

##  Roles
- **Owner / Release Manager / Auditor:** Mateo Obregon  
- **Desarrolladores:** Odwell Ortiz, Patricio Guevara  

---

##  Estructura del repositorio
/frontend # Código Ionic + Angular
/backend # Código PHP API
/db-scripts # Scripts SQL para base de datos
/docs # Documentación técnica
/.github/workflows # Pipelines CI/CD
---

## 🛠 Estrategia de Versionado y Ramas
- **Versionado:** SemVer (`v1.0.0`, `v1.1.0`, etc.)  
- **Ramas (GitFlow simplificado):**  
  - `master` → Producción  
  - `develop` → Integración  
  - `feature/*` → Nuevas funcionalidades  
  - `release/*` → Preparación de release  
  - `hotfix/*` → Correcciones urgentes  
- **Pull Requests:** requieren revisión por al menos dos desarrolladores, pruebas y aprobación antes de merge.

---

## 📌 Líneas Base y Contabilidad de Estado (CSA)
| IC                  | Versión | Estado     | Responsable   | Fecha       |
|--------------------|---------|------------|---------------|------------|
| Frontend (Ionic)    | v1.1.0  | Liberado   | M. Obregon    | 2025-07-13 |
| Backend (PHP API)   | v1.0.0  | Aprobado   | O. Ortiz      | 2025-07-12 |
| Base de datos (SQL) | v0.9.0  | Aprobado   | P. Guevara    | 2025-07-10 |
| Documentación       | v1.1    | En desarrollo | Equipo completo | 2025-09-25 |

---

## 📋 Control de Cambios (CR/CCB)
- **Ejemplo:** CR-2025-001
  - Descripción: Actualizar almacenamiento de contraseñas usando hash bcrypt.
  - Impacto: Backend, documentación técnica, pruebas unitarias y E2E.
  - Decisión CCB: Aprobado
  - Responsable: Equipo de desarrollo
  - Fecha compromiso: 2025-09-24

---

## 📑 Auditorías FCA / PCA
- **FCA (Funcional):** Verifica que la versión cumple requisitos funcionales.  
- **PCA (Physical / Product):** Verifica que el producto coincide con la documentación técnica.  

| Tipo | IC / Versión | Hallazgo | Acción Correctiva | Responsable | Fecha |
|------|--------------|----------|-----------------|------------|-------|
| FCA  | Backend v1.0.0 | Retraso en notificaciones | Optimizar envío de notificaciones | O. Ortiz | 2025-09-25 |
| PCA  | Frontend v1.1.0 | Diferencias menores en UI | Actualizar documentación UI | Equipo completo | 2025-09-25 |

---

## 🚀 Releases y Release Notes
### v1.0.0 – 2025-08-22
- **Added:** Reprogramación de citas, módulo de notificaciones push  
- **Changed:** Ajustes en interfaz calendario  
- **Fixed:** Corrección disponibilidad odontólogos  
- **Artefactos:** App-v1.0.0.apk, Backend-api-v1.0.0.zip  

### v1.1.0 – 2025-09-16
- **Added:** Hash bcrypt y tokens de recuperación de contraseña  
- **Changed:** Métodos de recuperación de clave  

**Rollback:** Restaurar versión v0.5

---
