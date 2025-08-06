import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../enviroments/environment';

const firebaseProviders: EnvironmentProviders = importProvidersFrom(
  //provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  //provideFirestore(() => getFirestore()),
);

export { firebaseProviders };