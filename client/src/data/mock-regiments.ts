// Mock regiment data
import { RegimentData } from "../components/RegimentPopup";

const positions: Record<string, [number, number]> = {
  ghr: [55.3308, 11.1395], // Holstebro
  lg: [55.7847, 12.5216],  // Kastellet
  jdr: [57.0488, 9.9217],  // Aalborg
  ir: [55.4027, 11.3568],  // Slagelse
  ar: [55.6200, 8.4800],   // Varde
  tr: [55.5676, 9.7515],   // Fredericia
  bv: [55.0850, 14.7650],  // Bornholm
  vk: [55.0081, 11.9106],  // Vordingborg
  sk: [56.1572, 10.2107],  // Skive
  hk: [56.2639, 9.5018],   // Herning
};

const regiments: RegimentData[] = [
  {
    id: "ghr",
    name: "Gardehusarregimentet",
    personnel: {
      officers: {
        KC: { current: 4, target: 5 },
        PL: { current: 8, target: 10 },
        KF: { current: 6, target: 8 }
      },
      ncos: { current: 45, target: 50 },
      enlisted: { current: 320, target: 350 }
    },
    materiel: {
      ammo: { name: "5.56mm", current: 45000, target: 50000, unit: "patr" },
      weapons: { name: "H&K G36", current: 245, target: 250, unit: "stk" },
      buildings: { name: "Bygninger", current: 85, target: 100, unit: "%" }
    },
    training: [
      {
        unitType: "stående",
        goalsTarget: 120,
        goalsDone: 95,
        missingLessons: ["Skydebane øvelse 10", "Terræn navigation 11", "Kommunikation 12"]
      },
      {
        unitType: "uddannelses",
        goalsTarget: 80,
        goalsDone: 60,
        missingLessons: ["Grunduddannelse 13", "Rekrutcenter 14", "Øvelsesområde C"]
      }
    ],
    notes: "Prioriter vedligeholdelse af våbendepot før Q4-skydninger."
  },
  {
    id: "lg",
    name: "Livgarden",
    personnel: {
      officers: {
        KC: { current: 6, target: 6 },
        PL: { current: 12, target: 12 },
        KF: { current: 8, target: 8 }
      },
      ncos: { current: 65, target: 65 },
      enlisted: { current: 480, target: 480 }
    },
    materiel: {
      ammo: { name: "5.56mm", current: 52000, target: 55000, unit: "patr" },
      weapons: { name: "M4 Carbine", current: 85, target: 100, unit: "stk" },
      buildings: { name: "Bygninger", current: 95, target: 100, unit: "%" }
    },
    training: [
      {
        unitType: "stående",
        goalsTarget: 100,
        goalsDone: 98,
        missingLessons: ["Skydebane øvelse 10"]
      },
      {
        unitType: "uddannelses",
        goalsTarget: 60,
        goalsDone: 55,
        missingLessons: ["Specialkursus 9", "Laboratorium 3"]
      }
    ],
    notes: "Optimal status - kan levere IKK'er til andre regimenter."
  },
  {
    id: "jdr",
    name: "Jydske Dragonregiment",
    personnel: {
      officers: {
        KC: { current: 3, target: 5 },
        PL: { current: 6, target: 8 },
        KF: { current: 4, target: 6 }
      },
      ncos: { current: 35, target: 45 },
      enlisted: { current: 280, target: 320 }
    },
    materiel: {
      ammo: { name: "5.56mm", current: 38000, target: 42000, unit: "patr" },
      weapons: { name: "H&K MP5", current: 15, target: 25, unit: "stk" },
      buildings: { name: "Bygninger", current: 75, target: 100, unit: "%" }
    },
    training: [
      {
        unitType: "stående",
        goalsTarget: 90,
        goalsDone: 65,
        missingLessons: ["Skydebane øvelse 10", "Terræn navigation 11", "Øvelsesområde A", "Simulator 3"]
      },
      {
        unitType: "uddannelses",
        goalsTarget: 70,
        goalsDone: 50,
        missingLessons: ["Grunduddannelse 13", "Rekrutcenter 4", "Øvelsesområde C"]
      }
    ],
    notes: "Kritisk personel mangel - prioriter rekruttering og fastholdelse."
  }
];

export { positions, regiments };
