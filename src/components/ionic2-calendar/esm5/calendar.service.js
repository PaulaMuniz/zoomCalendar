import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var CalendarService = /** @class */ (function () {
    function CalendarService() {
        this.currentDateChangedFromParent = new Subject();
        this.currentDateChangedFromChildren = new Subject();
        this.eventSourceChanged = new Subject();
        this.slideChanged = new Subject();
        this.slideUpdated = new Subject();
        this.currentDateChangedFromParent$ = this.currentDateChangedFromParent.asObservable();
        this.currentDateChangedFromChildren$ = this.currentDateChangedFromChildren.asObservable();
        this.eventSourceChanged$ = this.eventSourceChanged.asObservable();
        this.slideChanged$ = this.slideChanged.asObservable();
        this.slideUpdated$ = this.slideUpdated.asObservable();
    }
    CalendarService.prototype.setCurrentDate = function (val, fromParent) {
        if (fromParent === void 0) { fromParent = false; }
        this._currentDate = new Date(val);
        if (fromParent) {
            this.currentDateChangedFromParent.next(val);
        }
        else {
            this.currentDateChangedFromChildren.next(val);
        }
    };
    Object.defineProperty(CalendarService.prototype, "currentDate", {
        get: function () {
            return this._currentDate;
        },
        enumerable: true,
        configurable: true
    });
    CalendarService.prototype.rangeChanged = function (component) {
        if (this.queryMode === 'local') {
            if (component.eventSource && component.onDataLoaded) {
                component.onDataLoaded();
            }
        }
        else if (this.queryMode === 'remote') {
            var rangeStart = new Date(component.range.startTime.getTime()), rangeEnd = new Date(component.range.endTime.getTime());
            rangeStart.setHours(0);
            if (rangeStart.getHours() === 23) {
                rangeStart.setTime(rangeStart.getTime() + 3600000);
            }
            rangeEnd.setHours(0);
            if (rangeEnd.getHours() === 23) {
                rangeEnd.setTime(rangeEnd.getTime() + 3600000);
            }
            component.onRangeChanged.emit({
                startTime: rangeStart,
                endTime: rangeEnd
            });
        }
    };
    CalendarService.prototype.getStep = function (mode) {
        switch (mode) {
            case 'month':
                return {
                    years: 0,
                    months: 1,
                    days: 0
                };
            case 'week':
                return {
                    years: 0,
                    months: 0,
                    days: 7
                };
            case 'day':
                return {
                    years: 0,
                    months: 0,
                    days: 1
                };
        }
    };
    CalendarService.prototype.getAdjacentCalendarDate = function (mode, direction) {
        var calculateCalendarDate = this.currentDate;
        var step = this.getStep(mode), year = calculateCalendarDate.getFullYear() + direction * step.years, month = calculateCalendarDate.getMonth() + direction * step.months, date = calculateCalendarDate.getDate() + direction * step.days;
        calculateCalendarDate = new Date(year, month, date, 12, 0, 0);
        if (mode === 'month') {
            var firstDayInNextMonth = new Date(year, month + 1, 1, 12, 0, 0);
            if (firstDayInNextMonth.getTime() <= calculateCalendarDate.getTime()) {
                calculateCalendarDate = new Date(firstDayInNextMonth.getTime() - 24 * 60 * 60 * 1000);
            }
        }
        return calculateCalendarDate;
    };
    CalendarService.prototype.getAdjacentViewStartTime = function (component, direction) {
        var adjacentCalendarDate = this.getAdjacentCalendarDate(component.mode, direction);
        return component.getRange(adjacentCalendarDate).startTime;
    };
    CalendarService.prototype.populateAdjacentViews = function (component) {
        var currentViewStartDate, currentViewData, toUpdateViewIndex, currentViewIndex = component.currentViewIndex;
        if (component.direction === 1) {
            currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
            toUpdateViewIndex = (currentViewIndex + 1) % 3;
            component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
        }
        else if (component.direction === -1) {
            currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
            toUpdateViewIndex = (currentViewIndex + 2) % 3;
            component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
        }
        else {
            if (!component.views) {
                currentViewData = [];
                currentViewStartDate = component.range.startTime;
                currentViewData.push(component.getViewData(currentViewStartDate));
                currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
                currentViewData.push(component.getViewData(currentViewStartDate));
                currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
                currentViewData.push(component.getViewData(currentViewStartDate));
                component.views = currentViewData;
            }
            else {
                currentViewStartDate = component.range.startTime;
                component.views[currentViewIndex] = component.getViewData(currentViewStartDate);
                currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
                toUpdateViewIndex = (currentViewIndex + 2) % 3;
                component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
                currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
                toUpdateViewIndex = (currentViewIndex + 1) % 3;
                component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
            }
        }
    };
    CalendarService.prototype.loadEvents = function () {
        this.eventSourceChanged.next();
    };
    CalendarService.prototype.slide = function (direction) {
        this.slideChanged.next(direction);
    };
    CalendarService.prototype.update = function () {
        this.slideUpdated.next();
    };
    CalendarService = __decorate([
        Injectable()
    ], CalendarService);
    return CalendarService;
}());
export { CalendarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2lvbmljMi1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImNhbGVuZGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUt6QztJQWVJO1FBTlEsaUNBQTRCLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNuRCxtQ0FBOEIsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ3JELHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDekMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3JDLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUd2QyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RGLElBQUksQ0FBQywrQkFBK0IsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFRCx3Q0FBYyxHQUFkLFVBQWUsR0FBUyxFQUFFLFVBQTJCO1FBQTNCLDJCQUFBLEVBQUEsa0JBQTJCO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxVQUFVLEVBQUU7WUFDWixJQUFJLENBQUMsNEJB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RixvQkFBb0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLGlCQUFpQixHQUFHLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxTQUFTLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNqRixvQkFBb0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxpQkFBaUIsR0FBRyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0MsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUNwRjtTQUNKO0lBQ0wsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELCtCQUFLLEdBQUwsVUFBTSxTQUFpQjtRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQTFKUSxlQUFlO1FBRDNCLFVBQVUsRUFBRTtPQUNBLGVBQWUsQ0EySjNCO0lBQUQsc0JBQUM7Q0FBQSxBQTNKRCxJQTJKQztTQTNKWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7SUNhbGVuZGFyQ29tcG9uZW50LCBJVmlldywgQ2FsZW5kYXJNb2RlLCBRdWVyeU1vZGV9IGZyb20gJy4vY2FsZW5kYXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJTZXJ2aWNlIHtcbiAgICBxdWVyeU1vZGU6IFF1ZXJ5TW9kZTtcbiAgICBjdXJyZW50RGF0ZUNoYW5nZWRGcm9tUGFyZW50JDogT2JzZXJ2YWJsZTxEYXRlPjtcbiAgICBjdXJyZW50RGF0ZUNoYW5nZWRGcm9tQ2hpbGRyZW4kOiBPYnNlcnZhYmxlPERhdGU+O1xuICAgIGV2ZW50U291cmNlQ2hhbmdlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gICAgc2xpZGVDaGFuZ2VkJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIHNsaWRlVXBkYXRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG5cbiAgICBwcml2YXRlIF9jdXJyZW50RGF0ZTogRGF0ZTtcbiAgICBwcml2YXRlIGN1cnJlbnREYXRlQ2hhbmdlZEZyb21QYXJlbnQgPSBuZXcgU3ViamVjdDxEYXRlPigpO1xuICAgIHByaXZhdGUgY3VycmVudERhdGVDaGFuZ2VkRnJvbUNoaWxkcmVuID0gbmV3IFN1YmplY3Q8RGF0ZT4oKTtcbiAgICBwcml2YXRlIGV2ZW50U291cmNlQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcHJpdmF0ZSBzbGlkZUNoYW5nZWQgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgcHJpdmF0ZSBzbGlkZVVwZGF0ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudCQgPSB0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21QYXJlbnQuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbUNoaWxkcmVuJCA9IHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbUNoaWxkcmVuLmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgICB0aGlzLmV2ZW50U291cmNlQ2hhbmdlZCQgPSB0aGlzLmV2ZW50U291cmNlQ2hhbmdlZC5hc09ic2VydmFibGUoKTtcbiAgICAgICAgdGhpcy5zbGlkZUNoYW5nZWQkID0gdGhpcy5zbGlkZUNoYW5nZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIHRoaXMuc2xpZGVVcGRhdGVkJCA9IHRoaXMuc2xpZGVVcGRhdGVkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHNldEN1cnJlbnREYXRlKHZhbDogRGF0ZSwgZnJvbVBhcmVudDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnREYXRlID0gbmV3IERhdGUodmFsKTtcbiAgICAgICAgaWYgKGZyb21QYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVDaGFuZ2VkRnJvbVBhcmVudC5uZXh0KHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQ2hhbmdlZEZyb21DaGlsZHJlbi5uZXh0KHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY3VycmVudERhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50RGF0ZTtcbiAgICB9XG5cbiAgICByYW5nZUNoYW5nZWQoY29tcG9uZW50OiBJQ2FsZW5kYXJDb21wb25lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucXVlcnlNb2RlID09PSAnbG9jYWwnKSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LmV2ZW50U291cmNlICYmIGNvbXBvbmVudC5vbkRhdGFMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQub25EYXRhTG9hZGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5xdWVyeU1vZGUgPT09ICdyZW1vdGUnKSB7XG4gICAgICAgICAgICBsZXQgcmFuZ2VTdGFydCA9IG5ldyBEYXRlKGNvbXBvbmVudC5yYW5nZS5zdGFydFRpbWUuZ2V0VGltZSgpKSxcbiAgICAgICAgICAgICAgICByYW5nZUVuZCA9IG5ldyBEYXRlKGNvbXBvbmVudC5yYW5nZS5lbmRUaW1lLmdldFRpbWUoKSk7XG5cbiAgICAgICAgICAgIHJhbmdlU3RhcnQuc2V0SG91cnMoMCk7XG4gICAgICAgICAgICBpZiAocmFuZ2VTdGFydC5nZXRIb3VycygpID09PSAyMykge1xuICAgICAgICAgICAgICAgIHJhbmdlU3RhcnQuc2V0VGltZShyYW5nZVN0YXJ0LmdldFRpbWUoKSArIDM2MDAwMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByYW5nZUVuZC5zZXRIb3VycygwKTtcbiAgICAgICAgICAgIGlmIChyYW5nZUVuZC5nZXRIb3VycygpID09PSAyMykge1xuICAgICAgICAgICAgICAgIHJhbmdlRW5kLnNldFRpbWUocmFuZ2VFbmQuZ2V0VGltZSgpICsgMzYwMDAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnQub25SYW5nZUNoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiByYW5nZVN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZFRpbWU6IHJhbmdlRW5kXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U3RlcChtb2RlOiBDYWxlbmRhck1vZGUpOiB7IHllYXJzOiBudW1iZXI7IG1vbnRoczogbnVtYmVyOyBkYXlzOiBudW1iZXI7IH0ge1xuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB5ZWFyczogMCxcbiAgICAgICAgICAgICAgICAgICAgbW9udGhzOiAxLFxuICAgICAgICAgICAgICAgICAgICBkYXlzOiAwXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHllYXJzOiAwLFxuICAgICAgICAgICAgICAgICAgICBtb250aHM6IDAsXG4gICAgICAgICAgICAgICAgICAgIGRheXM6IDdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB5ZWFyczogMCxcbiAgICAgICAgICAgICAgICAgICAgbW9udGhzOiAwLFxuICAgICAgICAgICAgICAgICAgICBkYXlzOiAxXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFkamFjZW50Q2FsZW5kYXJEYXRlKG1vZGU6IENhbGVuZGFyTW9kZSwgZGlyZWN0aW9uOiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgbGV0IGNhbGN1bGF0ZUNhbGVuZGFyRGF0ZSA9IHRoaXMuY3VycmVudERhdGU7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmdldFN0ZXAobW9kZSksXG4gICAgICAgICAgICB5ZWFyID0gY2FsY3VsYXRlQ2FsZW5kYXJEYXRlLmdldEZ1bGxZZWFyKCkgKyBkaXJlY3Rpb24gKiBzdGVwLnllYXJzLFxuICAgICAgICAgICAgbW9udGggPSBjYWxjdWxhdGVDYWxlbmRhckRhdGUuZ2V0TW9udGgoKSArIGRpcmVjdGlvbiAqIHN0ZXAubW9udGhzLFxuICAgICAgICAgICAgZGF0ZSA9IGNhbGN1bGF0ZUNhbGVuZGFyRGF0ZS5nZXREYXRlKCkgKyBkaXJlY3Rpb24gKiBzdGVwLmRheXM7XG5cbiAgICAgICAgY2FsY3VsYXRlQ2FsZW5kYXJEYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUsIDEyLCAwLCAwKTtcblxuICAgICAgICBpZiAobW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgY29uc3QgZmlyc3REYXlJbk5leHRNb250aCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMSwgMTIsIDAsIDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0RGF5SW5OZXh0TW9udGguZ2V0VGltZSgpIDw9IGNhbGN1bGF0ZUNhbGVuZGFyRGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVDYWxlbmRhckRhdGUgPSBuZXcgRGF0ZShmaXJzdERheUluTmV4dE1vbnRoLmdldFRpbWUoKSAtIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVDYWxlbmRhckRhdGU7XG4gICAgfVxuXG4gICAgZ2V0QWRqYWNlbnRWaWV3U3RhcnRUaW1lKGNvbXBvbmVudDogSUNhbGVuZGFyQ29tcG9uZW50LCBkaXJlY3Rpb246IG51bWJlcik6IERhdGUge1xuICAgICAgICBsZXQgYWRqYWNlbnRDYWxlbmRhckRhdGUgPSB0aGlzLmdldEFkamFjZW50Q2FsZW5kYXJEYXRlKGNvbXBvbmVudC5tb2RlLCBkaXJlY3Rpb24pO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50LmdldFJhbmdlKGFkamFjZW50Q2FsZW5kYXJEYXRlKS5zdGFydFRpbWU7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVBZGphY2VudFZpZXdzKGNvbXBvbmVudDogSUNhbGVuZGFyQ29tcG9uZW50KSB7XG4gICAgICAgIGxldCBjdXJyZW50Vmlld1N0YXJ0RGF0ZTogRGF0ZSxcbiAgICAgICAgICAgIGN1cnJlbnRWaWV3RGF0YTogSVZpZXdbXSxcbiAgICAgICAgICAgIHRvVXBkYXRlVmlld0luZGV4OiBudW1iZXIsXG4gICAgICAgICAgICBjdXJyZW50Vmlld0luZGV4ID0gY29tcG9uZW50LmN1cnJlbnRWaWV3SW5kZXg7XG5cbiAgICAgICAgaWYgKGNvbXBvbmVudC5kaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgIGN1cnJlbnRWaWV3U3RhcnREYXRlID0gdGhpcy5nZXRBZGphY2VudFZpZXdTdGFydFRpbWUoY29tcG9uZW50LCAxKTtcbiAgICAgICAgICAgIHRvVXBkYXRlVmlld0luZGV4ID0gKGN1cnJlbnRWaWV3SW5kZXggKyAxKSAlIDM7XG4gICAgICAgICAgICBjb21wb25lbnQudmlld3NbdG9VcGRhdGVWaWV3SW5kZXhdID0gY29tcG9uZW50LmdldFZpZXdEYXRhKGN1cnJlbnRWaWV3U3RhcnREYXRlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnQuZGlyZWN0aW9uID09PSAtMSkge1xuICAgICAgICAgICAgY3VycmVudFZpZXdTdGFydERhdGUgPSB0aGlzLmdldEFkamFjZW50Vmlld1N0YXJ0VGltZShjb21wb25lbnQsIC0xKTtcbiAgICAgICAgICAgIHRvVXBkYXRlVmlld0luZGV4ID0gKGN1cnJlbnRWaWV3SW5kZXggKyAyKSAlIDM7XG4gICAgICAgICAgICBjb21wb25lbnQudmlld3NbdG9VcGRhdGVWaWV3SW5kZXhdID0gY29tcG9uZW50LmdldFZpZXdEYXRhKGN1cnJlbnRWaWV3U3RhcnREYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghY29tcG9uZW50LnZpZXdzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFZpZXdEYXRhID0gW107XG4gICAgICAgICAgICAgICAgY3VycmVudFZpZXdTdGFydERhdGUgPSBjb21wb25lbnQucmFuZ2Uuc3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWaWV3RGF0YS5wdXNoKGNvbXBvbmVudC5nZXRWaWV3RGF0YShjdXJyZW50Vmlld1N0YXJ0RGF0ZSkpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWaWV3U3RhcnREYXRlID0gdGhpcy5nZXRBZGphY2VudFZpZXdTdGFydFRpbWUoY29tcG9uZW50LCAxKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50Vmlld0RhdGEucHVzaChjb21wb25lbnQuZ2V0Vmlld0RhdGEoY3VycmVudFZpZXdTdGFydERhdGUpKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50Vmlld1N0YXJ0RGF0ZSA9IHRoaXMuZ2V0QWRqYWNlbnRWaWV3U3RhcnRUaW1lKGNvbXBvbmVudCwgLTEpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWaWV3RGF0YS5wdXNoKGNvbXBvbmVudC5nZXRWaWV3RGF0YShjdXJyZW50Vmlld1N0YXJ0RGF0ZSkpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC52aWV3cyA9IGN1cnJlbnRWaWV3RGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFZpZXdTdGFydERhdGUgPSBjb21wb25lbnQucmFuZ2Uuc3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC52aWV3c1tjdXJyZW50Vmlld0luZGV4XSA9IGNvbXBvbmVudC5nZXRWaWV3RGF0YShjdXJyZW50Vmlld1N0YXJ0RGF0ZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFZpZXdTdGFydERhdGUgPSB0aGlzLmdldEFkamFjZW50Vmlld1N0YXJ0VGltZShjb21wb25lbnQsIC0xKTtcbiAgICAgICAgICAgICAgICB0b1VwZGF0ZVZpZXdJbmRleCA9IChjdXJyZW50Vmlld0luZGV4ICsgMikgJSAzO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC52aWV3c1t0b1VwZGF0ZVZpZXdJbmRleF0gPSBjb21wb25lbnQuZ2V0Vmlld0RhdGEoY3VycmVudFZpZXdTdGFydERhdGUpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWaWV3U3RhcnREYXRlID0gdGhpcy5nZXRBZGphY2VudFZpZXdTdGFydFRpbWUoY29tcG9uZW50LCAxKTtcbiAgICAgICAgICAgICAgICB0b1VwZGF0ZVZpZXdJbmRleCA9IChjdXJyZW50Vmlld0luZGV4ICsgMSkgJSAzO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC52aWV3c1t0b1VwZGF0ZVZpZXdJbmRleF0gPSBjb21wb25lbnQuZ2V0Vmlld0RhdGEoY3VycmVudFZpZXdTdGFydERhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5ldmVudFNvdXJjZUNoYW5nZWQubmV4dCgpO1xuICAgIH1cblxuICAgIHNsaWRlKGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2xpZGVDaGFuZ2VkLm5leHQoZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVVcGRhdGVkLm5leHQoKTtcbiAgICB9XG59XG4iXX0=