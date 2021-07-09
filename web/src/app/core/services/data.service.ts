import { AppError, BadInput, NotFoundError } from './../models/exceptions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { ApiProxyService } from './api-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url = environment.base_url

  constructor(protected apiProxyService:ApiProxyService) { }

  protected handleError(error: Response) {
    if (error.status === 400)
      return throwError(new BadInput(error));

    if (error.status === 404)
      return throwError(new NotFoundError(error));

    return throwError(new AppError(error));
  }
}

