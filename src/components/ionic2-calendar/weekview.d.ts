import { IonSlides } from '@ionic/angular';
import { OnInit, OnChanges, EventEmitter, SimpleChanges, TemplateRef, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ICalendarComponent, IDisplayEvent, IEvent, ITimeSelected, IRange, IWeekView, IWeekViewRow, IWeekViewDateRow, CalendarMode, IDateFormatter, IDisplayWeekViewHeader } from './calendar';
import { CalendarService } from './calendar.service';
import { IDisplayAllDayEvent, IWeekViewAllDayEventSectionTemplateContext, IWeekViewNormalEventSectionTemplateContext } from './calendar';
import * as ɵngcc0 from '@angular/core';
export declare class WeekViewComponent implements ICalendarComponent, OnInit, OnChanges, OnDestroy, AfterViewInit {
    private calendarService;
    private elm;
    constructor(calendarService: CalendarService, elm: ElementRef);
    slider: IonSlides;
    class: boolean;
    weekviewHeaderTemplate: TemplateRef<IDisplayWeekViewHeader>;
    weekviewAllDayEventTemplate: TemplateRef<IDisplayAllDayEvent>;
    weekviewNormalEventTemplate: TemplateRef<IDisplayEvent>;
    weekviewAllDayEventSectionTemplate: TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    weekviewNormalEventSectionTemplate: TemplateRef<IWeekViewNormalEventSectionTemplateContext>;
    weekviewInactiveAllDayEventSectionTemplate: TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    weekviewInactiveNormalEventSectionTemplate: TemplateRef<IWeekViewNormalEventSectionTemplateContext>;
    formatWeekTitle: string;
    formatWeekViewDayHeader: string;
    formatHourColumn: string;
    startingDayWeek: number;
    allDayLabel: string;
    hourParts: number;
    eventSource: IEvent[];
    autoSelect: boolean;
    markDisabled: (date: Date) => boolean;
    locale: string;
    dateFormatter: IDateFormatter;
    dir: string;
    scrollToHour: number;
    preserveScrollPosition: boolean;
    lockSwipeToPrev: boolean;
    lockSwipes: boolean;
    startHour: number;
    endHour: number;
    sliderOptions: any;
    hourSegments: number;
    onRangeChanged: EventEmitter<IRange>;
    onEventSelected: EventEmitter<IEvent>;
    onTimeSelected: EventEmitter<ITimeSelected>;
    onTitleChanged: EventEmitter<string>;
    views: IWeekView[];
    currentViewIndex: number;
    range: IRange;
    direction: number;
    mode: CalendarMode;
    private inited;
    private callbackOnInit;
    private currentDateChangedFromParentSubscription;
    private eventSourceChangedSubscription;
    private slideChangedSubscription;
    private slideUpdatedSubscription;
    hourColumnLabels: string[];
    initScrollPosition: number;
    private formatDayHeader;
    private formatTitle;
    private formatHourColumnLabel;
    private hourRange;
    static createDateObjects(startTime: Date, startHour: number, endHour: number, timeInterval: number): IWeekViewRow[][];
    static getDates(startTime: Date, n: number): IWeekViewDateRow[];
    private static compareEventByStartOffset;
    private static calculateWidth;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onSlideChanged(): void;
    move(direction: number): void;
    private getHourColumnLabels;
    getViewData(startTime: Date): IWeekView;
    getRange(currentDate: Date): IRange;
    onDataLoaded(): void;
    refreshView(): void;
    getTitle(): string;
    getHighlightClass(date: IWeekViewDateRow): string;
    select(selectedTime: Date, events: IDisplayEvent[]): void;
    placeEvents(orderedEvents: IDisplayEvent[]): void;
    placeAllDayEvents(orderedEvents: IDisplayEvent[]): void;
    overlap(event1: IDisplayEvent, event2: IDisplayEvent): boolean;
    calculatePosition(events: IDisplayEvent[]): void;
    updateCurrentView(currentViewStartDate: Date, view: IWeekView): void;
    daySelected(viewDate: IWeekViewDateRow): void;
    setScrollPosition(scrollPosition: number): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<WeekViewComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<WeekViewComponent, "weekview", never, { "autoSelect": "autoSelect"; "dir": "dir"; "scrollToHour": "scrollToHour"; "sliderOptions": "sliderOptions"; "weekviewHeaderTemplate": "weekviewHeaderTemplate"; "weekviewAllDayEventTemplate": "weekviewAllDayEventTemplate"; "weekviewNormalEventTemplate": "weekviewNormalEventTemplate"; "weekviewAllDayEventSectionTemplate": "weekviewAllDayEventSectionTemplate"; "weekviewNormalEventSectionTemplate": "weekviewNormalEventSectionTemplate"; "weekviewInactiveAllDayEventSectionTemplate": "weekviewInactiveAllDayEventSectionTemplate"; "weekviewInactiveNormalEventSectionTemplate": "weekviewInactiveNormalEventSectionTemplate"; "formatWeekTitle": "formatWeekTitle"; "formatWeekViewDayHeader": "formatWeekViewDayHeader"; "formatHourColumn": "formatHourColumn"; "startingDayWeek": "startingDayWeek"; "allDayLabel": "allDayLabel"; "hourParts": "hourParts"; "eventSource": "eventSource"; "markDisabled": "markDisabled"; "locale": "locale"; "dateFormatter": "dateFormatter"; "preserveScrollPosition": "preserveScrollPosition"; "lockSwipeToPrev": "lockSwipeToPrev"; "lockSwipes": "lockSwipes"; "startHour": "startHour"; "endHour": "endHour"; "hourSegments": "hourSegments"; }, { "onRangeChanged": "onRangeChanged"; "onEventSelected": "onEventSelected"; "onTimeSelected": "onTimeSelected"; "onTitleChanged": "onTitleChanged"; }, never, never>;
}

//# sourceMappingURL=weekview.d.ts.map