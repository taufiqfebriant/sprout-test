import ky from "ky";
import Image from "next/image";
import type { Pokemon } from "../types";
import { capitalize } from "../utils";
import { Info } from "./info";

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailPage(props: Props) {
  const pokemon = await ky
    .get(`https://pokeapi.co/api/v2/pokemon/${props.params.id}`)
    .json<Pokemon>();

  return (
    <div className="relative h-screen">
      <div className="h-full bg-teal-400 px-6 text-white pt-10">
        <h1 className="text-4xl font-bold">{capitalize(pokemon.name)}</h1>

        <div className="flex gap-x-2 mt-4 items-start">
          {pokemon.types.map((type) => (
            <div
              key={type.slot}
              className="text-sm bg-white/30 px-3 py-0.5 font-medium rounded-full"
            >
              {capitalize(type.type.name)}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-[28%] left-1/2 z-10 -translate-y-[28%] -translate-x-1/2">
        <div className="relative aspect-square w-48">
          <Image
            src={pokemon.sprites.other.dream_world.front_default}
            alt={capitalize(pokemon.name)}
            fill
            className="object-contain"
            sizes="192px"
          />
        </div>
      </div>

      <div className="absolute bottom-0 bg-white left-0 w-full h-3/5 rounded-t-3xl px-4 pb-4 pt-16 text-black">
        <Info data={pokemon} />
      </div>
    </div>
  );
}
