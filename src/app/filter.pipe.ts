import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) { return []; }
        if (!searchText) { return items; }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            if (it.firstName) {
                return it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText)
                    || it.empId.toLowerCase().includes(searchText);
            } else if (it.projectName) {
                return it.projectName.toLowerCase().includes(searchText) || it.startDate.toLowerCase().includes(searchText)
                    || it.endDate.toLowerCase().includes(searchText) || (it.priority === searchText)
                    || it.status.toLowerCase().includes(searchText);
            }
        });
    }
}
