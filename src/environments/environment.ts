// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyBh72g_9uYzBIroGSVPL4D4WJzdVfDk1F4",
    authDomain: "notea-ee604.firebaseapp.com",
    projectId: "notea-ee604",
    storageBucket: "notea-ee604.appspot.com",
    messagingSenderId: "218462885653",
    appId: "1:218462885653:web:54288d03838cbea11d7b1c",
    measurementId: "G-1HD0GJJXTV",

    todoCollection: "todo"
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
