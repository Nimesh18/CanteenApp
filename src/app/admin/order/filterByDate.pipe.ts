import { Pipe, PipeTransform } from '@angular/core';
import { Order } from './order.model';

@Pipe({ name: 'filterByDate' })
export class FilterByDate implements PipeTransform {
    transform(orders: Order[], selectedOption: number) {

        if (!orders || !selectedOption) {
            return orders;
        }

        return orders.filter(order => this.filter(order, selectedOption));

    }

    private filter(order: Order, selectedOption: number): boolean {
        switch (+selectedOption) {
            case 1:
                return this.isDateToday(order.orderDate);
            case 2:
                return this.isDateTomorrow(order.orderDate);
            case 3:
                return this.isDateThisWeek(order.orderDate);
            case 4:
                return this.isDateThisMonth(order.orderDate);
            default:
                return false;
        }
    }

    private isDateToday(date1: Date): boolean {
        const date2: Date = new Date();
        if (date1.getFullYear() === date2.getFullYear()) {
            if (date1.getMonth() === date2.getMonth()) {
                if (date1.getDate() === date2.getDate()) {
                    return true;
                }
            }
        }
        return false;
    }

    private isDateTomorrow(date1: Date): boolean {
        const date2: Date = new Date();
        if (date1.getFullYear() === date2.getFullYear()) {

            if (date1.getMonth() === date2.getMonth()) {
                if (date1.getDate() === date2.getDate() + 1) {
                    return true;
                }
            }
        }
        return false;
    }

    private isDateThisWeek(date1: Date): boolean {
        const date2: Date = new Date();
        date2.setDate(date2.getDate() + 7);
        if (date1.getFullYear() === date2.getFullYear()) {
            if (date1.getMonth() === date2.getMonth()) {
                if (date1.getDate() <= date2.getDate() && date1.getDay() < 6) {
                    return true;
                }
            }
        }
        return false;
    }

    private isDateThisMonth(date1: Date): boolean {
        const date2: Date = new Date();
        date2.setMonth(date2.getMonth() + 1);
        if (date1.getFullYear() === date2.getFullYear()) {
            if (date1.getMonth() <= date2.getMonth()) {
                return true;
            }
        }
        return false;
    }
}
