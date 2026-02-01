# YouTube Alexa Skill - Reproductor de YouTube

Esta es una skill funcional de Amazon Alexa que te permite buscar y reproducir videos de YouTube mediante comandos de voz.

## 🎯 Funcionalidades

- ✅ Buscar videos en YouTube por nombre, artista o término
- ✅ Reproducir audio de videos de YouTube
- ✅ Controles de reproducción: pausar, reanudar, siguiente, anterior
- ✅ Interfaz en español (es-ES)
- ✅ Integración con AudioPlayer de Alexa

## 📋 Requisitos Previos

Antes de comenzar, necesitarás:

1. **Cuenta de Amazon Developer**: [https://developer.amazon.com](https://developer.amazon.com)
2. **Cuenta de AWS**: [https://aws.amazon.com](https://aws.amazon.com)
3. **ASK CLI (Alexa Skills Kit CLI)** instalado:
   ```bash
   npm install -g ask-cli
   ```
4. **Node.js** versión 14.x o superior

## 🚀 Instrucciones de Configuración

### Paso 1: Configurar ASK CLI

1. Configura tu perfil de ASK CLI con tus credenciales:
   ```bash
   ask configure
   ```
2. Sigue las instrucciones para autenticarte con tu cuenta de Amazon Developer y AWS

### Paso 2: Inicializar el Proyecto

1. Clona este repositorio:
   ```bash
   git clone https://github.com/noahxsu777/Youtube-LLC1.git
   cd Youtube-LLC1
   ```

2. Instala las dependencias del Lambda:
   ```bash
   cd lambda/custom
   npm install
   cd ../..
   ```

### Paso 3: Desplegar la Skill

1. Despliega la skill a tu cuenta de Amazon Developer y AWS Lambda:
   ```bash
   ask deploy
   ```

   Este comando:
   - Crea la skill en Amazon Developer Console
   - Sube el código Lambda a AWS
   - Configura el endpoint de la skill
   - Construye el modelo de interacción

2. Si es la primera vez, se te pedirá autorización para crear recursos en AWS

### Paso 4: Probar la Skill

#### Opción A: Usar el Simulador en la Consola de Alexa

1. Ve a [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask)
2. Selecciona tu skill "YouTube Reproductor"
3. Ve a la pestaña "Test"
4. Habilita el testing en "Development"
5. Prueba con comandos como:
   - "Alexa, abre reproductor de YouTube"
   - "busca despacito"
   - "reproduce"

#### Opción B: Usar ASK CLI

```bash
ask dialog --locale es-ES
```

Luego prueba interacciones como:
```
User  > abre reproductor de youtube
Alexa > ¡Bienvenido al reproductor de YouTube! Puedes decir "busca" seguido del nombre del video...
User  > busca música relajante
Alexa > Encontré 5 videos. El primero es "Música Relajante"...
User  > reproduce
```

#### Opción C: Usar un Dispositivo Alexa Real

1. Asegúrate de que el dispositivo Alexa esté registrado con la misma cuenta de Amazon que usaste para crear la skill
2. La skill estará disponible automáticamente en modo desarrollo
3. Di: "Alexa, abre reproductor de YouTube"

## 🗣️ Comandos de Voz Disponibles

### Comandos Principales:
- **"Alexa, abre reproductor de YouTube"** - Inicia la skill
- **"busca [nombre del video]"** - Busca videos en YouTube
  - Ejemplo: "busca bad bunny"
  - Ejemplo: "busca música para estudiar"
- **"reproduce"** - Reproduce el primer resultado de búsqueda

### Controles de Reproducción:
- **"pausa"** - Pausa la reproducción
- **"reanuda"** - Reanuda la reproducción
- **"siguiente"** - Pasa al siguiente video de la búsqueda
- **"anterior"** - Vuelve al video anterior
- **"detente"** o **"cancela"** - Detiene la reproducción y cierra la skill

### Ayuda:
- **"ayuda"** - Obtén información sobre cómo usar la skill

## 📁 Estructura del Proyecto

```
Youtube-LLC1/
├── lambda/
│   └── custom/
│       ├── index.js           # Código principal del Lambda handler
│       └── package.json       # Dependencias de Node.js
├── skill-package/
│   ├── skill.json            # Configuración de la skill
│   └── interactionModels/
│       └── custom/
│           └── es-ES.json    # Modelo de interacción en español
├── .gitignore
└── README.md
```

## 🔧 Personalización

### Cambiar el Nombre de Invocación

Edita `skill-package/interactionModels/custom/es-ES.json`:
```json
{
  "interactionModel": {
    "languageModel": {
      "invocationName": "tu nuevo nombre aquí"
    }
  }
}
```

### Agregar Más Idiomas

1. Crea un nuevo archivo en `skill-package/interactionModels/custom/` (ej: `en-US.json`)
2. Agrega la configuración del idioma en `skill-package/skill.json`
3. Actualiza los mensajes en `lambda/custom/index.js`

### Modificar Respuestas de Voz

Edita las variables `speakOutput` en `lambda/custom/index.js` para cambiar lo que Alexa dice.

## 🔄 Actualizar la Skill

Después de hacer cambios:

1. Guarda tus cambios
2. Despliega de nuevo:
   ```bash
   ask deploy
   ```

Para actualizar solo el Lambda (si solo cambiaste el código):
```bash
ask deploy --target lambda
```

Para actualizar solo el modelo de interacción:
```bash
ask deploy --target skill-metadata
```

## 📊 Monitoreo y Logs

### Ver logs de Lambda:

1. Ve a [AWS Lambda Console](https://console.aws.amazon.com/lambda)
2. Busca tu función Lambda (nombre similar a `ask-youtube-alexa-skill-default`)
3. Ve a la pestaña "Monitor" → "View logs in CloudWatch"

### O usa ASK CLI:
```bash
ask lambda log --skill-id <tu-skill-id>
```

## ⚠️ Notas Importantes

1. **YouTube API**: Esta skill utiliza bibliotecas que hacen scraping de YouTube. Ten en cuenta que:
   - Puede no ser 100% confiable debido a cambios en YouTube
   - Considera usar la API oficial de YouTube para producción
   
2. **Limitaciones de Audio**: 
   - Alexa solo puede reproducir streams de audio durante un tiempo limitado
   - Algunos formatos de audio pueden no ser compatibles

3. **Modo Desarrollo**:
   - La skill solo estará disponible en tu cuenta mientras esté en desarrollo
   - Para publicarla, necesitarás pasar por el proceso de certificación de Amazon

4. **Costos de AWS**:
   - Lambda tiene un nivel gratuito generoso
   - Monitorea tu uso para evitar cargos inesperados

## 🐛 Solución de Problemas

### La skill no encuentra videos
- Verifica tu conexión a internet
- Revisa los logs de CloudWatch para ver errores específicos

### Error "No se pudo obtener el audio"
- Algunos videos pueden tener restricciones
- Intenta con otro video
- Verifica que ytdl-core esté actualizado

### La skill no responde
- Verifica que el Lambda esté correctamente desplegado
- Revisa los permisos en AWS
- Consulta los logs de CloudWatch

## 📝 Publicación (Opcional)

Para publicar tu skill en la tienda de Alexa:

1. Completa toda la información requerida en Amazon Developer Console
2. Agrega iconos de la skill (108x108 y 512x512)
3. Completa la descripción y ejemplos de uso
4. Envía para certificación
5. Responde a cualquier feedback del equipo de revisión

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👨‍💻 Autor

Noah Xsu

---

¿Preguntas? Abre un issue en GitHub.