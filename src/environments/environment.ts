// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  trakt: {
    baseUrl: "https://api.trakt.tv",
    authUrl: "https://trakt.tv",
    clientId: "9bb50356fffe4192bf8b65138baf1928dbd0291a7cdf05e4cfb1e225b78807ad",
    version: "2",
    redirectUri: "https://watchapp.netlify.com",
    tokenUrl: "https://api.trakt.tv/oauth/token",
    contentType: `"content-type":"application/json"`,
    client_secret: "850fd440b696aa38f63bce588e4b9a2cd29852295ff5a2a51e9eb906e98abff4"
  },
  tmdb: {
    key: '06b0c13ef21818950c8fc47169df38f8'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
