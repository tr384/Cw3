var cacheName = "lessonsstores-v1";
var cacheFiles = [
  "index.html",
  "app.js",
  "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/xmaths.png",
  "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/xpsy.png",
  "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/xphys.JPEG",
  "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/xastro.png",
  "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/xeng.png",
  "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/xbio.png",
  "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/xemath.png",
  "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/xfoot.png",
  "https://newcw2-env.eba-sw23cwmq.eu-west-2.elasticbeanstalk.com/xit.jpeg",



];



self.addEventListener("fetch", function (e) {
  (e).respondWith (caches.match(e.request).then(function (cachedFile) {
      
      if (cachedFile) {
        console.log(
          " [Service Worker] Resource fetched from the cache for: " + e.request.url);

        return cachedFile;
      } else {
        return fetch(e.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            //add the new file to the cache
            cache.put(e.request, response.clone());
            console.log("[Service Worker] Resource fetched and saved in the cache for:" + e.request.url
            );

            return response;
          });
        });
      }
    })
  );
});
