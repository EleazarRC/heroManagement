import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuperheroService } from './superhero.service';
import { MOCK_HEROES } from './mock-heroes';
import { Superhero } from '../models/superheroe.model';

describe('SuperheroService', () => {
  let service: SuperheroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroService]
    });
    service = TestBed.inject(SuperheroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return heroes', () => {

    spyOn(service, 'getHeroes').and.returnValue(of(MOCK_HEROES));

    service.getHeroes().subscribe(heroes => {
      expect(MOCK_HEROES.length).toBe(18);
      expect(heroes).toEqual(MOCK_HEROES);
    });

  });

  it('should return a hero by id', () => {

    spyOn(service, 'getHeroById').and.returnValue(of(MOCK_HEROES.find(hero => hero.id === 1)!))

    service.getHeroById(1).subscribe(hero => {
      expect(hero).toEqual(MOCK_HEROES.find(hero => hero.id === 1)!);
    });

  });

  it('should add a hero', () => {
    const newHero: Superhero = MOCK_HEROES[0];
    spyOn(service, 'addHero').and.returnValue(of(newHero));
  
    service.addHero(newHero).subscribe(hero => {
      expect(hero).toEqual(newHero);
    });
  });

  it('should update a hero', () => {

    spyOn(service, 'updateHero').and.returnValue(of(MOCK_HEROES[0]!))

    service.updateHero(MOCK_HEROES[0]).subscribe(hero => {
      expect(hero).toEqual(MOCK_HEROES[0]);
    });

  });

  it('should delete a hero', () => {

    spyOn(service, 'deleteHero').and.returnValue(of(MOCK_HEROES[0]!))

    service.deleteHero(MOCK_HEROES[0]).subscribe(hero => {
      expect(hero).toEqual(MOCK_HEROES[0]);
    });

  });

  it('should return paginated heroes', () => {

    spyOn(service, 'getHeroesPaginated').and.returnValue(of([MOCK_HEROES[0], MOCK_HEROES[1]]!))

    service.getHeroesPaginated(1, 2).subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual([MOCK_HEROES[0], MOCK_HEROES[1]]);
    });

  });

  it('should return empty array for invalid page number', () => {
    spyOn(service, 'getHeroesPaginated').and.returnValue(of([]));
    service.getHeroesPaginated(0, 10).subscribe(heroes => {
      expect(heroes).toEqual([]);
    });
  });

  it('should return total pages', () => {
    spyOn(service, 'getHeroes').and.returnValue(of(MOCK_HEROES));

    const pageSize = 5;
    const expectedTotalPages = Math.ceil(MOCK_HEROES.length / pageSize);

    service.getTotalPages(pageSize).subscribe(totalPages => {
      expect(totalPages).toBe(expectedTotalPages);
    });

  });

});