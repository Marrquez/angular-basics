import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class ApiMockService {
  constructor(private httpClient: HttpClient) {}
  requestChunk$(
    params: RequestParams
  ): Observable<(FinalElement | RequestNeededElement)[]> {
    return this.httpClient
      .get('assets/list.json')
      .pipe(
        map((list) =>
          (<RequestListResponse>list).elements.slice(
            params.from,
            params.from + params.count
          )
        )
      );
  }

  requestFinalElement$(index: number): Observable<FinalElement | undefined> {
    return this.httpClient.get('assets/list.json').pipe(
      map((list) => {
        const element = (<RequestListResponse>list).elements[index];
        return element
          ? {
              index,
              value:
                (<FinalElement>element).value !== undefined
                  ? (<FinalElement>element).value
                  : (<RequestNeededElement>element).afterRequestValue,
            }
          : undefined;
      })
    );
  }
}

export interface RequestParams {
  from: number;
  count: number;
}

export interface RequestListResponse {
  elements: Array<FinalElement | RequestNeededElement>;
}

export interface FinalElement {
  index: number;
  value?: string;
}

export interface RequestNeededElement {
  index: number;
  requestUrl: string;
  afterRequestValue?: string;
}
