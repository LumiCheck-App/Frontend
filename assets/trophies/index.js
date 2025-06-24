import React from 'react';
import AProcuradeAjuda from './aprocuradeajuda.svg';
import Autoconsciente from './autoconsciente.svg';
import Curioso from './curioso.svg';
import Dedicado from './dedicado.svg';
import DiaDeDetox from './diadedetox.svg';
import HoraDeRecolher from './horaderecolher.svg';
import Marcodos20 from './marcodos20.svg';
import ModoZen from './modozen.svg';
import Perfecionista from './perfecionista.svg';
import PrimeiroPasso from './primeiropasso.svg';
import BlockedTrophy from './trophyblocked.svg';

const trophies = {
  aprocuradeajuda: AProcuradeAjuda,
  autoconsciente: Autoconsciente,
  curioso: Curioso,
  dedicado: Dedicado,
  diadedetox: DiaDeDetox,
  horaderecolher: HoraDeRecolher,
  marcodos20: Marcodos20,
  modozen: ModoZen,
  perfecionista: Perfecionista,
  primeiropasso: PrimeiroPasso,
  blocked: BlockedTrophy,
};

export const getTrophyIcon = (iconName) => {
  if (!iconName) return BlockedTrophy;

  // Remove a extensão .svg se existir e converte para chave do objeto
  const key = iconName.replace('.svg', '').toLowerCase();
  return trophies[key] || BlockedTrophy;
};

// Exporta os componentes individuais também
export {
  AProcuradeAjuda,
  Autoconsciente,
  Curioso,
  Dedicado,
  DiaDeDetox,
  HoraDeRecolher,
  Marcodos20,
  ModoZen,
  Perfecionista,
  PrimeiroPasso,
  BlockedTrophy as DefaultTrophy,
};

export default trophies;
