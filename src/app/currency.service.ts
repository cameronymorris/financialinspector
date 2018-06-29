import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICUrrencyAPI } from './Interfaces/ICurrencyAPI';

@Injectable()
export class CurrencyService {

  private UsdToGbpUrl: string = "https://www.quandl.com/api/v3/datasets/FRED/DEXUSUK/data.json?start_date=2018-06-15&api_key=u_VyLQ-5f4cX76Qm8ScV";
  private UsdToEurUrl: string = "https://www.quandl.com/api/v3/datasets/FRED/DEXUSEU/data.json?start_date=2018-06-15&api_key=u_VyLQ-5f4cX76Qm8ScV";
  constructor(private http: HttpClient) { }

  getUsdToGbpRates(): Observable<any>{
    return this.http.get<any>(this.UsdToGbpUrl);
  }
  getUsdToEurUrlRates(): Observable<any>{
    return this.http.get<any>(this.UsdToEurUrl);
  }
}
