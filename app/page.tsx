import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Index() {
  return (
    <div>
      <section className="bg-neutral-100 min-h-screen flex flex-col justify-center items-center gap-12">
        <h2 className="text-5xl font-semibold">저번주 수요일에 뭐 했더라?</h2>
        <div className="space-y-6">
          <div className="rounded-full w-4 h-4 bg-slate-400" />
          <div className="rounded-full w-4 h-4 bg-orange-300" />
          <div className="rounded-full w-4 h-4 bg-orange-500" />
        </div>

        <div className="space-y-4">
          <p className="text-center text-5xl">더 이상 잊어버리지 마세요.</p>
          <p className="text-center text-2xl">
            여러분의 기억을 <span className="font-bold mx-2">NOTSS</span>가
            되살려 드립니다.
          </p>
        </div>

        <Button className="bg-orange-500 text-lg p-6 hover:bg-orange-400 rounded-full">
          <Link href="/activity/new">나만의 기억 노트 만들기</Link>
        </Button>
      </section>
    </div>
  );
}
