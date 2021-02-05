import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
 
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
 
  constructor(private modalCtrl: ModalController) { }
  
 
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
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {    
    this.event.startTime = new Date(ev.selectedTime);
  }
  
 
  close() {
    this.event.title= '';
    this.event.startTime= null;
    this.event.endTime= '';
    this.event.room='';
    this.event.allDay=false;

    this.modalCtrl.dismiss();
  }
}