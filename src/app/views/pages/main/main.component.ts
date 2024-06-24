import { Component } from '@angular/core';
import { GithubService } from './services/github.service';
import { ChartData, ChartOptions } from 'chart.js';
import { CharData, GitHubUser } from './interface/main.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  public searchQuery: string = '';
  users: GitHubUser[] = [];
  errorMessage: string = '';
  isSearchDisabled: boolean = true;

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Usuarios';
  showYAxisLabel = true;
  yAxisLabel = 'Seguidores';

  colorScheme = '#5AA454';

  single: CharData[] = [
    {
      "name": "Germany",
      "value": 8940000
    }
  ];

  constructor(
    private githubService: GithubService
  ) {
    // Object.assign(this, { single })
  }

  onSelect(event: Event) {
    console.log(event);
  }

  validateQuery(e: KeyboardEvent): void {

    if (this.searchQuery.length < 4) {
      this.errorMessage = 'La búsqueda debe tener al menos 4 caracteres.';
      this.isSearchDisabled = true;
      this.users = [];
    } else if (this.searchQuery.toLowerCase() === 'doublevpartners') {
      this.errorMessage = 'No está permitido buscar la palabra "doublevpartners".';
      this.isSearchDisabled = true;
      this.users = [];
    } else {
      this.errorMessage = '';
      this.isSearchDisabled = false;

      if (e.key === 'Enter') {
        this.searchUsers();
      }
    }
  }

  searchUsers(): void {
    if (!this.isSearchDisabled) {
      this.githubService.searchUsers(this.searchQuery).subscribe(data => {

        if (data) {
          this.users = data.slice(0, 10); // Limitar a los primeros 10 usuarios
          this.single = [];

          const userDetailsObservables = this.users.map(user => {
            return this.githubService.getUserDetails(user.login);
          });

          forkJoin(userDetailsObservables).subscribe(userDetailsArray => {
            this.single = userDetailsArray.map(userDetails => ({
              "name": userDetails.login,
              "value": userDetails.followers
            }));
          }, error => {
            this.errorMessage = 'Error al obtener los detalles de los usuarios.';
          });

        } else {
          this.errorMessage = 'Datos de búsqueda inválidos o vacíos.';
          this.users = [];
          this.single = [];
        }
      }, error => {
        this.errorMessage = 'Error al buscar usuarios.';
      });
    }
  }

}
