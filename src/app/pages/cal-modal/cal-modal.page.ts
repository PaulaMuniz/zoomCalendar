import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { ReactiveFormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})



export class CalModalPage implements AfterViewInit {
  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;
  

  
  rooms:any;
  ionicForm: FormGroup;
  isSubmitted = false;
  private room: Array<Object> = [];

  event = {
    title: '',
    startTime: null,
    endTime: '',
    room:'',
    allDay:false
    };
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  modalReady = false;
  currentDateSelected=false;

  
 
  constructor(private modalCtrl: ModalController) { 
    
    //this.myCal.loadEvents();
    this.rooms =[
      {
          "cod": "001",
          "nome": "TI ZOOM",
          "desc": "Sala de reunião virtual via Zoom Meetings"
      },

      {
          "cod": "002",
          "nome": "COMERCIAL ZOOM",
          "desc": "Sala de reunião virtual via Zoom Meetings"
      },

      {
          "cod": "003",
          "nome": "PRUMO ZOOM",
          "desc": "Sala de reunião virtual via Zoom Meetings"
      },

      {
          "cod": "004",
          "nome": "SALA DE REUNIÃO 1",
          "desc": "Sala de reunião física, próxima ao auditório"
      },

      {
          "cod": "005",
          "nome": "SALA DE REUNIÃO 2",
          "desc": "Sala de reunião física, próxima ao financeiro"
      },
    ]
   }
  
   
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;  
      this.currentDateSelected=true; 
    }, 0);
 }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }
 
  save() { 
    //fazer um if pra ver se os valores estão vazios 
  
    
    this.modalCtrl.dismiss({event: this.event})
    console.log("Seu evento escolhido foi:"+ this.event.room)
    console.log("Horario de início:"+this.event.startTime)
    console.log("Horário final:"+this.event.endTime)
    console.log("Data do evento:"+this.event.title)
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {    
    console.log('ev:', ev);
    this.event.startTime = new Date(ev.selectedTime);
  }

  close() {
    this.event.title= '';
    this.event.startTime= null;
    this.event.endTime= '';
    this.event.room=null;
    this.event.allDay=false;
    this.room=null;
    this.modalCtrl.dismiss();
  }
}