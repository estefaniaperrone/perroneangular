import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Product } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>([]);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  loadProducts(): void {
    // fetch ...
    /// .then((data) => this.products$.next(data))
    this.products$.next([
      {
        id: 1,
        name: 'Vianda Economica',
        description: 'lorem ipsum',
        price: 100,
        stock: 50,
      },
      {
        id: 2,
        name: 'Vianda Vegetariana',
        description: 'lorem ipsum',
        price: 500,
        stock: 25,
      },
      {
        id: 3,
        name: 'Vianda Saludable',
        description: 'lorem ipsum',
        price: 800,
        stock: 15,
      },
    ]);
  }

  create(): void {
    this.products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next([
          ...arrayActual,
          {
            id: arrayActual.length + 1,
            name: 'Vianda Dietetica',
            description: 'Random description',
            price: 5400,
            stock: 23,
          },
        ]);
      },
    });
  }

  deleteById(id: number): void {
    this.products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next(
          arrayActual.filter((p) => p.id !== id),
        );
      }
    })
  }
}
