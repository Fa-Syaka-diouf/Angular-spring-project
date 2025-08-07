// main.ts - VERSION CORRIGÉE
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// ✅ UN SEUL bootstrapApplication
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));