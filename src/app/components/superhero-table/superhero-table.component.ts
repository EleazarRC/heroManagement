import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { SuperheroService } from '../../services/superhero.service';
import { Superhero } from 'src/app/models/superheroe.model';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-superhero-table',
  templateUrl: './superhero-table.component.html',
  styleUrls: ['./superhero-table.component.scss'],
  providers: []
})
export class SuperheroTableComponent implements OnInit, OnDestroy, AfterViewInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  heroesSubscription: Subscription = new Subscription();
  dataSource = new MatTableDataSource<Superhero>();
  displayedColumns: string[] = [
    'name',
    'alias',
    'strength',
    'weakness',
    'activate',
    'edit',
    'delete'
  ];
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private superheroService: SuperheroService, private matPaginatorIntl: MatPaginatorIntl) {

  }

  ngOnInit(): void {
    this.getHeroes();

    this.matPaginatorIntl.itemsPerPageLabel = 'Héroes por página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
    this.matPaginatorIntl.previousPageLabel = 'Página anterior';

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    if (this.heroesSubscription) {
      this.heroesSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement)?.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getHeroes() {
    this.heroesSubscription = this.superheroService.getHeroes().subscribe(
      heroes => this.dataSource.data = heroes,
      error => console.error(error)
    );
  }

  changeStateHero = (superhero: Superhero) => {
    this.superheroService.toggleActive(superhero).subscribe(() => '');
    this.getHeroes();
  }

  deleteHero = (superhero: Superhero) => {
    Swal.fire({
      title: `¿Quieres borrar ${superhero.name}`,
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.superheroService.deleteHero(superhero.id)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(() => '');
        Swal.fire('¡Borrado!', '', 'success');
        this.getHeroes();
      }
    });
  }

}