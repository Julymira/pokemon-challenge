import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { ActivatedRoute } from '@angular/router'; 
import { PokeapiService } from '../services/pokeapi.service'; 

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] 
})
export class PokemonDetailsPage implements OnInit {
  pokemonId: string | null = null;
  pokemonDetails: any = null;
  loading = true; 

  constructor(
    private route: ActivatedRoute, 
    private pokeapiService: PokeapiService 
  ) { }

  ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get('id'); 
    console.log('ID do Pokémon na URL:', this.pokemonId); // Log de depuração
    if (this.pokemonId) {
      this.loadPokemonDetails(this.pokemonId);
    } else {
      console.error('ID do Pokémon não encontrado na URL.');
      this.loading = false;
    }
  }

  loadPokemonDetails(id: string) {
    this.loading = true;
    this.pokeapiService.getPokemonDetails(id).subscribe(
      (data) => {
        this.pokemonDetails = data;
        this.loading = false;
        console.log('Detalhes do Pokémon:', this.pokemonDetails);
      },
      (error) => {
        console.error('Erro ao carregar detalhes do Pokémon:', error);
        this.loading = false;
      }
    );
  }

  formatName(name: string): string {
    return name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }
}