# 🎵 Guía Rápida - YouTube Alexa Skill

## ⚡ Inicio Rápido

### 1️⃣ Configura (Solo primera vez)
```bash
npm install -g ask-cli
ask configure
```

### 2️⃣ Instala dependencias
```bash
cd lambda/custom
npm install
cd ../..
```

### 3️⃣ Despliega
```bash
ask deploy
```

### 4️⃣ ¡Prueba!
- Ve a: https://developer.amazon.com/alexa/console/ask
- Activa modo "Development" en la pestaña "Test"
- Di: **"Alexa, abre reproductor de YouTube"**

---

## 🗣️ Comandos de Voz

| Comando | Ejemplo |
|---------|---------|
| **Abrir skill** | "Alexa, abre reproductor de YouTube" |
| **Buscar** | "busca bad bunny" |
| | "busca música relajante" |
| **Reproducir** | "reproduce" |
| **Pausar** | "pausa" |
| **Reanudar** | "reanuda" |
| **Siguiente** | "siguiente" |
| **Anterior** | "anterior" |
| **Ayuda** | "ayuda" |
| **Salir** | "detente" o "cancela" |

---

## 📂 Archivos Importantes

```
Youtube-LLC1/
├── 📖 README.md                    ← Documentación completa
├── 📋 INSTRUCCIONES.md            ← Guía paso a paso
├── 📄 RESUMEN.md                  ← Resumen del proyecto
├── ⚡ QUICK_START.md              ← Esta guía
├── lambda/custom/
│   ├── index.js                   ← Código principal
│   └── package.json               ← Dependencias
└── skill-package/
    ├── skill.json                 ← Configuración
    └── interactionModels/custom/
        └── es-ES.json             ← Comandos en español
```

---

## 🔧 Comandos Útiles

### Ver versión de herramientas
```bash
node --version
npm --version
ask --version
```

### Actualizar la skill
```bash
ask deploy
```

### Ver logs
```bash
ask lambda log --skill-id <tu-skill-id>
```

### Probar en consola
```bash
ask dialog --locale es-ES
```

---

## ⚠️ Solución Rápida de Problemas

| Problema | Solución |
|----------|----------|
| "ask: command not found" | Cierra y abre la terminal, o ejecuta `npm install -g ask-cli` |
| No encuentra videos | Verifica tu conexión a internet |
| Error al reproducir | Intenta con otro video |
| Skill no responde | Espera 1-2 minutos después del deploy |

---

## 📞 Necesitas Más Ayuda?

1. 📖 Lee **README.md** - Documentación técnica completa
2. 📋 Lee **INSTRUCCIONES.md** - Guía detallada paso a paso
3. 📄 Lee **RESUMEN.md** - Overview del proyecto
4. 🔍 Revisa logs en AWS CloudWatch
5. 💬 Abre un issue en GitHub

---

## ✅ Checklist de Despliegue

- [ ] Node.js instalado (v14+)
- [ ] ASK CLI instalado
- [ ] ASK CLI configurado (`ask configure`)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Skill desplegada (`ask deploy`)
- [ ] Testing habilitado en consola
- [ ] Primera prueba exitosa

---

**¡Listo! Tu skill de YouTube está funcionando. Disfruta!** 🎉
