import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Network } from '@ionic-native/network';
import { DatePipe } from '@angular/common';

import { FiscalProvider } from '../providers/fiscal/fiscal';
import { EditPastaPage } from '../pages/edit-pasta/edit-pasta';
import { ArquivosPage } from '../pages/arquivos/arquivos';
import { ConfirmaImagemPage } from '../pages/confirma-imagem/confirma-imagem';
import { VistoriasPage } from '../pages/vistorias/vistorias';
import { DenunciasPage } from '../pages/denuncias/denuncias';
import { LoginPage } from '../pages/login/login';
import { SincronizarPage } from '../pages/sincronizar/sincronizar';
import { ChecklistPage } from '../pages/checklist/checklist';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditPastaPage,
    ArquivosPage,
    ConfirmaImagemPage,
    DenunciasPage,
    VistoriasPage,
    LoginPage,
    SincronizarPage,
    ChecklistPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: 'md'
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditPastaPage,
    ArquivosPage,
    ConfirmaImagemPage,
    DenunciasPage,
    VistoriasPage,
    LoginPage,
    SincronizarPage,
    ChecklistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    Geolocation,
    NativeGeocoder,
    Network,
    DatePipe,
    FiscalProvider
  ]
})
export class AppModule { }
