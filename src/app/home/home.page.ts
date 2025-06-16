import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokeapiService } from '../services/pokeapi.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;

  constructor(private pokeapiService: PokeapiService) {} 

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokeapiService.getPokemonList(this.offset, this.limit).subscribe(
      (data) => {
        this.pokemons = [...this.pokemons, ...data.results];
        // Para obter a imagem, precisamos fazer uma requisição adicional para cada Pokémon
        // ou extrair o ID da URL para a imagem padrão
        this.pokemons.forEach(pokemon => {
          const parts = pokemon.url.split('/');
          pokemon.id = parts[parts.length - 2];
          pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        });
      },
      (error) => {
        console.error('Erro ao carregar Pokémons:', error);
      }
    );
  }

  loadMore(event: any) {
    this.offset += this.limit;
    this.loadPokemons();
    event.target.complete(); 
  }
}
