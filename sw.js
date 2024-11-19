//imports

importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
  //  '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars//wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE =[
    'https://fonts.gooogleapis.com/css?family=Quicksand:300,400',
    'https://fonts.gooogleapis.com/css?family=Lato:300,400',
    'https://use.fontawesome.com/rekeases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

self.addEventListener('install', e=>{
    
    const cacheStatic = caches.open(STATIC_CACHE).then(cache=>{

        cache.addAll(APP_SHELL);

    });//cierre cache static

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache=>{

        cache.addAll(APP_SHELL_INMUTABLE);
        
    });//Cierre  cache insmutable 

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
}); //cierre install


self.addEventListener('activate', e=>{

    const respuesta= caches.keys().then(keys=>{
        keys.forEach(key=>{
            if(key!==STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }//cierre if
        });//cierre  foreach
    });//cierre keys

    e.waitUntil(respuesta);
});//cieere activate

self.addEventListener('fetch', e=>{

    const respuesta = caches.match(e.request).then(res=>{
        if (res) {
            return res;
        } else {
            return fetch(e.request).then(newRes=>{
                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            })//cierre then
        }
    })//cierre match

    e.respondWith(respuesta);
    
});//cierre fetch