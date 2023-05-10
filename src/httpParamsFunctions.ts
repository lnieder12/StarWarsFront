import { HttpParams } from "@angular/common/http";
import { ClrDatagridStateInterface } from "@clr/angular";

export function getFilters(state: ClrDatagridStateInterface, pParams: HttpParams): HttpParams
{
  var params = pParams;
  if (state.filters) {
    for (let filter of state.filters) {
      if (filter.min || filter.max) {
        const gt = filter.min ? `gte:${filter.min}` : '';
        const lt = filter.max ? `lte:${filter.max}` : '';
        var between = gt;
        if (gt && lt) {
          between += ',';
        }
        between += lt;
        params = params.set('score', between);
        // filters['score'] = [{ min: filter.min, max: filter.max }];
      }
      else {
        let { property, value } = <{ property: string, value: string }>filter;
        if ([property] && [value]) {
          params = params.set(property, value);
        }
      }
    }
  }
  return params;

}
