import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Superhero } from '../../models/superheroe.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperheroService } from 'src/app/services/superhero.service';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-superhero-form',
  templateUrl: './superhero-form.component.html',
  styleUrls: ['./superhero-form.component.scss'],
})
export class SuperheroFormComponent implements OnInit, OnDestroy {
  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  idSuperHero!: number;
  superHero!: Superhero;
  heroesSubscription: Subscription = new Subscription();
  miFormulario: FormGroup = this.fb.group({
    id: [],
    photo: [],
    alias: ['', [Validators.required]],
    name: ['', [Validators.required]],
    strength: ['', [Validators.required]],
    weakness: ['', [Validators.required]],
    personality: ['', [Validators.required]],
    specialAbility: ['', [Validators.required]],
    active: new FormControl(false, [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private superheroService: SuperheroService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idSuperHero = +params['id'];

      this.heroesSubscription = this.superheroService
        .getHeroById(this.idSuperHero)
        .subscribe({
          next: (heroe) => {
            this.superHero = heroe;
          },
          error: (error) => console.error(error),
        });
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    if (this.heroesSubscription) {
      this.heroesSubscription.unsubscribe();
    }
  }

  saveHero(): void {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    const newHero: Superhero = {
      ...this.miFormulario.value,
      id: this.idSuperHero,
    };
    this.superheroService.addOrUpdateHero(newHero).subscribe(() => {
      Swal.fire(`Guardado`, `¡${newHero.name} ha sido guardado!`, 'success');
      this.router.navigateByUrl(`/`);
    });
  }

  fieldIsValid = (campo: string) => !!this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;

}