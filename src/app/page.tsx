import type { Pokemon } from "@/app/types";
import ky from "ky";
import Image from "next/image";
import Link from "next/link";
import { capitalize } from "./utils";

type PokemonListResponse = {
  count: number;
  next: string;
  previous: any;
  results: PokemonRow[];
};

type PokemonRow = {
  name: string;
  url: string;
};

const isFulfilled = <T,>(
  p: PromiseSettledResult<T>
): p is PromiseFulfilledResult<T> => p.status === "fulfilled";

export default async function HomePage() {
  const pokemonList = await ky
    .get("https://pokeapi.co/api/v2/pokemon")
    .json<PokemonListResponse>();

  const pokemonPromises = await Promise.allSettled(
    pokemonList.results.map((row) => ky.get(row.url).json<Pokemon>())
  );

  const pokemons = pokemonPromises
    .filter(isFulfilled)
    .map((prom) => prom.value);

  return (
    <div className="px-4 py-8">
      <h1 className="font-bold text-4xl">Pokedex</h1>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {pokemons.map((pokemon) => (
          <Link
            href={`/${pokemon.id}`}
            key={pokemon.id}
            className="bg-teal-400 text-white rounded-2xl px-4 relative h-36"
          >
            <p className="font-bold text-lg mt-6">{capitalize(pokemon.name)}</p>

            <div className="flex flex-col gap-y-2 mt-2 items-start">
              {pokemon.types.map((type) => (
                <div
                  key={type.slot}
                  className="text-xs bg-white/30 px-3 py-0.5 font-medium rounded-full"
                >
                  {capitalize(type.type.name)}
                </div>
              ))}
            </div>

            <div className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4">
              <div className="relative aspect-square w-16">
                <Image
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={capitalize(pokemon.name)}
                  fill
                  className="object-contain"
                  sizes="(min-width: 450px) 80px, 64px"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
