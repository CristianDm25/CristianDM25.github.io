self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('mi-pwa-cache').then(cache => {
            return cache.addAll([
                '/',
                'index.html',
                'viaje.jpg',
                'r.jpeg',
                'videojuegos.jpg',
                'faceboock.png',
                'mclobin.jpg',
                'viaje.jpg',
            ]);
        })
    );
    console.log('Service Worker instalado');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(respuesta => respuesta || fetch(event.request))
    );
});

/*self.addEventListener('install', event => { ... });

self: En un Service Worker, self se refiere al propio Service Worker. Es como decir "este Service Worker".

addEventListener('install', ...): Esto registra un escuchador de eventos para el evento install. Este evento se dispara solo una vez cuando el Service Worker se instala por primera vez en el navegador del usuario. Es el momento ideal para preparar tu PWA para el uso sin conexión.

event.waitUntil(...):

Este método es crucial. Le dice al navegador que el Service Worker no debe considerarse instalado hasta que la promesa que se le pasa se resuelva exitosamente. Esto asegura que la caché se haya llenado completamente antes de que el Service Worker entre en acción. Si la promesa se rechaza (por ejemplo, si falla la descarga de algún archivo), la instalación del Service Worker fallará.

caches.open('mi-pwa-cache'):

caches: Es una interfaz global que te permite acceder a la API de Cache Storage del navegador. Aquí es donde los Service Workers guardan los recursos.

open('mi-pwa-cache'): Intenta abrir una caché con el nombre 'mi-pwa-cache'. Si ya existe una caché con ese nombre, la devuelve; si no, crea una nueva. La promesa que devuelve se resuelve con un objeto cache. Elegir un nombre significativo para tu caché es una buena práctica.

.then(cache => { ... }):

Esto es una promesa. Una vez que caches.open() se ha resuelto y tenemos acceso al objeto cache, se ejecuta el código dentro de este bloque. cache es el objeto que representa nuestra caché.

return cache.addAll([ '/', 'index.html', 'fsica.html', 'fisica.jpeg' ]);

cache.addAll(...): Este método es muy útil para agregar múltiples recursos a la caché a la vez. Toma un array de URLs como argumento. El Service Worker intentará descargar cada una de estas URLs y guardarlas en la caché.

'/': Representa la página principal de tu aplicación (la raíz del sitio web).

'index.html', 'fsica.html', 'fisica.jpeg': Son los nombres de los archivos específicos que quieres que tu PWA pueda acceder incluso sin conexión. Estos archivos serán guardados en la caché.

console.log('Service Worker instalado');:

Esta línea simplemente imprime un mensaje en la consola del navegador una vez que el evento de instalación ha terminado (después de que todos los archivos se han agregado a la caché). Es útil para depuración*            */