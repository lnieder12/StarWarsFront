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

export function setSorting(state: ClrDatagridStateInterface, pParams: HttpParams): HttpParams
{
  var params = pParams;
  if (state.sort) {
    const field = Object(state.sort.by)['field'];
    var col;
    if (field) {
      col = field;
    }
    else {
      col = state.sort?.by;
    }
    var sort = state.sort.reverse ? ':asc' : ':desc';
    params = params.set('sort', col + sort);
  }
  return params;
}