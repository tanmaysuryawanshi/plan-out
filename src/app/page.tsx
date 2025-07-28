import { WorkTimeCalculator } from "@/components/work-time-calculator";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">🕘 Plan out</h1>
      <WorkTimeCalculator />
    </main>
  );
}