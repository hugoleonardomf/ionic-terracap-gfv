import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { FiscalProvider, PastaList, Arquivo } from '../../providers/fiscal/fiscal';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-confirma-imagem',
  templateUrl: 'confirma-imagem.html',
})

export class ConfirmaImagemPage {

  model: Arquivo;
  pastaList: PastaList;
  base64Image: string;
  editMode: boolean = false;
  resultLocal: NativeGeocoderReverseResult;
  descricaoLocal: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fiscalProvider: FiscalProvider, private datepipe: DatePipe, private alertCtrl: AlertController, private nativeGeocoder: NativeGeocoder) {
    this.pastaList = this.navParams.get('pastaList');
    this.model = this.navParams.get('arquivo');
    this.base64Image = this.model.imagem;
    if (this.model.id) {
      this.editMode = true;
      //retorna descrição do local pela lat, long
      //this.nativeGeocoder.reverseGeocode(-15.8154017, -47.9863917) //guara
      console.log(Number(this.model.lat));
      console.log(Number(this.model.long));
      this.nativeGeocoder.reverseGeocode(Number(this.model.lat), Number(this.model.long))
        .then((result: NativeGeocoderReverseResult) => {
          console.log(JSON.stringify(result));
          this.resultLocal = result[0];
          this.descricaoLocal = this.resultLocal.thoroughfare + ', ' + this.resultLocal.subLocality + ', ' + this.resultLocal.subAdministrativeArea + ', ' + this.resultLocal.administrativeArea;
        })
        .catch((error: any) => {
          console.log(error);
          this.descricaoLocal = 'Erro ao recuperar Local';
        });
    }
  }

  ionViewDidEnter() {
    //
  }

  showAlert(titulo: string, texto: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: texto,
      buttons: ['OK']
    });
    alert.present();
  }

  save() {
    this.saveImagem()
      .then(() => {
        this.navCtrl.pop();
      })
      .catch(() => {
        console.log('erro');
      });
  }

  private saveImagem() {
    if (!this.model.id) { //insert
      this.model.id = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
      this.model.criacao = new Date();
      this.pastaList.pasta.arquivos.push(this.model);
    }
    console.log(this.model);
    return this.fiscalProvider.updatePasta(this.pastaList.key, this.pastaList.pasta);
  }

  private remove() {
    this.pastaList.pasta.arquivos.splice(this.pastaList.pasta.arquivos.indexOf(this.model), 1);
    this.fiscalProvider.updatePasta(this.pastaList.key, this.pastaList.pasta);
    this.navCtrl.pop();
  }

  confirmRemove() {
    let alert = this.alertCtrl.create({
      title: 'Deseja excluir a foto?',
      message: 'Essa ação não poderá ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.remove();
          }
        }
      ]
    });
    alert.present();
  }

}
