# Instrucciones Paso a Paso para Configurar tu Skill de YouTube

## ¿Qué tienes que hacer?

Sigue estos pasos cuidadosamente para tener tu skill de YouTube funcionando en Alexa.

## 📝 PASO 1: Preparar tu Computadora

### 1.1 Instalar Node.js
1. Ve a https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Instala siguiendo las instrucciones
4. Verifica la instalación abriendo una terminal/CMD y escribiendo:
   ```bash
   node --version
   npm --version
   ```
   Deberías ver números de versión para ambos

### 1.2 Instalar ASK CLI
1. Abre una terminal/CMD
2. Ejecuta:
   ```bash
   npm install -g ask-cli
   ```
3. Espera a que termine (puede tomar unos minutos)
4. Verifica con:
   ```bash
   ask --version
   ```

## 📝 PASO 2: Crear Cuentas Necesarias

### 2.1 Cuenta de Amazon Developer (si no la tienes)
1. Ve a https://developer.amazon.com
2. Haz clic en "Iniciar sesión" (Sign in)
3. Si no tienes cuenta, haz clic en "Crear tu cuenta de Amazon"
4. Completa el registro
5. Acepta los términos del programa de desarrolladores

### 2.2 Cuenta de AWS (si no la tienes)
1. Ve a https://aws.amazon.com
2. Haz clic en "Crear una cuenta de AWS"
3. Completa el proceso (necesitarás una tarjeta de crédito, pero hay nivel gratuito)
4. Verifica tu cuenta

## 📝 PASO 3: Configurar ASK CLI

1. Abre una terminal/CMD
2. Ejecuta:
   ```bash
   ask configure
   ```
3. Se abrirá un navegador
4. Inicia sesión con tu cuenta de Amazon Developer
5. Autoriza el acceso
6. Vuelve a la terminal y verás que pide configurar AWS
7. Sigue las instrucciones para conectar con AWS
8. Cuando pregunte por el perfil, usa "default" si es tu primera vez

## 📝 PASO 4: Obtener el Código de la Skill

### Opción A: Si tienes Git instalado
```bash
git clone https://github.com/noahxsu777/Youtube-LLC1.git
cd Youtube-LLC1
```

### Opción B: Si no tienes Git
1. Ve a https://github.com/noahxsu777/Youtube-LLC1
2. Haz clic en el botón verde "Code"
3. Selecciona "Download ZIP"
4. Descomprime el archivo
5. Abre una terminal en esa carpeta

## 📝 PASO 5: Instalar Dependencias

Desde la carpeta del proyecto:

```bash
cd lambda/custom
npm install
cd ../..
```

Esto descargará todas las bibliotecas necesarias.

## 📝 PASO 6: Desplegar la Skill

Desde la carpeta raíz del proyecto:

```bash
ask deploy
```

**IMPORTANTE**: Este paso puede tomar varios minutos. No cierres la terminal.

Lo que hace este comando:
- ✅ Crea la skill en Amazon Developer Console
- ✅ Sube el código a AWS Lambda
- ✅ Configura todo automáticamente
- ✅ Construye el modelo de voz

Si todo sale bien, verás un mensaje de éxito con el ID de tu skill.

## 📝 PASO 7: Probar tu Skill

### Método 1: En la Web (Recomendado para comenzar)

1. Ve a https://developer.amazon.com/alexa/console/ask
2. Inicia sesión
3. Verás tu skill "YouTube Reproductor" en la lista
4. Haz clic en ella
5. Ve a la pestaña "Test" en la parte superior
6. Cambia el menú desplegable de "Off" a "Development"
7. En el cuadro de texto, escribe o di:
   ```
   abre reproductor de youtube
   ```
8. Verás y escucharás la respuesta de Alexa
9. Prueba comandos como:
   ```
   busca música relajante
   reproduce
   siguiente
   pausa
   ```

### Método 2: En un Dispositivo Alexa Real

1. Asegúrate de que tu Echo/Alexa está conectado a la misma cuenta de Amazon
2. Di: "Alexa, abre reproductor de YouTube"
3. Sigue las instrucciones de Alexa

**NOTA**: En modo desarrollo, solo TÚ puedes usar la skill (otras personas no podrán verla)

## 📝 PASO 8: Usar la Skill

### Comandos que puedes usar:

**Para empezar:**
- "Alexa, abre reproductor de YouTube"

**Para buscar:**
- "busca [nombre]"
  - Ejemplos:
    - "busca bad bunny"
    - "busca música para dormir"
    - "busca tutorial de guitarra"

**Para controlar:**
- "reproduce" - inicia el primer resultado
- "pausa" - pausa la música
- "reanuda" - continúa la música
- "siguiente" - pasa al siguiente video
- "anterior" - vuelve al anterior
- "detente" - para y cierra la skill

**Para ayuda:**
- "ayuda" - Alexa te explicará cómo usar la skill

## ❓ Problemas Comunes y Soluciones

### "ask: command not found"
- Cierra y vuelve a abrir la terminal
- Verifica que npm install se completó correctamente
- En Windows, puede que necesites reiniciar

### "No se pudo desplegar la skill"
- Verifica que configuraste ask-cli correctamente
- Asegúrate de tener conexión a internet
- Revisa que tus credenciales de AWS sean correctas

### "La skill no responde en mi dispositivo"
- Confirma que el dispositivo está en la misma cuenta
- Asegúrate de que está en modo "Development" en la consola
- Espera unos minutos y vuelve a intentar

### "No encuentra videos"
- Verifica tu conexión a internet
- Algunos videos pueden no estar disponibles
- Intenta con búsquedas más simples

### "Error al reproducir"
- No todos los videos se pueden reproducir por restricciones
- Intenta con otro video
- Verifica los logs en AWS CloudWatch

## 🔧 Hacer Cambios a la Skill

Si quieres modificar algo:

1. Edita los archivos necesarios (ej: `lambda/custom/index.js` para cambiar respuestas)
2. Guarda los cambios
3. Ejecuta de nuevo:
   ```bash
   ask deploy
   ```
4. Espera a que termine
5. Prueba los cambios

## 📊 Ver Logs (Para Desarrolladores)

Si algo no funciona:

1. Ve a https://console.aws.amazon.com/lambda
2. Busca tu función Lambda
3. Ve a "Monitor" → "View logs in CloudWatch"
4. Ahí verás errores y mensajes de debug

## ✅ Checklist Final

Antes de decir que terminaste, verifica:

- [ ] Node.js está instalado
- [ ] ASK CLI está instalado y configurado
- [ ] Descargaste el código del proyecto
- [ ] Ejecutaste `npm install` en lambda/custom
- [ ] Ejecutaste `ask deploy` exitosamente
- [ ] Probaste la skill en el simulador web
- [ ] La skill responde a comandos básicos
- [ ] Puedes buscar videos
- [ ] Puedes reproducir audio

## 🎉 ¡Felicidades!

Si llegaste hasta aquí y todo funciona, ¡ya tienes tu propia skill de YouTube para Alexa!

### Próximos Pasos (Opcionales):

1. **Personaliza las respuestas**: Edita `index.js` para que Alexa hable como tú quieras
2. **Agrega más funciones**: Puedes agregar playlists, favoritos, etc.
3. **Publica tu skill**: Si quieres que otros la usen, sigue el proceso de certificación
4. **Comparte con amigos**: Aunque en desarrollo, puedes ser tester beta

## 📞 ¿Necesitas Ayuda?

- Lee el README.md principal para más detalles técnicos
- Revisa los logs en AWS CloudWatch
- Busca en el foro de Amazon Alexa Developers
- Abre un issue en el repositorio de GitHub

---

**RECUERDA**: Esta skill está en modo desarrollo. Solo tú puedes usarla hasta que la publiques oficialmente.
