const Alexa = require('ask-sdk-core');
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');

// Handler para cuando se abre la skill
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = '¡Bienvenido al reproductor de YouTube! Puedes decir "busca" seguido del nombre del video que quieras encontrar. ¿Qué quieres buscar?';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Handler para buscar videos en YouTube
const SearchIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SearchIntent';
    },
    async handle(handlerInput) {
        const query = Alexa.getSlotValue(handlerInput.requestEnvelope, 'query');
        
        if (!query) {
            const speakOutput = 'No entendí qué quieres buscar. Por favor, di "busca" seguido del nombre del video.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.currentQuery = query;
        
        try {
            // Buscar videos en YouTube
            const searchResults_temp = await ytsr(query, { limit: 5 });
            
            // Filtrar solo videos (no playlists ni canales)
            const searchResults = searchResults_temp.items.filter(item => item.type === 'video');
            
            if (searchResults.length === 0) {
                const speakOutput = `No encontré resultados para "${query}". Intenta con otra búsqueda.`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt('¿Qué más quieres buscar?')
                    .getResponse();
            }
            
            sessionAttributes.searchResults = searchResults;
            sessionAttributes.currentIndex = 0;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            
            const firstVideo = searchResults[0];
            
            const speakOutput = `Encontré ${searchResults.length} videos. El primero es "${firstVideo.title}" de ${firstVideo.author.name}. ¿Quieres que lo reproduzca?`;
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Di "reproduce" para escucharlo, o "busca" algo más.')
                .getResponse();
                
        } catch (error) {
            console.error('Error buscando en YouTube:', error);
            const speakOutput = 'Lo siento, hubo un error al buscar en YouTube. Por favor, intenta de nuevo más tarde.';
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
};

// Handler para reproducir el video
const PlayIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayIntent';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const searchResults = sessionAttributes.searchResults || [];
        
        if (searchResults.length === 0) {
            const speakOutput = 'Primero debes buscar un video. Di "busca" seguido del nombre del video que quieres encontrar.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        const currentIndex = sessionAttributes.currentIndex || 0;
        const video = searchResults[currentIndex];
        
        try {
            // Obtener URL de audio del video
            const info = await ytdl.getInfo(video.url);
            const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            
            if (!audioFormat || !audioFormat.url) {
                const speakOutput = 'Lo siento, no pude obtener el audio de este video. Intenta con otro.';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            }
            
            const speakOutput = `Reproduciendo ${video.title}`;
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .addAudioPlayerPlayDirective(
                    'REPLACE_ALL',
                    audioFormat.url,
                    video.id,
                    0,
                    null,
                    {
                        title: video.title,
                        subtitle: video.author.name
                    }
                )
                .getResponse();
                
        } catch (error) {
            console.error('Error obteniendo audio del video:', error);
            const speakOutput = 'Lo siento, hubo un error al intentar reproducir el video. Intenta con otro.';
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
};

// Handler para pausar
const PauseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

// Handler para reanudar
const ResumeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const searchResults = sessionAttributes.searchResults || [];
        
        if (searchResults.length === 0) {
            const speakOutput = 'No hay nada para reanudar. Busca un video primero.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
        
        const currentIndex = sessionAttributes.currentIndex || 0;
        const video = searchResults[currentIndex];
        
        try {
            const info = await ytdl.getInfo(video.url);
            const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            
            return handlerInput.responseBuilder
                .addAudioPlayerPlayDirective(
                    'REPLACE_ALL',
                    audioFormat.url,
                    video.id,
                    0,
                    null,
                    {
                        title: video.title,
                        subtitle: video.author.name
                    }
                )
                .getResponse();
                
        } catch (error) {
            console.error('Error reanudando:', error);
            const speakOutput = 'Lo siento, hubo un error al reanudar.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
};

// Handler para siguiente video
const NextIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const searchResults = sessionAttributes.searchResults || [];
        
        if (searchResults.length === 0) {
            const speakOutput = 'No hay videos en la lista. Busca algo primero.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
        
        const currentIndex = ((sessionAttributes.currentIndex || 0) + 1) % searchResults.length;
        sessionAttributes.currentIndex = currentIndex;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const video = searchResults[currentIndex];
        
        try {
            const info = await ytdl.getInfo(video.url);
            const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            
            const speakOutput = `Reproduciendo ${video.title}`;
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .addAudioPlayerPlayDirective(
                    'REPLACE_ALL',
                    audioFormat.url,
                    video.id,
                    0,
                    null,
                    {
                        title: video.title,
                        subtitle: video.author.name
                    }
                )
                .getResponse();
                
        } catch (error) {
            console.error('Error en siguiente:', error);
            const speakOutput = 'Lo siento, hubo un error al pasar al siguiente video.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
};

// Handler para video anterior
const PreviousIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PreviousIntent';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const searchResults = sessionAttributes.searchResults || [];
        
        if (searchResults.length === 0) {
            const speakOutput = 'No hay videos en la lista. Busca algo primero.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
        
        const currentIndex = ((sessionAttributes.currentIndex || 0) - 1 + searchResults.length) % searchResults.length;
        sessionAttributes.currentIndex = currentIndex;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const video = searchResults[currentIndex];
        
        try {
            const info = await ytdl.getInfo(video.url);
            const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            
            const speakOutput = `Reproduciendo ${video.title}`;
            
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .addAudioPlayerPlayDirective(
                    'REPLACE_ALL',
                    audioFormat.url,
                    video.id,
                    0,
                    null,
                    {
                        title: video.title,
                        subtitle: video.author.name
                    }
                )
                .getResponse();
                
        } catch (error) {
            console.error('Error en anterior:', error);
            const speakOutput = 'Lo siento, hubo un error al pasar al video anterior.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
};

// Handler para ayuda
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Con esta skill puedes buscar y reproducir videos de YouTube. ' +
            'Di "busca" seguido del nombre del video, canción o artista que quieras encontrar. ' +
            'Luego puedes decir "reproduce" para escucharlo. ' +
            'También puedes decir "pausa", "reanuda", "siguiente" o "anterior" para controlar la reproducción. ' +
            '¿Qué quieres buscar?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Qué quieres buscar?')
            .getResponse();
    }
};

// Handler para cancelar y detener
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = '¡Hasta luego!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

// Handler para cuando termina una sesión
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

// Handler para reflectar intents no manejados
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Acabas de activar ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Handler de errores genérico
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${JSON.stringify(error)}`);
        const speakOutput = 'Lo siento, tuve problemas para hacer lo que pediste. Por favor intenta de nuevo.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Lambda handler
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SearchIntentHandler,
        PlayIntentHandler,
        PauseIntentHandler,
        ResumeIntentHandler,
        NextIntentHandler,
        PreviousIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .lambda();
