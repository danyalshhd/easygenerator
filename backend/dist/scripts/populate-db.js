"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
async function bootstrap() {
    const appContext = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
}
bootstrap().catch((err) => {
    console.error('Error populating database:', err);
    process.exit(1);
});
//# sourceMappingURL=populate-db.js.map