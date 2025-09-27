// src/components/RegimentPopup.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Wrench, GraduationCap, Info } from "lucide-react";

type RoleBreakdown = {
  target: number;        // målsat antal (fx autoriseret norm)
  current: number;       // nuværende antal
};

type Personnel = {
  officers: Record<string, RoleBreakdown>; // fx { KC: {current: 4, target: 5}, PL: {...} }
  ncos: RoleBreakdown;                      // befalingsmænd
  enlisted: RoleBreakdown;                  // konstabler
};

type MaterielItem = {
  name: string;          // fx "Ammo", "Våben", "Bygninger"
  current: number;       // nuværende beholdning/tilstand
  target: number;        // målsat beholdning/tilstand
  unit?: string;         // fx "stk", "k patr.", "% up to date"
};

type TrainingNeed = {
  unitType: "stående" | "uddannelses";
  goalsTarget: number;   // samlede læringsmål/lektioner
  goalsDone: number;     // gennemførte
  missingLessons?: string[]; // navne på manglende lektioner
};

export type RegimentData = {
  id: string;
  name: string;
  personnel: Personnel;
  materiel: {
    ammo: MaterielItem;
    weapons: MaterielItem;
    buildings: MaterielItem; // "current" forstås som % up to date (0-100)
  };
  training: TrainingNeed[];
  notes?: string;
};

function pct(current: number, target: number) {
  if (target <= 0) return 100;
  return Math.max(0, Math.min(100, Math.round((current / target) * 100)));
}

function deficit(current: number, target: number) {
  return Math.max(0, target - current);
}

// ——— Forslagsmaskiner ———
function suggestPersonnel(p: Personnel, regShort?: string) {
  const officerGaps = Object.entries(p.officers)
    .filter(([, v]) => deficit(v.current, v.target) > 0)
    .map(([role, v]) => `${role}: mangler ${deficit(v.current, v.target)}`);

  const ncoGap = deficit(p.ncos.current, p.ncos.target);
  const enlGap = deficit(p.enlisted.current, p.enlisted.target);

  const suggestions: string[] = [];
  if (officerGaps.length) {
    suggestions.push(
      `Prioritér omfordeling/konstituering på kort sigt (${officerGaps.join(", ")}).`
    );
  }
  if (ncoGap > 0) {
    suggestions.push(
      `Fremskaf befalingsmænd via midlertidig udlån fra nærlig enhed (fx LG/HDV) og fremskynd SBU/MBU spor.`
    );
  }
  if (enlGap > 0) {
    suggestions.push(
      `Ekstra rekrutteringshold + fastholdelsestiltag (bonus for kritiske stillinger, fleksible vagtplaner).`
    );
  }
  suggestions.push(
    `Udarbejd 12-ugers bemandingsplan med pulje af stand-ins og genindkaldelser; månedlig status mod norm.`
  );
  if (regShort?.toUpperCase() === "GHR") {
    suggestions.push(`For GHR: koordiner med LG om midlertidig PL/KF før større øvelser.`);
  }
  return suggestions;
}

function suggestMateriel(m: RegimentData["materiel"], regShort?: string) {
  const s: string[] = [];
  if (deficit(m.ammo.current, m.ammo.target) > 0) {
    s.push(`Ammo: planlæg top-up via depoter; bundne beholdninger balanceres før Q4-skydninger.`);
  }
  if (deficit(m.weapons.current, m.weapons.target) > 0) {
    s.push(`Våben: udlån/ombytning fra naboenhed; prioriter vedligehold (MTBF>mål) før nyanskaffelse.`);
  }
  const bPct = pct(m.buildings.current, 100); // buildings.current er % up to date
  if (bPct < 90) {
    s.push(
      `Bygninger: ${100 - bPct}% ikke up-to-date → aktiver FES for akut udbedring; brug midlertidige moduler til undervisning.`
    );
  }
  if (regShort?.toUpperCase() === "GHR") {
    s.push(`GHR mangler IKK'er → lån midlertidigt fra LG til certificerende øvelser.`);
  }
  return s;
}

function suggestTraining(t: TrainingNeed[]) {
  const s: string[] = [];
  const standing = t.filter(x => x.unitType === "stående");
  const training = t.filter(x => x.unitType === "uddannelses");

  const mk = (arr: TrainingNeed[]) =>
    arr.map(x => {
      const p = pct(x.goalsDone, x.goalsTarget);
      const missing = x.missingLessons?.slice(0, 4).join(", ") || "—";
      return `(${x.unitType}) ${p}% fuldført; mangler: ${missing}.`;
    });

  if (standing.length) s.push(...mk(standing));
  if (training.length) s.push(...mk(training));

  s.push(
    `Plan: læg 6-ugers catch-up plan (2× ekstra lektion/uge), samlede test/validering i uge 7; book terræn og simulatorer nu.`
  );
  return s;
}

export default function RegimentPopup({ data }: { data: RegimentData }) {
  const officerTotals = Object.values(data.personnel.officers).reduce(
    (acc, v) => ({
      current: acc.current + v.current,
      target: acc.target + v.target,
    }),
    { current: 0, target: 0 }
  );

  const officersPct = pct(officerTotals.current, officerTotals.target);
  const ncosPct = pct(data.personnel.ncos.current, data.personnel.ncos.target);
  const enlistedPct = pct(data.personnel.enlisted.current, data.personnel.enlisted.target);

  const ammoPct = pct(data.materiel.ammo.current, data.materiel.ammo.target);
  const weaponsPct = pct(data.materiel.weapons.current, data.materiel.weapons.target);
  const buildingsPct = pct(data.materiel.buildings.current, 100);

  const trainingAgg = data.training.reduce(
    (a, t) => ({ done: a.done + t.goalsDone, tgt: a.tgt + t.goalsTarget }),
    { done: 0, tgt: 0 }
  );
  const trainingPct = pct(trainingAgg.done, trainingAgg.tgt);

  return (
    <Card className="w-[320px]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" /> {data.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personel" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="personel"><Users className="h-4 w-4" /></TabsTrigger>
            <TabsTrigger value="materiel"><Wrench className="h-4 w-4" /></TabsTrigger>
            <TabsTrigger value="udd"><GraduationCap className="h-4 w-4" /></TabsTrigger>
            <TabsTrigger value="andet">…</TabsTrigger>
          </TabsList>

          {/* PERSONEL */}
          <TabsContent value="personel" className="space-y-3 pt-3">
            <div>
              <div className="flex justify-between text-sm">
                <span>Officerer (KC/PL m.fl.)</span>
                <span>{officersPct}%</span>
              </div>
              <Progress value={officersPct} />
              <div className="text-xs text-muted-foreground mt-1">
                {officerTotals.current} / {officerTotals.target}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm"><span>Befalingsmænd</span><span>{ncosPct}%</span></div>
              <Progress value={ncosPct} />
              <div className="text-xs text-muted-foreground mt-1">
                {data.personnel.ncos.current} / {data.personnel.ncos.target}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm"><span>Konstabler</span><span>{enlistedPct}%</span></div>
              <Progress value={enlistedPct} />
              <div className="text-xs text-muted-foreground mt-1">
                {data.personnel.enlisted.current} / {data.personnel.enlisted.target}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold mb-1">Forslag (prognose):</p>
              <ul className="list-disc ml-4 text-xs space-y-1">
                {suggestPersonnel(data.personnel, data.name.split(" ")[0]).map((x,i)=>(<li key={i}>{x}</li>))}
              </ul>
            </div>
          </TabsContent>

          {/* MATERIEL */}
          <TabsContent value="materiel" className="space-y-3 pt-3">
            <div>
              <div className="flex justify-between text-sm"><span>Ammo</span><span>{ammoPct}%</span></div>
              <Progress value={ammoPct} />
              <div className="text-xs text-muted-foreground mt-1">
                {data.materiel.ammo.current} / {data.materiel.ammo.target} {data.materiel.ammo.unit ?? ""}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm"><span>Våben</span><span>{weaponsPct}%</span></div>
              <Progress value={weaponsPct} />
              <div className="text-xs text-muted-foreground mt-1">
                {data.materiel.weapons.current} / {data.materiel.weapons.target} {data.materiel.weapons.unit ?? ""}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm"><span>Bygninger</span><span>{buildingsPct}%</span></div>
              <Progress value={buildingsPct} />
              <div className="text-xs text-muted-foreground mt-1">
                {data.materiel.buildings.current}% up-to-date
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold mb-1">Forslag (prognose):</p>
              <ul className="list-disc ml-4 text-xs space-y-1">
                {suggestMateriel(data.materiel, data.name.split(" ")[0]).map((x,i)=>(<li key={i}>{x}</li>))}
              </ul>
            </div>
          </TabsContent>

          {/* UDDANNELSE */}
          <TabsContent value="udd" className="space-y-3 pt-3">
            <div>
              <div className="flex justify-between text-sm"><span>Træning (samlet)</span><span>{trainingPct}%</span></div>
              <Progress value={trainingPct} />
              <div className="text-xs text-muted-foreground mt-1">
                {trainingAgg.done} / {trainingAgg.tgt} mål
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold mb-1">Status per enhed:</p>
              <div className="space-y-1">
                {data.training.map((t, i) => {
                  const p = pct(t.goalsDone, t.goalsTarget);
                  return (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between">
                        <span className="capitalize">{t.unitType}</span>
                        <span>{p}%</span>
                      </div>
                      <Progress value={p} className="h-1" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold mb-1">Forslag (prognose):</p>
              <ul className="list-disc ml-4 text-xs space-y-1">
                {suggestTraining(data.training).map((x,i)=>(<li key={i}>{x}</li>))}
              </ul>
            </div>
          </TabsContent>

          {/* ANDET */}
          <TabsContent value="andet" className="space-y-3 pt-3">
            <div className="text-xs space-y-2">
              <p><strong>Noter:</strong></p>
              <p>{data.notes || "Ingen noter registreret."}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
