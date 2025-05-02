"use client";
import React, { useState, useRef} from 'react';

export default function ShowCaseInfo() {
  const [imageUrl, setImageUrl] = useState<string>('https://api.hakush.in/hsr/UI/avatardrawcard/1001.webp');
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 100 });
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col justify-start m-2">

      <div className="overflow-auto">
        <div ref={ref} className="relative min-h-[650px] w-[1400px] rounded-3xl overflow-hidden">
          <img
            src="https://cdn.jsdelivr.net/gh/picklejason/hsr-showcase@main/public/blur-bg.png"
            alt="Showcase Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-4 z-10">
            <span className="shadow-black [text-shadow:1px_1px_2px_var(--tw-shadow-color)]"></span>
          </div>
          <div className="flex flex-row items-center">
            <div
              className="relative min-h-[650px] w-[28%]"

            >
              <div
                className="flex h-[650px] items-center"
                style={{ cursor: 'grab' }}
              >
                <div className="overflow-hidden w-full h-full"
                >
                  <img
                    src={imageUrl}
                    className="scale-[1.8] cursor-pointer object-cover"
                    alt="Character Preview"
                    style={{
                      position: 'relative',
                      top: `${position.y}px`,
                      left: `${position.x}px`,
                    }}
                  />
                </div>
              </div>
              <div className="absolute right-0 top-0 mr-[-15px] pt-3">
                <div className="flex flex-col">
                  {[
                    "https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/eidolon/memory-of-you-eidolon_icon_small.webp",
                    "https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/eidolon/memory-of-it-eidolon_icon_small.webp",
                    "https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/eidolon/memory-of-everything-eidolon_icon_small.webp",
                    "https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/eidolon/never-forfeit-again-eidolon_icon_small.webp",
                    "https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/eidolon/never-forget-again-eidolon_icon_small.webp",
                    "https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/eidolon/just-like-this-always-eidolon_icon_small.webp"
                  ].map((src, index) => (
                    <div key={index} className="relative my-1 flex rounded-full border-2 border-neutral-300 bg-neutral-800">
                      <img src={src} alt="Rank Icon" className="h-auto w-10" />
                      <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-neutral-800/70">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
                          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative flex min-h-[650px] w-[72%] flex-row items-center gap-3.5 rounded-r-3xl pl-10">
              <img
                src="https://cdn.jsdelivr.net/gh/picklejason/hsr-showcase@main/public/fade-bg.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover rounded-r-3xl"
                style={{ zIndex: -1 }} 
              />

              <div className="flex h-[650px] w-1/3 flex-col justify-between py-3">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex flex-row items-center justify-between">
                      <span className="text-4xl">March 7th</span>
                      <img src="https://api.hakush.in/hsr/UI/element/ice.webp" alt="Element Icon" className="h-auto w-14" />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <img src="https://api.hakush.in/hsr/UI/pathicon/knight.webp" alt="Path Icon" className="h-auto w-8" />
                      <span className="text-xl">Preservation</span>
                    </div>
                    <div>
                      <span className="text-2xl">Lv. 80</span>
                      <span className="text-xl"> / </span>
                      <span className="text-xl text-neutral-400">80</span>
                    </div>
                  </div>
                  <div className="relative mx-4 flex h-[225px] w-auto flex-row items-center justify-evenly">
                    <div className="absolute mb-5">
                      <img src="https://api.hakush.in/hsr/UI/pathicon/knight.webp" alt="Path Icon" className="h-40 w-40 opacity-20" />
                    </div>
                    <div className="flex h-full w-1/3 flex-col justify-center gap-8">
                      <div className="flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                          <img src="https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/skill/frigid-cold-arrow-skill_icon.webp" alt="Skill Icon" className="h-auto w-12 rounded-full border-2 border-neutral-500 bg-neutral-800" />
                          <span className="black-blur absolute bottom-4 text-sm">6 / 6</span>
                          <span className="z-10 mt-1.5 truncate text-sm">Basic ATK</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                          <img src="https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/skill/the-power-of-cuteness-skill_icon.webp" alt="Skill Icon" className="h-auto w-12 rounded-full border-2 border-neutral-500 bg-neutral-800" />
                          <span className="black-blur absolute bottom-4 text-sm">10 / 10</span>
                          <span className="z-10 mt-1.5 truncate text-sm">Skill</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-1/3 justify-center">
                      <div className="relative flex flex-col items-center">
                        <img src="https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/skill/glacial-cascade-skill_icon.webp" alt="Skill Icon" className="h-auto w-12 rounded-full border-2 border-neutral-500 bg-neutral-800" />
                        <span className="black-blur absolute bottom-4 text-sm">10 / 10</span>
                        <span className="z-10 mt-1.5 truncate text-sm">Ultimate</span>
                      </div>
                    </div>
                    <div className="flex h-full w-1/3 flex-col justify-center gap-8">
                      <div className="flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                          <img src="https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/skill/girl-power-skill_icon.webp" alt="Skill Icon" className="h-auto w-12 rounded-full border-2 border-neutral-500 bg-neutral-800" />
                          <span className="black-blur absolute bottom-4 text-sm">8 / 8</span>
                          <span className="z-10 mt-1.5 truncate text-sm">Talent</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                          <img src="https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/skill/freezing-beauty-skill_icon.webp" alt="Skill Icon" className="h-auto w-12 rounded-full border-2 border-neutral-500 bg-neutral-800" />
                          <span className="black-blur absolute bottom-4 text-sm">5 / 5</span>
                          <span className="z-10 mt-1.5 truncate text-sm">Technique</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex w-full flex-row justify-evenly">
                      {/* First Column */}
                      <div className="flex flex-col justify-center items-center" style={{ gap: '0.25rem' }}>
                        <img
                          src="https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/trace/purify-trace_icon.webp"
                          alt="Icon 1001101"
                          className="bg-neutral-800 h-auto w-5 rounded-full"
                        />
                        <div className="flex flex-row justify-center items-center" style={{ gap: '0.25rem' }}>
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconDefence.webp"
                            alt="Icon 1001101"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconIceAddedRatio.webp"
                            alt="Icon 1001101"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Second Column */}
                      <div className="flex flex-col justify-center items-center" style={{ gap: '0.25rem' }}>
                        <img
                          src="https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/trace/reinforce-trace_icon.webp"
                          alt="Icon 1001102"
                          className="bg-neutral-800 h-auto w-5 rounded-full"
                        />
                        <div className="flex flex-row justify-center items-center" style={{ gap: '0.25rem' }}>
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconIceAddedRatio.webp"
                            alt="Icon 1001102"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconStatusResistance.webp"
                            alt="Icon 1001102"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Third Column */}
                      <div className="flex flex-col justify-center items-center" style={{ gap: '0.25rem' }}>
                        <img
                          src="https://worker-sparkling-dawn-a1c1.srv2.workers.dev/hsr.honeyhunterworld.com/img/trace/ice-spell-trace_icon.webp"
                          alt="Icon 1001103"
                          className="bg-neutral-800 h-auto w-5 rounded-full"
                        />
                        <div className="flex flex-row justify-center items-center" style={{ gap: '0.25rem' }}>
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconIceAddedRatio.webp"
                            alt="Icon 1001103"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconIceAddedRatio.webp"
                            alt="Icon 1001103"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconDefence.webp"
                            alt="Icon 1001103"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Fourth Column */}
                      <div className="flex flex-col justify-center items-center" style={{ gap: '0.25rem' }}>
                        <div className="flex flex-row justify-center items-center" style={{ gap: '0.25rem' }}>
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconIceAddedRatio.webp"
                            alt="Icon 1001201"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconStatusResistance.webp"
                            alt="Icon 1001201"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                          <img
                            src="https://api.hakush.in/hsr/UI/trace/IconDefence.webp"
                            alt="Icon 1001201"
                            className="bg-neutral-800 h-auto w-3 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center">
                    <div className="relative flex flex-col items-center">
                      <img
                        src="https://api.hakush.in/hsr/UI/lightconemaxfigures/24000.webp"
                        alt="Light Cone Preview"
                        className="h-auto w-32"
                      />
                      <img
                        src="https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/deco/Star5.png"
                        alt="Light Cone Rarity Icon"
                        className="absolute bottom-0 left-1 h-auto w-36"
                      />
                    </div>
                    <div className="flex w-3/5 flex-col items-center gap-2 text-center">
                      <span className="text-xl">On the Fall of an Aeon</span>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full font-normal bg-[#f6ce71] text-black">
                          V
                        </div>
                        <div>
                          <span className="text-lg">Lv. 80</span>
                          <span> / </span>
                          <span className="text-neutral-400">80</span>
                        </div>
                      </div>
                      <div className="flex flex-row gap-1.5">
                        <div className="black-blur flex flex-row items-center rounded pr-1">
                          <img
                            src="https://srtools.pages.dev/icon/property/IconAttack.png"
                            alt="Attribute Icon"
                            className="h-auto w-6 p-1"
                          />
                          <span className="text-sm">529</span>
                        </div>
                        <div className="black-blur flex flex-row items-center rounded pr-1">
                          <img
                            src="https://srtools.pages.dev/icon/property/IconDefence.png"
                            alt="Attribute Icon"
                            className="h-auto w-6 p-1"
                          />
                          <span className="text-sm">397</span>
                        </div>
                        <div className="black-blur flex flex-row items-center rounded pr-1">
                          <img
                            src="https://srtools.pages.dev/icon/property/IconMaxHP.png"
                            alt="Attribute Icon"
                            className="h-auto w-6 p-1"
                          />
                          <span className="text-sm">1058</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex h-[650px] w-1/3 flex-col justify-between py-3">
                <div className="flex w-full flex-col justify-between gap-y-0.5 text-base h-[500px]">
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconMaxHP.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">HP</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">2942</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconAttack.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">ATK</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">3212</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconDefence.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">DEF</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">1255</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconSpeed.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">SPD</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">106</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconCriticalChance.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">CRIT Rate</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">16.7%</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconCriticalDamage.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">CRIT DMG</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">79.2%</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconBreakUp.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">Break Effect</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">186.9%</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconStatusResistance.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">Effect RES</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">4.0%</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconEnergyRecovery.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">Energy Regeneration Rate</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">0.0%</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconStatusProbability.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">Effect Hit Rate</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">20.3%</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconHealRatio.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">Outgoing Healing Boost</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">0.0%</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <img src="https://srtools.pages.dev/icon/property/IconIceAddedRatio.png" alt="Stat Icon" className="h-auto w-10 p-2" />
                      <span className="font-bold">Ice DMG Boost</span>
                    </div>
                    <div className="ml-3 mr-3 flex-grow border rounded opacity-50" />
                    <div className="flex cursor-default flex-col text-right font-bold">6.4%</div>
                  </div>
                </div>

                <hr />

                <div className="flex flex-col items-center gap-1">
                  <div className="flex w-full flex-row justify-between text-left">
                    <span>Prisoner in Deep Confinement</span>
                    <div>
                      <span className="black-blur bg-black flex w-5 justify-center rounded px-1.5 py-0.5">2</span>
                    </div>
                  </div>
                  <div className="flex w-full flex-row justify-between text-left">
                    <span>Watchmaker, Master of Dream Machinations</span>
                    <div>
                      <span className="black-blur bg-black flex w-5 justify-center rounded px-1.5 py-0.5">2</span>
                    </div>
                  </div>
                  <div className="flex w-full flex-row justify-between text-left">
                    <span>Talia: Kingdom of Banditry</span>
                    <div>
                      <span className="black-blur bg-black flex w-5 justify-center rounded px-1.5 py-0.5">2</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <div className="flex h-[650px] flex-col justify-between py-3 text-lg">
                  <div className="black-blur relative flex flex-row items-center rounded-s-lg border-l-2 p-1 border-yellow-600">
                    <div className="flex">
                      <img src="https://api.hakush.in/hsr/UI/relicfigures/IconRelic_116_1.webp" alt="Relic Icon" className="h-auto w-20" />
                      <img src="https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/deco/Star5.png" alt="Relic Rarity Icon" className="absolute bottom-1 h-auto w-20" />
                    </div>
                    <div className="mx-1 flex w-1/6 flex-col items-center justify-center">
                      <img src="https://srtools.pages.dev/icon/property/IconMaxHP.png" alt="Main Affix Icon" className="h-auto w-9" />
                      <span className="text-base text-[#f1a23c]">705</span>
                      <span className="black-blur rounded px-1 text-xs">+15</span>
                    </div>
                    <div style={{ opacity: 0.5, height: '80px', borderLeftWidth: '1px' }}></div>
                    <div className="m-auto grid w-1/2 grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconAttack.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+7.8%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalChance.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+3.2%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalDamage.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+17.5%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconBreakUp.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+15.6%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="black-blur relative flex flex-row items-center rounded-s-lg border-l-2 p-1 border-yellow-600">
                    <div className="flex">
                      <img src="https://api.hakush.in/hsr/UI/relicfigures/IconRelic_118_2.webp" alt="Relic Icon" className="h-auto w-20" />
                      <img src="https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/deco/Star5.png" alt="Relic Rarity Icon" className="absolute bottom-1 h-auto w-20" />
                    </div>
                    <div className="mx-1 flex w-1/6 flex-col items-center justify-center">
                      <img src="https://srtools.pages.dev/icon/property/IconAttack.png" alt="Main Affix Icon" className="h-auto w-9" />
                      <span className="text-base text-[#f1a23c]">352</span>
                      <span className="black-blur rounded px-1 text-xs">+15</span>
                    </div>
                    <div style={{ opacity: 0.5, height: '80px', borderLeftWidth: '1px' }}></div>
                    <div className="m-auto grid w-1/2 grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconAttack.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+6.9%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalDamage.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+11.7%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconStatusProbability.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+3.9%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconBreakUp.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+23.3%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="black-blur relative flex flex-row items-center rounded-s-lg border-l-2 p-1 border-yellow-600">
                    <div className="flex">
                      <img src="https://api.hakush.in/hsr/UI/relicfigures/IconRelic_116_3.webp" alt="Relic Icon" className="h-auto w-20" />
                      <img src="https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/deco/Star5.png" alt="Relic Rarity Icon" className="absolute bottom-1 h-auto w-20" />
                    </div>
                    <div className="mx-1 flex w-1/6 flex-col items-center justify-center">
                      <img src="https://srtools.pages.dev/icon/property/IconAttack.png" alt="Main Affix Icon" className="h-auto w-9" />
                      <span className="text-base text-[#f1a23c]">43.2%</span>
                      <span className="black-blur rounded px-1 text-xs">+15</span>
                    </div>
                    <div style={{ opacity: 0.5, height: '80px', borderLeftWidth: '1px' }}></div>
                    <div className="m-auto grid w-1/2 grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconDefence.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+57</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconMaxHP.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+3.9%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalChance.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+2.6%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconBreakUp.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+19.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="black-blur relative flex flex-row items-center rounded-s-lg border-l-2 p-1 border-yellow-600">
                    <div className="flex">
                      <img src="https://api.hakush.in/hsr/UI/relicfigures/IconRelic_118_4.webp" alt="Relic Icon" className="h-auto w-20" />
                      <img src="https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/deco/Star5.png" alt="Relic Rarity Icon" className="absolute bottom-1 h-auto w-20" />
                    </div>
                    <div className="mx-1 flex w-1/6 flex-col items-center justify-center">
                      <img src="https://srtools.pages.dev/icon/property/IconAttack.png" alt="Main Affix Icon" className="h-auto w-9" />
                      <span className="text-base text-[#f1a23c]">18.9%</span>
                      <span className="black-blur rounded px-1 text-xs">+15</span>
                    </div>
                    <div style={{ opacity: 0.5, height: '80px', borderLeftWidth: '1px' }}></div>
                    <div className="m-auto grid w-1/2 grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconMaxHP.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+5.2%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalDamage.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+4.3%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalChance.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+2.7%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconDefence.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+34</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="black-blur relative flex flex-row items-center rounded-s-lg border-l-2 p-1 border-yellow-600">
                    <div className="flex">
                      <img src="https://api.hakush.in/hsr/UI/relicfigures/IconRelic_118_4.webp" alt="Relic Icon" className="h-auto w-20" />
                      <img src="https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/deco/Star5.png" alt="Relic Rarity Icon" className="absolute bottom-1 h-auto w-20" />
                    </div>
                    <div className="mx-1 flex w-1/6 flex-col items-center justify-center">
                      <img src="https://srtools.pages.dev/icon/property/IconAttack.png" alt="Main Affix Icon" className="h-auto w-9" />
                      <span className="text-base text-[#f1a23c]">18.9%</span>
                      <span className="black-blur rounded px-1 text-xs">+15</span>
                    </div>
                    <div style={{ opacity: 0.5, height: '80px', borderLeftWidth: '1px' }}></div>
                    <div className="m-auto grid w-1/2 grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconMaxHP.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+5.2%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalDamage.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+4.3%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalChance.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+2.7%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconDefence.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+34</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="black-blur relative flex flex-row items-center rounded-s-lg border-l-2 p-1 border-yellow-600">
                    <div className="flex">
                      <img src="https://api.hakush.in/hsr/UI/relicfigures/IconRelic_118_4.webp" alt="Relic Icon" className="h-auto w-20" />
                      <img src="https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/icon/deco/Star5.png" alt="Relic Rarity Icon" className="absolute bottom-1 h-auto w-20" />
                    </div>
                    <div className="mx-1 flex w-1/6 flex-col items-center justify-center">
                      <img src="https://srtools.pages.dev/icon/property/IconAttack.png" alt="Main Affix Icon" className="h-auto w-9" />
                      <span className="text-base text-[#f1a23c]">18.9%</span>
                      <span className="black-blur rounded px-1 text-xs">+15</span>
                    </div>
                    <div style={{ opacity: 0.5, height: '80px', borderLeftWidth: '1px' }}></div>
                    <div className="m-auto grid w-1/2 grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconMaxHP.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+5.2%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalDamage.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+4.3%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconCriticalChance.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+2.7%</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <img src="https://srtools.pages.dev/icon/property/IconDefence.png" alt="Sub Affix Icon" className="h-auto w-7" />
                          <span className="text-sm">+34</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
