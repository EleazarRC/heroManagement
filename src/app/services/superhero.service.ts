import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Superhero } from '../models/superheroe.model';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  private heroesUrl = `${environment.MOCK_API_URL}/superheroes`;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(this.heroesUrl);
  }

  getHeroById(id: number): Observable<Superhero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Superhero>(url);
  }

  addHero(hero: Superhero): Observable<Superhero> {
    return this.http.post<Superhero>(this.heroesUrl, hero);
  }

  updateHero(hero: Superhero): Observable<Superhero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put<Superhero>(url, hero);
  }

  addOrUpdateHero(hero: Superhero): Observable<Superhero> {
    if (hero.id) {
      return this.updateHero(hero);
    } else {
      return this.addHero(hero);
    }
  }

  deleteHero(hero: Superhero | number): Observable<Superhero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Superhero>(url);
  }

  getHeroesPaginated(page: number, pageSize: number): Observable<Superhero[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const url = `${this.heroesUrl}?_start=${startIndex}&_end=${endIndex}`;
    return this.http.get<Superhero[]>(url);
  }

  getTotalPages(pageSize: number): Observable<number> {
    return this.getHeroes().pipe(
      map(heroes => Math.ceil(heroes.length / pageSize))
    );
  }

  toggleActive(superhero: Superhero): Observable<Superhero> {
    const url = `${this.heroesUrl}/${superhero.id}`;
    const toggledSuperhero = {
      ...superhero,
      active: !superhero.active
    };
    return this.http.put<Superhero>(url, toggledSuperhero);
  }

}
