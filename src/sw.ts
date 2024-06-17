import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute
} from 'workbox-precaching'
import { NavigationRoute, registerRoute, setDefaultHandler } from 'workbox-routing'
import { clientsClaim } from 'workbox-core'
import { NetworkFirst, Strategy } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

const data = {
  race: false,
  debug: false,
  credentials: 'same-origin',
  networkTimeoutSeconds: 0,
  fallback: 'index.html'
}

const cacheName = 'todo-cache'

function buildStrategy(): Strategy {
  return new NetworkFirst({ cacheName })
}

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')), buildStrategy())

const allowlist: undefined | RegExp[] = [/^\/$/]
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist }))

setDefaultHandler(new NetworkFirst())

// this is necessary, since the new service worker will keep on skipWaiting state
// and then, caches will not be cleared since it is not activated
self.skipWaiting()
clientsClaim()
