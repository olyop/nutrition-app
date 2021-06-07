/* eslint-disable no-underscore-dangle */
import {
	CacheFirst,
	NetworkFirst,
	StaleWhileRevalidate,
} from "workbox-strategies"

import { registerRoute } from "workbox-routing"
import { precacheAndRoute } from "workbox-precaching"
import { ExpirationPlugin } from "workbox-expiration"
import { CacheableResponsePlugin } from "workbox-cacheable-response"

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST)

// @ts-ignore
self.__WB_DISABLE_DEV_LOGS = true

// @ts-ignore
self.skipWaiting()

registerRoute(
	({ request }) =>
		request.mode === "navigate",
	new NetworkFirst({
		cacheName: "pages",
		plugins: [
			new CacheableResponsePlugin({ statuses: [200] }),
		],
	}),
)

registerRoute(
	({ url }) =>
		url.origin === "https://fonts.googleapis.com",
	new StaleWhileRevalidate({
		cacheName: "google-fonts-stylesheets",
	}),
)

registerRoute(
	({ url }) =>
		url.origin === "https://fonts.gstatic.com",
	new CacheFirst({
		cacheName: "google-fonts-webfonts",
		plugins: [
			new CacheableResponsePlugin({ statuses: [200] }),
			new ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	}),
)

registerRoute(
	({ request }) =>
		request.destination === "style" ||
		request.destination === "script",
	new StaleWhileRevalidate({
		cacheName: "assets",
		plugins: [
			new CacheableResponsePlugin({ statuses: [200] }),
		],
	}),
)

registerRoute(
	({ request }) =>
		request.destination === "image",
	new CacheFirst({
		cacheName: "images",
		plugins: [
			new CacheableResponsePlugin({ statuses: [200] }),
			new ExpirationPlugin({
				maxEntries: 100,
				maxAgeSeconds: 30 * 24 * 60 * 60,
			}),
		],
	}),
)