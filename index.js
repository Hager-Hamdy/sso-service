const Sentry = require("@sentry/browser");
const { BrowserTracing } = require("@sentry/tracing");
const app = require("./app.js");
const { APP_PORT } = require("./config.js");
const migrations = require("./umzug");
const readXlsxFile = require('read-excel-file/node')

app.listen(APP_PORT, () => {
    console.log(`App is serving at port: ${APP_PORT}`);
    Sentry.init({
        dsn: "https://879cff1ca81149068f6f87d8102e5cd2@o1341662.ingest.sentry.io/6615115",
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });

})
// Run migrations & seeds
// migrations().then(function() {
//     console.log("Migrations completed");
// })