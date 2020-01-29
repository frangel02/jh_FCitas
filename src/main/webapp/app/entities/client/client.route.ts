import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClient, Client } from 'app/shared/model/client.model';
import { ClientService } from './client.service';
import { ClientComponent } from './client.component';
import { ClientDetailComponent } from './client-detail.component';
import { ClientUpdateComponent } from './client-update.component';

@Injectable({ providedIn: 'root' })
export class ClientResolve implements Resolve<IClient> {
  constructor(private service: ClientService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClient> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((client: HttpResponse<Client>) => {
          if (client.body) {
            return of(client.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Client());
  }
}

export const clientRoute: Routes = [
  {
    path: '',
    component: ClientComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jhFCitasApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClientDetailComponent,
    resolve: {
      client: ClientResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhFCitasApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClientUpdateComponent,
    resolve: {
      client: ClientResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhFCitasApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClientUpdateComponent,
    resolve: {
      client: ClientResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhFCitasApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
