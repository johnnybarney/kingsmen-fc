export default function FormationPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-10">
        Team Formation
      </h1>

      {/* Football Pitch */}
      <div className="bg-green-600 rounded-2xl p-6 sm:p-10 text-white">
        
        {/* Forward */}
        <div className="flex justify-center mb-8">
          <Player name="John Smith" number={9} />
        </div>

        {/* Midfield */}
        <div className="flex justify-center gap-6 mb-8">
          <Player name="David Lee" number={8} />
          <Player name="Alex Tan" number={10} />
        </div>

        {/* Defense */}
        <div className="flex justify-center gap-6 mb-8">
          <Player name="Chris Wong" number={4} />
          <Player name="Daniel Lim" number={5} />
          <Player name="Ryan Koh" number={3} />
        </div>

        {/* Goalkeeper */}
        <div className="flex justify-center">
          <Player name="Alex Tan" number={1} />
        </div>
      </div>
    </section>
  );
}

function Player({ name, number }: { name: string; number: number }) {
  return (
    <div className="bg-black/70 rounded-full w-20 h-20 flex flex-col items-center justify-center text-center">
      <span className="font-bold text-lg">#{number}</span>
      <span className="text-xs leading-tight">{name}</span>
    </div>
  );
}
