import { getModes } from '@/lib/game';
import Game from '@/components/GameMode';

export default async function Home() {
  const modes = await getModes();

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="mt-10 mb-14">CampusGuessr</h1>

      {modes.map((mode) => (
        <section key={mode.title} className="mb-20">
          <h4 className="mb-5 text-4xl text-center">{mode.title}</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {mode.data.map((modeData) => (
              <Game
                key={modeData.name}
                data={{
                  name: modeData.name,
                  image: modeData.image,
                  filterId: modeData.filterId,
                  filterValue: modeData.filterValue,
                }}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
