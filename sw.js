/* Cache para o app abrir sem internet.
   - Página principal: tenta a internet primeiro (assim as atualizações chegam na hora) e,
     se estiver sem rede ou lenta (mais de 4 s), usa a cópia guardada.
   - Ícones e fontes: usa a cópia guardada.
   - Nada de outros sites (Google Drive, login) passa por aqui.
   Os dados dos empréstimos NÃO ficam neste cache. */
const V = "meus-emprestimos-v1";
const ARQUIVOS = [
  "./", "index.html", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "fonts/cormorant-garamond-latin-500-normal.woff2",
  "fonts/cormorant-garamond-latin-600-normal.woff2",
  "fonts/cormorant-garamond-latin-700-normal.woff2",
  "fonts/inter-latin-wght-normal.woff2"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;

  const ehPagina = r.mode === "navigate" || u.pathname.endsWith("/") || u.pathname.endsWith("/index.html");
  if (ehPagina) {
    e.respondWith((async () => {
      const cache = await caches.open(V);
      const rede = fetch(r).then((res) => { if (res.ok) cache.put("index.html", res.clone()); return res; });
      const guardada = await cache.match("index.html");
      if (!guardada) return rede;
      return Promise.race([rede, new Promise((ok) => setTimeout(() => ok(guardada), 4000))]).catch(() => guardada);
    })());
    return;
  }

  e.respondWith(
    caches.match(r).then((m) => m || fetch(r).then((res) => {
      if (res.ok) { const cp = res.clone(); caches.open(V).then((c) => c.put(r, cp)); }
      return res;
    }))
  );
});
