"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { Pokemon } from "../types";
import { capitalize } from "../utils";

type Props = {
  data: Pokemon;
};

export function Info(props: Props) {
  return (
    <TabGroup>
      <TabList className="flex overflow-x-auto">
        <Tab className="data-[selected]:font-semibold data-[selected]:border-b border-black py-4 px-6 flex-shrink-0">
          About
        </Tab>
        <Tab className="data-[selected]:font-semibold data-[selected]:border-b border-black py-4 px-6 flex-shrink-0">
          Base Stats
        </Tab>
        <Tab className="data-[selected]:font-semibold data-[selected]:border-b border-black py-4 px-6 flex-shrink-0">
          Evolution
        </Tab>
        <Tab className="data-[selected]:font-semibold data-[selected]:border-b border-black py-4 px-6 flex-shrink-0">
          Moves
        </Tab>
      </TabList>
      <TabPanels className="pt-4">
        <TabPanel>
          <table>
            <tbody>
              <tr>
                <td className="py-1 pr-10 text-gray-400">Species</td>
                <td className="py-1">{capitalize(props.data.species.name)}</td>
              </tr>
              <tr>
                <td className="py-1 pr-10 text-gray-400">Height</td>
                <td className="py-1">{props.data.height}</td>
              </tr>
              <tr>
                <td className="py-1 pr-10 text-gray-400">Weight</td>
                <td className="py-1">{props.data.weight}</td>
              </tr>
              <tr>
                <td className="py-1 pr-10 text-gray-400">Abilities</td>
                <td className="py-1">
                  {props.data.abilities
                    .map((ability) => capitalize(ability.ability.name))
                    .join(", ")}
                </td>
              </tr>
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>
          <table>
            <tbody>
              {props.data.stats.map((stat) => (
                <tr key={stat.stat.name}>
                  <td className="py-1 pr-10 text-gray-400">
                    {capitalize(stat.stat.name)}
                  </td>
                  <td className="py-1 w-full">
                    <div className="flex items-center gap-x-2">
                      <p className="flex-shrink-0">{stat.base_stat}</p>
                      <div className="h-2 flex-1 rounded-full bg-[#EFF4FB]">
                        <div
                          className="h-2 rounded-full bg-gray-400"
                          style={{ width: `${stat.base_stat}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>Evolution</TabPanel>
        <TabPanel>
          <ul className="list-disc list-inside">
            {props.data.moves.map((move) => (
              <li key={move.move.name}>{capitalize(move.move.name)}</li>
            ))}
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
